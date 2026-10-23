"use client";

import { useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
const ORDER: Theme[] = ["system", "light", "dark"];
const EVENT = "themechange";

function read(): Theme {
  try {
    return (localStorage.getItem("theme") as Theme) || "system";
  } catch {
    return "system";
  }
}

export function applyTheme(t: Theme) {
  const dark = t === "dark" || (t === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

function subscribe(cb: () => void) {
  const mq = matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    applyTheme(read());
    cb();
  };
  mq.addEventListener("change", onSystem);
  window.addEventListener(EVENT, cb);
  return () => {
    mq.removeEventListener("change", onSystem);
    window.removeEventListener(EVENT, cb);
  };
}

const ICONS: Record<Theme, React.ReactNode> = {
  system: <path d="M4 5h16v11H4zM8 20h8M12 16v4" />,
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
};

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => null);

  const next = () => {
    const t = ORDER[(ORDER.indexOf(theme ?? "system") + 1) % ORDER.length];
    try {
      localStorage.setItem("theme", t);
    } catch {}
    applyTheme(t);
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <button
      onClick={next}
      aria-label={`Theme: ${theme ?? "system"}`}
      title={`Theme: ${theme ?? "system"}`}
      className="grid size-10 place-items-center rounded-lg border border-line bg-card hover:border-accent"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {theme && ICONS[theme]}
      </svg>
    </button>
  );
}
