"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-zinc-800/50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src="/bot.png" alt="Televerse" width={36} height={36} />
                        <span className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
                            televerse.
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
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
                        <Link
                            href="https://pub.dev/packages/televerse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
                        >
                            get started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-zinc-400 hover:text-white p-2"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pt-4 pb-2 flex flex-col gap-4 border-t border-zinc-800/50 mt-4 animate-in slide-in-from-top-4 fade-in duration-200">
                        <Link
                            href="/docs"
                            className="text-zinc-400 hover:text-white transition-colors text-sm py-2 block"
                            onClick={() => setIsOpen(false)}
                        >
                            Docs
                        </Link>
                        <Link
                            href="https://github.com/theweaverlabs/televerse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors text-sm py-2 block"
                            onClick={() => setIsOpen(false)}
                        >
                            GitHub
                        </Link>
                        <Link
                            href="https://telegram.me/TeleverseDart"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors text-sm py-2 block"
                            onClick={() => setIsOpen(false)}
                        >
                            Telegram
                        </Link>
                        <Link
                            href="https://pub.dev/packages/televerse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-zinc-200 transition-colors text-center block"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};
