import Header from "@/components/layout/Header";
import TimelineScrubber from "@/components/layout/TimelineScrubber";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import WhySection from "@/components/sections/WhySection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      {/* <TimelineScrubber /> */}
      <main id="top">
        <HeroSection />
        <ScrollReveal>
          <WorkSection />
          {/* <ServicesSection /> */}
          {/* <ProcessSection /> */}
          {/* <WhySection /> */}
          {/* <PricingSection />
          <TestimonialsSection />
          <FaqSection />
          <CtaSection /> */}
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}