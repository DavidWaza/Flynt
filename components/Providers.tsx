"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { DebtProvider } from "@/contexts/DebtContext";
import ThemeAwareToaster from "@/components/ThemeAwareToaster";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<DebtProvider>{children}</DebtProvider>
			<ThemeAwareToaster />
		</ThemeProvider>
	);
}
