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

// Canonical production domain
const SITE_URL = "https://www.reviveautoworks.cc";
const AGENCY_URL = "https://studio.tangison.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Revive Auto Works | Auto Repairs & Servicing in Namibia",
    template: "%s | Revive Auto Works",
  },
  description:
    "Professional vehicle diagnostics, repairs and maintenance in Namibia. 10+ years experience, 5,000+ vehicles serviced, 100% OEM parts. Book via WhatsApp.",
  keywords: [
    "Revive Auto Works",
    "automotive repairs Namibia",
    "vehicle servicing Windhoek",
    "car diagnostics Namibia",
    "brake repairs Windhoek",
    "suspension repairs",
    "auto workshop Namibia",
    "mechanic Windhoek",
    "engine repairs Namibia",
    "pre-purchase inspection",
    "electrical system repairs",
    "routine servicing",
    "oil change Namibia",
    "OEM parts",
  ],
  authors: [
    { name: "Revive Auto Works" },
    { name: "Tangison Studio", url: AGENCY_URL },
  ],
  creator: "Revive Auto Works",
  publisher: "Revive Auto Works",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Revive Auto Works | Auto Repairs & Servicing in Namibia",
    description:
      "Professional vehicle diagnostics, repairs and maintenance in Namibia. 10+ years experience, 5,000+ vehicles serviced. Driven by excellence.",
    url: SITE_URL,
    siteName: "Revive Auto Works",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Revive Auto Works — Driven By Excellence. Expert automotive repairs and vehicle servicing in Namibia.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revive Auto Works | Auto Repairs & Servicing in Namibia",
    description:
      "Professional vehicle diagnostics, repairs and maintenance. 10+ years experience. Driven by excellence.",
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
  other: {
    "geo.region": "NA",
    "geo.placename": "Namibia",
    "geo.position": "-22.5609;14.4947",
    "ICBM": "-22.5609, 14.4947",
    "author": "Tangison Studio (https://studio.tangison.com)",
    "designer": "Tangison Studio",
    "generator": "Next.js",
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
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="author" href="/humans.txt" />
        <link rel="me" href={AGENCY_URL} title="Designed by Tangison Studio" />
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
