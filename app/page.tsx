import type { Metadata } from "next";
import { AttitudeSection } from "@/components/sections/attitude-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { AwardsSection } from "@/components/sections/awards_section";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { WorkSection } from "@/components/sections/work-section";

export const metadata: Metadata = {
  title: "YarshaByte | Creative approach to your business",
  description:
    "YarshaByte helps Nepali businesses create websites, portfolios, and digital presences with web design, branding, and development services.",
  keywords: ["web design Nepal", "Business growth", "digital agency Nepal"],
  alternates: { canonical: "https://yarshabyte.vercel.app/" },
  openGraph: {
    url: "https://yarshabyte.vercel.app/",
    images: ["https://yarshabyte.vercel.app/og-image.png"],
  },
};

export default function Home() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarshabyte.vercel.app/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main>
        <HeroSection />
        <WorkSection />
        <AttitudeSection />
        <AwardsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </>
  );
}
