import type { Metadata } from "next";
import { Baloo_2, Caveat, DM_Sans, Space_Mono } from "next/font/google";
import { SITE } from "@/lib/data";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE.name} — Video Editing for Creators & Brands`,
  description:
    "Freelance video editor working with YouTube creators and brands. Talking heads, podcasts, SaaS product videos and vertical shorts. Remote, worldwide.",
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — Video Editing for Creators & Brands`,
    description:
      "Retention-first edits for YouTube creators and brands. Remote, worldwide, usually replying the same day.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${baloo.variable} ${caveat.variable} ${spaceMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen overflow-x-hidden font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
