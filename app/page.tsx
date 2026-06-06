import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { AttitudeSection } from "@/components/sections/attitude-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { AwardsSection } from "@/components/sections/awards_section";
import { WorkSection } from "@/components/sections/work-section";

export const metadata: Metadata = {
  title: "YarsaByte | Web Design & Development in Nepal",
  description:
    "YarsaByte helps Nepali businesses create websites, portfolios, and digital presences with web design, branding, and development services.",
  keywords: ["web design Nepal", "website development Kathmandu", "digital agency Nepal"],
  alternates: { canonical: "https://yarsabyte.vercel.app/" },
  openGraph: {
    url: "https://yarsabyte.vercel.app/",
    images: ["https://yarsabyte.vercel.app/og-image.png"],
  },
};

export default function Home() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarsabyte.vercel.app/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main>
        <HeroSection />
        <AboutSection />
        <div
          className="studio-container hidden items-center lg:flex"
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
    </>
  );
}
