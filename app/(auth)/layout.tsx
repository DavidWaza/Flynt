import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col bg-bg-primary">
			<header className="relative flex shrink-0 justify-center pt-8 pb-2">
				<Link
					href="/"
					className="flex items-center gap-2 uppercase font-extrabold tracking-wider text-text-primary transition-colors hover:text-green-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:ring-offset-2 rounded-lg px-2 py-1"
					aria-label="Flynt home"
				>
					FLYNT
				</Link>
				<div className="absolute right-4 top-8">
					<ThemeToggle />
				</div>
			</header>

			<main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
				<div className="w-full max-w-md">{children}</div>
			</main>

			<footer className="shrink-0 py-6 text-center text-xs text-text-muted">
				All rights reserved © 2026 Flynt
			</footer>
		</div>
	);
}
