"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);

    // move focus into the drawer so keyboard users aren't left behind it
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      triggerRef.current?.focus(); // and hand it back on close
    };
  }, [mobileOpen]);

  return (
    <>
      
      <nav
        className={`fixed left-1/2 top-3.5 z-40 flex w-[calc(100vw-32px)] -translate-x-1/2 animate-drop items-center justify-between gap-3 whitespace-nowrap rounded-full bg-[#17181d] py-2.5 pl-5 pr-5 text-[13px] text-slate-300 shadow-[0_10px_30px_rgba(0,0,0,.25)] transition-opacity duration-300 sm:w-auto sm:justify-start sm:gap-5 sm:py-1.5 sm:pr-2 sm:opacity-100 ${
          mobileOpen ? "pointer-events-none opacity-0 sm:pointer-events-auto" : "opacity-100"
        }`}
      >
        <Link href="#top" className="flex items-center gap-2 font-bold text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/siteLogo.png" alt={SITE.name} className="w-[120px]" />
        </Link>

        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="hidden font-display text-sm transition-colors hover:text-white sm:inline"
          >
            {l.label}
          </Link>
        ))}

        <Link
          href="#contact"
          className="hidden rounded-full bg-white px-4 py-2.5 text-[13px] font-bold text-neutral-900 transition hover:scale-105 hover:shadow-[0_4px_14px_rgba(255,255,255,.25)] sm:inline"
        >
          Let&rsquo;s talk
        </Link>

        <button
          ref={triggerRef}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          className="ml-1 p-1 text-slate-300 transition-colors hover:text-white sm:hidden"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        /* inert keeps the off-screen links out of the tab order while closed */
        inert={!mobileOpen}
        className={`fixed inset-y-0 left-0 z-60 flex w-full max-w-[320px] flex-col bg-[#17181d] p-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] sm:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="#top"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 font-bold text-white"
          >
            <span className="grid size-[22px] place-items-center rounded-full bg-white">
              <span className="ml-0.5 border-y-4 border-l-[7px] border-y-transparent border-l-[#17181d]" />
            </span>
            <span>{SITE.handle}</span>
          </Link>

          <button
            ref={closeRef}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="rounded-full p-1 text-slate-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4 text-[16px] font-medium text-slate-300">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="mt-auto w-full rounded-full bg-white py-3.5 text-center text-[15px] font-bold text-neutral-900 transition active:scale-[0.98]"
        >
          Let&rsquo;s talk
        </Link>
      </div>
    </>
  );
}