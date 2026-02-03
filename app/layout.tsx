import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
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

const themeScript = `
(function() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
  document.documentElement.classList.add(theme);
})();
`;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="font-sans antialiased bg-bg-primary text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
