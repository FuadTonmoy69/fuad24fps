"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { workCards, type WorkCat } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const filters: { label: string; value: WorkCat }[] = [
  { label: "All", value: "all" },
  { label: "Reels", value: "reels" },
  { label: "Motion/SaaS", value: "motion" },
  { label: "Talking Head", value: "talking" },
];

const catColors: Record<string, string> = {
  "Talking Head": "bg-[var(--saccent-3)] text-[#140D0A]",
  "Podcast/Reel": "bg-[var(--accent)] text-[#140D0A]",
  "Reel/Motion": "bg-[var(--accent-2)] text-[var(--bg)]",
  "Motion/SaaS": "bg-[var(--accent-2)] text-[var(--bg)]",
  "Ad Creative": "bg-[var(--accent-2)] text-[var(--bg)]",
};

const MAX_ALL = 6;

function VideoCard({ videoId, title, desc, label, ariaLabel, onPlay }: {
  videoId: string; title: string; desc: string;
  label: string; ariaLabel: string; onPlay: () => void;
}) {
  return (
    <div className="work-card rounded-xl overflow-hidden border border-zinc-900 ">

      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-black aspect-video group cursor-pointer" onClick={onPlay}>

        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={`${title} preview`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-200" />

        {/* Play circle */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none
                     flex items-center justify-center rounded-full transition-all duration-200
                     w-12 h-12 border border-white/75 bg-black/50
                     group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)]"
        >
          <Play size={18} strokeWidth={0} className="fill-white translate-x-px" />
        </span>
      </div>

      {/* Body */}
      <div className="px-[18px] pt-4 pb-5">
        <span
          className={cn("inline-block text-[11px] uppercase tracking-[0.5px] font-bold px-2 py-0.5 rounded-[3px] mb-1.5",
            catColors[label] ?? "bg-white/10 text-white")}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {label}
        </span>
        <h3 className="text-[19px] mt-1.5 font-bold text-[var(--text)]">{title}</h3>
        <p className="text-[13.5px] mt-1.5 m-0">{desc}</p>
      </div>
    </div>
  );
}

function VideoModal({ open, onClose, videoId, title }: {
  open: boolean; onClose: () => void; videoId: string | null; title: string;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="p-0 overflow-hidden  shadow-2xl rounded-xl"
        style={{
          background: "#000",
          maxWidth: "min(1250px, 92vw)",
          width: "100%",
          boxShadow: "-20px 0 60px -10px rgba(94,234,212,0.2), 20px 0 60px -10px rgba(255,106,61,0.2), 0 30px 80px rgba(0,0,0,0.7)",
        }}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="aspect-video w-full">
          {open && videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full block border-0"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<WorkCat>("all");
  const [showAll, setShowAll] = useState(false);
  const [modalVideo, setModalVideo] = useState<{ videoId: string; title: string } | null>(null);

  const filtered = activeFilter === "all" ? workCards : workCards.filter((c) => c.cat === activeFilter);
  const visible = activeFilter === "all" && !showAll ? filtered.slice(0, MAX_ALL) : filtered;

  return (
    <section className="relative  border-t border-zinc-900 py-4 md:py-16" id="work" >
      <div className="mx-auto px-7" style={{ maxWidth: "var(--maxw)" }}>

        <div className="section-head max-w-[640px] mb-14">
          <Eyebrow>Recent cuts</Eyebrow>
          <h2 className="mb-4">A few projects from the bin.</h2>
          <p>Placeholder previews — swap these for embedded videos or real clips whenever you're ready.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2.5 mb-7 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => { setActiveFilter(f.value); setShowAll(false); }}
              className={cn(
                "text-[12px] tracking-[0.5px] px-[18px] py-2.5 rounded-full cursor-pointer border transition-all duration-200",
                activeFilter === f.value
                  ? "bg-[var(--accent-2)] border-[var(--accent-2)] text-[#140D0A]"
                  : "bg-transparent border-white/20 text-[var(--text-muted)] hover:border-white/45 hover:text-[var(--text)] hover:bg-white/5"
              )}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((card) => (
            <VideoCard
              key={card.videoId}
              {...card}
              onPlay={() => setModalVideo({ videoId: card.videoId, title: card.title })}
            />
          ))}
        </div>

        {/* See all / fewer */}
        {activeFilter === "all" && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="bg-transparent border-none py-1.5 px-0.5 cursor-pointer text-sm text-[var(--text)] underline underline-offset-4 hover:text-[var(--accent-2)] transition-colors duration-150"
            >
              {showAll ? "Show fewer videos" : "See all videos"}
            </button>
          </div>
        )}
      </div>

      <VideoModal
        open={!!modalVideo}
        onClose={() => setModalVideo(null)}
        videoId={modalVideo?.videoId ?? null}
        title={modalVideo?.title ?? ""}
      />
    </section>
  );
}