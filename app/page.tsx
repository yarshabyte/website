import { AboutSection } from "@/components/sections/about-section";
import { AttitudeSection } from "@/components/sections/attitude-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { AwardsSection } from "@/components/sections/awards_section";
import { WorkSection } from "@/components/sections/work-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <div
        className="hidden items-center px-[8%] lg:flex"
        aria-hidden="true"
      >
        <span className="size-3.5 rounded-full border border-foreground/90" />
        <span className="h-px flex-1 bg-foreground/80" />
        <span className="size-3.5 rounded-full border border-foreground/90" />
      </div>
      <WorkSection />
      <AttitudeSection />
      <AwardsSection />
      <ContactSection />
    </main>
  );
}
