import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import TechnicalToolkit from "./components/sections/TechnicalToolkit";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Achievements from "./components/sections/Achievements";
import Contact from "./components/sections/Contact";
import "./App.css";

export default function App() {
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" className="page-shell" tabIndex={-1}>
        <Hero />
        <div className="resume-layout">
          <aside className="resume-sidebar" aria-label="Profile and skills">
            <About />
            <TechnicalToolkit />
          </aside>
          <div className="resume-body">
            <Experience />
            <Achievements />
          </div>
        </div>
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
