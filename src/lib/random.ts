const buf = new Uint32Array(1);

/** Cryptographically random integer in [0, max), without modulo bias. */
export function randInt(max: number): number {
  const limit = Math.floor(0x1_0000_0000 / max) * max;
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

/** Picks `count` distinct entries from `list` (partial Fisher–Yates). */
export function sample<T>(list: readonly T[], count: number): T[] {
  const a = list.slice();
  const n = Math.min(count, a.length);
  for (let i = 0; i < n; i++) {
    const j = i + randInt(a.length - i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}
