function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const SITE = {
  url: siteUrl(),
  name: "Memory Palace",
  title: "Memory Palace: Memory Training with the Method of Loci",
  description:
    "Train your memory with the memory palace technique. Memorize random sequences of hard numbers or words against a timer, then recall them in order and see exactly which ones you missed.",
  keywords: [
    "memory palace",
    "method of loci",
    "memory training",
    "number memorization",
    "memory game",
    "brain training",
    "major system",
    "mnemonics",
    "memory sports",
    "recall practice",
  ],
};
