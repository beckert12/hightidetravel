import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const SITE_URL = "https://hightidetravel.co";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "High Tide Travel — Travel More. Spend Less.",
    template: "%s · High Tide Travel",
  },
  description:
    "High Tide Travel helps you master travel credit cards, points, and miles. Explore the best cards, estimate award trips, and ride the high tide to better travel.",
  keywords: [
    "travel rewards",
    "credit cards",
    "points and miles",
    "travel hacking",
    "award travel",
    "best travel credit cards",
    "High Tide Travel",
  ],
  authors: [{ name: "High Tide Travel" }],
  creator: "High Tide Travel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "High Tide Travel — Travel More. Spend Less.",
    description:
      "Master travel credit cards, points, and miles. Explore the best cards and estimate your next award trip.",
    siteName: "High Tide Travel",
  },
  twitter: {
    card: "summary_large_image",
    title: "High Tide Travel — Travel More. Spend Less.",
    description:
      "Master travel credit cards, points, and miles. Explore the best cards and estimate your next award trip.",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-navy font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
