import { useEffect, useRef, useState } from "react";

// ─── Om Synthesizer using Web Audio API ───────────────────────────────────────
// Creates a sacred droning Om tone at ~136 Hz (the "Sa" frequency / OM frequency)
// with overtones to produce a rich, ethereal sound reminiscent of temple bells + drone.

const OM_FREQUENCY = 136.1; // Hz - cosmic "Om" frequency

function createOmDrone(ctx: AudioContext): AudioNode[] {
  const nodes: AudioNode[] = [];

  const createLayer = (
    freq: number,
    gain: number,
    type: OscillatorType = "sine",
    detune = 0
  ) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    gainNode.gain.value = gain;
    filter.type = "lowpass";
    filter.frequency.value = 2000;

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();

    nodes.push(osc, gainNode, filter);
    return { osc, gainNode };
  };

  // Base drone (fundamental Om frequency)
  createLayer(OM_FREQUENCY, 0.12, "sine");
  // Octave up
  createLayer(OM_FREQUENCY * 2, 0.06, "sine", 5);
  // 5th harmonic
  createLayer(OM_FREQUENCY * 3, 0.04, "sine", -5);
  // Subtle saw for richness
  createLayer(OM_FREQUENCY, 0.025, "sawtooth");
  // Bell overtone (like temple bells)
  createLayer(OM_FREQUENCY * 4, 0.02, "sine", 8);
  // Deep sub bass
  createLayer(OM_FREQUENCY * 0.5, 0.08, "sine");

  // LFO for the "pulse" of the Om (breathing effect)
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.15; // Very slow pulse — like deep cosmic breathing
  lfoGain.gain.value = 0.04;
  lfo.connect(lfoGain);
  lfo.start();
  nodes.push(lfo, lfoGain);

  return nodes;
}

// ─── Music Player Component ───────────────────────────────────────────────────
export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);

  const startAudio = () => {
    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Rebuild nodes connecting to master gain instead of destination
      // We'll recreate with master gain
      const createLayer = (
        freq: number,
        gain: number,
        type: OscillatorType = "sine",
        detune = 0
      ) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        osc.detune.value = detune;
        gainNode.gain.value = gain;
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        osc.start();
        nodesRef.current.push(osc, gainNode);
      };

      createLayer(OM_FREQUENCY, 0.18, "sine");
      createLayer(OM_FREQUENCY * 2, 0.09, "sine", 5);
      createLayer(OM_FREQUENCY * 3, 0.05, "sine", -5);
      createLayer(OM_FREQUENCY, 0.03, "sawtooth");
      createLayer(OM_FREQUENCY * 4, 0.025, "sine", 8);
      createLayer(OM_FREQUENCY * 0.5, 0.1, "sine");
    }
  };

  const togglePlay = () => {
    startAudio();
    const ctx = audioCtxRef.current!;
    if (ctx.state === "suspended") ctx.resume();

    const masterGain = masterGainRef.current!;
    if (!isPlaying) {
      // Fade in
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 2.5);
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      // Fade out
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
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
        {/* Ripple ring when playing */}
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
                animation: "ripple 2s ease-out infinite 0.6s",
              }}
            />
          </>
        )}

        {/* Om symbol or pause */}
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
