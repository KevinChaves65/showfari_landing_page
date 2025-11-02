import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Showfari — Discover Toronto’s Scene",
  description:
    "Join Showfari’s beta and explore Toronto’s live music community.",
  openGraph: {
    title: "Showfari — Discover Toronto’s Local Scene",
    description:
      "Join our beta and explore Toronto’s most exciting performances in the city.",
    url: "https://showfari.ca", 
    siteName: "Showfari",
    locale: "en_CA",
    type: "website",
    images: [], 
  },
  twitter: {
    card: "summary",
    title: "Showfari — Discover Toronto’s Local Scene",
    description:
      "Discover and explore Toronto’s vibrant music community with Showfari.",
    images: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
