"use client";

import { useState } from "react";
import { ArrowUpRight, Clapperboard, Mail } from "lucide-react";
import ContactDialog from "../modals/ContactDialog";
import { SITE } from "@/lib/data";

/* decorative timeline: V2 / V1 / A1 tracks with the playhead parked at the end */
const TRACKS = [
  { label: "V2", clips: [{ w: "18%", tone: "bg-violet-400/70" }, { w: "26%", tone: "bg-violet-400/40" }, { w: "14%", tone: "bg-violet-400/60" }] },
  { label: "V1", clips: [{ w: "34%", tone: "bg-sky-400/70" }, { w: "22%", tone: "bg-sky-400/45" }, { w: "30%", tone: "bg-sky-400/65" }] },
  { label: "A1", clips: [{ w: "48%", tone: "bg-emerald-400/55" }, { w: "38%", tone: "bg-emerald-400/40" }] },
];

export default function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="mx-auto max-w-[1140px] px-6 pb-20 sm:px-8">
      <div className="relative mx-auto  overflow-hidden rounded-[28px] bg-ink text-white">
        {/* clapperboard slate along the top edge */}
        <div
          aria-hidden
          className="h-4 w-full bg-[repeating-linear-gradient(115deg,#fff_0_26px,#1f2430_26px_52px)] opacity-90"
        />

        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(62,207,142,.2)_0%,transparent_60%)]" />

        <div className="relative px-6 pb-8 pt-10 sm:px-12 sm:pt-12">
          {/* availability — the thing a freelancer's CTA should actually say */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-2.5 pr-3.5 text-[11px] font-bold uppercase tracking-widest text-white/70">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Taking on work
          </span>

          <h2 className="mt-5 text-[clamp(30px,5.5vw,52px)] font-black leading-[1.02] tracking-[-1.5px]">
            Send the footage.
            <br />
            <span className="text-white/40">I&rsquo;ll send back the cut.</span>
          </h2>

          <p className="mt-4 max-w-[440px] text-[15px] font-semibold leading-relaxed text-white/55">
            Raw files, a rough idea, or a whole back catalogue — tell me what you&rsquo;re making
            and I&rsquo;ll reply the same day.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-ink transition duration-200 hover:scale-105 hover:shadow-[0_8px_28px_rgba(255,255,255,.28)] active:scale-100"
            >
              <Clapperboard className="size-4" />
              Start a project
            </button>

            <a
              href={`mailto:${SITE.email}`}
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 py-3.5 text-sm font-extrabold text-white/85 transition-colors duration-200 hover:border-white/60 hover:text-white"
            >
              <Mail className="size-4" />
              Email instead
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* ── timeline ── */}
        <div aria-hidden className="relative mt-2 border-t border-white/10 px-6 pb-7 pt-5 sm:px-12">
          {/* ruler */}
          <div className="mb-3 flex items-end justify-between font-mono text-[9px] tracking-widest text-white/25">
            {["00:00", "00:15", "00:30", "00:45", "01:00"].map((t) => (
              <span key={t} className="flex flex-col items-center gap-1">
                <span className="h-2 w-px bg-white/15" />
                {t}
              </span>
            ))}
          </div>

          <div className="space-y-1.5">
            {TRACKS.map((track) => (
              <div key={track.label} className="flex items-center gap-2.5">
                <span className="w-5 shrink-0 font-mono text-[9px] font-bold text-white/25">
                  {track.label}
                </span>
                <div className="flex h-4 flex-1 gap-1 overflow-hidden">
                  {track.clips.map((clip, i) => (
                    <span
                      key={i}
                      style={{ width: clip.w }}
                      className={`h-full shrink-0 rounded-[3px] ${clip.tone}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* playhead sitting at the end of the last clip */}
          <div className="pointer-events-none absolute inset-y-5 right-[14%] w-px bg-emerald-400/80">
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-[1px] bg-emerald-400" />
          </div>
        </div>
      </div>

      <ContactDialog open={open} onOpenChange={setOpen} initialBrief="" />
    </section>
  );
}