/**
 * Section heading styled as an edit-timeline marker: a slate chip, the label
 * on a track that runs to the edge, and a blinking playhead after the title —
 * the same `animate-caret` the hero monitor uses, so the two rhyme.
 *
 * `index` is optional. Pass one and the chip shows a timecode (01 → 00:01:00);
 * leave it out and it shows a cut marker instead.
 */
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
    <header className="mb-8" style={{ ["--accent" as string]: accent }}>
      <div className="flex items-center gap-3">
        {/* slate chip */}
        <span className="flex shrink-0 items-center gap-1.5 rounded-md bg-ink px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-white">
          {index !== undefined ? (
            `00:${String(index).padStart(2, "0")}:00`
          ) : (
            <svg viewBox="0 0 24 24" className="size-3 fill-current" aria-hidden>
              {/* cut marker — two trim handles meeting at an edit point */}
              <path d="M7 4v16l5-8zM17 4v16l-5-8z" />
            </svg>
          )}
        </span>

        <span className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[.18em] text-neutral-500">
          {label}
        </span>

        {/* track running to the right edge, with sprocket ticks */}
        <span aria-hidden className="relative h-3 flex-1 overflow-hidden">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/12" />
          <span className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_11px,var(--color-ink)_11px_12px)] opacity-12" />
        </span>
      </div>

      <h2 className="mt-3.5 flex items-baseline gap-2 text-[clamp(28px,5vw,46px)] font-black leading-none tracking-[-1px] text-ink">
        {title}
        {/* playhead */}
        <span
          aria-hidden
          className="inline-block h-[0.72em] w-[3px] animate-caret rounded-full bg-(--accent)"
        />
      </h2>
    </header>
  );
}