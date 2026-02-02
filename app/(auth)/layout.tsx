import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import logo from "@/public/logo.png";
import logoWhite from "@/public/logo-white.png";
import { BackgroundGrid } from "@/components/ui/background-grid";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-primary relative overflow-hidden">
      <BackgroundGrid />
      <header className="relative flex shrink-0 justify-center pt-8 pb-2">
        <Link
          href="/"
          className="flex items-center gap-2 uppercase font-extrabold tracking-wider text-text-primary transition-colors hover:text-green-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:ring-offset-2 rounded-lg px-2 py-1"
          aria-label="Flynt home"
        >
          <div className="relative w-[30%] mx-auto h-auto min-w-[120px]">
            <Image
              alt="logo"
              src={logo}
              width={120}
              height={40}
              className="w-full h-auto object-contain object-center block dark:hidden"
              priority
            />
            <Image
              alt="logo"
              src={logoWhite}
              width={120}
              height={40}
              className="w-full h-auto object-contain object-center hidden dark:block"
              priority
            />
          </div>
        </Link>
        <div className="absolute right-4 top-8">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full">{children}</div>
      </main>

      <footer className="shrink-0 py-6 text-center text-xs text-text-muted">
        All rights reserved © 2026 Flynt
      </footer>
    </div>
  );
}
