"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-10 h-10 rounded-full
        border border-white/20 bg-[var(--surface)]
        text-[var(--text-muted)] hover:text-[var(--text)]
        hover:border-[var(--accent-2)] hover:bg-[var(--surface-2)]
        transition-all duration-300 cursor-pointer
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ArrowUp size={16} strokeWidth={2} />
    </button>
  );
}