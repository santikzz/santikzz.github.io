import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/data/projects";
import SectionLabel from "@/components/index/section-label";
import CountryFlag from "@/components/projects/country-flag";
import { ArrowUpRight } from "lucide-react";

function ProjectCard({ p }: { p: Project }) {
    return (
        <Link href={`/projects/${p.slug}`} className="group flex flex-col h-full">
            {/* image */}
            <div className="relative overflow-hidden bg-muted aspect-video">
                <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* dim overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {/* bottom-right: detail link icon */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="flex items-center justify-center w-7 h-7 bg-background text-foreground">
                        <ArrowUpRight className="size-4" />
                    </span>
                </div>
            </div>

            {/* meta */}
            <div className="pt-3 flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {p.title}
                </h3>
                <span className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 tabular-nums pt-px">
                    {p.year}
                    <CountryFlag code={p.country} />
                </span>
            </div>

            <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">{p.summary}</p>

            {/* stack */}
            <div className="mt-2 flex flex-wrap gap-1">
                {p.stack.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                ))}
            </div>
        </Link>
    );
}

export default function SectionWork() {
    return (
        <section id="work" className="border-b border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="flex items-center justify-between">
                    <SectionLabel label="Selected Work" />
                    <Link
                        href="/projects"
                        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors shrink-0 ml-4 mb-8"
                    >
                        View all
                        <ArrowUpRight className="h-3 w-3" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {projects.slice(0, 6).map((p) => (
                        <ProjectCard key={p.slug} p={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
