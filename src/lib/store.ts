import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MODES, type Settings } from "./modes";

export type Phase = "setup" | "memorize" | "recall" | "results";

type GameState = {
  settings: Settings;
  phase: Phase;
  items: string[];
  answers: string[];
  startedAt: number;
  memorizeMs: number;
  setSettings: (patch: Partial<Settings>) => void;
  start: () => void;
  finishMemorize: () => void;
  setAnswer: (i: number, value: string) => void;
  submit: () => void;
  toSetup: () => void;
};

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      settings: { mode: "numbers", count: 11, digits: 2, seconds: 30 },
      phase: "setup",
      items: [],
      answers: [],
      startedAt: 0,
      memorizeMs: 0,
      setSettings: (patch) => set({ settings: { ...get().settings, ...patch } }),
      start: () => {
        const { settings } = get();
        const items = MODES[settings.mode].generate(settings);
        set({ phase: "memorize", items, answers: items.map(() => ""), startedAt: Date.now() });
      },
      finishMemorize: () => {
        if (get().phase !== "memorize") return;
        set({ phase: "recall", memorizeMs: Date.now() - get().startedAt });
      },
      setAnswer: (i, value) => {
        const answers = get().answers.slice();
        answers[i] = value;
        set({ answers });
      },
      submit: () => set({ phase: "results" }),
      toSetup: () => set({ phase: "setup" }),
    }),
    {
      name: "memory-palace",
      partialize: (s) => ({ settings: s.settings }),
      // Rehydrated on mount so server and first client render match.
      skipHydration: true,
    },
  ),
);
