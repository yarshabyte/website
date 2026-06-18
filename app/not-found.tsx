import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | YarshaByte",
  description: "The page you're looking for doesn't exist. Return to YarshaByte home.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-foreground/80">
          Page Not Found
        </h2>
        <p className="mb-8 text-foreground/60">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It might
          have been moved or deleted.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-foreground px-6 py-3 text-background transition-opacity hover:opacity-80"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-foreground px-6 py-3 text-foreground transition-colors hover:bg-foreground/5"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-12 space-y-4 text-sm text-foreground/50">
          <p>Popular pages:</p>
          <ul className="space-y-2">
            <li>
              <Link href="/work" className="text-foreground/70 hover:text-foreground">
                Our Work
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-foreground/70 hover:text-foreground">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-foreground/70 hover:text-foreground">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
