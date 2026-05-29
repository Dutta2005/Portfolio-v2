import { useState, useEffect, useCallback } from "react";
import { TrishulIcon } from "../icons/ShivaIcons";

// ─── 🔱 Cinematic Loading Screen ───────────────────────────────────────────────
// A sacred intro that reveals the portfolio through temple doors opening

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0=init, 1=om, 2=text, 3=progress, 4=exit
  const [progress, setProgress] = useState(0);
  const [exitClass, setExitClass] = useState("");
  const [mantraText, setMantraText] = useState("");
  const fullMantra = "OM NAMAH SHIVAYA";

  const startExit = useCallback(() => {
    setExitClass("exit");
    setTimeout(onComplete, 900);
  }, [onComplete]);

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase(1), 150);    // Om appears
    const t2 = setTimeout(() => setPhase(2), 600);   // Mantra types
    const t3 = setTimeout(() => setPhase(3), 1300);   // Progress bar
    const t4 = setTimeout(() => setPhase(4), 2100);   // Exit

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Typewriter for mantra
  useEffect(() => {
    if (phase < 2) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setMantraText(fullMantra.slice(0, i));
      if (i >= fullMantra.length) clearInterval(iv);
    }, 60);
    return () => clearInterval(iv);
  }, [phase]);

  // Progress bar
  useEffect(() => {
    if (phase < 3) return;
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          return 100;
        }
        return p + 5;
      });
    }, 20);
    return () => clearInterval(iv);
  }, [phase]);

  // Exit trigger
  useEffect(() => {
    if (phase === 4) startExit();
  }, [phase, startExit]);

  return (
    <div className={`loading-screen ${exitClass}`}>
      {/* Temple doors */}
      <div className="door-left">
        {/* Sacred geometry on left door */}
        <div
          className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none"
          style={{ opacity: 0.05 }}
        >
          <svg width="200" height="600" viewBox="0 0 200 600" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: "#ff6b1a" }}>
            {[...Array(8)].map((_, i) => (
              <circle key={i} cx="200" cy="300" r={50 + i * 30} opacity={0.3 - i * 0.03} />
            ))}
          </svg>
        </div>
      </div>
      <div className="door-right">
        <div
          className="absolute inset-0 flex items-center justify-start pl-8 pointer-events-none"
          style={{ opacity: 0.05 }}
        >
          <svg width="200" height="600" viewBox="0 0 200 600" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: "#8b5cf6" }}>
            {[...Array(8)].map((_, i) => (
              <circle key={i} cx="0" cy="300" r={50 + i * 30} opacity={0.3 - i * 0.03} />
            ))}
          </svg>
        </div>
      </div>

      {/* Loading content (behind doors, visible before split) */}
      <div className="loading-content flex flex-col items-center gap-6">
        {/* Expanding sacred rings */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Concentric pulse rings */}
          {phase >= 1 && [0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: "100%",
                height: "100%",
                border: `1px solid rgba(255, 107, 26, ${0.4 - i * 0.1})`,
                animation: `ring-expand 3s ease-out infinite ${i * 0.6}s`,
              }}
            />
          ))}

          {/* 3D Rotating Trishul */}
          <div
            className="absolute"
            style={{
              color: "#ff6b1a",
              opacity: phase >= 1 ? 1 : 0,
              transition: "opacity 0.8s ease",
              animation: phase >= 1 ? "mandala-spin-3d 6s linear infinite" : "none",
              transformStyle: "preserve-3d",
              filter: "drop-shadow(0 0 20px rgba(255, 107, 26, 0.6))",
            }}
          >
            <TrishulIcon size={50} />
          </div>

          {/* Central OM */}
          <div
            style={{
              fontSize: "72px",
              color: "#f59e0b",
              opacity: phase >= 1 ? 1 : 0,
              animation: phase >= 1 ? "om-reveal 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards" : "none",
              filter: "drop-shadow(0 0 30px rgba(245, 158, 11, 0.8)) drop-shadow(0 0 60px rgba(255, 107, 26, 0.4))",
              fontFamily: "serif",
            }}
          >
            ॐ
          </div>
        </div>

        {/* Typed mantra */}
        <div className="h-8 flex items-center justify-center">
          <p
            className="font-cinzel text-sm tracking-widest"
            style={{
              color: "#ff6b1a",
              letterSpacing: "6px",
              opacity: phase >= 2 ? 1 : 0,
              transition: "opacity 0.5s ease",
              textShadow: "0 0 20px rgba(255, 107, 26, 0.5)",
            }}
          >
            {mantraText}
            <span
              style={{
                borderRight: "2px solid #ff6b1a",
                marginLeft: "2px",
                animation: "glow-pulse 1s ease-in-out infinite",
              }}
            />
          </p>
        </div>

        {/* Sanskrit shloka */}
        <p
          className="font-cinzel text-xs"
          style={{
            color: "rgba(139, 92, 246, 0.6)",
            letterSpacing: "4px",
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          ॐ नमः शिवाय
        </p>

        {/* Sacred progress bar */}
        <div
          className="w-48"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <div className="sacred-progress">
            <div
              className="fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p
            className="font-cinzel text-center mt-2"
            style={{
              fontSize: "9px",
              color: "rgba(107, 114, 128, 0.5)",
              letterSpacing: "3px",
            }}
          >
            ENTERING THE COSMOS
          </p>
        </div>
      </div>

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(255, 107, 26, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 30%, rgba(245, 158, 11, 0.05) 0%, transparent 40%)
          `,
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
