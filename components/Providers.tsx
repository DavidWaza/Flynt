"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DebtProvider } from "@/contexts/DebtContext";
import ThemeAwareToaster from "@/components/ThemeAwareToaster";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<DebtProvider>{children}</DebtProvider>
				<ThemeAwareToaster />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
