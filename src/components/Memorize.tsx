"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/store";
import { Button, Cell, gridStyle } from "./ui";

export function Memorize() {
  const { items, settings, startedAt, finishMemorize, toSetup } = useGame();
  const total = settings.seconds * 1000;
  const [left, setLeft] = useState(total);

  useEffect(() => {
    const id = setInterval(() => {
      const l = startedAt + total - Date.now();
      if (l <= 0) {
        clearInterval(id);
        finishMemorize();
      } else setLeft(l);
    }, 100);
    return () => clearInterval(id);
  }, [startedAt, total, finishMemorize]);

  const urgent = left < 5000;

  return (
    <div className="flex flex-col gap-5">
      <div className="sticky top-0 z-10 -mx-4 flex flex-col gap-2 bg-bg/90 px-4 py-3 backdrop-blur">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Memorize</h2>
          <span className={`font-mono text-2xl font-semibold tabular-nums ${urgent ? "text-bad" : ""}`}>
            {Math.ceil(left / 1000)}s
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className={`h-full rounded-full ${urgent ? "bg-bad" : "bg-accent"}`}
            style={{ width: `${(left / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-2" style={gridStyle(settings)}>
        {items.map((it, i) => (
          <Cell key={i} index={i}>
            <span className="font-mono text-2xl font-semibold tracking-wider break-all select-none sm:text-3xl">
              {it}
            </span>
          </Cell>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={finishMemorize} autoFocus className="flex-1 sm:flex-none">
          I&apos;m ready
        </Button>
        <Button variant="ghost" onClick={toSetup}>
          Quit
        </Button>
      </div>
    </div>
  );
}
