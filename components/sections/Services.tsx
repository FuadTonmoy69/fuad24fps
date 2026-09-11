"use client";

import { motion, MotionConfig } from "motion/react";
import { SectionHeading } from "./Section";

const SERVICES = [
  {
    code: "00:01 / long form",
    color: "#5cc6f5",
    title: "YouTube editing",
    body: "Talking head, reaction and vlog cuts paced so the drop-off curve stays flat past the first minute.",
    tags: ["jump cuts", "kinetic text", "chapters"],
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M10 9l5 3-5 3z" fill="#fff" stroke="none" />
      </>
    ),
  },
  {
    code: "00:02 / motion",
    color: "#c17cf7",
    title: "Motion & SaaS",
    body: "Product videos and animated explainers built from your screen recordings, graded to match your brand.",
    tags: ["after effects", "callouts", "logo reveal"],
    icon: <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />,
  },
  {
    code: "00:03 / vertical",
    color: "#f26fa6",
    title: "Reels & Shorts",
    body: "Hook-first vertical cuts where the first three seconds do the work. Script-to-screen UGC, no shoot needed.",
    tags: ["hooks", "captions", "UGC"],
    icon: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M11 8l4 3-4 3z" fill="#fff" stroke="none" />
      </>
    ),
  },
  {
    code: "00:04 / audio",
    color: "#39d489",
    title: "Podcast editing",
    body: "Full episodes cleaned up — dead air trimmed, levels matched, plus a clip pack pulled for social.",
    tags: ["audio cleanup", "b-roll", "clip pack"],
    icon: (
      <>
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0014 0M12 18v4" />
      </>
    ),
  },
];

/* Same curve as the rest of the page, so everything decelerates alike. */
const EASE = [0.22, 1, 0.36, 1] as const;

/* The delay is set per card from its index rather than by staggerChildren on
   a parent. Propagation only fires if the child has no initial/animate of its
   own, which is easy to break by accident — this way each frame owns its own
   timing and can't silently stop cascading. */
const FRAME = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.25 },
  }),
};

/* the icon tile is the one solid object in each frame, so it gets the spring */
const TILE = {
  hidden: { opacity: 0, scale: 0.6, rotate: -12 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 18,
      mass: 0.7,
      delay: i * 0.12 + 0.14,
    },
  }),
};

export default function Services() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="services" className="mx-auto max-w-[1140px] px-8 pb-20">
        <SectionHeading eyebrow="/ what I do" title="Services" />

        <div
          className="grid overflow-hidden rounded-[22px] border-[1.5px] border-white/90 bg-white/55 shadow-[0_12px_48px_rgba(0,0,0,.1)] backdrop-blur-lg sm:grid-cols-2 xl:grid-cols-4"
        >
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              variants={FRAME}
              custom={i}
              initial="hidden"
              whileInView="show"
              /* amount low: the strip is one short row on desktop, so waiting
                 for a fifth of a frame's height can miss entirely */
              viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
              style={{ ["--svc" as string]: s.color }}
              className="sprockets group relative overflow-hidden border-b-[1.5px] border-black/6 px-6.5 pb-7.5 pt-8.5 transition-colors last:border-b-0 hover:bg-white/60 sm:[&:nth-child(-n+2)]:border-b-[1.5px] xl:border-b-0 xl:border-r-[1.5px] xl:last:border-r-0"
            >
              <span className="mb-3.5 block font-mono text-[10px] font-bold tracking-[.5px] text-(--svc)">
                {s.code}
              </span>

              {/* the wrapper animates; the tile inside keeps its own hover
                  transform, which motion's inline transform would override */}
              <motion.span variants={TILE} custom={i} className="mb-4 block w-fit">
                <span className="grid size-11.5 place-items-center rounded-[14px] bg-(--svc) shadow-[0_6px_18px_color-mix(in_srgb,var(--svc)_40%,transparent)] transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-8 group-hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5.5"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </span>
              </motion.span>

              <h3 className="mb-2 text-base font-black tracking-[-.3px] text-ink">{s.title}</h3>
              <p className="mb-4 text-[12.5px] font-semibold leading-[1.65] text-neutral-500">
                {s.body}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[color-mix(in_srgb,var(--svc)_14%,transparent)] px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-[color-mix(in_srgb,var(--svc)_78%,#000)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}