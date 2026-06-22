import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import LoadingScreen from "@/components/layout/LoadingScreen";
import ScrollFX from "@/components/ScrollFX";
import CursorTrail from "@/components/CursorTrail";

// Display / headlines
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
// Body / paragraphs
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Labels / data / eyebrows
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jet", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Sonic Growth Agency — We don't manage. We grow.",
  description: "Sonic is a full-service growth agency building content, paid media, and growth systems for brands across the MENA region. 14 clients, an average of 2–3x growth in 30–90 days.",
};

// Runs before React hydrates — prevents flash of wrong theme
const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch (e) {}
    // Only hide reveal elements when JS is running, so no-JS still shows content.
    document.documentElement.classList.add('js-reveal');
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LoadingScreen />
        <CursorTrail />
        <ScrollFX />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
