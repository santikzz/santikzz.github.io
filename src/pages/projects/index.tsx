import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { projects, type ProjectType } from "@/data/projects";
import CountryFlag from "@/components/projects/country-flag";
import ProjectFilters from "@/components/projects/project-filters";
import SectionLabel from "@/components/index/section-label";

const projectTypes: ProjectType[] = ["personal", "client"];

export default function ProjectsPage() {
    const [activeType, setActiveType] = useState<ProjectType | null>(null);
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const tags = useMemo(
        () => [...new Set(projects.flatMap((p) => p.stack))].sort((a, b) => a.localeCompare(b)),
        []
    );

    const filtered = useMemo(
        () =>
            projects.filter((p) => {
                if (activeType && p.type !== activeType) return false;
                if (activeTags.length && !activeTags.some((t) => p.stack.includes(t))) return false;
                return true;
            }),
        [activeType, activeTags]
    );

    const toggleTag = (tag: string) =>
        setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

    const clearFilters = () => {
        setActiveType(null);
        setActiveTags([]);
    };

    return (
        <>
            <Head>
                <title>Projects - Santiago Bugnón</title>
                <meta name="description" content="Projects I built or worked on: platforms, products and marketing sites." />
            </Head>

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <SectionLabel label="Projects" />

                <ProjectFilters
                    types={projectTypes}
                    tags={tags}
                    activeType={activeType}
                    activeTags={activeTags}
                    onTypeChange={setActiveType}
                    onTagToggle={toggleTag}
                    onClear={clearFilters}
                />

                <div className="divide-y divide-border">
                    {filtered.map((p) => (
                        <Link
                            key={p.slug}
                            href={`/projects/${p.slug}`}
                            className="group py-5 flex gap-5 items-start"
                        >
                            {/* thumbnail */}
                            <div className="shrink-0 w-24 h-16 sm:w-40 sm:h-24 relative overflow-hidden bg-muted">
                                <Image
                                    src={p.image}
                                    alt={p.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                    sizes="(max-width: 640px) 96px, 160px"
                                />
                            </div>

                            {/* content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                                        {p.title}
                                    </h3>
                                    <span className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground tabular-nums pt-px">
                                        {p.year}
                                        <CountryFlag code={p.country} />
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                    {p.summary}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {p.stack.map((t) => (
                                        <Badge key={t} variant="secondary" className="text-xs">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="py-8 text-xs text-muted-foreground">No projects match these filters.</p>
                )}
            </section>
        </>
    );
}
