import type { Metadata } from "next";
import { AttitudeSection } from "@/components/sections/attitude-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { AwardsSection } from "@/components/sections/awards_section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

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
        <TestimonialsSection />
        <AttitudeSection />
        <AwardsSection />
        <ContactSection />
      </main>
    </>
  );
}
