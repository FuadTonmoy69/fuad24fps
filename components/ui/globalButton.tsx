import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "ghost"
  | "gradient"
  | "dark"
  | "outline-glow"
  | "outline-glow-orange";

interface ButtonProps {
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] border border-[var(--accent)] text-[#140D0A] hover:bg-[#ff7d52] hover:border-[#ff7d52]",
  ghost:
    "bg-transparent border border-white/25 text-[var(--text)] hover:border-white/50 hover:bg-white/5",
  gradient:
    "border border-transparent text-[#0B0E12] hover:brightness-110",
  dark: "bg-white/[0.06] border border-white/10 text-[var(--text)] hover:bg-white/10 hover:border-white/20",
  "outline-glow":
    "bg-white/[0.02] border border-[rgba(94,234,212,0.35)] text-[var(--text)] hover:border-[rgba(94,234,212,0.6)] hover:bg-[rgba(94,234,212,0.06)]",
  "outline-glow-orange":
    "bg-white/[0.02] border border-[rgba(255,106,61,0.4)] text-[var(--text)] hover:border-[rgba(255,106,61,0.65)] hover:bg-[rgba(255,106,61,0.08)]",
};

const gradientBg: Record<string, string> = {
  gradient: "linear-gradient(135deg, var(--accent-2), var(--accent-3))",
};

export default function Button({
  href,
  variant = "primary",
  className,
  children,
  target,
  rel,
  onClick,
  type = "button",
  style,
}: ButtonProps) {
  const base =
    "relative inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold no-underline cursor-pointer transition-all duration-200 hover:-translate-y-px active:scale-[0.97] active:translate-y-0";

  const variantClass = variantStyles[variant];
  const inlineStyle: React.CSSProperties = {
    ...(gradientBg[variant] ? { background: gradientBg[variant] } : {}),
    ...style,
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cn(base, variantClass, className)}
        style={inlineStyle}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, variantClass, className)}
      style={inlineStyle}
    >
      {children}
    </button>
  );
}
