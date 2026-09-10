export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <>
      <div className="mb-2.5 font-mono text-[11px] font-bold text-neutral-500">{eyebrow}</div>
      <h2 className="mb-8 text-[clamp(28px,5vw,46px)] font-black leading-none tracking-[-1px] text-ink">
        {title}
      </h2>
    </>
  );
}
