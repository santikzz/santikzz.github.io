import { useMemo, useState } from "react";
import Head from "next/head";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { packages, type PackageSource } from "@/data/packages";
import PackageFilters from "@/components/packages/package-filters";
import SectionLabel from "@/components/index/section-label";

const packageSources: PackageSource[] = ["npm", "pypi", "github"];

export default function PackagesPage() {
    const [query, setQuery] = useState("");
    const [activeSource, setActiveSource] = useState<PackageSource | null>(null);
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const sources = useMemo(
        () => packageSources.filter((s) => packages.some((p) => p.source === s)),
        []
    );

    const tags = useMemo(
        () => [...new Set(packages.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b)),
        []
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return packages.filter((p) => {
            if (activeSource && p.source !== activeSource) return false;
            if (activeTags.length && !activeTags.some((t) => p.tags.includes(t))) return false;
            if (!q) return true;
            return [p.name, p.description, ...p.tags].some((v) => v.toLowerCase().includes(q));
        });
    }, [query, activeSource, activeTags]);

    const toggleTag = (tag: string) =>
        setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

    const clearFilters = () => {
        setQuery("");
        setActiveSource(null);
        setActiveTags([]);
    };

    return (
        <>
            <Head>
                <title>Packages - Santiago Bugnón</title>
                <meta name="description" content="Open source packages I publish and maintain." />
            </Head>

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <SectionLabel label="Packages" />

                <PackageFilters
                    sources={sources}
                    tags={tags}
                    query={query}
                    activeSource={activeSource}
                    activeTags={activeTags}
                    onQueryChange={setQuery}
                    onSourceChange={setActiveSource}
                    onTagToggle={toggleTag}
                    onClear={clearFilters}
                />

                <div className="divide-y divide-border">
                    {filtered.map((pkg) => (
                        <a
                            key={pkg.name}
                            href={pkg.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group block py-5"
                        >
                            <h3 className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                                {pkg.name}
                                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                {pkg.description}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                                {pkg.tags.map((t) => (
                                    <Badge key={t} variant="secondary" className="text-xs">
                                        {t}
                                    </Badge>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="py-8 text-xs text-muted-foreground">No packages match these filters.</p>
                )}
            </section>
        </>
    );
}
