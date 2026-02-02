"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Flynt"
              width={120}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="rounded-lg bg-green-primary px-6 py-2.5 text-sm font-semibold text-bg-primary transition-all hover:bg-green-light"
            >
              View Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-text-primary md:text-6xl">
            Spend Smarter,
            <br />
            <span className="text-green-primary">Save Faster</span>
          </h1>
          <p className="mb-8 text-xl text-text-secondary md:text-2xl">
            AI-powered financial control that prevents overspending before it
            happens
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="w-full rounded-lg bg-green-primary px-8 py-4 text-lg font-semibold text-bg-primary transition-all hover:bg-green-light sm:w-auto"
            >
              Try Demo →
            </Link>
            <button className="w-full rounded-lg border-2 border-green-primary px-8 py-4 text-lg font-semibold text-green-primary transition-all hover:bg-green-primary/10 sm:w-auto">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-24 grid max-w-6xl gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-primary">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-text-primary">
              Predictive Intelligence
            </h3>
            <p className="text-text-secondary">
              AI predicts when you'll exceed your budget and alerts you before
              it happens
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-primary">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-text-primary">
              Enforced Control
            </h3>
            <p className="text-text-secondary">
              Virtual cards with budget limits that physically prevent
              overspending
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-primary">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-text-primary">
              Smart Insights
            </h3>
            <p className="text-text-secondary">
              Detect subscriptions, money leaks, and spending patterns
              automatically
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-24 grid max-w-4xl gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mb-2 text-4xl font-bold text-green-primary">
              85%
            </div>
            <div className="text-text-secondary">Budget Adherence Rate</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-green-primary">
              ₦60k
            </div>
            <div className="text-text-secondary">Average Monthly Savings</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-green-primary">
              &lt; 2s
            </div>
            <div className="text-text-secondary">Card Authorization Time</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-24 max-w-3xl rounded-2xl bg-white border border-gray-200 shadow-sm p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-primary">
            Ready to take control?
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            See how Flynt prevents overspending in our interactive demo
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-lg bg-green-primary px-8 py-4 text-lg font-semibold text-bg-primary transition-all hover:bg-green-light"
          >
            Launch Demo Dashboard →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-text-muted">
        <p>© 2026 Flynt Finance. Built for Nigerian innovators.</p>
      </footer>
    </div>
  );
}
