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

const siteUrl = "https://televerse.weaverlabs.ca";
const ogImage = `${siteUrl}/og.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Televerse | The Dart Telegram Bot Framework",
    template: "%s | Televerse",
  },
  description:
    "A powerful, type-safe, and highly extensible Telegram Bot framework built with Dart. Zero dynamic types, full generic support, enterprise ready.",
  keywords: [
    "telegram bot",
    "dart",
    "televerse",
    "telegram api",
    "bot framework",
    "telegram bot api",
    "dart telegram",
    "bot development",
    "type-safe bot",
  ],
  authors: [{ name: "Weaver Labs", url: "https://weaverlabs.ca" }],
  creator: "Weaver Labs",
  publisher: "Weaver Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Televerse",
    title: "Televerse | The Dart Telegram Bot Framework",
    description:
      "Your gateway to seamless Telegram Bot development. Zero dynamic types, full generic support, enterprise ready.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Televerse - The Dart Telegram Bot Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Televerse | The Dart Telegram Bot Framework",
    description:
      "Your gateway to seamless Telegram Bot development. Zero dynamic types, full generic support.",
    images: [ogImage],
    creator: "@theweaverlabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/bot.png",
    apple: "/bot.png",
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
