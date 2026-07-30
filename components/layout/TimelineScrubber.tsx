"use client";

import { useEffect, useRef } from "react";

const ticks = [
  { label: "HERO", target: "#top" },
  { label: "WORK", target: "#work" },
  { label: "SERVICES", target: "#services" },
  { label: "PROCESS", target: "#process" },
  { label: "PRICING", target: "#pricing" },
  { label: "FAQ", target: "#faqs" },
];

export default function TimelineScrubber() {
  const fillRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const tickRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const fill = fillRef.current;
    const playhead = playheadRef.current;
    if (!fill || !playhead) return;

    function update() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(1, Math.max(0, scrollTop / scrollHeight));
      fill!.style.width = pct * 100 + "%";
      playhead!.style.left = pct * 100 + "%";

      let activeIdx = 0;
      ticks.forEach((tick, i) => {
        const el = document.querySelector(tick.target);
        if (el && el.getBoundingClientRect().top - 120 <= 0) activeIdx = i;
      });
      tickRefs.current.forEach((t, i) => {
        if (t) t.classList.toggle("active", i === activeIdx);
      });
    }

    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      document.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function handleTickClick(target: string) {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className="sticky z-[49] overflow-hidden"
      style={{
        top: "64px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--line)",
        height: "34px",
      }}
    >
      <div
        className="relative h-full mx-auto px-7 flex items-center"
        style={{ maxWidth: "var(--maxw)" }}
      >
        {/* Fill bar */}
        <div ref={fillRef} className="timeline-fill" />

        {/* Ruler ticks */}
        <div className="relative w-full h-full flex items-center justify-between">
          {ticks.map((tick, i) => (
            <button
              key={tick.label}
              ref={(el) => { tickRefs.current[i] = el; }}
              onClick={() => handleTickClick(tick.target)}
              className="tick relative z-[2] bg-transparent border-none cursor-pointer px-0.5 py-1 text-[10px] whitespace-nowrap tracking-[0.5px] transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--text-muted)",
              }}
            >
              <span className="label hidden sm:inline">{tick.label}</span>
            </button>
          ))}

          {/* Playhead */}
          <div
            ref={playheadRef}
            className="absolute top-0 bottom-0 w-0.5 z-[3] transition-[left] duration-[50ms] linear"
            style={{
              background: "var(--accent-2)",
              boxShadow: "0 0 6px var(--accent-2)",
              left: "0%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
