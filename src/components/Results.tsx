"use client";

import { MODES } from "@/lib/modes";
import { useGame } from "@/lib/store";
import { Button, Cell, gridStyle } from "./ui";

export function Results() {
  const { items, answers, settings, memorizeMs, start, toSetup } = useGame();
  const { isCorrect } = MODES[settings.mode];
  const rows = items.map((item, i) => ({ i, item, answer: answers[i], ok: isCorrect(answers[i], item) }));
  const missed = rows.filter((r) => !r.ok);
  const score = rows.length - missed.length;
  const perfect = missed.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className={`text-sm font-semibold tracking-wider uppercase ${perfect ? "text-good" : "text-muted"}`}>
          {perfect ? "Perfect recall" : "Result"}
        </p>
        <p className="font-mono text-5xl font-bold tabular-nums">
          {score}
          <span className="text-muted">/{rows.length}</span>
        </p>
        <p className="text-sm text-muted">
          Memorized in {(memorizeMs / 1000).toFixed(1)}s of {settings.seconds}s
        </p>
      </div>

      {!perfect && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold tracking-wider text-muted uppercase">Missed, in order</h2>
          <ol className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
            {missed.map((r) => (
              <li key={r.i} className="flex items-center gap-4 px-4 py-3">
                <span className="w-8 text-sm text-muted tabular-nums">#{r.i + 1}</span>
                <span className="font-mono text-lg font-semibold">{r.item}</span>
                {r.answer.trim() ? (
                  <span className="ml-auto font-mono text-bad line-through decoration-2">{r.answer.trim()}</span>
                ) : (
                  <span className="ml-auto text-sm text-muted">blank</span>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold tracking-wider text-muted uppercase">Full sequence</h2>
        <div className="grid gap-2" style={gridStyle(settings)}>
          {rows.map((r) => (
            <Cell key={r.i} index={r.i} tone={r.ok ? "good" : "bad"}>
              <span className="font-mono text-xl font-semibold tracking-wider break-all">{r.item}</span>
            </Cell>
          ))}
        </div>
      </section>

      <div className="flex gap-3">
        <Button onClick={start} autoFocus className="flex-1 sm:flex-none">
          Play again
        </Button>
        <Button variant="ghost" onClick={toSetup}>
          Settings
        </Button>
      </div>
    </div>
  );
}
