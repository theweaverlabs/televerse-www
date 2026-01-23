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
        ],
    },
    {
        title: "Core Concepts",
        items: [
            {
                title: "Features",
                href: "/docs/features",
                tags: ["capabilities", "what can it do", "plugin system"]
            },
        ],
    },
];
