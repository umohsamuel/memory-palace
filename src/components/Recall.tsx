"use client";

import { useRef, useState } from "react";
import { MODES } from "@/lib/modes";
import { useGame } from "@/lib/store";
import { Button, Cell, gridStyle } from "./ui";

export function Recall() {
  const { items, answers, settings, setAnswer, submit, toSetup } = useGame();
  const [confirming, setConfirming] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const isNumbers = settings.mode === "numbers";
  const last = items.length - 1;
  const filled = answers.filter((a) => a.trim() !== "").length;

  const focus = (i: number) => refs.current[i]?.focus();

  const onChange = (i: number, raw: string) => {
    const v = MODES[settings.mode].clean(raw, settings);
    setAnswer(i, v);
    if (isNumbers && v.length === settings.digits && i < last) focus(i + 1);
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (i < last) focus(i + 1);
      else setConfirming(true);
    } else if (e.key === "Backspace" && answers[i] === "" && i > 0) {
      e.preventDefault();
      focus(i - 1);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Recall in order</h2>
        <span className="text-sm text-muted tabular-nums">
          {filled}/{items.length} filled
        </span>
      </div>

      <div className="grid gap-2" style={gridStyle(settings)}>
        {items.map((_, i) => (
          <Cell key={i} index={i}>
            <input
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={answers[i]}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              autoFocus={i === 0}
              inputMode={isNumbers ? "numeric" : "text"}
              enterKeyHint={i < last ? "next" : "done"}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label={`Item ${i + 1}`}
              className="w-full bg-transparent text-center font-mono text-2xl font-semibold tracking-wider outline-none placeholder:text-line sm:text-3xl"
              placeholder={isNumbers ? "·".repeat(settings.digits) : "…"}
            />
          </Cell>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={() => setConfirming(true)} className="flex-1 sm:flex-none">
          Submit
        </Button>
        <Button variant="ghost" onClick={toSetup}>
          Quit
        </Button>
      </div>

      {confirming && (
        <div
          className="fixed inset-0 z-20 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={() => setConfirming(false)}
          onKeyDown={(e) => e.key === "Escape" && setConfirming(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-line bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Lock in your final answer?</h3>
            <p className="text-muted">
              {filled === items.length
                ? "All slots filled. No changes after this."
                : `${items.length - filled} slot${items.length - filled === 1 ? " is" : "s are"} still blank.`}
            </p>
            <div className="flex gap-3">
              <Button onClick={submit} autoFocus className="flex-1">
                Confirm
              </Button>
              <Button variant="ghost" onClick={() => setConfirming(false)} className="flex-1">
                Keep editing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
