"use client";

import { motion } from "motion/react";

/**
 * Section heading styled as an edit-timeline marker: a slate chip, the label
 * on a track that runs to the edge, and a title below.
 *
 * `index` is optional. Pass one and the chip shows a timecode (2 → 00:02:00);
 * leave it out and it shows a cut marker instead.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const CHIP = {
  hidden: { opacity: 0, scale: 0.7, x: -15 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 340, damping: 20, mass: 0.7 },
  },
};

const FADE = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

/* the track draws itself left to right, like a clip being laid on a timeline */
const TRACK = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};

const TITLE = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function SectionHeading({
  eyebrow,
  title,
  index,
  accent = "#3ecf8e",
}: {
  eyebrow: string;
  title: string;
  index?: number;
  accent?: string;
}) {
  // tolerate the existing "/ selected cuts" call sites
  const label = eyebrow.replace(/^\/\s*/, "");

  return (
    <motion.header
      variants={GROUP}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="mb-8"
      style={{ ["--accent" as string]: accent }}
    >
      <div className="flex items-center gap-3">
        {/* slate chip */}
        <motion.span
          variants={CHIP}
          className="flex shrink-0 items-center gap-1.5 rounded-md bg-ink px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-white"
        >
          {index !== undefined ? (
            `00:${String(index).padStart(2, "0")}:00`
          ) : (
            <svg viewBox="0 0 24 24" className="size-3 fill-current" aria-hidden>
              {/* cut marker — two trim handles meeting at an edit point */}
              <path d="M7 4v16l5-8zM17 4v16l-5-8z" />
            </svg>
          )}
        </motion.span>

        <motion.span
          variants={FADE}
          className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[.18em] text-neutral-500"
        >
          {label}
        </motion.span>

        {/* track running to the right edge, with sprocket ticks */}
        <motion.span
          variants={TRACK}
          aria-hidden
          className="relative h-3 flex-1 origin-left overflow-hidden"
        >
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/12" />
          <span className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_11px,var(--color-ink)_11px_12px)] opacity-12" />
        </motion.span>
      </div>

      <motion.h2
        variants={TITLE}
        className="mt-3.5 flex items-baseline gap-2 text-[clamp(28px,5vw,46px)] font-black leading-none tracking-[-1px] text-ink"
      >
        {title}
      </motion.h2>
    </motion.header>
  );
}