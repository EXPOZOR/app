"use client";

import { MonitorCog, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("expozor-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const nextLight = stored ? stored === "light" : prefersLight;
    setLight(nextLight);
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
  }, []);

  function toggle() {
    const nextLight = !light;
    setLight(nextLight);
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
    window.localStorage.setItem("expozor-theme", nextLight ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={
        compact
          ? "grid size-11 place-items-center rounded-xl text-text-secondary transition-colors hover:bg-bg-elev-2 hover:text-text-primary"
          : "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-elev-2 hover:text-text-primary"
      }
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      title={light ? "Switch to dark theme" : "Switch to light theme"}
    >
      {light ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      {!compact && (
        <>
          <span>{light ? "Light theme" : "Dark theme"}</span>
          <MonitorCog size={15} className="ml-auto text-text-tertiary" aria-hidden="true" />
        </>
      )}
    </button>
  );
}
