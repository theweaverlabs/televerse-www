import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Inter - clean, modern, highly readable for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Space Grotesk - distinctive, geometric, perfect for headlines/branding
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// JetBrains Mono - excellent for code, ligatures, designed for developers
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
