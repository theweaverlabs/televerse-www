import { ReactNode } from "react";

interface DocContentProps {
    children: ReactNode;
    title: string;
    description?: string;
}

export function DocContent({ children, title, description }: DocContentProps) {
    return (
        <article className="max-w-4xl mx-auto px-8 py-12">
            {/* Page Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-bold mb-3 font-[family-name:var(--font-space-grotesk)] bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    {title}
                </h1>
                {description && (
                    <p className="text-lg text-zinc-400 leading-relaxed">
                        {description}
                    </p>
                )}
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-zinc max-w-none
        prose-headings:font-[family-name:var(--font-space-grotesk)]
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-800
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-zinc-300 prose-p:leading-relaxed
        prose-a:text-white prose-a:no-underline prose-a:border-b prose-a:border-zinc-600 hover:prose-a:border-white
        prose-strong:text-white prose-strong:font-semibold
        prose-code:text-zinc-300 prose-code:bg-zinc-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-[family-name:var(--font-jetbrains-mono)]
        prose-ul:text-zinc-300 prose-ol:text-zinc-300
        prose-li:marker:text-zinc-500
      ">
                {children}
            </div>
        </article>
    );
}
