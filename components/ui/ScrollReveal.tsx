"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selector =
      ".section-head, .work-card, .service-card, .price-card, .compare-col, .process-item, .cta-panel";

    const els = Array.from(
      containerRef.current?.querySelectorAll(selector) ?? []
    ) as HTMLElement[];

    els.forEach((el, i) => {
      el.classList.add("reveal-up");
      el.style.transitionDelay = Math.min(i % 4, 3) * 0.08 + "s";
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
