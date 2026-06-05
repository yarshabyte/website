import type { Metadata } from "next";
// Using curly braces because we are using a named export in the client file
import { ServicesPageClient } from "@/components/sections/services-page-client";

export const metadata: Metadata = {
  title: "Services | Yarsa Byte",
  description:
    "Explore Yarsa Byte services for websites, portfolios, poster design, reels, branding, and digital setup for Nepali businesses.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}