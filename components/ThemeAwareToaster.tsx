"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeAwareToaster() {
	const { theme } = useTheme();
	return (
		<Toaster
			position="top-right"
			richColors
			theme={theme === "dark" ? "dark" : "light"}
		/>
	);
}
