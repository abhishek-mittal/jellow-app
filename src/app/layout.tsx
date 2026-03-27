import type { Metadata, Viewport } from "next";
import { Work_Sans, Archivo } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const archivo = Archivo({
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
  themeColor: "#F7F8FA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${workSans.variable} ${archivo.variable}`}>
      <body className={`bg-gray-50 font-[var(--font-heading)] text-gray-900 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
