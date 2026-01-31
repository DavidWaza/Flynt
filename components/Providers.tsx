"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { DebtProvider } from "@/contexts/DebtContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DebtProvider>{children}</DebtProvider>
    </ThemeProvider>
  );
}
