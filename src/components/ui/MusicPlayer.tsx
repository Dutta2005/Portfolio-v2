import { useEffect, useRef, useState, useCallback } from "react";

// ─── 🔱 Sacred Om Audio Player ───────────────────────────────────────────────
// Plays /om.mp3 as looping background music with smooth fade in/out transitions.

const TARGET_VOLUME = 0.65;
const FADE_IN_MS = 3500;   // 3.5 seconds — Om rising from the cosmic void
const FADE_OUT_MS = 2500;  // 2.5 seconds — Om dissolving back into silence
const FADE_STEP_MS = 50;   // volume update interval

// ─── Music Player Component ───────────────────────────────────────────────────
export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize the audio element once
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio("/om.mp3");
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  // Clear any ongoing fade
  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  // Smooth volume fade
  const fadeTo = useCallback(
    (audio: HTMLAudioElement, target: number, durationMs: number) => {
      clearFade();
      const steps = durationMs / FADE_STEP_MS;
      const delta = (target - audio.volume) / steps;

      fadeIntervalRef.current = setInterval(() => {
        const next = audio.volume + delta;
        if ((delta > 0 && next >= target) || (delta < 0 && next <= target)) {
          audio.volume = Math.max(0, Math.min(1, target));
          clearFade();
          if (target === 0) audio.pause();
        } else {
          audio.volume = Math.max(0, Math.min(1, next));
        }
      }, FADE_STEP_MS);
    },
    [clearFade]
  );

  const togglePlay = useCallback(() => {
    const audio = getAudio();

    if (!isPlaying) {
      // Fade in — like Om rising from the cosmic void
      audio.play().catch(() => {});
      fadeTo(audio, TARGET_VOLUME, FADE_IN_MS);
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      // Fade out — like Om dissolving back into silence
      fadeTo(audio, 0, FADE_OUT_MS);
      setIsPlaying(false);
    }
  }, [isPlaying, getAudio, fadeTo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearFade();
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, [clearFade]);

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
