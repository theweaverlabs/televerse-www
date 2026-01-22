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
  title: "Televerse | The Dart Telegram Bot Framework",
  description:
    "A powerful, type-safe, and highly extensible Telegram Bot framework built with Dart. Zero dynamic types, full generic support, enterprise ready.",
  keywords: [
    "telegram bot",
    "dart",
    "televerse",
    "telegram api",
    "bot framework",
    "telegram bot api",
  ],
  authors: [{ name: "Weaver Labs", url: "https://weaverlabs.ca" }],
  openGraph: {
    title: "Televerse | The Dart Telegram Bot Framework",
    description:
      "Your gateway to seamless Telegram Bot development. Zero dynamic types, full generic support.",
    url: "https://televerse.weaverlabs.ca",
    siteName: "Televerse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Televerse | The Dart Telegram Bot Framework",
    description:
      "Your gateway to seamless Telegram Bot development. Zero dynamic types, full generic support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
