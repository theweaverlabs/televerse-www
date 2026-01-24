export interface DocsItem {
    title: string;
    href: string;
    tags?: string[]; // Keywords for search
    external?: boolean;
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
            {
                title: "Middleware",
                href: "/docs/advanced/middleware",
                tags: ["middleware", "pipeline", "use", "handler", "filter", "composer"]
            },
            {
                title: "Transformers",
                href: "/docs/advanced/transformers",
                tags: ["transformer", "api", "interceptor", "call", "request", "response"]
            },
            {
                title: "Plugins",
                href: "/docs/advanced/plugins",
                tags: ["plugin", "module", "extension", "bottplugin", "middleware", "transformer"]
            },
        ],
    },
    {
        title: "Plugins",
        items: [
            {
                title: "Logging",
                href: "/docs/plugins/logging",
                tags: ["plugin", "logging", "debug", "logger", "monitor"]
            },
            {
                title: "Session",
                href: "/docs/plugins/session",
                tags: ["plugin", "session", "storage", "persistence", "state"]
            },
            {
                title: "Conversation",
                href: "/docs/plugins/conversation",
                tags: ["plugin", "conversation", "dialogue", "wizard", "step-by-step"]
            },
            {
                title: "Auto Retry",
                href: "https://pub.dev/packages/auto_retry",
                tags: ["plugin", "auto retry", "network", "stability", "resilience"],
                external: true
            },
            {
                title: "Parse Mode Setter",
                href: "https://pub.dev/packages/parse_mode_setter",
                tags: ["plugin", "parse mode", "formatting", "html", "markdown"],
                external: true
            },
        ]
    },
];
