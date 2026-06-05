import type { Metadata } from "next";
// Using curly braces because we are using a named export in the client file
import { ServicesPageClient } from "@/components/sections/services-page-client";

export const metadata: Metadata = {
  title: "Services | Yarsa Byte",
  description:
    "Explore Yarsa Byte services for websites, portfolios, poster design, reels, branding, and digital setup for Nepali businesses.",
  keywords: [
    "web design services",
    "website development",
    "branding services",
  ],
  alternates: { canonical: "https://yarsabyte.com/services" },
  openGraph: {
    title: "Services | YarsaByte",
    description: "Professional web and digital services for Nepali businesses.",
    url: "https://yarsabyte.com/services",
    images: ["https://yarsabyte.com/og-services.png"],
  },
};

export default function ServicesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarsabyte.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://yarsabyte.com/services" },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does YarsaByte offer?",
        acceptedAnswer: { "@type": "Answer", text: "Web design, development, branding, video editing and digital strategy." },
      },
      {
        "@type": "Question",
        name: "How long does a website take?",
        acceptedAnswer: { "@type": "Answer", text: "Typical projects take 10-21 days depending on scope." },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <ServicesPageClient />
    </>
  );
}