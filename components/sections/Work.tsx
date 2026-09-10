"use client";

import { useRef, useState } from "react";
import { workCards, type WorkCat } from "@/lib/data";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import FolderIcon, { type FolderPalette } from "./helpers/FolderIcon";
import { SectionHeading } from "./Section";
import { Play } from "lucide-react";
import { motion } from "motion/react";

function VideoModal({
  open,
  onClose,
  videoId,
  title,
}: {
  open: boolean;
  onClose: () => void;
  videoId: string | null;
  title: string;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="overflow-hidden rounded-xl p-0 shadow-2xl"
        style={{
          background: "#000",
          maxWidth: "min(1250px, 92vw)",
          width: "100%",
          boxShadow:
            "-20px 0 60px -10px rgba(94,234,212,0.2), 20px 0 60px -10px rgba(255,106,61,0.2), 0 30px 80px rgba(0,0,0,0.7)",
        }}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="aspect-video w-full">
          {open && videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="block size-full border-0"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

type Filter = WorkCat | "all";

const FOLDERS: {
  cat: Filter;
  label: string;
  accent: string;
  palette: FolderPalette;
}[] = [
  {
    cat: "all",
    label: "All",
    accent: "bg-[#5cc6f5]",
    palette: { dark: "#1673b4", light: "#5cc6f5", sheen: "#8ddcfb" },
  },
  {
    cat: "talking",
    label: "Talking",
    accent: "bg-[#c17cf7]",
    palette: { dark: "#6417ad", light: "#c17cf7", sheen: "#d9a6fb" },
  },
  {
    cat: "reels",
    label: "Reels",
    accent: "bg-[#f26fa6]",
    palette: { dark: "#ad0038", light: "#f26fa6", sheen: "#f9a4c8" },
  },
  {
    cat: "motion",
    label: "Motion",
    accent: "bg-[#39d489]",
    palette: { dark: "#08733c", light: "#39d489", sheen: "#79ebbd" },
  },
];

/* how many cards show before "See all" — 2 full rows on desktop */
const INITIAL_COUNT = 6;

/* Motion computes the offsets, so there's no literal delay array to keep in
   sync — and no Tailwind scanner problem, since nothing is a class name. */
const GRID = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const CARD = {
  hidden: { opacity: 0, y: 26, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 420, damping: 22, mass: 0.7 },
  },
};

const TAG_STYLES: Record<WorkCat, string> = {
  talking: "bg-emerald-400/20 text-emerald-800",
  motion: "bg-violet-500/15 text-violet-800",
  reels: "bg-pink-500/15 text-pink-800",
};


export default function Work() {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [modalVideo, setModalVideo] = useState<{ videoId: string; title: string } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = filter === "all" ? workCards : workCards.filter((c) => c.cat === filter);
  const shown = expanded ? visible : visible.slice(0, INITIAL_COUNT);
  const hiddenCount = visible.length - shown.length;

  /* switching folders always drops back to the short list, otherwise you
     land mid-way down an expanded grid of different videos */
  const pickFilter = (cat: Filter) => {
    setFilter(cat);
    setExpanded(false);
  };

  const collapse = () => {
    setExpanded(false);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="work" className="mx-auto max-w-[1140px] px-5 py-20 sm:px-8">
      <SectionHeading eyebrow="/ selected cuts" title="Recent work" />

      {/* folder tabs */}
      <div className="mb-7 flex flex-row items-start justify-between gap-1.5 sm:justify-start sm:gap-3 lg:gap-4">
        {FOLDERS.map((f) => {
          const active = filter === f.cat;
          return (
            <button
              key={f.cat}
              onClick={() => pickFilter(f.cat)}
              aria-pressed={active}
              className={`group flex w-[68px] shrink-0 flex-col items-center pt-1.5 transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1.5 sm:w-[86px] lg:w-[100px] ${
                active ? "-translate-y-[7px]" : ""
              }`}
            >
              <span
                className={`block w-full leading-none transition-[filter] duration-300 ${
                  active
                    ? "drop-shadow-[0_12px_22px_rgba(0,0,0,.28)]"
                    : "drop-shadow-[0_5px_10px_rgba(0,0,0,.16)] group-hover:drop-shadow-[0_9px_18px_rgba(0,0,0,.24)]"
                }`}
              >
                <FolderIcon {...f.palette} />
              </span>
              <span
                className={`mt-1.5 text-[10px] font-extrabold tracking-[-.2px] text-ink transition-opacity group-hover:opacity-100 sm:text-xs ${
                  active ? "opacity-100" : "opacity-55"
                }`}
              >
                {f.label}
              </span>
              <span
                className={`mt-1.5 block h-[3px] rounded-full transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] ${f.accent} ${
                  active ? "w-4 sm:w-6" : "w-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* grid */}
      <div
        ref={gridRef}
        className="scroll-mt-24 rounded-[20px] border-[1.5px] border-white/90 bg-white/70 px-4 py-6 shadow-[0_8px_40px_rgba(0,0,0,.09)] backdrop-blur-lg sm:px-6 sm:py-7"
      >
        {/* key={filter} remounts on every tab switch, which replays the stagger */}
        <motion.div
          key={filter}
          variants={GRID}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {shown.map((c) => (
            /* container, not a button — only the play control is clickable,
               and a <button> can't legally nest inside another <button> */
            <motion.article
              key={c.videoId}
              variants={CARD}
              /* the lift moves here too — motion writes an inline transform,
                 which would override a Tailwind hover:-translate-y-1 */
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group overflow-hidden rounded-[18px] border-[1.5px] border-gray-300 bg-white/60 text-left backdrop-blur-md transition-shadow duration-200 hover:shadow-[0_16px_40px_rgba(0,0,0,.13)]"
            >
              <div
                className={`relative w-full overflow-hidden bg-ink ${
                  c.cat === "reels" ? "pb-[75%]" : "pb-[56.25%]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${c.videoId}/hqdefault.jpg`}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 size-full scale-[1.01] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* pointer-events-none so the tint can't swallow the click */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/35" />

                {/* the only clickable thing on the card */}
                <button
                  type="button"
                  onClick={() => setModalVideo({ videoId: c.videoId, title: c.title })}
                  aria-label={`Play ${c.title}`}
                  className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 transition-all duration-200 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group-hover:scale-110"
                >
                  <Play size={18} strokeWidth={0} className="translate-x-px fill-white" />
                </button>
              </div>

              <div className="px-4 pb-4 pt-3.5">
                <span
                  className={`mb-2 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] font-extrabold ${TAG_STYLES[c.cat]}`}
                >
                  {c.label}
                </span>
                <h3 className="mb-1.5 text-sm font-extrabold leading-snug text-ink">{c.title}</h3>
                <p className="text-xs font-semibold leading-relaxed text-neutral-500">{c.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {hiddenCount > 0 && (
          <div className="mt-7 flex justify-center">
            <button
              onClick={() => setExpanded(true)}
              className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-extrabold text-white shadow-[0_8px_24px_-6px_rgba(31,36,48,.5)] transition hover:scale-105"
            >
              See all {visible.length} videos
              <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[11px]">
                +{hiddenCount}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}

        {expanded && visible.length > INITIAL_COUNT && (
          <div className="mt-7 flex justify-center">
            <button
              onClick={collapse}
              className="group flex items-center gap-2 rounded-full border-2 border-ink/15 px-6 py-3 text-sm font-extrabold text-ink transition hover:border-ink/40"
            >
              Show less
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
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