import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  centered?: boolean;
  noDash?: boolean;
  className?: string;
}

export default function Eyebrow({
  children,
  centered = false,
  noDash = false,
  className,
}: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 mb-3.5 text-[12px] tracking-[1.5px] uppercase font-mono",
        centered && "justify-center",
        className
      )}
      style={{ color: "var(--accent-2)", fontFamily: "'JetBrains Mono', monospace" }}
    >
      {!noDash && (
        <span
          className="inline-block w-4 h-px flex-shrink-0"
          style={{ background: "var(--accent-2)" }}
        />
      )}
      {children}
    </div>
  );
}
