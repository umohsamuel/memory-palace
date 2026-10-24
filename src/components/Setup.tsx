"use client";

import { LIMITS, MODES, type ModeId } from "@/lib/modes";
import { useGame } from "@/lib/store";
import { Button, Chips } from "./ui";

const MODE_IDS = Object.keys(MODES) as ModeId[];
const COUNTS = [5, 7, 11, 20, 30, 50] as const;
const DIGITS = [1, 2, 3, 4, 5, 6] as const;
const SECONDS = [15, 30, 45, 60, 120, 300] as const;

const fmtTime = (s: number) => (s < 60 ? `${s}s` : `${s / 60}m`);
const clamp = (n: number) => Math.min(LIMITS.maxCount, Math.max(LIMITS.minCount, n));

export function Setup() {
  const settings = useGame((s) => s.settings);
  const setSettings = useGame((s) => s.setSettings);
  const start = useGame((s) => s.start);
  const { mode, count, digits, seconds } = settings;

  const what = mode === "numbers" ? `${digits}-digit number${count === 1 ? "" : "s"}` : `word${count === 1 ? "" : "s"}`;

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={(e) => {
        e.preventDefault();
        start();
      }}
    >
      <p className="text-muted">
        Practice the memory palace technique. You get a random sequence of numbers or words and a time limit. Place
        each item along a route you know well, then walk the route to recall them in order.
      </p>

      <Field label="Mode">
        <Chips options={MODE_IDS} value={mode} onChange={(m) => setSettings({ mode: m })} format={(m) => MODES[m].label} />
      </Field>

      <Field label="How many">
        <div className="flex items-center gap-3">
          <Stepper onClick={() => setSettings({ count: clamp(count - 1) })}>−</Stepper>
          <span className="w-12 text-center font-mono text-2xl font-semibold tabular-nums">{count}</span>
          <Stepper onClick={() => setSettings({ count: clamp(count + 1) })}>+</Stepper>
        </div>
        <Chips options={COUNTS} value={count as (typeof COUNTS)[number]} onChange={(c) => setSettings({ count: c })} />
      </Field>

      {mode === "numbers" && (
        <Field label="Digits per number">
          <Chips options={DIGITS} value={digits as (typeof DIGITS)[number]} onChange={(d) => setSettings({ digits: d })} />
        </Field>
      )}

      <Field label="Time to memorize">
        <Chips
          options={SECONDS}
          value={seconds as (typeof SECONDS)[number]}
          onChange={(t) => setSettings({ seconds: t })}
          format={fmtTime}
        />
      </Field>

      <div className="flex flex-col gap-3 border-t border-line pt-6">
        <p className="text-muted">
          <span className="font-semibold text-fg">{count}</span> {what} in{" "}
          <span className="font-semibold text-fg">{fmtTime(seconds)}</span>. Walk them through your palace.
        </p>
        <Button type="submit" autoFocus className="w-full sm:w-auto sm:self-start">
          Start
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">{label}</legend>
      {children}
    </fieldset>
  );
}

function Stepper({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="size-10 rounded-lg border border-line bg-card text-xl hover:border-accent"
    >
      {children}
    </button>
  );
}
