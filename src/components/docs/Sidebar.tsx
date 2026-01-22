"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface NavItem {
    title: string;
    href: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const navigation: NavSection[] = [
    {
        title: "Getting Started",
        items: [
            { title: "Overview", href: "/docs" },
            { title: "Installation", href: "/docs/installation" },
            { title: "Quick Start", href: "/docs/getting-started" },
        ],
    },
    {
        title: "Core Concepts",
        items: [
            { title: "Features", href: "/docs/features" },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-72 bg-black/80 backdrop-blur-md border-r border-zinc-800/50 z-40 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-800/50">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/bot.png" alt="Televerse" width={32} height={32} />
                    <span className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)]">
                        televerse.
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6">
                {navigation.map((section) => (
                    <div key={section.title} className="mb-6">
                        <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                                                ? "bg-zinc-800/70 text-white font-medium"
                                                : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                                                }`}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Footer Links */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-zinc-800/50 bg-black/80">
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
    );
}
