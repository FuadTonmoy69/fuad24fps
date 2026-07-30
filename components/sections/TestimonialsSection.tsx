"use client";

import { useEffect, useRef } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { testimonialsRow1, testimonialsRow2, type Testimonial } from "@/lib/data";

function TestiCard({ quote, name, role, initials }: Testimonial) {
  return (
    <div
      className="flex-shrink-0 rounded-[var(--radius)] p-6.5"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        width: "340px",
        padding: "26px",
      }}
    >
      <p
        className="text-[15px] leading-[1.55] m-0"
        style={{
          color: "var(--text)",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 300,
        }}
      >
        &quot;{quote}&quot;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full text-sm font-bold"
          style={{
            width: "42px",
            height: "42px",
            background:
              "linear-gradient(135deg, var(--accent-2), var(--accent-3))",
            color: "#0B0E12",
          }}
        >
          {initials}
        </div>
        <div className="flex flex-col">
          <span
            className="text-[13.5px] font-bold"
            style={{ color: "var(--text)" }}
          >
            {name}
          </span>
          <span
            className="text-[12.5px] mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

function Marquee({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const originalHTML = track.innerHTML;
    const originalCount = track.children.length;

    function setup() {
      if (!track) return;
      track.innerHTML = originalHTML + originalHTML;
      const marquee = track.parentElement;
      if (!marquee) return;

      let guard = 0;
      while (
        track.scrollWidth < marquee.offsetWidth * 2 + 600 &&
        guard < 12
      ) {
        track.innerHTML += originalHTML;
        guard++;
      }

      const secondCard = track.children[originalCount] as HTMLElement | undefined;
      const firstCard = track.children[0] as HTMLElement | undefined;
      const distance =
        secondCard && firstCard
          ? secondCard.offsetLeft - firstCard.offsetLeft
          : track.scrollWidth / 2;

      track.style.setProperty("--scroll-distance", distance + "px");
    }

    setup();

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(setup, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="testi-marquee overflow-hidden relative w-full"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className={`testi-track${reverse ? " testi-track-reverse" : ""}`}
        style={{ gap: "20px" }}
      >
        {items.map((t) => (
          <TestiCard key={t.name} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="relative z-[1] border-t"
      id="testimonials"
      style={{ padding: "100px 0", borderColor: "var(--line)" }}
    >
      <div className="mx-auto px-7 mb-14" style={{ maxWidth: "var(--maxw)" }}>
        <div className="section-head max-w-[640px]">
          <Eyebrow>From clients</Eyebrow>
          <h2>Placeholder quotes — swap in your own.</h2>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Marquee items={testimonialsRow1} />
        <Marquee items={testimonialsRow2} reverse />
      </div>
    </section>
  );
}
