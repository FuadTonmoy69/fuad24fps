"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";
import { SectionHeading } from "./Section";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(
    faqs.findIndex((f) => f.defaultOpen) === -1 ? null : faqs.findIndex((f) => f.defaultOpen),
  );

  return (
    <section id="faq" className="mx-auto max-w-[1140px] px-8 pb-20">
      <SectionHeading eyebrow="/ questions" title="FAQs" />

      <div className="flex flex-col gap-2.5">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`overflow-hidden rounded-2xl border-[1.5px] border-white/90 bg-white/60 backdrop-blur-lg transition-shadow ${
                isOpen ? "shadow-[0_8px_32px_rgba(0,0,0,.08)]" : ""
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-5.5 py-4.5 text-left text-[15px] font-extrabold text-ink"
              >
                {f.q}
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full text-sm font-black leading-none transition-[transform,background-color,color] duration-300 ${
                    isOpen ? "rotate-45 bg-ink text-white" : "bg-black/6 text-ink"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(.22,1,.36,1)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5.5 pb-4.5 text-sm font-semibold leading-[1.7] text-neutral-600">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
