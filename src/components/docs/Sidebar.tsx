"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { docsNavigation, DocsSection } from "@/data/docs";

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Handle CMD+K shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Filter properties based on search query
    const filteredNavigation = useMemo(() => {
        if (!searchQuery.trim()) return docsNavigation;

        const query = searchQuery.toLowerCase();
        return docsNavigation.map((section) => {
            const matchesItems = section.items.filter((item) => {
                const titleMatch = item.title.toLowerCase().includes(query);
                const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(query));
                return titleMatch || tagsMatch;
            });

            if (matchesItems.length > 0) {
                return {
                    ...section,
                    items: matchesItems,
                };
            }
            return null;
        }).filter(Boolean) as DocsSection[];
    }, [searchQuery]);

    return (
        <>
            {/* Mobile Navbar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800/50 px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/bot.png" alt="Televerse" width={32} height={32} />
                    <span className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
                        televerse.
                    </span>
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-zinc-400 hover:text-white p-1"
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Backdrop */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content (Desktop & Mobile Drawer) */}
            <aside
                className={`
                    fixed lg:left-0 top-0 h-full w-72 bg-black/95 lg:bg-black/80 backdrop-blur-md 
                    border-r border-zinc-800/50 z-50 overflow-y-auto transition-transform duration-300 ease-in-out flex flex-col
                    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Logo */}
                <div className="flex flex-col gap-6 px-6 py-5 border-b border-zinc-800/50 shrink-0">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/bot.png" alt="Televerse" width={32} height={32} />
                        <span className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
                            televerse.
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="px-4 py-6 flex-1">
                    {/* Search Input */}
                    <div className="relative group mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search docs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-sm rounded-lg focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 block w-full pl-9 pr-12 py-2 placeholder-zinc-600 focus:outline-none transition-all"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <kbd className="hidden lg:inline-flex items-center h-5 px-1.5 text-[10px] font-mono font-medium text-zinc-500 bg-zinc-800/50 rounded border border-zinc-700/50">
                                ⌘K
                            </kbd>
                        </div>
                    </div>

                    {filteredNavigation.length === 0 ? (
                        <div className="text-center text-zinc-500 py-8 text-sm">
                            No results found for "{searchQuery}"
                        </div>
                    ) : (
                        filteredNavigation.map((section) => (
                            <div key={section.title} className="mb-6">
                                <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-white">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                                                        ? "bg-zinc-800/70 text-white font-medium"
                                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                                                        }`}
                                                >
                                                    &nbsp;&nbsp; {item.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))
                    )}
                </nav>

                {/* Footer Links */}
                <div className="mt-auto px-4 py-4 border-t border-zinc-800/50 bg-black/80">
                    <div className="flex flex-col gap-2">
                        <Link
                            href="https://pub.dev/packages/televerse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/40 transition-colors"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                            pub.dev
                        </Link>
                        <Link
                            href="https://github.com/theweaverlabs/televerse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/40 transition-colors"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
