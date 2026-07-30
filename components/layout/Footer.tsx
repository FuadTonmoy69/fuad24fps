import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t py-9"
      style={{ borderColor: "var(--line)" }}
    >
      <div
        className="mx-auto px-7 flex flex-wrap justify-between items-center gap-4"
        style={{ maxWidth: "var(--maxw)" }}
      >
        <Link
          href="#top"
          className="flex items-center gap-2 text-xl font-extrabold no-underline"
          style={{
            color: "var(--text)",
            textShadow:
              "0 0 14px rgba(255,255,255,0.45), 0 0 30px rgba(94,234,212,0.3)",
          }}
        >
          <span
            className="logo-dot inline-block w-2 h-2 rounded-full"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
            }}
          />
          FUAD24FPS
        </Link>

        <div className="flex gap-5 text-[13px]" style={{ color: "var(--text-muted)" }}>
          {[
            {
              label: "Instagram",
              href: "https://www.instagram.com/aai_tonmoy/",
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/fuad.tonmoy.org",
            },
            {
              label: "Email",
              href: "https://mail.google.com/mail/?view=cm&fs=1&to=Fuadhasan24fps@gmail.com",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors duration-150 hover:text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-[12px] m-0" style={{ color: "var(--text-muted)" }}>
          © 2026 Fuad24fps. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
