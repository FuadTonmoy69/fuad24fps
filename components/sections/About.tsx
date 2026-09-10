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

const profile: ProfileData = {
  name: "Fuad",
  role: "Video Editor & Motion Designer",
  description:
    "Crafting high-retention video for creators and brands. Kinetic typography, tight pacing and sound design that keeps viewers hooked. Remote & worldwide.",
  imageUrl: "/profile.jpeg",
  videoId: "en-KzDJ2z_g",
  reelLength: "1:24",
};

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

            <button
              type="button"
              onClick={() => setReelOpen(true)}
              className="group/cta mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_26px_-8px_rgba(31,36,48,.6)] transition duration-200 hover:scale-105 active:scale-100"
            >
              Watch the reel
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
            </button>
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