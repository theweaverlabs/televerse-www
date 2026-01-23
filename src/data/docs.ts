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
            {
                title: "Receiving Updates",
                href: "/docs/core-concepts/receiving-updates",
                tags: ["webhook", "polling", "long polling", "updates", "fetcher"]
            },
        ],
    },
    {
        title: "Building Interactive Bots",
        items: [
            {
                title: "Keyboards",
                href: "/docs/interactive/keyboards",
                tags: ["keyboard", "inline keyboard", "buttons", "reply markup", "inline buttons"]
            },
            {
                title: "Sending & Receiving Files",
                href: "/docs/core-concepts/files",
                tags: ["files", "upload", "download", "photo", "video", "document", "input file", "media"]
            },
            {
                title: "Handle Inline Queries",
                href: "/docs/interactive/inline-queries",
                tags: ["inline", "inline mode", "inline queries", "inline results", "search", "quote bot"]
            },
        ],
    },
    {
        title: "Advanced",
        items: [
            {
                title: "Custom Context",
                href: "/docs/advanced/custom-context",
                tags: ["custom", "context", "extend", "factory", "generic", "type-safe", "mixin", "dependencies"]
            },
        ],
    },
];
