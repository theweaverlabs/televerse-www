"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const pathname = usePathname();

    // Extract headings from the page - re-run when pathname changes
    useEffect(() => {
        const extractHeadings = () => {
            // Target headings within the prose content area
            const article = document.querySelector("article");
            if (!article) return;

            const elements = article.querySelectorAll("h2, h3");
            const items: TocItem[] = [];
            const idCounts: Record<string, number> = {}; // Track ID occurrences for uniqueness

            elements.forEach((element, index) => {
                // Generate ID if not present
                if (!element.id) {
                    const text = element.textContent || "";
                    // Create slug from text, removing emojis and special chars
                    let slug = text
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "") // Remove emojis and special chars
                        .replace(/\s+/g, "-") // Replace spaces with hyphens
                        .replace(/-+/g, "-") // Remove consecutive hyphens
                        .trim();

                    // Make the slug unique by appending a counter if needed
                    const baseSlug = slug || `heading-${index}`;
                    if (idCounts[baseSlug] !== undefined) {
                        idCounts[baseSlug]++;
                        slug = `${baseSlug}-${idCounts[baseSlug]}`;
                    } else {
                        idCounts[baseSlug] = 0;
                        slug = baseSlug;
                    }
                    element.id = slug;
                }

                items.push({
                    id: element.id,
                    text: element.textContent?.replace(/^[^\w]*/, "").trim() || "", // Remove leading emojis
                    level: element.tagName === "H2" ? 2 : 3,
                });
            });

            setHeadings(items);

            // Set initial active heading
            if (items.length > 0) {
                setActiveId(items[0].id);
            }
        };

        // Reset headings first to ensure clean state
        setHeadings([]);
        setActiveId("");

        // Small delay to ensure DOM is ready after navigation
        const timer = setTimeout(extractHeadings, 150);
        return () => clearTimeout(timer);
    }, [pathname]);

    // Scroll spy using IntersectionObserver
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the first heading that is intersecting
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);

                if (visibleEntries.length > 0) {
                    // Get the topmost visible heading
                    const topEntry = visibleEntries.reduce((prev, curr) => {
                        return prev.boundingClientRect.top < curr.boundingClientRect.top
                            ? prev
                            : curr;
                    });
                    setActiveId(topEntry.target.id);
                }
            },
            {
                rootMargin: "-80px 0px -70% 0px",
                threshold: 0,
            }
        );

        // Observe all heading elements
        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    // Smooth scroll to heading
    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Account for sticky header if any
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            setActiveId(id);
        }
    }, []);

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="pb-4">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                    On this page
                </h4>
                <ul className="space-y-2 text-sm">
                    {headings.map((heading) => (
                        <li
                            key={heading.id}
                            className={heading.level === 3 ? "ml-4" : ""}
                        >
                            <button
                                onClick={() => scrollToHeading(heading.id)}
                                className={`
                                    block w-full text-left py-1 transition-colors duration-150
                                    border-l-2 pl-3 -ml-px
                                    ${activeId === heading.id
                                        ? "border-white text-white font-medium"
                                        : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
                                    }
                                `}
                            >
                                {heading.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
