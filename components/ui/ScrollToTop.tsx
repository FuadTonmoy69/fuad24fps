"use client";

import { useEffect, useState } from "react";
import { SkipBack } from "lucide-react";

const RADIUS = 19;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Seconds→timecode, so the label reads like a scrubber position. */
function timecode(progress: number) {
  const total = 90; // an imaginary 1:30 runtime for the page
  const seconds = Math.round(progress * total);
  return `00:${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      frame = 0;
    };

    /* rAF-throttled: the raw scroll event fires far more often than the
       screen repaints, and the original set state on every one of them */
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const visible = progress > 0.12;

  const rewind = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  return (
    <div
      className={`group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* timecode readout — slides out on hover, like a scrubber tooltip */}
      <span
        aria-hidden
        className="pointer-events-none translate-x-2 rounded-full bg-ink/90 px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-white/70 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      >
        {timecode(progress)}
      </span>

      <button
        onClick={rewind}
        aria-label="Rewind to top"
        className="relative grid size-11 cursor-pointer place-items-center rounded-full bg-ink text-white shadow-[0_10px_28px_-8px_rgba(31,36,48,.7)] transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
      >
        {/* scroll progress ring — doubles as "how far through the page am I" */}
        <svg viewBox="0 0 44 44" className="absolute inset-0 size-full -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/12"
          />
          <circle
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            stroke="#3ecf8e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            className="drop-shadow-[0_0_4px_rgba(62,207,142,.6)] transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* skip-back, not an up arrow — this is a rewind to 00:00 */}
        <SkipBack
          size={15}
          strokeWidth={2.5}
          className="relative -translate-x-px transition-transform duration-200 group-hover:-translate-x-1"
        />
      </button>
    </div>
  );
}