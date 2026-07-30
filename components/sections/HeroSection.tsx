"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/globalButton";
import { Play, ArrowUpRight, MoveRight } from "lucide-react";

export default function HeroSection() {
  const [videoActive, setVideoActive] = useState(false);
  const [scale, setScale] = useState(0.82);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    function onScroll() {
      if (!videoRef.current || isMobile) return;
      const rect = videoRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH + rect.height * 0.5)));
      setScale(0.82 + progress * 0.18);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <section className="relative overflow-hidden bg-black pt-28 md:pt-40 pb-16 md:pb-32">

      {/* Ambient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="hero-blob-1 absolute rounded-full opacity-55 w-[48%] aspect-square left-[2%] top-0"
          style={{
            background: "radial-gradient(circle at center, rgba(255,45,60,0.6), transparent 70%)",
            filter: "blur(70px) saturate(150%)",
            mixBlendMode: "screen",
          }}
        />
        <div className="hero-blob-2 absolute rounded-full opacity-55 w-[46%] aspect-square right-0 top-[12%]"
          style={{
            background: "radial-gradient(circle at center, rgba(45,110,255,0.6), transparent 70%)",
            filter: "blur(70px) saturate(150%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] mx-auto px-5 md:px-7 flex flex-col items-center text-center" style={{ maxWidth: "var(--maxw)" }}>

        {/* Badge */}
        <div className="inline-flex items-center text-[11px] md:text-[12px] tracking-[1.5px] uppercase font-mono text-accent gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md">
          Freelance video editor
        </div>

        {/* Headline */}
        <h1 className="mt-5 md:mt-6 font-medium leading-[1.05] text-[clamp(42px,9vw,96px)]">
          Footage in.
          <br />
          Watch time{" "}
          <span className="text-accent italic" style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700 }}>
            out.
          </span>
        </h1>

        {/* Sub */}
        <p className="mt-4 md:mt-5 text-[15px] md:text-[17px] leading-relaxed text-[var(--text-muted)] max-w-[420px] md:max-w-[500px]">
          Raw footage in. Retention-first edits out. Kinetic text,
          sound design, clean cuts delivered fast.
        </p>

        {/* CTAs */}
        <div className="mt-7 md:mt-9 flex gap-3 md:gap-4 flex-wrap justify-center">

          <Button
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Fuadhasan24fps@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="group relative rounded-full px-5 md:px-6 py-2.5 md:py-3 text-[12px] md:text-[13px] font-bold uppercase tracking-[1px] overflow-hidden
                       shadow-[0_0_0_rgba(255,106,61,0)] hover:shadow-[0_0_28px_rgba(255,106,61,0.55)] transition-all duration-300"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500
                             bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
            <span className="relative flex items-center gap-1.5">
              Book a call
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Button>

          <Button
            href="#work"
            variant="ghost"
            className="group relative rounded-full px-5 md:px-6 py-2.5 md:py-3 text-[12px] md:text-[13px] font-bold uppercase tracking-[1px]
                       border border-white/20 hover:border-accent hover:text-accent
                       hover:shadow-[0_0_20px_rgba(255,106,61,0.15)] transition-all duration-300"
          >
            <span className="flex items-center gap-1.5">
              See the work
              <MoveRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Button>

        </div>

        {/* Video */}
        <div
          ref={videoRef}
          className="w-full max-w-5xl mt-12 md:mt-16 will-change-transform"
          style={{
            transform: isMobile ? undefined : `scale(${scale})`,
            transformOrigin: "center top",
            transition: isMobile ? undefined : "transform 0.08s linear",
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-x-[10%] -bottom-8 h-20 blur-2xl opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(94,234,212,0.4), rgba(185,140,255,0.2) 60%, transparent)" }}
          />

          <div
            className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.12]"
            style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)" }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 inset-x-0 h-px z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, var(--accent-2) 30%, var(--accent-3) 70%, transparent)" }}
            />

            {videoActive ? (
              <iframe
                src="https://www.youtube.com/embed/en-KzDJ2z_g?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="Intro video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="block w-full aspect-video border-0 bg-black"
              />
            ) : (
              <button
                type="button"
                aria-label="Play intro video"
                onClick={() => setVideoActive(true)}
                className="relative block w-full aspect-video border-0 cursor-pointer bg-black p-0 m-0 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://img.youtube.com/vi/en-KzDJ2z_g/maxresdefault.jpg"
                  alt="Intro video preview"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />

                <span className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-200" aria-hidden="true" />

                {/* Play circle */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none
                             flex items-center justify-center rounded-full
                             w-14 h-14 md:w-[72px] md:h-[72px]
                             bg-black/50 border border-white/75
                             transition-all duration-200
                             group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)]"
                >
                  <Play size={22} strokeWidth={0} className="fill-white translate-x-px md:hidden" />
                  <Play size={26} strokeWidth={0} className="fill-white translate-x-px hidden md:block" />
                </span>

                {/* Tag */}
                <a
                  href="#contact"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.5px] no-underline transition-all duration-200 hover:scale-105"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    color: "var(--text)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Get yours next
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 11, height: 11 }}>
                    <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}