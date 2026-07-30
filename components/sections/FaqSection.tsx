import Eyebrow from "@/components/ui/Eyebrow";
import { faqs } from "@/lib/data";

export default function FaqSection() {
  return (
    <section
      className="relative z-[1] border-t"
      id="faqs"
      style={{ padding: "100px 0", borderColor: "var(--line)" }}
    >
      <div className="mx-auto px-7" style={{ maxWidth: "var(--maxw)" }}>
        <div className="section-head max-w-[640px] mb-14">
          <Eyebrow>Questions</Eyebrow>
          <h2>Before you book.</h2>
        </div>

        <div>
          {faqs.map((faq) => (
            <details key={faq.q} open={faq.defaultOpen}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
