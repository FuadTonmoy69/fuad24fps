"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#faqs", label: "FAQs" },
];

// Using a generic contact link for demo purposes based on the reference
const BOOK_HREF = "#contact";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Trigger scroll state a bit earlier for smoother transition
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* 
        Adjusted top spacing based on scroll. 
        Initial state is further down (pt-6), scrolled state is tighter (pt-3) 
      */}
      <div className={cn(
        "fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]",
        scrolled ? "pt-3" : "pt-6"
      )}>
        <header
          className={cn(
            "pointer-events-auto w-full transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]",
            // Base styles: solid dark bg, fully rounded, strong soft shadow, no border
            "bg-[#17181d] max-w-[570px] py-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
            // Sizing based on scroll
            scrolled
              ? "max-w-[700px] px-4"
              : "max-w-[800px] px-2"
          )}
        >
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link
              href="#top"
              className="flex items-center gap-2 font-bold tracking-tight no-underline transition-all duration-300 text-white"
              style={{
                fontSize: scrolled ? "15px" : "16px",
              }}
            >
              {/* Simplified dot - removed neon glow */}
              <span
                className="inline-block rounded-full flex-shrink-0 transition-all duration-300 bg-white"
                style={{
                  width: scrolled ? "6px" : "7px",
                  height: scrolled ? "6px" : "7px",
                }}
              />
              FUAD24FPS
            </Link>

            {/* Desktop Nav - Updated colors to match reference (muted gray to white) */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium no-underline transition-colors duration-200 text-[#cbd5e1] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-4">
              {/* 
                CTA Button - Redesigned to match reference ("Let's talk" style).
                Solid white bg, dark text, simple scale hover.
              */}
                 <a
                href={BOOK_HREF}
                className={cn(
                  "hidden md:inline-flex items-center justify-center rounded-full font-bold leading-none",
                  "transition-all duration-200 hover:scale-105 active:scale-[0.97]",
                  "bg-white text-[#17181d] hover:shadow-[0_4px_14px_rgba(255,255,255,0.25)]",
                  scrolled ? "text-[12px] px-5 py-2.5" : "text-[13px] px-6 py-3"
                )}
              >
                Book a call
              </a>

              {/* Mobile hamburger - simplified, removed border */}
              <button
                className="md:hidden flex items-center justify-center text-[#cbd5e1] hover:text-white transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile menu — Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel — Matches dark theme */}
        <div
          className={cn(
            "absolute top-0 inset-x-0 transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] bg-[#17181d] pb-6 rounded-b-3xl shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <Link
              href="#top"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 font-bold text-[16px] text-white tracking-tight no-underline"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white"/>
              FUAD24FPS
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#cbd5e1] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-6 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[15px] font-medium no-underline text-[#cbd5e1] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Book a call — mobile */}
          <div className="px-6 pt-4">
            <a
              href={BOOK_HREF}
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full font-bold text-[14px] bg-white text-[#17181d] transition-transform duration-200 active:scale-[0.97]"
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}