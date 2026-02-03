"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import ProductPreview from "@/components/landing/ProductPreview";
import TrustStats from "@/components/landing/TrustStats";

const LOGO_WIDTH = 120;
const LOGO_HEIGHT = 40;

export default function Home() {
	return (
		<div className="min-h-screen bg-bg-primary">
			{/* Header */}
			<header className="container px-4 py-6 mx-auto max-w-7xl sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div
							className="shrink-0 bg-contain bg-no-repeat bg-center"
							style={{
								width: LOGO_WIDTH,
								height: LOGO_HEIGHT,
								backgroundImage: "var(--header-logo-url)",
							}}
							role="img"
							aria-label="Flynt"
						/>
					</div>
					<div className="flex items-center gap-3">
						<ThemeToggle />
						<Link
							href="/waitlist"
							className="rounded-lg border border-border-primary bg-transparent px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-green-primary/10"
						>
							Join waitlist
						</Link>
						<Link
							href="/login"
							className="rounded-lg bg-green-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-hover"
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
