import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { tools } from "@/data/tools";
import { cn } from "@/lib/utils";
import SectionLabel from "@/components/index/section-label";

type Props = {
    title: string;
    children: ReactNode;
};

export default function ToolsLayout({ title, children }: Props) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{`${title} - Santiago Bugnón`}</title>
            </Head>

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <SectionLabel label="Tools" />

                <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                    <aside className="md:w-56 md:shrink-0">
                        <nav className="flex gap-1 overflow-x-auto md:flex-col md:gap-0.5">
                            {tools.map((t) => {
                                const href = `/tools/${t.slug}`;
                                const active = router.pathname === href;
                                return (
                                    <Link
                                        key={t.slug}
                                        href={href}
                                        className={cn(
                                            "whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors",
                                            active
                                                ? "bg-muted font-medium text-foreground"
                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                        )}
                                    >
                                        {t.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    <div className="min-w-0 flex-1">{children}</div>
                </div>
            </section>
        </>
    );
}
