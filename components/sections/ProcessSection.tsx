import Eyebrow from "@/components/ui/Eyebrow";

const steps = [
  {
    tc: "00:00",
    title: "You send the footage",
    desc: "Drop raw files or recordings into a shared folder — no format or camera requirements. Tell me the goal for the piece and any references you like.",
  },
  {
    tc: "00:15",
    title: "I cut the first pass",
    desc: "Structure, pacing, kinetic text, sound design and colour where needed — edited for the platform it's going to, not a generic template.",
  },
  {
    tc: "00:32",
    title: "Review and deliver",
    desc: "You get a private link to review. Notes come back as timestamped comments, revisions continue until it's right, then you get the final export in whatever spec you need.",
  },
];

export default function ProcessSection() {
  return (
    <section
      className="relative z-[1] border-t"
      id="process"
      style={{ padding: "100px 0", borderColor: "var(--line)" }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: "var(--maxw)" }}>
        <div className="section-head max-w-[640px] mb-14">
          <Eyebrow>How it works</Eyebrow>
          <h2>Three passes, one timeline.</h2>
        </div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={step.tc}
              className="process-item grid gap-8 py-8 border-t"
              style={{
                gridTemplateColumns: "140px 1fr",
                borderColor: "var(--line)",
                borderTopWidth: i === 0 ? "0" : undefined,
              }}
            >
              <div
                className="text-xl font-bold pt-1"
                style={{
                  color: "var(--accent)",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                {step.tc}
              </div>
              <div>
                <h3
                  className="text-2xl mb-2"
                  style={{ color: "var(--text)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm m-0">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
