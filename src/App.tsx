import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import LoadingScreen from "./components/ui/LoadingScreen";
import MusicPlayer from "./components/ui/MusicPlayer";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Achievements from "./components/sections/Achievements";
import Contact from "./components/sections/Contact";

// Lazy load the heavy Three.js scene
const SacredScene3D = lazy(() => import("./components/ui/SacredScene3D"));

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with hover capability
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;
    setVisible(true);

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="cursor-glow"
      style={{
        left: pos.x,
        top: pos.y,
      }}
    />
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: "#050508" }}>
      {/* ── Cinematic Loading Screen ── */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* ── Three.js 3D Sacred Background ── */}
      {!loading && (
        <Suspense fallback={null}>
          <SacredScene3D />
        </Suspense>
      )}

      {/* ── Cursor Glow Trail ── */}
      {!loading && <CursorGlow />}

      {/* ── Navigation ── */}
      {!loading && <Navbar />}

      {/* ── Main Content ── */}
      <main
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        <Hero />

        {/* Sacred fire divider */}
        <div className="sacred-fire-divider mx-6 md:mx-16" />
        <About />

        <div className="divine-separator mx-6 md:mx-16" />
        <Skills />

        <div className="sacred-fire-divider mx-6 md:mx-16" />
        <Experience />

        <div className="divine-separator mx-6 md:mx-16" />
        <Projects />

        <div className="sacred-fire-divider mx-6 md:mx-16" />
        <Achievements />

        <div className="divine-separator mx-6 md:mx-16" />
        <Contact />
      </main>

      {/* ── Footer ── */}
      {!loading && <Footer />}

      {/* ── Sacred Music Player ── */}
      {!loading && <MusicPlayer />}
    </div>
  );
}

export default App;
