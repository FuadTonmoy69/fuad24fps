import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/globalButton";

interface PriceCard {
  tier: string;
  name: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  variant: "premium" | "featured" | "studio";
  cta: string;
  ctaHref: string;
  ctaVariant: "outline-glow-orange" | "gradient";
  saveBadge?: string;
  badge?: string;
  icon: React.ReactNode;
}

const GradientBorder = ({ variant }: { variant: "teal" | "orange" }) => (
  <span
    className="absolute inset-0 rounded-[inherit] pointer-events-none"
    style={{
      padding: "1.5px",
      background:
        variant === "teal"
          ? "linear-gradient(135deg, var(--accent-2), var(--accent-3))"
          : "linear-gradient(135deg, var(--accent), #FFB088)",
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
    }}
  />
);

const cards: PriceCard[] = [
  {
    tier: "Starter",
    name: "Creator",
    price: "$799",
    priceSuffix: "/mo",
    features: [
      "4 long-form edits / mo",
      "4 shorts / mo",
      "AI talking-head cuts",
      "Unlimited revisions",
    ],
    variant: "premium",
    cta: "Get started",
    ctaHref: "#contact",
    ctaVariant: "outline-glow-orange",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    tier: "Growth",
    name: "Channel",
    price: "$1,399",
    priceSuffix: "/mo",
    features: [
      "8 long-form edits / mo",
      "8 shorts / mo + AI talking-head cuts",
      "Podcast-to-shorts clipping",
      "Priority 48h turnaround",
      "Direct WhatsApp / async updates",
    ],
    variant: "featured",
    badge: "Most booked",
    saveBadge: "Save 12% per edit vs. Creator",
    cta: "Get started",
    ctaHref: "#contact",
    ctaVariant: "gradient",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.5c2.5 1.6 4.2 4.4 4.2 8.3 0 2-.5 3.7-1.2 5l-3-1.4-3 1.4c-.7-1.3-1.2-3-1.2-5 0-3.9 1.7-6.7 4.2-8.3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="10.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.8 15.8 6.5 18l.6-3M15.2 15.8l2.3 2.2-.6-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    tier: "Custom",
    name: "Studio",
    price: "Let's talk",
    features: [
      "Full slate: long-form, shorts, ads, motion graphics",
      "Dedicated review workflow",
      "Monthly content strategy calls",
      "Scoped around your posting schedule",
    ],
    variant: "studio",
    cta: "Book a call",
    ctaHref: "https://mail.google.com/mail/?view=cm&fs=1&to=Fuadhasan24fps@gmail.com",
    ctaVariant: "outline-glow-orange",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 9l3 2.2L12 5l5 6.2L20 9l-1.6 9H5.6L4 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function PricingSection() {
  return (
    <section
      className="relative z-[1] border-t"
      id="pricing"
      style={{ padding: "100px 0", borderColor: "var(--line)" }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: "var(--maxw)" }}>
        <div className="section-head max-w-[640px] mb-14">
          <Eyebrow>Packages</Eyebrow>
          <h2 className="mb-4">Pick a cadence, not just a cut.</h2>
          <p>Custom quote for Studio — everything else is priced and ready to go.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {cards.map((card) => {
            const isFeatured = card.variant === "featured";
            const isPremium = card.variant === "premium" || card.variant === "studio";

            return (
              <div
                key={card.name}
                className="price-card relative isolate flex flex-col rounded-[var(--radius)] p-9"
                style={{
                  border: isFeatured
                    ? "1px solid transparent"
                    : isPremium
                    ? "1px solid transparent"
                    : "1px solid var(--line)",
                  background: isFeatured
                    ? "linear-gradient(180deg, rgba(94,234,212,0.09), rgba(185,140,255,0.06))"
                    : isPremium
                    ? "linear-gradient(180deg, rgba(255,106,61,0.08), rgba(255,106,61,0.02))"
                    : "rgba(255,255,255,0.02)",
                  boxShadow: isFeatured
                    ? "0 24px 60px -20px rgba(94,234,212,0.35), 0 24px 60px -20px rgba(185,140,255,0.3)"
                    : undefined,
                }}
              >
                {/* Gradient border overlay */}
                {isFeatured && <GradientBorder variant="teal" />}
                {isPremium && <GradientBorder variant="orange" />}

                {/* Most booked badge */}
                {card.badge && (
                  <div
                    className="featured-badge absolute -top-3.5 left-1/2 -translate-x-1/2 z-[2] text-[12px] font-extrabold px-4 py-1.5 rounded-full whitespace-nowrap tracking-[0.3px]"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent-2), var(--accent-3))",
                      color: "#0B0E12",
                    }}
                  >
                    {card.badge}
                  </div>
                )}

                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-[14px] mb-5"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: isFeatured
                      ? "linear-gradient(135deg, var(--accent-2), var(--accent-3))"
                      : isPremium
                      ? "linear-gradient(135deg, var(--accent), #FFB088)"
                      : "rgba(255,255,255,0.07)",
                    boxShadow: isFeatured
                      ? "0 6px 18px -4px rgba(94,234,212,0.5)"
                      : undefined,
                  }}
                >
                  <div
                    className="w-6 h-6"
                    style={{
                      color: isFeatured || isPremium ? "#0B0E12" : "var(--text)",
                    }}
                  >
                    {card.icon}
                  </div>
                </div>

                {/* Tier + name */}
                <div
                  className="text-[12px] uppercase tracking-[1px]"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: isPremium ? "var(--accent)" : "var(--accent-2)",
                  }}
                >
                  {card.tier}
                </div>
                <h3
                  className="text-[26px] font-extrabold mt-0.5 mb-1.5"
                  style={{ color: "var(--text)", fontFamily: "inherit" }}
                >
                  {card.name}
                </h3>

                {/* Price */}
                <div
                  className="font-extrabold mt-3.5 mb-1"
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: isFeatured ? "38px" : "34px",
                    color: "var(--text)",
                  }}
                >
                  {card.price}
                  {card.priceSuffix && (
                    <span
                      className="text-sm font-medium ml-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {card.priceSuffix}
                    </span>
                  )}
                </div>

                {/* Save badge */}
                {card.saveBadge && (
                  <div
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.3px] px-2.5 py-1 rounded-full mt-0.5 mb-0 w-fit"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "var(--accent-2)",
                      background: "rgba(94,234,212,0.1)",
                      border: "1px solid rgba(94,234,212,0.35)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "11px", height: "11px" }}
                    >
                      <path
                        d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {card.saveBadge}
                  </div>
                )}

                {/* Features */}
                <ul className="list-none p-0 mt-5 mb-6 flex flex-col gap-3 flex-grow">
                  {card.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-sm items-start"
                      style={{ color: "var(--text)" }}
                    >
                      <span
                        className="font-bold"
                        style={{ color: "var(--accent-2)", flexShrink: 0 }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href={card.ctaHref}
                  variant={card.ctaVariant}
                  className="w-full justify-center"
                  target={card.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={card.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {card.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <p
          className="text-center text-[12px] mt-6 m-0"
          style={{ color: "var(--text-muted)" }}
        >
          All packages include unlimited revisions until you're happy with the
          final cut.
        </p>
      </div>
    </section>
  );
}
