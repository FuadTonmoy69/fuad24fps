"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight ,MoveRight} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faqs", label: "FAQs" },
];

const BOOK_HREF = "https://mail.google.com/mail/?view=cm&fs=1&to=Fuadhasan24fps@gmail.com";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-3 px-4 pointer-events-none">
        <header
          className={cn(
            "pointer-events-auto w-full transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]",
            "border border-white/10 rounded-full",
            scrolled
              ? "max-w-[700px] bg-[rgba(10,11,13,0.85)] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "max-w-4xl bg-[rgba(10,11,13,0.5)] backdrop-blur-md"
          )}
        >
          <div className="flex items-center justify-between px-5 py-2">

            {/* Logo */}
            <Link
              href="#top"
              className="flex items-center gap-2 font-extrabold tracking-tight no-underline transition-all duration-300"
              style={{
                fontSize: scrolled ? "17px" : "20px",
                color: "var(--text)",
                textShadow: "0 0 14px rgba(255,255,255,0.3), 0 0 28px rgba(94,234,212,0.2)",
              }}
            >
              <span
                className="logo-dot inline-block rounded-full flex-shrink-0 transition-all duration-300"
                style={{
                  width: scrolled ? "6px" : "7px",
                  height: scrolled ? "6px" : "7px",
                  background: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent)",
                }}
              />
              FUAD24FPS
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium no-underline transition-colors duration-150 text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-2">
              {/* Book a call — desktop */}
                 <a
                href={BOOK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group hidden md:inline-flex items-center gap-1.5 rounded-full font-semibold relative overflow-hidden",
                  "transition-all duration-300 hover:-translate-y-px active:scale-[0.97]",
                  "hover:shadow-[0_0_20px_rgba(255,106,61,0.5)]",
                  scrolled ? "text-[12px] px-4 py-1.5" : "text-[13px] px-5 py-2"
                )}
                style={{ background: "var(--accent)", color: "#140D0A" }}
              >
                {/* shine sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />
                <span className="relative font-bold tracking-wide">Book a call</span>
                <ArrowUpRight
                  size={13}
                  className="relative transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-[var(--text)] cursor-pointer transition-all duration-200 hover:bg-white/10"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={15} strokeWidth={2.5} /> : <Menu size={15} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile menu — full-screen overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel — slides down from top */}
        <div
          className={cn(
            "absolute top-0 inset-x-0 transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)]",
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          )}
          style={{
            background: "rgba(10,11,13,0.97)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.06]">
            <Link
              href="#top"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 font-extrabold text-[18px] tracking-tight no-underline"
              style={{ color: "var(--text)" }}
            >
              <span
                className="logo-dot inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
              />
              FUAD24FPS
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-[var(--text)] cursor-pointer"
            >
              <X size={15} strokeWidth={2.5} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between py-3.5 text-[15px] font-medium no-underline border-b transition-colors duration-150",
                  "text-[var(--text-muted)] hover:text-[var(--text)]",
                  i === navLinks.length - 1 ? "border-transparent" : "border-white/[0.06]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Book a call — mobile */}
          <div className="px-6 pb-8 pt-2">
            <a
              href={BOOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-[14px] tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,106,61,0.5)] active:scale-[0.97]"
              style={{ background: "var(--accent)", color: "#140D0A" }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />
              <span className="relative">Book a call</span>
              <ArrowUpRight size={15} className="relative transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}