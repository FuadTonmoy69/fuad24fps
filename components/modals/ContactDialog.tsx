"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SITE } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

/* fields fade up in sequence rather than all at once */
const STEP = "animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-backwards";

export default function ContactDialog({
  open,
  onOpenChange,
  initialBrief,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialBrief: string;
}) {
  const [brief, setBrief] = useState(initialBrief);
  const [contact, setContact] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  /* the form and the success screen are different heights, and the error
     message adds more. Measuring the active panel lets the dialog grow
     smoothly instead of snapping between sizes. */
  const panel = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setHeight(entry.contentRect.height),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [open]);

  useEffect(() => {
    if (open) {
      setBrief(initialBrief);
      setStatus("idle");
      setError("");
    } else {
      /* let the close animation finish before the height resets */
      const t = setTimeout(() => setHeight(undefined), 250);
      return () => clearTimeout(t);
    }
  }, [open, initialBrief]);

  const canSubmit = brief.trim().length > 2 && contact.trim().length > 2;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, contact, honeypot }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong");
      setStatus("sent");
      setContact("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    "Project enquiry via fuad24fps",
  )}&body=${encodeURIComponent(`${brief}\n\nReach me at: ${contact}`)}`;

  const field =
    "w-full border border-black/10 bg-neutral-50 px-4 py-3 text-sm font-medium text-ink outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:border-blue-500/60 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px] gap-0 overflow-hidden rounded-[24px] border-0 bg-white p-0 shadow-[0_40px_100px_-20px_rgba(0,0,0,.45)] sm:max-w-[440px]">
        {/* height animates; the panel inside cross-fades */}
        <div
          style={{ height }}
          className="overflow-hidden transition-[height] duration-400 ease-[cubic-bezier(.16,1,.3,1)]"
        >
          <div ref={panel}>
            {status === "sent" ? (
              <div className="animate-in fade-in zoom-in-95 px-7 py-10 text-center duration-400">
                <span className="animate-in zoom-in-50 mx-auto mb-4 grid size-12 place-items-center rounded-full bg-emerald-100 duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]">
                  <Check className="size-6 text-emerald-600" strokeWidth={3} />
                </span>
                <DialogTitle className="text-xl font-black text-ink">
                  Got it — thanks!
                </DialogTitle>
                <DialogDescription className="mx-auto mt-2 max-w-[300px] text-sm font-medium text-muted">
                  I&rsquo;ll get back to you the same day, usually sooner.
                </DialogDescription>
                <button
                  onClick={() => onOpenChange(false)}
                  className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-extrabold text-white transition duration-200 hover:scale-105 active:scale-95"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="px-7 pb-7 pt-8">
                <div className={STEP}>
                  <DialogTitle className="text-xl font-black tracking-tight text-ink">
                    Tell me about it
                  </DialogTitle>
                  <DialogDescription className="mt-1.5 text-sm font-medium text-muted">
                    Two fields, then I&rsquo;ll reach out — usually the same day.
                  </DialogDescription>
                </div>

                <label className={`mt-6 block ${STEP} [animation-delay:70ms]`}>
                  <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-widest text-muted">
                    What are you making?
                  </span>
                  <textarea
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    rows={3}
                    autoFocus
                    placeholder="A weekly podcast I need cut into shorts…"
                    className={`${field} resize-none rounded-2xl`}
                  />
                </label>

                <label className={`mt-4 block ${STEP} [animation-delay:140ms]`}>
                  <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-widest text-muted">
                    Email or social handle
                  </span>
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="you@studio.com  ·  @yourhandle"
                    autoComplete="email"
                    className={`${field} rounded-full`}
                  />
                </label>

                {/* honeypot — hidden from people, catches most bots */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="pointer-events-none absolute left-[-9999px] size-0 opacity-0"
                />

                {status === "error" && (
                  <p className="animate-in fade-in slide-in-from-top-1 mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-700 duration-300">
                    {error}{" "}
                    <a href={mailto} className="underline underline-offset-2">
                      Email me directly instead
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit || status === "sending"}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-extrabold text-white transition-[transform,opacity] duration-200 enabled:hover:scale-[1.02] enabled:active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40 ${STEP} [animation-delay:210ms]`}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send it over
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className={`mt-3.5 text-center text-[11px] font-medium text-muted ${STEP} [animation-delay:280ms]`}>
                  Prefer email?{" "}
                  <a href={mailto} className="font-bold text-ink underline underline-offset-2">
                    {SITE.email}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}