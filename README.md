# Memory Palace

Memory Palace is a small web app for practicing the method of loci. It shows you a random sequence of numbers or words for a fixed amount of time, then asks you to recall the sequence in order. When you submit, it tells you your score and lists every item you missed in the order it appeared.

## How a round works

1. Choose a mode, how many items you want, and how long you get to memorize them. In Numbers mode you also choose how many digits each number has, from 1 to 6.
2. The items appear in a numbered grid with a countdown. You can move on early if you are ready before the time runs out.
3. Type each item back into its numbered slot. Number slots open the numeric keyboard on phones and move to the next slot once you have typed enough digits.
4. Confirm your final answer. The app warns you if any slots are still blank.
5. Review your score, the items you missed with what you typed, and the full sequence. You can play again with the same settings or go back and change them.

## Modes

**Numbers** generates sequences of 1 to 6 digit numbers. The generator is designed to produce numbers that are hard to remember without a technique. It uses the browser's cryptographic random source and rejects numbers that are easy to chunk, such as repeated digits (777), straight runs (1234 or 9876), round numbers (500), palindromes (1221), and repeated halves (4545). It avoids duplicates in a sequence whenever there are enough possible numbers to do so. For single digits, it also avoids repeating a digit within three positions and avoids neighbouring digits such as 4 followed by 5. Leading zeros are kept, so 07 is a valid two digit number, and typing 7 for 07 is accepted.

**Words** draws from a list of about 250 nouns. Most are concrete objects that are easy to picture, and some are abstract words such as guilt or nostalgia, which force you to invent an image for them.

## Features

- Sequence length from 1 to 100 items.
- Memorization limits of 15 seconds, 30 seconds, 45 seconds, 1 minute, 2 minutes, or 5 minutes.
- Settings are saved in the browser and restored on your next visit.
- Light and dark themes. The app follows your system setting by default, and the button in the header switches between system, light, and dark.
- Responsive layout that works on phones, tablets, and desktops.
- Keyboard friendly. Enter moves to the next slot, Backspace on an empty slot moves to the previous one, and Enter on the last slot opens the confirmation step.

## Tech stack

- [Next.js](https://nextjs.org) with the App Router
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://zustand.docs.pmnd.rs) for game state and saved settings

The app is a single statically rendered page. There is no backend and no database, and everything runs in the browser.

## Getting started

You need Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

To create and run a production build:

```bash
npm run build
npm start
```

To run the linter:

```bash
npm run lint
```

## Project structure

```
src/
  app/
    layout.tsx       Root layout, metadata, and the theme script that runs before paint
    page.tsx         Page shell with the header and the game
    globals.css      Theme colors for light and dark mode
    opengraph-image.tsx  Generated social preview image
    apple-icon.tsx   Generated Apple touch icon
    icon.svg         Favicon
    manifest.ts      Web app manifest
    robots.ts        robots.txt
    sitemap.ts       sitemap.xml
  components/
    Game.tsx         Switches between the screens based on the current phase
    Setup.tsx        Mode, count, digits, and time settings
    Memorize.tsx     Item grid and countdown
    Recall.tsx       Answer slots and the confirmation dialog
    Results.tsx      Score, missed items, and the full sequence
    ThemeToggle.tsx  System, light, and dark theme switch
    ui.tsx           Shared buttons, option chips, and grid cells
  lib/
    modes.ts         Mode definitions, number generation, and answer checking
    random.ts        Unbiased cryptographic random integers and sampling
    site.ts          Site URL, name, title, description, and keywords
    store.ts         Zustand store for settings and game state
    words.ts         Word list for Words mode
```

## Adding a mode

Each mode is an entry in `MODES` in `src/lib/modes.ts`. A mode defines a label, a function that generates the items for a round, a function that cleans input while the player types, and a function that checks whether an answer is correct. To add a new mode, add its id to the `ModeId` type and add an entry to `MODES`. It will appear on the setup screen automatically.

## Planned

- A history of past rounds and personal bests.
- A mode that shows one item at a time at a fixed pace.
- A playing card mode.
