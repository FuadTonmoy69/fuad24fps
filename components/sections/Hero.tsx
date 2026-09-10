"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import ContactDialog from "../modals/ContactDialog";

const PHRASES = [
  "Footage in. Watch time out.",
  "Edits that make people stop scrolling.",
  "Remote, worldwide — replies same day ✨",
];

const SPARKLES = [
  { left: "23%", top: "9%", size: 24, color: "#14b8a6", delay: 0 },
  { left: "62%", top: "5%", size: 16, color: "#f472b6", delay: 0.6 },
  { left: "36%", top: "28%", size: 12, color: "#f472b6", delay: 1.2 },
  { left: "9%", top: "62%", size: 14, color: "#14b8a6", delay: 0.9 },
  { left: "90%", top: "30%", size: 18, color: "#a78bfa", delay: 0.3 },
  { left: "72%", top: "74%", size: 12, color: "#f59e0b", delay: 1.6 },
];

const CONFETTI = ["#7c3aed", "#ec4899", "#22d3ee", "#facc15", "#4ade80", "#f97316"];

const KEY_ROWS = [13, 13, 12, 8];
const SPACE_INDEX = { row: 3, key: 4 };

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [litKey, setLitKey] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [ask, setAsk] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false); // ← modal
  const sceneRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* typing loop, with a matching key lighting up on the keyboard */
  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const press = (ch: string) => {
      if (ch === " ") {
        setLitKey(`${SPACE_INDEX.row}-${SPACE_INDEX.key}`);
      } else {
        const row = Math.floor(Math.random() * 3);
        const key = Math.floor(Math.random() * KEY_ROWS[row]);
        setLitKey(`${row}-${key}`);
      }
      setTimeout(() => setLitKey(null), 95);
    };

    (async () => {
      let i = 0;
      while (!cancelled) {
        const phrase = PHRASES[i % PHRASES.length];
        for (const ch of phrase) {
          if (cancelled) return;
          setTyped((t) => t + ch);
          press(ch);
          await wait(38 + Math.random() * 40);
        }
        await wait(2200);
        for (let n = phrase.length; n > 0; n--) {
          if (cancelled) return;
          setTyped((t) => t.slice(0, -1));
          press("");
          await wait(16);
        }
        i++;
        await wait(350);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* parallax — mouse on desktop, device tilt on phones, off for reduced motion */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.style.setProperty("--mx", "0");
      document.body.style.setProperty("--my", "0");
      return;
    }

    let tx = 0, ty = 0, cx = 0, cy = 0, frame = 0;
    let detach = () => {};

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      document.body.style.setProperty("--mx", cx.toFixed(3));
      document.body.style.setProperty("--my", cy.toFixed(3));
      frame = requestAnimationFrame(loop);
    };

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const onMove = (e: MouseEvent) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 2;
        ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMove);
      detach = () => window.removeEventListener("mousemove", onMove);
    } else {
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      const onTilt = (e: DeviceOrientationEvent) => {
        tx = clamp((e.gamma ?? 0) / 30);
        ty = clamp(((e.beta ?? 45) - 45) / 30);
      };
      const enable = async () => {
        try {
          const DOE = DeviceOrientationEvent as unknown as {
            requestPermission?: () => Promise<unknown>;
          };
          await DOE.requestPermission?.();
        } catch {
          /* declined — sparkles still twinkle, just no tilt */
        }
        window.addEventListener("deviceorientation", onTilt);
      };
      window.addEventListener("pointerdown", enable, { once: true });
      detach = () => {
        window.removeEventListener("pointerdown", enable);
        window.removeEventListener("deviceorientation", onTilt);
      };
    }

    frame = requestAnimationFrame(loop);
    return () => {
      detach();
      cancelAnimationFrame(frame);
    };
  }, []);

  const burst = useCallback((e: { clientX?: number; clientY?: number }) => {
    const x = e.clientX ?? window.innerWidth / 2;
    const y = e.clientY ?? window.innerHeight / 2;

    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className =
        "fixed z-100 size-2 rounded-[2px] pointer-events-none -translate-x-1/2 -translate-y-1/2";
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      s.style.background = CONFETTI[i % CONFETTI.length];
      document.body.append(s);

      const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.5;
      const dist = 45 + Math.random() * 55;
      s.animate(
        [
          { transform: "scale(1)", opacity: 1 },
          {
            transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`,
            opacity: 0,
          },
        ],
        { duration: 600 + Math.random() * 350, easing: "cubic-bezier(.2,.7,.3,1)" },
      ).onfinish = () => s.remove();
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  }, []);

  /* ── the arrow hands off to the modal, which collects the email ── */
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ask.trim()) {
      showToast("Tell me a little something first 👀");
      inputRef.current?.focus();
      return;
    }
    setDialogOpen(true);
  };

  return (
    <main
      ref={sceneRef}
      className="relative flex min-h-svh justify-center overflow-x-clip px-6 pb-12 pt-28"
    >
      <div className="relative flex min-h-[calc(100svh-158px)] w-full max-w-[1140px] flex-col items-center justify-center">

        {/* sparkles */}
        <div className="pointer-events-none absolute inset-0 z-1">
          {SPARKLES.map((s, i) => (
            <div
              key={i}
              className="parallax absolute animate-pop"
              style={{
                left: s.left,
                top: s.top,
                ["--depth" as string]: 60,
                animationDelay: `${s.delay}s`,
              }}
            >
              <svg
                width={s.size}
                height={s.size}
                viewBox="0 0 24 24"
                className="origin-center animate-twinkle"
                style={{ animationDelay: `${s.delay}s` }}
              >
                <path
                  fill={s.color}
                  d="M12 0C13 7 17 11 24 12 17 13 13 17 12 24 11 17 7 13 0 12 7 11 11 7 12 0Z"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* polaroid — portrait (desktop only) */}
        <button
          onClick={burst}
          style={{ ["--depth" as string]: 26, animationDelay: ".15s" }}
          className="parallax absolute left-0 top-[12%] z-1 hidden animate-pop cursor-pointer rounded-md bg-white p-2.5 pb-1.5 shadow-[0_14px_30px_-8px_rgba(60,50,30,.3)] transition-[rotate,scale] duration-300 -rotate-8 hover:rotate-0 hover:scale-105 md:block"
        >
          <Tape />
          <div className="animate-bob [animation-delay:.4s]">
            <div className="h-[120px] w-[130px] overflow-hidden rounded-sm">
              <img src="/avatar.jpeg" alt="Fuad" className="size-full object-cover object-top" />
            </div>
            <div className="pb-0.5 pt-1 text-center font-hand text-[19px] text-[#3a4150]">
              that&rsquo;s me
            </div>
          </div>
        </button>

        {/* polaroid — retention edits (desktop only) */}
        <button
          onClick={burst}
          style={{ ["--depth" as string]: 30, animationDelay: ".45s" }}
          className="parallax absolute bottom-[4%] left-[1%] z-1 hidden animate-pop cursor-pointer rounded-md bg-white p-2.5 pb-1.5 shadow-[0_14px_30px_-8px_rgba(60,50,30,.3)] transition-[rotate,scale] duration-300 rotate-5 hover:rotate-0 hover:scale-105 md:block"
        >
          <Tape />
          <div className="animate-bob [animation-delay:1.4s]">
            <div className="h-[120px] w-[130px] overflow-hidden rounded-sm">
              <FilmStripSvg />
            </div>
            <div className="pb-0.5 pt-1 text-center font-hand text-[19px] text-[#3a4150]">
              retention edits
            </div>
          </div>
        </button>

        {/* polaroid — motion design (desktop only) */}
        <button
          onClick={burst}
          style={{ ["--depth" as string]: 28, animationDelay: ".55s" }}
          className="parallax absolute right-0 top-[9%] z-1 hidden animate-pop cursor-pointer rounded-md bg-white p-2.5 pb-1.5 shadow-[0_14px_30px_-8px_rgba(60,50,30,.3)] transition-[rotate,scale] duration-300 rotate-9 hover:rotate-0 hover:scale-105 md:block"
        >
          <Tape />
          <div className="animate-bob [animation-delay:.9s]">
            <div className="h-[120px] w-[130px] overflow-hidden rounded-sm">
              <MotionSvg />
            </div>
            <div className="pb-0.5 pt-1 text-center font-hand text-[19px] text-[#3a4150]">
              motion design
            </div>
          </div>
        </button>

        {/* badges (desktop only) */}
        <div
          style={{ ["--depth" as string]: 38, animationDelay: ".3s" }}
          className="parallax absolute left-[6%] top-[52%] z-1 hidden animate-pop -rotate-7 rounded-full bg-linear-to-b from-violet-500 to-violet-800 px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,.22)] md:block"
        >
          <span className="block animate-bob [animation-delay:1s]">Replies same day</span>
        </div>

        <div
          style={{ ["--depth" as string]: 42, animationDelay: ".4s" }}
          className="parallax absolute right-[4%] top-[48%] z-1 hidden animate-pop -rotate-5 rounded-full bg-linear-to-b from-pink-400 to-pink-600 px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,.22)] md:block"
        >
          <span className="block animate-bob [animation-delay:.8s]">Remote, worldwide</span>
        </div>

        {/* sticky note (desktop only) */}
        <button
          onClick={burst}
          style={{ ["--depth" as string]: 22, animationDelay: ".65s" }}
          className="parallax absolute bottom-[5%] right-0 z-1 hidden w-[196px] animate-pop cursor-pointer rounded-md bg-amber-200 px-4 py-3.5 text-left text-[13px] shadow-[0_14px_30px_-8px_rgba(120,80,0,.35)] transition-[rotate] duration-300 rotate-5 hover:rotate-2 md:block"
        >
          <div className="animate-bob [animation-delay:2s]">
            <h4 className="mb-2.5 text-[10px] tracking-[.12em] text-amber-800">TOOLS I WORK IN</h4>
            {[
              ["Pr", "Premiere Pro", "bg-indigo-700"],
              ["Ae", "After Effects", "bg-violet-600"],
              ["Dv", "DaVinci Resolve", "bg-blue-700"],
              ["Cc", "CapCut", "bg-slate-900"],
              ["F", "Figma", "bg-linear-to-br from-red-500 to-amber-500"],
            ].map(([abbr, name, bg]) => (
              <div key={name} className="flex items-center gap-2.5 py-1 font-medium text-gray-800">
                <span className={`grid size-5 place-items-center rounded-md text-[9px] font-extrabold text-white ${bg}`}>
                  {abbr}
                </span>
                {name}
              </div>
            ))}
          </div>
        </button>

        {/* flower (desktop only) */}
        <button
          onClick={burst}
          style={{ ["--depth" as string]: 48, animationDelay: ".75s" }}
          className="parallax absolute bottom-[26%] right-[24%] z-1 hidden w-14 animate-pop cursor-pointer md:block"
        >
          <FlowerSvg />
        </button>

        {/* ── centre stack ── */}
        <div className="relative z-2 flex flex-col items-center">
          <h1
            aria-label="hello!"
            className="relative z-5 mb-[-18px] select-none font-display text-[64px] font-extrabold leading-none tracking-[-.02em] md:mb-[-30px] md:text-[92px]"
          >
            {["h", "e", "l", "l", "o", "!"].map((ch, i) => (
              <span
                key={i}
                data-letter={ch}
                className="hello-letter animate-hbob"
                style={{ animationDelay: `${i * 110 + 400}ms` }}
              >
                {ch}
              </span>
            ))}
          </h1>

          {/* monitor */}
          <div className="w-[min(370px,88vw)] rounded-[26px] bg-linear-to-b from-beige-hi to-beige-lo px-5 pt-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,.3),inset_0_2px_0_rgba(255,255,255,.5)]">
            <div className="rounded-[18px] bg-bezel p-3.5 shadow-[inset_0_3px_8px_rgba(0,0,0,.6)]">
              <div className="glare relative overflow-hidden rounded-[10px] border border-[#d8d0c0] bg-[#f7f2e7]">
                <div className="relative flex items-center border-b border-[#ddd4c2] bg-[#efe8d9] px-2.5 py-[7px]">
                  <span className="flex gap-1.5">
                    <i className="size-2 rounded-full bg-[#ff5f57]" />
                    <i className="size-2 rounded-full bg-[#febc2e]" />
                    <i className="size-2 rounded-full bg-[#28c840]" />
                  </span>
                  <b className="absolute left-1/2 -translate-x-1/2 text-[10px] font-medium text-[#9a8f7c]">
                    -
                  </b>
                </div>

                <div className="px-4 pb-4 pt-3.5">
                  <div className="mb-2.5 inline-block rounded-xl rounded-bl-[3px] border border-[#e5ddcb] bg-white px-2.5 py-1.5 text-[13px]">
                    Hey, I&rsquo;m Fuad 👋
                  </div>
                  <div className="min-h-12 text-[17px] font-semibold text-gray-900">
                    {typed}
                    <span className="inline-block h-[1.05em] w-0.5 animate-caret -mb-0.5 bg-gray-900 align-[-2px]" />
                  </div>
                  {/* also opens the modal, instead of jumping to #contact */}
                  <button
                    onClick={() => setDialogOpen(true)}
                    className="mt-3 inline-block rounded-full bg-[#17181d] px-4 py-2.5 text-[13px] font-bold text-white transition hover:scale-105 hover:bg-black"
                  >
                    Get in touch
                  </button>
                </div>
              </div>
            </div>
            <div className="pb-3 pt-2.5 text-center text-[11px] tracking-[.05em] text-[#8a7c64]">
              {SITE.handle} — video editing &amp; motion
            </div>
          </div>

          <div className="h-[34px] w-[84px] bg-linear-to-b from-beige-lo to-[#b3a284] shadow-[inset_0_4px_6px_rgba(0,0,0,.15)]" />
          <div className="h-4 w-[210px] rounded-lg bg-linear-to-b from-beige-hi to-[#ab9a7c] shadow-[0_6px_12px_-4px_rgba(0,0,0,.25)]" />

          {/* keyboard */}
          <div className="mt-0.5 [perspective:520px]">
            <div className="mb-[-30px] w-[min(335px,84vw)] origin-top rounded-xl bg-[#e7dfcc] p-2.5 shadow-[0_16px_26px_-10px_rgba(0,0,0,.28),inset_0_2px_0_rgba(255,255,255,.5)] [transform:rotateX(52deg)]">
              {KEY_ROWS.map((count, row) => (
                <div key={row} className="mb-1.5 flex gap-1.5 last:mb-0">
                  {Array.from({ length: count }).map((_, key) => {
                    const isSpace = row === SPACE_INDEX.row && key === SPACE_INDEX.key;
                    const lit = litKey === `${row}-${key}`;
                    return (
                      <div
                        key={key}
                        style={isSpace ? { flex: 4 } : undefined}
                        className={`h-[19px] flex-1 rounded-[3px] transition-[background,box-shadow,transform] duration-75 ${
                          lit
                            ? "translate-y-px bg-linear-to-b from-[#bfe0ff] to-[#8ec5f8] shadow-[0_1px_0_#6ba3d8,0_0_10px_rgba(96,165,250,.7)]"
                            : "bg-linear-to-b from-[#f4eddd] to-[#e3dac4] shadow-[0_2px_0_#c6bb9f]"
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-2 mt-8 text-center text-[15px] leading-relaxed text-muted">
          <b className="text-ink">Video editing, motion design and retention-first cuts.</b>
          <br />
          Remote, worldwide, usually replying the same day.
        </p>

        <form
          onSubmit={submit}
          className="group relative z-2 mt-4 flex w-[min(360px,90vw)] items-center gap-1.5 rounded-full border border-[#e8e2d4] bg-white py-1.5 pl-5 pr-1.5 shadow-[0_12px_30px_-8px_rgba(0,0,0,.18)]"
        >
          <input
            ref={inputRef}
            value={ask}
            onChange={(e) => setAsk(e.target.value)}
            placeholder="What are you making?"
            autoComplete="off"
            aria-label="What are you making?"
            className="w-full flex-1 bg-transparent text-sm text-ink outline-hidden placeholder:text-gray-400"
          />
          {/* grid place-items-center — without it the icon sits in the corner */}
          <button
            type="submit"
            aria-label="Continue"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-[#17181d] text-white transition duration-200 group-hover:-rotate-45 group-hover:bg-black"
          >
            <ChevronRight className="size-5" />
          </button>
        </form>
      </div>

      {/* modal — carries whatever they typed into the brief field */}
      <ContactDialog open={dialogOpen} onOpenChange={setDialogOpen} initialBrief={ask} />

      {/* toast */}
      <div
        className={`pointer-events-none fixed bottom-6 left-1/2 z-99 -translate-x-1/2 rounded-full bg-[#17181d] px-[18px] py-2.5 text-[13px] text-white shadow-[0_12px_30px_rgba(0,0,0,.3)] transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        {toast}
      </div>
    </main>
  );
}

function Tape() {
  return (
    <span className="absolute -top-2.5 left-1/2 h-5 w-[66px] -translate-x-1/2 -rotate-4 rounded-[2px] bg-[#e9ddb2]/85 shadow-[0_2px_4px_rgba(0,0,0,.12)]" />
  );
}

function FilmStripSvg() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <rect width="100" height="100" fill="#1e293b" />
      <rect y="8" width="100" height="6" fill="#0f172a" />
      <rect y="86" width="100" height="6" fill="#0f172a" />
      <g fill="#475569">
        {[6, 24, 42, 60, 78].map((x) => (
          <rect key={`t${x}`} x={x} y="9" width="7" height="4" rx="1" />
        ))}
        {[6, 24, 42, 60, 78].map((x) => (
          <rect key={`b${x}`} x={x} y="87" width="7" height="4" rx="1" />
        ))}
      </g>
      <polygon points="40,36 40,64 66,50" fill="#f472b6" />
    </svg>
  );
}

function MotionSvg() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <rect width="100" height="100" fill="#faf5ff" />
      <rect x="14" y="20" width="72" height="44" rx="4" fill="#c084fc" />
      <rect x="20" y="28" width="40" height="4" rx="2" fill="#fff" opacity=".8" />
      <rect x="20" y="38" width="52" height="4" rx="2" fill="#fff" opacity=".5" />
      <rect x="20" y="48" width="30" height="4" rx="2" fill="#fff" opacity=".5" />
      <circle cx="50" cy="78" r="8" fill="#a855f7" />
      <path d="M47 74 L47 82 L54 78 Z" fill="#fff" />
    </svg>
  );
}

function FlowerSvg() {
  return (
    <svg viewBox="0 0 64 64" className="origin-center animate-wobble">
      <g fill="#f9a8d4">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="32"
            cy="13"
            rx="7"
            ry="12"
            transform={deg ? `rotate(${deg} 32 32)` : undefined}
          />
        ))}
      </g>
      <circle cx="32" cy="32" r="11" fill="#fbbf24" />
      <circle cx="28" cy="30" r="1.6" fill="#78350f" />
      <circle cx="36" cy="30" r="1.6" fill="#78350f" />
      <path d="M27 35 Q32 40 37 35" stroke="#78350f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}