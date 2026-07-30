import Eyebrow from "@/components/ui/Eyebrow";

const services = [
  {
    title: "YouTube long-form",
    desc: "Retention-first cuts for talking-head, tutorial and tech-explainer channels — jump cuts, kinetic text, and motion-graphic diagrams where they earn their keep.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 9.5l4.5 2.5-4.5 2.5v-5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Shorts & Reels",
    desc: "Vertical cuts built for the first three seconds, with captions and pacing tuned per platform.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="7" y="2.5" width="10" height="19" rx="2.3" stroke="currentColor" strokeWidth="1.6" />
        <line x1="10.2" y1="18.2" x2="13.8" y2="18.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Podcast editing",
    desc: "Transcript-driven cuts that trim the fluff, plus multi-speaker kinetic-text trailers for launch clips.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 11.5C5 15.6 8.1 19 12 19C15.9 19 19 15.6 19 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Podcast → Shorts",
    desc: "I go through the full recording and pull the clips worth clipping, cut and captioned.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M9 3 4 8l1.4 1.4L9 6.5v11L5.4 14.1 4 15.5l5 5 5-5-1.4-1.4L9 17.5v-11l3.6 2.9L14 8 9 3Z" fill="currentColor" />
        <rect x="15.5" y="4" width="6" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "AI Talking Head Specialized",
    desc: "Editing for AI-avatar and AI-generated talking-head content — clean sync between the AI voice/lip-sync track and b-roll, kinetic text, and cutaways so it never feels like a raw AI export.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="8" cy="9.5" r="1.3" fill="currentColor" />
        <path d="M4.5 15 8.5 11.5 11.5 14 16 9.5 19.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "UGC & ad creatives",
    desc: "Scroll-stopping cuts for Meta, TikTok and site placements, built around a hook-first structure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 10v4l5 1.5v-7L3 10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 8.2v7.6l9 2.7c1.1.3 2-.5 2-1.6V7.1c0-1.1-.9-1.9-2-1.6L8 8.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Motion graphics",
    desc: "After Effects diagrams, animated stat charts and lower-thirds for anything that needs to explain, not just cut.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 20c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Webinars & VSLs",
    desc: "Long recordings turned into something people actually finish watching.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9.5 8.5 12 11l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section
      className="relative z-[1] border-t"
      id="services"
      style={{ padding: "100px 0", borderColor: "var(--line)" }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: "var(--maxw)" }}>
        <div className="section-head max-w-[640px] mb-14">
          <Eyebrow>What I cut</Eyebrow>
          <h2 className="mb-4">One editor, every track.</h2>
          <p>
            From long-form to a 15-second hook, each format gets its own pacing,
            not a copy-paste template.
          </p>
        </div>

        {/* 4-col grid with 1px gap borders */}
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            background: "var(--line)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            overflow: "visible",
          }}
        >
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className="service-card relative isolate flex flex-col gap-2.5 transition-all duration-[250ms]"
              style={{
                background: "#0a0c10",
                padding: "32px 26px",
                minHeight: "210px",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.03)",
                // Corner radius
                borderTopLeftRadius: i === 0 ? "var(--radius)" : undefined,
                borderTopRightRadius: i === 3 ? "var(--radius)" : undefined,
                borderBottomLeftRadius: i === 4 ? "var(--radius)" : undefined,
                borderBottomRightRadius:
                  i === services.length - 1 ? "var(--radius)" : undefined,
              }}
            >
              {/* Gradient sheen overlay */}
              <div
                className="absolute inset-0 rounded-[inherit] pointer-events-none -z-[1]"
                style={{
                  background:
                    "radial-gradient(120% 60% at 30% -10%, rgba(255,255,255,0.06), transparent 55%)",
                }}
              />

              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255,106,61,0.12)",
                  marginBottom: "4px",
                }}
              >
                <div
                  className="w-5 h-5"
                  style={{ color: "var(--accent)" }}
                >
                  {svc.icon}
                </div>
              </div>

              <h3
                className="text-[22px] mt-1.5"
                style={{ color: "var(--text)" }}
              >
                {svc.title}
              </h3>
              <p className="text-sm m-0">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
