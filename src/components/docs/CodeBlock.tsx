"use client";

import { useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-bash";

Prism.manual = true;

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
}

export function CodeBlock({ code, language = "dart", filename }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const highlightedCode = Prism.highlight(
        code,
        Prism.languages[language] || Prism.languages.dart,
        language
    );

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="not-prose relative bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden my-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/80">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    {filename && (
                        <span className="ml-3 text-zinc-500 text-sm font-[family-name:var(--font-jetbrains-mono)]">
                            {filename}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="px-2 py-1 text-xs text-zinc-400 hover:text-white rounded transition-colors"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            {/* Code content */}
            <div className="p-4 overflow-x-auto">
                <pre suppressHydrationWarning className="text-sm leading-relaxed">
                    <code
                        className={`language-${language} font-[family-name:var(--font-jetbrains-mono)]`}
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                </pre>
            </div>
        </div>
    );
}
