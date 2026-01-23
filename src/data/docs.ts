export interface DocsItem {
    title: string;
    href: string;
    tags?: string[]; // Keywords for search
}

export interface DocsSection {
    title: string;
    items: DocsItem[];
}

export const docsNavigation: DocsSection[] = [
    {
        title: "Getting Started",
        items: [
            {
                title: "Overview",
                href: "/docs",
                tags: ["introduction", "what is televerse", "basics"]
            },
            {
                title: "Installation",
                href: "/docs/installation",
                tags: ["setup", "add dependency", "pub add"]
            },
            {
                title: "Quick Start",
                href: "/docs/getting-started",
                tags: ["hello world", "first bot", "example"]
            },
            {
                title: "Features",
                href: "/docs/features",
                tags: ["capabilities", "what can it do", "plugin system"]
            },
        ],
    },
    {
        title: "Core Concepts",
        items: [
            {
                title: "Bot Class",
                href: "/docs/core-concepts/bot",
                tags: ["bot", "core", "initialization", "webhook", "polling"]
            },
            {
                title: "Context",
                href: "/docs/core-concepts/context",
                tags: ["context", "update", "reply", "methods", "properties"]
            },
            {
                title: "Raw API",
                href: "/docs/core-concepts/raw-api",
                tags: ["api", "methods", "send message", "send photo", "raw"]
            },
        ],
    },
];
