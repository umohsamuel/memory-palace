import { Game } from "@/components/Game";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-10">
      <header className="flex items-center justify-between py-4">
        <h1 className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <svg viewBox="0 0 32 32" className="size-7 text-accent" aria-hidden>
            <path fill="currentColor" d="M16 3 3 10v3h26v-3zM6 15h3v10H6zm8.5 0h3v10h-3zM23 15h3v10h-3zM3 27h26v3H3z" />
          </svg>
          Memory Palace
        </h1>
        <ThemeToggle />
      </header>
      <main className="flex-1">
        <Game />
      </main>
    </div>
  );
}
