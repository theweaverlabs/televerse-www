"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Prism from "prismjs";
// Import additional Prism languages for Dart-like syntax
import "prismjs/components/prism-dart";
import "prismjs/components/prism-javascript";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { botApiVersion } from "@/consts";

// Prevent Prism from automatically highlighting all code blocks
Prism.manual = true;

gsap.registerPlugin(ScrollTrigger);

// Feature data
const features = [
  {
    title: "Zero Dynamic Types",
    description:
      "Televerse uses 0 dynamic types on the public interface. Full generic support with strict type safety throughout your entire bot.",
    icon: "🎯",
  },
  {
    title: "80+ Built-in Filters",
    description:
      "Revolutionary filter system with logical operators. Combine filters using +, *, and - for complex matching patterns.",
    icon: "🔍",
  },
  {
    title: "Plugin Architecture",
    description:
      "Session management, conversations, logging, and custom plugins. Extend your bot's capabilities effortlessly.",
    icon: "🔌",
  },
  {
    title: "Built-in Webhook Server",
    description:
      "Start a production-ready webhook bot with a single method call. Perfect for serverless deployments.",
    icon: "🌐",
  },
  {
    title: "Conversation API",
    description:
      "Engage users in multi-step conversations with timeout handling, validation, and state management.",
    icon: "💬",
  },
  {
    title: "Local Bot API Support",
    description:
      "Host your own Bot API server for increased privacy and file size limits with Bot.local constructor.",
    icon: "🏠",
  },
];

// Stats data
const stats = [
  { value: botApiVersion, label: "Bot API Version" },
  { value: "80+", label: "Built-in Filters" },
  { value: "0", label: "Dynamic Types" },
  { value: "3", label: "Built-in Plugins" },
];

