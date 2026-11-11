import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const storageKey = "raj-portfolio-theme";

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(storageKey);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f6f7f3" : "#11120f");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = document.documentElement.dataset.theme;
    return initial === "light" || initial === "dark" ? initial : savedTheme() ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });
  const manualPreference = useRef(savedTheme() !== null);

  useEffect(() => { applyTheme(theme); }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = (event: MediaQueryListEvent) => {
      if (!manualPreference.current) setTheme(event.matches ? "dark" : "light");
    };
    const syncTabs = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      const stored = savedTheme();
      manualPreference.current = stored !== null;
      setTheme(stored ?? (media.matches ? "dark" : "light"));
    };
    media.addEventListener("change", followSystem);
    window.addEventListener("storage", syncTabs);
    return () => {
      media.removeEventListener("change", followSystem);
      window.removeEventListener("storage", syncTabs);
    };
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    manualPreference.current = true;
    applyTheme(next);
    setTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* Keep the selected theme for this visit when storage is unavailable. */ }
  };

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
