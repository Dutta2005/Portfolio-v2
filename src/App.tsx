import ParticleBackground from "./components/ui/ParticleBackground";
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

function App() {
  return (
    <div className="relative min-h-screen" style={{ background: "#050508" }}>
      {/* ── Global Particles ── */}
      <ParticleBackground count={55} />

      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Main Content ── */}
      <main>
        <Hero />

        {/* Section dividers between each section */}
        <div className="divine-separator mx-6 md:mx-16" />
        <About />

        <div className="divine-separator mx-6 md:mx-16" />
        <Skills />

        <div className="divine-separator mx-6 md:mx-16" />
        <Experience />

        <div className="divine-separator mx-6 md:mx-16" />
        <Projects />

        <div className="divine-separator mx-6 md:mx-16" />
        <Achievements />

        <div className="divine-separator mx-6 md:mx-16" />
        <Contact />
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Sacred Music Player ── */}
      <MusicPlayer />
    </div>
  );
}

export default App;
