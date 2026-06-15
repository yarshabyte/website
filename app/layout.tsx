import type { Metadata } from "next";

import { PageLoader } from "@/components/page-loader";
import { PageWaveTransition } from "@/components/page-wave-transition";
import { ScrollHexBackground } from "@/components/scroll-hex-background";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {

  title: "YarsaByte | Your Digital Presence Partner in Nepal",
  description:
    "YarsaByte helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital setups for a professional online presence.",
  metadataBase: new URL("https://yarsabyte.vercel.app"),
  alternates: { canonical: "https://yarsabyte.vercel.app" },
  openGraph: {
    title: "YarsaByte | Your Digital Presence Partner in Nepal",
    description:
      "YarsaByte helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital setups for a professional online presence.",
    siteName: "YarsaByte",
    locale: "en_US",
    type: "website",
    url: "https://yarsabyte.vercel.app",
    images: [
      {
        url: "https://yarsabyte.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "YarsaByte | Web design & development in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YarsaByte | Your Digital Presence Partner in Nepal",
    description:
      "YarsaByte helps Nepali businesses create websites, portfolios, branding, and digital setups for a professional online presence.",
    images: ["https://yarsabyte.vercel.app/og-image.png"],
    creator: "@yarsabyte",
    site: "@yarsabyte",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
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
              name: "YarsaByte",
              url: "https://yarsabyte.vercel.app",
              logo: "https://yarsabyte.vercel.app/logo.png",
              sameAs: [
                "https://www.facebook.com/yarsabyte",
                "https://www.instagram.com/yarsabyte",
                "https://www.linkedin.com/company/yarsabyte",
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
              name: "YarsaByte",
              description:
                "Web design, development, branding, and digital services in Nepal",
              url: "https://yarsabyte.vercel.app",
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
          <div className="site-frame">
            <ScrollHexBackground />
            <div className="site-frame-content">
              <SmoothScrollProvider>
                <SiteHeader />
                {children}
              </SmoothScrollProvider>
            </div>
          </div>
        </PageLoader>
      </body>
    </html>
  );
}
