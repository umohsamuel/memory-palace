"use client";

import { useEffect } from "react";
import { useGame } from "@/lib/store";
import { Memorize } from "./Memorize";
import { Recall } from "./Recall";
import { Results } from "./Results";
import { Setup } from "./Setup";

export function Game() {
  const phase = useGame((s) => s.phase);

  useEffect(() => {
    useGame.persist.rehydrate();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);

  if (phase === "memorize") return <Memorize />;
  if (phase === "recall") return <Recall />;
  if (phase === "results") return <Results />;
  return <Setup />;
}
