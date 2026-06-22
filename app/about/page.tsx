import type { Metadata } from "next";
import { AboutPageClient } from "@/components/sections/about-page-client";

export const metadata: Metadata = {
  title: "About Us | Yarsha Byte",
  description:
    "A six-person digital team in Nepal unifying strategy, design, code, and motion.",
  keywords: ["Yarsha Byte team", "about Yarsha Byte", "creative team Nepal"],
  alternates: { canonical: "https://yarshabyte.vercel.app/about" },
  openGraph: {
    title: "About Yarsha Byte",
    description:
      "A six-person digital team in Nepal unifying strategy, design, code, and motion.",
    url: "https://yarshabyte.vercel.app/about",
    images: ["https://yarshabyte.vercel.app/og-image.png"],
  },
};

export default function AboutPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yarshabyte.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://yarshabyte.vercel.app/about" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <AboutPageClient />
    </>
  );
}