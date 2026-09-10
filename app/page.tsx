import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Work from "@/components/sections/Work";

export default function Page() {
  return (
    <>
      {/* <Nav /> */}
      <Hero />
      <About />
      <Work />
      <Testimonials />
      <Services />
      <Faq />
      <Contact />
      <footer className="py-8 text-center font-mono text-xs font-bold text-neutral-400">
        built by FUAD24FPS · 2026 · video editing for creators &amp; brands
      </footer>
    </>
  );
}
