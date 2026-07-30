import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/globalButton";

export default function CtaSection() {
  return (
    <section
      className="relative z-[1]"
      id="contact"
      style={{ padding: "100px 0" }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: "var(--maxw)" }}>
        <div
          className="cta-panel relative isolate overflow-hidden text-center rounded-[28px] border"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0a0c10",
            padding: "90px 40px",
          }}
        >
          {/* Background radials */}
          <div
            className="absolute inset-0 pointer-events-none -z-[1]"
            style={{
              background:
                "radial-gradient(50% 60% at 15% 0%, rgba(94,234,212,0.16), transparent 65%), radial-gradient(50% 60% at 85% 100%, rgba(185,140,255,0.14), transparent 65%)",
            }}
          />

          <Eyebrow centered>Ready when you are</Eyebrow>

          <h2 className="mb-4">
            Let's get your next{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-2), var(--accent-3))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              video cut
            </span>
            .
          </h2>

          <p className="max-w-[520px] mx-auto mb-8">
            Book a free 20-minute call to talk through your channel, your
            format, and whether it's a fit.
          </p>

          <div className="flex gap-3.5 flex-wrap justify-center">
            <Button
              href="https://mail.google.com/mail/?view=cm&fs=1&to=Fuadhasan24fps@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="gradient"
            >
              Book a call
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={{ width: "15px", height: "15px" }}
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            <Button
              href="https://wa.me/8801877611711"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-glow"
            >
              Message on WhatsApp
            </Button>
          </div>

          {/* Feature pills */}
          <div
            className="flex justify-center gap-7 flex-wrap mt-8 text-[13px]"
            style={{ color: "var(--text-muted)" }}
          >
            {[
              {
                label: "72h turnaround",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                label: "Unlimited revisions",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2l7 3v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V5l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                label: "Async updates",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((f) => (
              <span key={f.label} className="inline-flex items-center gap-1.5">
                <span
                  className="w-[15px] h-[15px]"
                  style={{ color: "var(--accent-2)" }}
                >
                  {f.icon}
                </span>
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
