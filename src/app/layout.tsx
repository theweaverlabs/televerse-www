import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Plus Jakarta Sans - modern, geometric, excellent legibility for UI/body
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Outfit - geometric, highly distinctive, premium feel for branding
const outfit = Outfit({
  variable: "--font-outfit",
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
    <html lang="en" className="dark">
      <body
        className={`${plusJakarta.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
