import Eyebrow from "@/components/ui/Eyebrow";

const typical = [
  "Slow replies, one round of notes a week",
  "Same template regardless of platform",
  "You manage the software and the schedule",
  "Feedback disappears into a group chat",
];

const fuad = [
  "Direct line, updates while the cut is in progress",
  "Pacing built per platform — long-form isn't a Short cut down",
  "You just send footage; I handle the timeline",
  "Timestamped review comments, tracked to the final export",
];

export default function WhySection() {
  return (
    <section
      className="relative z-[1] border-t"
      style={{ padding: "100px 0", borderColor: "var(--line)" }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: "var(--maxw)" }}>
        <div className="section-head max-w-[640px] mb-14">
          <Eyebrow>Why not just hire in-house</Eyebrow>
          <h2>What changes when I'm the editor.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Typical hire */}
          <div
            className="compare-col rounded-[var(--radius)] p-8 border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--line)",
            }}
          >
            <h3
              className="text-[15px] uppercase tracking-widest font-extrabold mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              A typical hire
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3.5">
              {typical.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14.5px] items-start" style={{ color: "var(--text)" }}>
                  <span style={{ color: "#6b6f76", flexShrink: 0 }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Fuad */}
          <div
            className="compare-col compare-col-yes rounded-[var(--radius)] p-8 border"
            style={{ borderColor: "var(--accent)" }}
          >
            <h3
              className="text-[15px] uppercase tracking-widest font-extrabold mb-5"
              style={{ color: "var(--accent)" }}
            >
              Working with Fuad24fps
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3.5">
              {fuad.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14.5px] items-start" style={{ color: "var(--text)" }}>
                  <span
                    className="font-bold"
                    style={{ color: "var(--accent-2)", flexShrink: 0 }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
