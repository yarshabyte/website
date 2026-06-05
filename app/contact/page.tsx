import type { Metadata } from "next";

import { ContactPageClient } from "@/components/sections/contact-page-client";

export const metadata: Metadata = {
  title: "Contact | Yarsa Byte",
  description:
    "Start a project with Yarsa Byte for websites, portfolios, posters, reels, branding, and digital launch support.",
  keywords: ["contact yarsabyte", "hire web designer nepal", "start project"],
  alternates: { canonical: "https://yarsabyte.com/contact" },
  openGraph: {
    title: "Contact | YarsaByte",
    description: "Start a project with YarsaByte for web and digital services.",
    url: "https://yarsabyte.com/contact",
    images: ["https://yarsabyte.com/og-contact.png"],
  },
};

export default function ContactPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarsabyte.com/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://yarsabyte.com/contact" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ContactPageClient />
    </>
  );
}
