import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { Settings } from "@/lib/modes";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  const look =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:opacity-90"
      : "border border-line bg-card hover:bg-line/50";
  return (
    <button
      className={`h-12 rounded-xl px-5 font-semibold transition active:scale-[0.98] disabled:opacity-40 ${look} ${className}`}
      {...props}
    />
  );
}

export function Chips<T extends string | number>({
  options,
  value,
  onChange,
  format = String,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  format?: (v: T) => ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={o === value}
          className={`h-10 min-w-12 rounded-lg border px-3 text-sm font-medium transition ${
            o === value
              ? "border-accent bg-accent text-accent-fg"
              : "border-line bg-card hover:border-accent"
          }`}
        >
          {format(o)}
        </button>
      ))}
    </div>
  );
}

/** Responsive grid sized to the item width so long words and short digits both fit. */
export function gridStyle(s: Settings) {
  const min = s.mode === "words" ? 8 : Math.max(3.5, s.digits * 0.85 + 2);
  return { gridTemplateColumns: `repeat(auto-fill, minmax(${min}rem, 1fr))` };
}

export function Cell({ index, children, tone }: { index: number; children: ReactNode; tone?: "good" | "bad" }) {
  const border = tone === "good" ? "border-good" : tone === "bad" ? "border-bad" : "border-line";
  return (
    <div className={`relative rounded-xl border bg-card px-2 pt-5 pb-2 text-center ${border}`}>
      <span className="absolute top-1 left-2 text-[10px] font-medium text-muted">{index + 1}</span>
      {children}
    </div>
  );
}
