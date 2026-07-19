import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/data/projects";
import CountryFlag from "@/components/projects/country-flag";
import ProjectCarousel, { type CarouselItem } from "@/components/projects/project-carousel";

function youtubeEmbedUrl(url: string) {
    const match = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: projects.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps<{ project: Project }> = async ({ params }) => {
    const project = projects.find((p) => p.slug === params?.slug);
    if (!project) return { notFound: true };
    return { props: { project } };
};

export default function ProjectDetailPage({ project }: { project: Project }) {
    const items: CarouselItem[] = [
        { type: "image", src: project.image },
        ...(project.images ?? []).map((src): CarouselItem => ({ type: "image", src })),
        ...(project.video ? [{ type: "video", src: project.video } as CarouselItem] : []),
    ];

    return (
        <>
            <Head>
                <title>{`${project.title} - Santiago Bugnón`}</title>
                <meta name="description" content={project.summary} />
            </Head>

            <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-3 w-3" />
                    All projects
                </Link>

                <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
                    <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                        {project.title}
                    </h1>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground tabular-nums">
                        {project.year}
                        <CountryFlag code={project.country} className="h-3.5" />
                    </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                    {project.stack.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                        </Badge>
                    ))}
                </div>

                <p className="mt-6 text-muted-foreground leading-relaxed">{project.summary}</p>

                <div className="mt-6">
                    <ProjectCarousel items={items} title={project.title} />
                </div>

                <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
                    <p>{project.description}</p>
                </div>

                {project.links && project.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                        {project.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        ))}
                    </div>
                )}

                {project.youtube && (
                    <div className="mt-8 aspect-video bg-muted">
                        <iframe
                            src={youtubeEmbedUrl(project.youtube)}
                            title={`${project.title} video`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </section>
        </>
    );
}
