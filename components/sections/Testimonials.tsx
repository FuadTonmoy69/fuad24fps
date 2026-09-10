import { Marquee } from "@/components/ui/marquee";
import { testimonialsRow1, testimonialsRow2, type Testimonial } from "@/lib/data";
import { SectionHeading } from "./Section";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="w-80 shrink-0 rounded-[18px] border-[1.5px] border-white/90 bg-white/65 px-6 py-5.5 transition-colors hover:bg-white/85">
      <blockquote className="mb-4 text-sm font-semibold leading-relaxed text-neutral-700">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full  bg-[#3e69ff] text-xs font-black text-white">
          {t.initials}
        </span>
        <span>
          <span className="block text-[13px] font-extrabold text-ink">{t.name}</span>
          <span className="block text-[11px] font-semibold text-neutral-400">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="pb-20">
      <div className="mx-auto max-w-[1140px] px-8 pb-6">
        <SectionHeading eyebrow="/ kind words" title="What clients say" />
      </div>

      {/*
        The demo fades the edges with two solid-colour gradient overlays
        (from-background). That only works on a flat background — this page
        sits on a gradient, so a mask is used instead: it fades the rows
        themselves to transparent and works over anything behind them.
      */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Marquee pauseOnHover className="[--duration:38s] [--gap:1rem] py-1">
          {testimonialsRow1.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>

        {/* second row runs slower so the two never lock into visual sync */}
        <Marquee reverse pauseOnHover className="[--duration:46s] [--gap:1rem] py-3">
          {testimonialsRow2.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}