import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Header from "@/components/layout/Header";
import "./globals.css";
import Nav from "@/components/sections/Nav";
import { Baloo_2, Caveat, DM_Sans, Space_Mono,Poppins } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo-src",
  display: "swap",
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins-src',
  display: 'swap',
});


const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FUAD24FPS - Video Editing for Creators & Brands",
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
            <body className={`${dmSans.variable} ${poppins.variable} ${baloo.variable} ${caveat.variable} ${spaceMono.variable} font-sans min-h-screen overflow-x-hidden text-ink antialiased`}>

        <div className="grain" aria-hidden="true" />
        <ScrollToTop/>
        <Nav/>
        {children}
      </body>
    </html>
  );
}