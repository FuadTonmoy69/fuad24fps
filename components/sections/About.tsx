"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProfileData {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  videoId: string;
  reelLength: string;
}

interface Social {
  label: string;
  href: string;
  /* brand hex, used for the hover fill */
  brand: string;
  path: string;
}

const profile: ProfileData = {
  name: "Fuad",
  role: "Video Editor & Motion Designer",
  description:
    "Crafting high-retention video for creators and brands. Kinetic typography, tight pacing and sound design that keeps viewers hooked. Remote & worldwide.",
  imageUrl: "/pic1.jpg",
  videoId: "en-KzDJ2z_g",
  reelLength: "1:24",
};

/*
  Inline SVG rather than lucide — lucide removed all brand icons in v1,
  and its old "Twitter" was the bird anyway, not the X mark.
*/
const SOCIALS: Social[] = [
  {
    label: "X",
    href: "https://x.com/Fuad1619",
    brand: "#000000",
    path: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/aai_tonmoy/",
    brand: "#E4405F",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.39C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.39 2.12.66.67 1.33 1.09 2.12 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.39.67-.66 1.09-1.33 1.39-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.39-2.12C21.32 1.35 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/fuad.tonmoy.org",
    brand: "#1877F2",
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fuad-hasan-82198a3a9",
    brand: "#0A66C2",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
  },
];

export default function About() {
  const [reelOpen, setReelOpen] = useState(false);

  return (
    <section id="about" className="mx-auto max-w-[1140px] overflow-x-clip px-5 py-16 sm:px-8 md:py-20">
      <div className="relative rounded-[28px] border-[1.5px] border-white/90 bg-white/70 p-6 shadow-[0_20px_60px_-20px_rgba(31,36,48,.22)] backdrop-blur-lg sm:p-9 md:p-12">
        <div className="flex flex-col items-center gap-9 md:flex-row md:items-center md:gap-14">

          {/* ── photo / showreel ── */}
          <div className="group relative shrink-0">
            {/* accent layers sit *inside* the photo's footprint so they can't
                push past the viewport on a narrow screen */}
            <span
              aria-hidden
              className="absolute inset-0 rotate-6 rounded-[2rem] bg-linear-to-tr from-emerald-500 to-violet-600 opacity-85 transition-transform duration-500 group-hover:rotate-[10deg]"
            />
            <span
              aria-hidden
              className="absolute inset-0 -rotate-3 rounded-[2rem] bg-sky-400/20 backdrop-blur-sm"
            />

            {/* whole photo is the trigger — a 300×375 tap target beats a 56px one */}
            <button
              type="button"
              onClick={() => setReelOpen(true)}
              aria-label={`Play showreel (${profile.reelLength})`}
              className="relative z-20 block aspect-4/5 w-[min(300px,78vw)] cursor-pointer overflow-hidden rounded-[2rem] border-4 border-white bg-slate-200 shadow-lg transition-transform duration-300 active:scale-[.98] md:w-[320px]"
            >
              <Image
                src={profile.imageUrl}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 78vw, 320px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* darkens on hover so the play control stays legible */}
              <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />

              {/* reel badge */}
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/75 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Showreel
              </span>

              <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/95 py-2 pl-2.5 pr-3.5 shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                <Play className="size-4 translate-x-px fill-ink text-ink" strokeWidth={0} />
                <span className="font-mono text-[11px] font-bold text-ink">{profile.reelLength}</span>
              </span>
            </button>
          </div>

          {/* ── copy ── */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <h3 className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[.2em] text-emerald-700">
              <span className="hidden h-px w-8 bg-emerald-400 md:inline-block" />
              Creative profile
            </h3>

            <h2 className="mt-3 text-[clamp(3.25rem,14vw,5rem)] font-black leading-[0.9] tracking-[-0.03em] text-ink">
              {profile.name}.
            </h2>

            <p className="relative mt-4 overflow-hidden rounded-tl-2xl rounded-br-2xl bg-ink px-5 py-2.5 text-base font-bold text-white shadow-md sm:text-lg md:text-xl">
              {profile.role}
            </p>

            {/* rule sits on top when centred, on the left once the text is left-aligned */}
            <p className="mt-6 max-w-xl border-t-2 border-emerald-200 pt-4 text-base font-medium leading-relaxed text-muted md:border-l-4 md:border-t-0 md:pl-6 md:pt-0 md:text-lg">
              {profile.description}
            </p>

            <div className="mt-7 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
              <button
                type="button"
                onClick={() => setReelOpen(true)}
                className="group/cta inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_26px_-8px_rgba(31,36,48,.6)] transition duration-200 hover:scale-105 active:scale-100"
              >
                Watch the reel
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
              </button>

              {/* hairline divider, desktop only */}
              <span aria-hidden className="hidden h-8 w-px bg-ink/10 sm:block" />

              <ul className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      title={s.label}
                      /* --brand drives the hover fill so each icon adopts
                         its own colour without four separate classes */
                      style={{ ["--brand" as string]: s.brand }}
                      className="grid size-10 place-items-center rounded-full border-[1.5px] border-ink/10 bg-white/60 text-ink/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--brand) hover:bg-(--brand) hover:text-white hover:shadow-[0_8px_18px_-6px_var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand) active:translate-y-0"
                    >
                      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                        <path d={s.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Radix: focus trap, Escape, scroll lock and focus restore for free */}
      <Dialog open={reelOpen} onOpenChange={setReelOpen}>
        <DialogContent className="max-w-[min(1100px,94vw)] overflow-hidden rounded-2xl border-0 bg-black p-0 sm:max-w-[min(1100px,94vw)]">
          <DialogTitle className="sr-only">{profile.name} — showreel</DialogTitle>
          <div className="aspect-video w-full">
            {reelOpen && (
              <iframe
                src={`https://www.youtube.com/embed/${profile.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={`${profile.name} — showreel`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="block size-full border-0"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}