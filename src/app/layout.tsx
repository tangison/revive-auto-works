import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://revive-auto-works.vercel.app"),
  title: "Revive Auto Works | Expert Automotive Repairs & Vehicle Servicing",
  description:
    "Professional vehicle diagnostics, repairs and maintenance services. Driven by excellence. Reliable automotive solutions to keep your vehicle running safely and smoothly.",
  keywords: [
    "Revive Auto Works",
    "automotive repairs",
    "vehicle servicing",
    "car diagnostics",
    "brake repairs",
    "suspension",
    "auto workshop",
    "mechanic",
    "Namibia",
    "Windhoek",
  ],
  authors: [{ name: "Revive Auto Works" }],
  creator: "Revive Auto Works",
  publisher: "Revive Auto Works",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Revive Auto Works | Expert Automotive Repairs & Vehicle Servicing",
    description:
      "Professional vehicle diagnostics, repairs and maintenance services. Driven by excellence.",
    url: "https://revive-auto-works.vercel.app",
    siteName: "Revive Auto Works",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revive Auto Works | Expert Automotive Repairs & Vehicle Servicing",
    description:
      "Professional vehicle diagnostics, repairs and maintenance services. Driven by excellence.",
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
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
