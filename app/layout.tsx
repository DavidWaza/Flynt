import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flynt - Spend Smarter, Save Faster",
  description:
    "AI-powered financial control that prevents overspending before it happens",
  keywords: [
    "fintech",
    "budgeting",
    "virtual cards",
    "spending control",
    "Nigeria",
  ],
  authors: [{ name: "Flynt Finance" }],
  openGraph: {
    title: "Flynt - Spend Smarter, Save Faster",
    description:
      "AI-powered financial control that prevents overspending before it happens",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-bg-primary text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
