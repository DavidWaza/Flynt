"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import ProductPreview from "@/components/landing/ProductPreview";
import TrustStats from "@/components/landing/TrustStats";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="container  px-4 py-6 mx-auto max-w-7xl ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Flynt"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-[25%] object-contain dark:hidden"
            />
            <Image
              src="/logo-white.png"
              alt="Flynt"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-[25%] object-contain hidden dark:block"
            />
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/waitlist"
              className="rounded-lg border border-border-subtle bg-transparent px-4 py-2 text-sm font-semibold text-text-primary/90 transition hover:bg-green-primary/6"
            >
              Join waitlist
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-green-primary px-6 py-2.5 text-sm font-semibold text-bg-primary transition-all hover:bg-green-light"
            >
              View Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        <Hero />

        {/* How it works */}
        <HowItWorks />

        {/* Core capabilities */}
        <CoreCapabilities />

        {/* Product previews */}
        <ProductPreview />

        {/* Trust & stats + waitlist CTA */}
        <TrustStats />
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-text-muted">
        <p>© 2026 Flynt Finance.</p>
      </footer>
    </div>
  );
}
