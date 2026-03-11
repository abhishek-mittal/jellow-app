import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jellow - Know Your Food",
  description: "Scan, learn, and make healthier food choices with Jellow",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Jellow",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F5F2EC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${dmSans.variable} ${inter.variable}`}>
      <body className="bg-j-cream font-[var(--font-body)] text-j-navy antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
