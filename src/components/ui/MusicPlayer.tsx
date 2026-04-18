import { useEffect, useRef, useState } from "react";

// ─── 🔱 Sacred Om Synthesizer ─────────────────────────────────────────────────
// Base: 108 Hz — the sacred number (108 names of Shiva, 108 mala beads)
// Architecture:
//   Oscillators → SumGain (breath-modulated)
//   → HighPass filter (cleans sub rumble)
//   → Vocal Formant filters (bandpass at 280/540/1100/2700 Hz — "aaa-ooo-mmm")
//   → Dry bus (0.7) + Wet bus (0.35) → Reverb delays (temple echo)
//   → MasterGain (fade in/out on toggle)

const BASE_HZ = 108; // sacred number

// ─── Music Player Component ───────────────────────────────────────────────────
export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);

  const startAudio = () => {
    if (audioCtxRef.current) return; // already initialized

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // ── Master gain (faded in/out on toggle) ──────────────────────────────────
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // ── Reverb: feedback delay network (temple / cave echo) ──────────────────
    // Two cross-coupled delay lines with prime-number offsets for naturalism
    const delayA = ctx.createDelay(2.0);
    const delayB = ctx.createDelay(2.0);
    const fbGainA = ctx.createGain();
    const fbGainB = ctx.createGain();
    delayA.delayTime.value = 0.29;  // 290ms
    delayB.delayTime.value = 0.43;  // 430ms (prime offset)
    fbGainA.gain.value = 0.3;
    fbGainB.gain.value = 0.25;

    // Cross-couple: A → fbA → B → fbB → A (+ both feed masterGain)
    delayA.connect(fbGainA);
    fbGainA.connect(delayB);
    fbGainA.connect(masterGain);
    delayB.connect(fbGainB);
    fbGainB.connect(delayA);
    fbGainB.connect(masterGain);

    // ── Dry / Wet buses ───────────────────────────────────────────────────────
    const dryBus = ctx.createGain();
    const wetBus = ctx.createGain();
    dryBus.gain.value = 0.68;
    wetBus.gain.value = 0.38;
    dryBus.connect(masterGain);
    wetBus.connect(delayA);
    wetBus.connect(delayB);

    // ── Vibrato LFO (5.3 Hz, depth ±3 cents) — throat-singing quality ────────
    const vibratoOsc = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibratoOsc.type = "sine";
    vibratoOsc.frequency.value = 5.3;
    vibratoGain.gain.value = 3;         // ±3 cents depth
    vibratoOsc.connect(vibratoGain);
    vibratoOsc.start();

    // ── Breath LFO (0.07 Hz — one slow breath ~14 sec) ───────────────────────
    // Modulates sumGain amplitude for living, breathing feel
    const breathOsc = ctx.createOscillator();
    const breathMod = ctx.createGain();
    breathOsc.type = "sine";
    breathOsc.frequency.value = 0.07;
    breathMod.gain.value = 0.12;        // ±12% amplitude swell
    breathOsc.connect(breathMod);
    breathOsc.start();

    // ── Sum gain (all oscillators merge here; breath-modulated) ──────────────
    const sumGain = ctx.createGain();
    sumGain.gain.value = 1.0;
    breathMod.connect(sumGain.gain);    // LFO modulates gain ±0.12

    // ── Oscillator harmonic stack ─────────────────────────────────────────────
    // Natural harmonic series — fundamental + overtones + sub octave + chorus
    const layers: { freq: number; gain: number; type: OscillatorType; detune?: number }[] = [
      // Sub octave (depth & warmth)
      { freq: BASE_HZ * 0.5, gain: 0.13, type: "sine" },
      // Fundamental (the Om)
      { freq: BASE_HZ,       gain: 0.32, type: "sine" },
      // Chorus layer of fundamental (slight detune for warmth)
      { freq: BASE_HZ,       gain: 0.07, type: "sine",     detune: 8 },
      { freq: BASE_HZ,       gain: 0.05, type: "sine",     detune: -6 },
      // 2nd harmonic (octave)
      { freq: BASE_HZ * 2,   gain: 0.18, type: "sine" },
      // 3rd harmonic (perfect 5th above octave)
      { freq: BASE_HZ * 3,   gain: 0.11, type: "sine" },
      // 4th harmonic
      { freq: BASE_HZ * 4,   gain: 0.07, type: "sine" },
      // 5th harmonic
      { freq: BASE_HZ * 5,   gain: 0.045, type: "sine" },
      // 6th harmonic (subtle presence)
      { freq: BASE_HZ * 6,   gain: 0.025, type: "sine" },
      // Subtle sawtooth for buzz/texture (very low gain)
      { freq: BASE_HZ,       gain: 0.015, type: "sawtooth" },
    ];

    layers.forEach(({ freq, gain: g, type, detune = 0 }) => {
      const osc = ctx.createOscillator();
      const gNode = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = detune;
      gNode.gain.value = g;
      // Vibrato modulates each oscillator's detune for natural pitch sway
      vibratoGain.connect(osc.detune);
      osc.connect(gNode);
      gNode.connect(sumGain);
      osc.start();
      nodesRef.current.push(osc, gNode);
    });

    // ── High-pass: clean up below 60 Hz (sub rumble removal) ─────────────────
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 60;
    hp.Q.value = 0.7;
    sumGain.connect(hp);

    // ── Vocal formant filters — "aaa — ooo — mmm" character ──────────────────
    // Bandpass filters tuned to vocal resonance chambers
    const formants: { f: number; Q: number; g: number }[] = [
      { f: 280,  Q: 5,  g: 0.55 },  // chest resonance — "mmm" nasal close
      { f: 540,  Q: 10, g: 0.70 },  // "aah" vowel (F1 — jaw open)
      { f: 1100, Q: 14, g: 0.38 },  // "ooh" vowel (F2 — lip rounding)
      { f: 2700, Q: 20, g: 0.18 },  // upper harmonic air / "ee" presence
    ];

    formants.forEach(({ f, Q, g }) => {
      const filt = ctx.createBiquadFilter();
      const fGain = ctx.createGain();
      filt.type = "bandpass";
      filt.frequency.value = f;
      filt.Q.value = Q;
      fGain.gain.value = g;
      hp.connect(filt);
      filt.connect(fGain);
      fGain.connect(dryBus);
      fGain.connect(wetBus);
      nodesRef.current.push(filt, fGain);
    });

    // Also route sumGain direct so the fundamental tone is clearly present
    hp.connect(dryBus);
    hp.connect(wetBus);

    // Track all created nodes for cleanup
    nodesRef.current.push(
      delayA, delayB, fbGainA, fbGainB,
      dryBus, wetBus,
      sumGain, hp,
      vibratoOsc, vibratoGain,
      breathOsc, breathMod
    );
  };

  const togglePlay = () => {
    startAudio();
    const ctx = audioCtxRef.current!;
    if (ctx.state === "suspended") ctx.resume();

    const masterGain = masterGainRef.current!;
    if (!isPlaying) {
      // Fade in slowly — like Om rising from the cosmic void
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.65, ctx.currentTime + 3.5);
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      // Fade out — like Om dissolving back into silence
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      nodesRef.current.forEach((n) => {
        try {
          (n as OscillatorNode).stop?.();
          n.disconnect?.();
        } catch {}
      });
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {!hasStarted && (
        <div
          className="glass-saffron px-3 py-1.5 rounded-xl text-xs font-cinzel text-orange-300 animate-float-y"
          style={{ fontSize: "11px" }}
        >
          🔱 Play sacred Om
        </div>
      )}

      {/* Player button */}
      <button
        onClick={togglePlay}
        title={isPlaying ? "Pause Om Mantra" : "Play Sacred Om"}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{
          background: isPlaying
            ? "radial-gradient(circle, rgba(255,107,26,0.3), rgba(139,92,246,0.3))"
            : "rgba(14,14,26,0.9)",
          border: `2px solid ${isPlaying ? "rgba(255,107,26,0.8)" : "rgba(139,92,246,0.5)"}`,
          boxShadow: isPlaying
            ? "0 0 20px rgba(255,107,26,0.5), 0 0 40px rgba(255,107,26,0.2)"
            : "0 0 10px rgba(139,92,246,0.3)",
        }}
      >
        {/* Ripple rings when playing */}
        {isPlaying && (
          <>
            <span
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(255,107,26,0.5)",
                animation: "ripple 2s ease-out infinite",
              }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(255,107,26,0.3)",
                animation: "ripple 2s ease-out infinite 0.7s",
              }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid rgba(245,158,11,0.2)",
                animation: "ripple 2s ease-out infinite 1.4s",
              }}
            />
          </>
        )}

        {/* Om symbol / play icon */}
        <span
          className={`text-2xl select-none ${isPlaying ? "animate-glow-pulse" : ""}`}
          style={{
            color: isPlaying ? "#ff6b1a" : "#8b5cf6",
            fontFamily: "serif",
            filter: isPlaying ? "drop-shadow(0 0 8px rgba(255,107,26,0.9))" : "none",
          }}
        >
          {isPlaying ? "ॐ" : "▶"}
        </span>
      </button>

      {isPlaying && (
        <p
          className="text-center font-cinzel"
          style={{
            fontSize: "9px",
            color: "rgba(255,107,26,0.6)",
            letterSpacing: "1px",
          }}
        >
          HAR HAR MAHADEV
        </p>
      )}
    </div>
  );
}
