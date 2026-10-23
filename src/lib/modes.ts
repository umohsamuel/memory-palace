import { randInt, sample } from "./random";
import { WORDS } from "./words";

export type ModeId = "numbers" | "words";

export type Settings = {
  mode: ModeId;
  count: number;
  digits: number;
  seconds: number;
};

type Mode = {
  label: string;
  generate: (s: Settings) => string[];
  /** Cleans raw keyboard input while typing. */
  clean: (raw: string, s: Settings) => string;
  isCorrect: (answer: string, item: string) => boolean;
};

/** Patterns a brain chunks for free: 777, 1234, 9876, 500, 1221, 4545. */
function isEasy(s: string): boolean {
  const n = s.length;
  if (n === 1) return false;
  if (/^(\d)\1+$/.test(s)) return true;
  if (/^\d0+$/.test(s)) return true;
  let up = true;
  let down = true;
  for (let i = 1; i < n; i++) {
    const d = s.charCodeAt(i) - s.charCodeAt(i - 1);
    if (d !== 1) up = false;
    if (d !== -1) down = false;
  }
  if (up || down) return true;
  if (n >= 3 && s === [...s].reverse().join("")) return true;
  if (n % 2 === 0 && s.slice(0, n / 2) === s.slice(n / 2)) return true;
  return false;
}

function generateNumbers({ count, digits }: Settings): string[] {
  const space = 10 ** digits;
  // Only demand uniqueness when the pool is big enough to make it cheap.
  const unique = count <= space / 2;
  const seen = new Set<string>();
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    let s = "";
    for (let tries = 0; tries < 60; tries++) {
      s = randInt(space).toString().padStart(digits, "0");
      const prev = out[i - 1];
      if (isEasy(s)) continue;
      if (unique ? seen.has(s) : out.slice(-3).includes(s)) continue;
      // Neighbouring single digits like 4 → 5 form an easy run.
      if (digits === 1 && prev !== undefined && Math.abs(+s - +prev) === 1) continue;
      break;
    }
    seen.add(s);
    out.push(s);
  }
  return out;
}

export const MODES: Record<ModeId, Mode> = {
  numbers: {
    label: "Numbers",
    generate: generateNumbers,
    clean: (raw, s) => raw.replace(/\D/g, "").slice(0, s.digits),
    isCorrect: (answer, item) => answer !== "" && answer.padStart(item.length, "0") === item,
  },
  words: {
    label: "Words",
    generate: ({ count }) => sample(WORDS, count),
    clean: (raw) => raw,
    isCorrect: (answer, item) => answer.trim().toLowerCase() === item,
  },
};

export const LIMITS = { minCount: 1, maxCount: 100, maxDigits: 6 };
