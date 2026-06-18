import type { Metadata } from "next";

import { PageLoader } from "@/components/page-loader";
import { PageWaveTransition } from "@/components/page-wave-transition";
import { ScrollHexBackground } from "@/components/scroll-hex-background";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteHeader } from "@/components/site-header";
import { HeroCanvasShell } from "@/components/hero/hero-canvas-shell";

import "./globals.css";

export const metadata: Metadata = {

  title: "YarshaByte | Creative approach to your business",
  description:
    "YarshaByte helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital setups for a professional online presence.",
  metadataBase: new URL("https://yarshabyte.vercel.app"),
  alternates: { canonical: "https://yarshabyte.vercel.app" },
  openGraph: {
    title: "Yarsha Byte | Creative approach to your business",
    description:
      "YarshaByte helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital setups for a professional online presence.",
    siteName: "YarshaByte",
    locale: "en_US",
    type: "website",
    url: "https://yarshabyte.vercel.app",
    images: [
      {
        url: "https://yarshabyte.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "YarshaByte | Web design & development in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YarshaByte | Creative approach to your business",
    description:
      "YarshaByte helps Nepali businesses create websites, portfolios, branding, and digital setups for a professional online presence.",
    images: ["https://yarshabyte.vercel.app/og-image.png"],
    creator: "@yarshabyte",
    site: "@yarshabyte",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full subpixel-antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/SuisseIntl-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/TTTunnels-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/TTLakesNeue-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Structured Data: Organization & LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "YarshaByte",
              url: "https://yarshabyte.vercel.app",
              logo: "https://yarshabyte.vercel.app/logo.webp",
              sameAs: [
                "https://www.facebook.com/yarshabyte",
                "https://www.instagram.com/yarshabyte",
                "https://www.linkedin.com/company/yarshabyte",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "YarshaByte",
              description:
                "Web design, development, branding, and digital services in Nepal",
              url: "https://yarshabyte.vercel.app",
              telephone: "+977-1234567890",
              address: {
                "@type": "PostalAddress",
                addressCountry: "NP",
                addressLocality: "Kathmandu",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full font-sans text-foreground">
        <PageLoader>
          <PageWaveTransition />
          <HeroCanvasShell />
          <SiteHeader />
          <div className="site-frame">
            <ScrollHexBackground />
            <div className="site-frame-content">
              <SmoothScrollProvider>
                {children}
              </SmoothScrollProvider>
            </div>
          </div>
        </PageLoader>
      </body>
    </html>
  );
}
