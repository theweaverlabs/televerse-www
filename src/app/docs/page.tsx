import Link from "next/link";
import { DocContent } from "@/components/docs";
import { botApiVersion } from "@/consts";

const quickLinks = [
    {
        title: "Installation",
        description: "Add Televerse to your Dart project",
        href: "/docs/installation",
        icon: "📦",
    },
    {
        title: "Getting Started",
        description: "Create your first Telegram bot",
        href: "/docs/getting-started",
        icon: "🚀",
    },
    {
        title: "Features",
        description: "Explore all available features",
        href: "/docs/features",
        icon: "✨",
    },
];

const stats = [
    { value: botApiVersion, label: "Bot API Version" },
    { value: "80+", label: "Built-in Filters" },
    { value: "0", label: "Dynamic Types" },
    { value: "3", label: "Built-in Plugins" },
];

export default function DocsPage() {
    return (
        <DocContent
            title="Televerse Documentation"
            description="A powerful, type-safe, and highly extensible Telegram Bot framework built with Dart. Zero dynamic types. Full generic support. Enterprise ready."
        >
            {/* Quick Links */}
            <section className="mt-8">
                <h2>Quick Links</h2>
                <div className="grid md:grid-cols-3 gap-4 not-prose mt-4">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group p-5 bg-zinc-900/40 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-all hover:bg-zinc-900/60"
                        >
                            <span className="text-2xl mb-3 block">{link.icon}</span>
                            <h3 className="text-lg font-semibold text-white mb-1 font-[family-name:var(--font-space-grotesk)] group-hover:text-zinc-100">
                                {link.title}
                            </h3>
                            <p className="text-sm text-zinc-400">{link.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section className="mt-12">
                <h2>At a Glance</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose mt-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/50 text-center"
                        >
                            <div className="text-2xl font-bold bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent font-[family-name:var(--font-space-grotesk)]">
                                {stat.value}
                            </div>
                            <div className="mt-1 text-zinc-400 text-xs uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Introduction */}
            <section className="mt-12">
                <h2>What is Televerse?</h2>
                <p>
                    Televerse is the most powerful and type-safe Telegram Bot framework in the Dart ecosystem.
                    Built with modern Dart features, it provides a clean, intuitive API for building everything
                    from simple personal bots to complex enterprise applications.
                </p>
                <p>
                    Unlike other frameworks, Televerse uses <strong>0 dynamic types</strong> on its public interface,
                    ensuring full type safety and excellent IDE support through generics. This means fewer runtime
                    errors and a more enjoyable development experience.
                </p>
            </section>

            {/* Key Highlights */}
            <section className="mt-12">
                <h2>Why Choose Televerse?</h2>
                <ul>
                    <li>
                        <strong>Revolutionary Filter System</strong> — 80+ built-in filters with logical operators
                        (+, *, -) for combining filters expressively
                    </li>
                    <li>
                        <strong>Plugin Architecture</strong> — Sessions, conversations, logging, and custom plugins
                        with full type safety
                    </li>
                    <li>
                        <strong>Built-in Webhook Server</strong> — Start production-ready webhook bots with a single
                        method call
                    </li>
                    <li>
                        <strong>Conversation API</strong> — Multi-step conversations with timeout handling and
                        validation
                    </li>
                    <li>
                        <strong>Custom Context</strong> — Extend the Context class with your own properties and
                        methods
                    </li>
                    <li>
                        <strong>Latest Bot API</strong> — Always up-to-date with the latest Telegram Bot API
                        (currently {botApiVersion})
                    </li>
                </ul>
            </section>

            {/* Next Steps */}
            <section className="mt-12">
                <h2>Ready to Get Started?</h2>
                <p>
                    Head over to the <Link href="/docs/installation" className="text-white font-medium">Installation</Link> guide
                    to add Televerse to your project, or jump straight into the{" "}
                    <Link href="/docs/getting-started" className="text-white font-medium">Getting Started</Link> tutorial
                    to build your first bot.
                </p>
            </section>
        </DocContent>
    );
}
