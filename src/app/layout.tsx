import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://revive-auto-works.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Revive Auto Works | Expert Automotive Repairs & Vehicle Servicing",
    template: "%s | Revive Auto Works",
  },
  description:
    "Professional vehicle diagnostics, repairs and maintenance services in Namibia. Driven by excellence. Reliable automotive solutions to keep your vehicle running safely and smoothly.",
  keywords: [
    "Revive Auto Works",
    "automotive repairs Namibia",
    "vehicle servicing Windhoek",
    "car diagnostics",
    "brake repairs",
    "suspension repairs",
    "auto workshop",
    "mechanic Namibia",
    "engine repairs",
    "pre-purchase inspection",
  ],
  authors: [{ name: "Revive Auto Works" }],
  creator: "Revive Auto Works",
  publisher: "Revive Auto Works",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Revive Auto Works | Expert Automotive Repairs & Vehicle Servicing",
    description:
      "Professional vehicle diagnostics, repairs and maintenance services. Driven by excellence. Reliable automotive solutions to keep your vehicle running safely and smoothly.",
    url: SITE_URL,
    siteName: "Revive Auto Works",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Revive Auto Works — Driven By Excellence",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revive Auto Works | Expert Automotive Repairs & Vehicle Servicing",
    description:
      "Professional vehicle diagnostics, repairs and maintenance services. Driven by excellence.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon-32.png"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "AutoRepair",
  applicationName: "Revive Auto Works",
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#090a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${manrope.variable} antialiased`}
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
