import { Sidebar, TableOfContents } from "@/components/docs";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)]">
            {/* Gradient orbs background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-zinc-700/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/50 rounded-full blur-3xl" />
            </div>

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content with ToC */}
            <div className="lg:ml-72 min-h-screen relative">
                <div className="flex">
                    {/* Main content area */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                    {/* Table of Contents - Right Sidebar */}
                    <aside className="hidden xl:block w-56 shrink-0 pr-8 pt-12">
                        <TableOfContents />
                    </aside>
                </div>
            </div>
        </div>
    );
}