// Code example
const codeExample = `import 'package:televerse/televerse.dart';

void main() async {
  final bot = Bot<Context>('YOUR_BOT_TOKEN');
  
  // Command handlers
  bot.command('start', (ctx) => ctx.reply('🚀 Welcome to Televerse!'));
  
  // Filter-based handlers
  bot.on(bot.filters.photo, (ctx) => ctx.reply('Nice photo! 📸'));
  
  // Pattern matching
  bot.hears(RegExp(r'(?i)hello'), (ctx) => ctx.reply('Hello there! 👋'));
  
  await bot.start();
}`;

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const gradientTextRef = useRef<HTMLSpanElement>(null);

  // Syntax highlight code with Prism
  const highlightedCode = Prism.highlight(
    codeExample,
    Prism.languages.dart,
    "dart"
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide elements
      gsap.set([taglineRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 60,
      });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8, rotation: -10 });

      // Hero timeline
      const heroTl = gsap.timeline({ delay: 0.3 });

      // Logo entrance with bounce and rotation
      heroTl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });

      // Floating animation for logo
      gsap.to(logoRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // Text reveal with stagger
      heroTl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Gradient text animation
      gsap.to(gradientTextRef.current, {
        backgroundPosition: "200% center",
        duration: 8,
        repeat: -1,
        ease: "linear",
      });

      heroTl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.7"
      );

      heroTl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Features scroll animation
      const featureCards =
        featuresRef.current?.querySelectorAll(".feature-card");
      if (featureCards) {
        gsap.set(featureCards, { opacity: 0, y: 80, scale: 0.95 });

        ScrollTrigger.batch(featureCards, {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            });
          },
          start: "top 85%",
        });
      }

      // Code block animation
      if (codeRef.current) {
        gsap.set(codeRef.current, { opacity: 0, x: -60 });

        ScrollTrigger.create({
          trigger: codeRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(codeRef.current, {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
            });
          },
        });
      }

      // Stats counter animation
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        gsap.set(statItems, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(statItems, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            });
          },
        });
      }

      // Final CTA parallax
      if (finalCtaRef.current) {
        gsap.set(finalCtaRef.current, { opacity: 0, scale: 0.95 });

        ScrollTrigger.create({
          trigger: finalCtaRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(finalCtaRef.current, {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-[family-name:var(--font-inter)]">
      {/* Gradient orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-zinc-700/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/50 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20"
      >
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <Image
            src="/bot.png"
            alt="Televerse Logo"
            width={140}
            height={140}
            className="drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <h1
          ref={taglineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-5xl leading-tight font-[family-name:var(--font-space-grotesk)]"
        >
          Your Gateway to Seamless{" "}
          <span
            ref={gradientTextRef}
            className="inline-block bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            Telegram Bot Development
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl text-zinc-400 text-center max-w-2xl leading-relaxed"
        >
          A powerful, type-safe, and highly extensible Telegram Bot framework
          built with Dart. Zero dynamic types. Full generic support. Enterprise
          ready.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="https://pub.dev/packages/televerse"
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-zinc-200 transition-colors inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Install from pub.dev
          </Link>
          <Link
            href="/docs"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="px-8 py-4 border border-zinc-700 rounded-full font-semibold text-lg hover:bg-zinc-900 hover:border-zinc-600 transition-all inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            Read the docs
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 px-6 border-y border-zinc-800/50"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent font-[family-name:var(--font-space-grotesk)]">
                {stat.value}
              </div>
              <div className="mt-2 text-zinc-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Elegantly Simple, Incredibly Powerful
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Get your bot running in minutes with clean, intuitive code that
              scales from simple bots to enterprise applications.
            </p>
          </div>

          <div
            ref={codeRef}
            className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden"
          >
            {/* Window controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-4 text-zinc-500 text-sm font-[family-name:var(--font-jetbrains-mono)]">
                main.dart
              </span>
            </div>

            {/* Code content with Prism syntax highlighting */}
            <div className="p-6 overflow-x-auto">
              <pre
                suppressHydrationWarning
                className="text-sm md:text-base leading-relaxed"
              >
                <code
                  className="language-dart font-[family-name:var(--font-jetbrains-mono)]"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Built for Modern Bot Development
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Everything you need to build powerful Telegram bots with
              confidence & clean architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group p-6 bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-all hover:bg-zinc-900/50"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors font-[family-name:var(--font-space-grotesk)]">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter System Showcase */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-zinc-900/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Revolutionary Filter System
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Combine filters using logical operators for powerful, expressive
              patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <div className="text-2xl mb-4">➕ OR Operator</div>
              <code className="text-sm text-zinc-400 font-[family-name:var(--font-jetbrains-mono)] block bg-black/30 p-3 rounded-lg">
                bot.filters.photo + bot.filters.video
              </code>
              <p className="mt-3 text-zinc-500 text-sm">
                Match photos OR videos
              </p>
            </div>
            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <div className="text-2xl mb-4">✖️ AND Operator</div>
              <code className="text-sm text-zinc-400 font-[family-name:var(--font-jetbrains-mono)] block bg-black/30 p-3 rounded-lg">
                bot.filters.text * bot.filters.groupChat
              </code>
              <p className="mt-3 text-zinc-500 text-sm">
                Match text AND in group
              </p>
            </div>
            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <div className="text-2xl mb-4">➖ NOT Operator</div>
              <code className="text-sm text-zinc-400 font-[family-name:var(--font-jetbrains-mono)] block bg-black/30 p-3 rounded-lg">
                bot.filters.anyMessage - bot.filters.command
              </code>
              <p className="mt-3 text-zinc-500 text-sm">
                Match any except commands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={finalCtaRef} className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            Ready to Build?
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join hundreds of developers building amazing Telegram bots with
            Televerse. Start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://pub.dev/packages/televerse"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="px-10 py-5 bg-white text-black rounded-full font-semibold text-lg hover:bg-zinc-200 transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Started Now
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="https://github.com/theweaverlabs/televerse"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="px-10 py-5 border border-zinc-700 rounded-full font-semibold text-lg hover:bg-zinc-900 hover:border-zinc-600 transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image src="/bot.png" alt="Televerse" width={32} height={32} />
              <span className="font-semibold font-[family-name:var(--font-space-grotesk)]">
                televerse.
              </span>
              <span className="text-zinc-500 text-sm">
                Bot API {botApiVersion} • Built with Dart
              </span>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="https://pub.dev/packages/televerse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors text-sm"
              >
                pub.dev
              </Link>
              <Link
                href="/docs"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors text-sm"
              >
                docs
              </Link>
              <Link
                href="https://github.com/theweaverlabs/televerse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors text-sm"
              >
                source
              </Link>
              <Link
                href="https://telegram.me/TeleverseDart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors text-sm"
              >
                chat
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center text-zinc-500 text-sm">
            <p>Made with ❤️ by <Link href="https://weaverlabs.ca" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-sm">Weaver Labs</Link></p>
          </div>
        </div>
      </footer>
    </div>
  );
}