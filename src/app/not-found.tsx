"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const codeRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(codeRef.current, { opacity: 0, y: 20 });
            gsap.set(textRef.current, { opacity: 0, y: 20 });

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animate 404 code
            tl.to(codeRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
            });

            // Animate text elements stagger
            tl.to(
                textRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.6"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Magnetic button effect (reused from page.tsx)
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
        <div
            ref={containerRef}
            className="min-h-screen bg-black text-white overflow-hidden font-[family-name:var(--font-inter)] flex flex-col"
        >
            {/* Gradient orbs background (Consistent with home page) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-zinc-700/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/50 rounded-full blur-3xl" />
            </div>

            {/* Navigation (Simplified) */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-zinc-800/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/bot.png" alt="Televerse" width={36} height={36} />
                        <span className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
                            Televerse
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-6 relative z-10">
                <div ref={codeRef} className="text-center mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-bold leading-none font-[family-name:var(--font-space-grotesk)] bg-gradient-to-b from-white via-zinc-400 to-zinc-900 bg-clip-text text-transparent opacity-80 select-none">
                        404
                    </h1>
                </div>

                <div ref={textRef} className="text-center max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
                        Signal Lost in Space
                    </h2>
                    <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
                        The page you're looking for seems to have drifted away into the void.
                        Let's get you back to familiar coordinates.
                    </p>

                    <Link
                        href="/"
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
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Return to Mission Control
                    </Link>
                </div>
            </main>

            {/* Footer (Simplified) */}
            <footer className="py-8 px-6 border-t border-zinc-800/50 relative z-10">
                <div className="max-w-6xl mx-auto text-center text-zinc-500 text-sm">
                    <p>
                        Made with ❤️ by{" "}
                        <Link
                            href="https://weaverlabs.ca"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            Weaver Labs
                        </Link>
                    </p>
                </div>
            </footer>
        </div>
    );
}
