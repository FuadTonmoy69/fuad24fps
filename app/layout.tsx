import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Header from "@/components/layout/Header";
import "./globals.css";
import Nav from "@/components/sections/Nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FUAD24FPS — Video Editing for Creators & Brands",
  description:
    "Freelance video editing for YouTube, podcasts, shorts and ad creatives. Footage in, retention out.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="grain" aria-hidden="true" />
        <ScrollToTop/>
        <Nav/>
        {children}
      </body>
    </html>
  );
}