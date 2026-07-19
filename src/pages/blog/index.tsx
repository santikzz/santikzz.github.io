import Head from "next/head";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/data/posts";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function Blog() {
    return (
        <>
            <Head>
                <title>Writing  - Santiago Bugnón</title>
                <meta
                    name="description"
                    content="Architecture breakdowns, engineering notes, and opinions on building software."
                />
            </Head>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* header */}
                <div className="border-b border-border py-16 md:py-20">
                    <div className="grid md:grid-cols-12 gap-8">
                        <div className="md:col-span-8">
                            <p className="  text-xs text-muted-foreground mb-4 tracking-widest uppercase">
                                Writing
                            </p>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
                                Engineering notes &amp; opinions.
                            </h1>
                            <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
                                Architecture breakdowns, lessons from production, and the occasional opinion on how we
                                build software.
                            </p>
                        </div>
                        <div className="md:col-span-4 flex md:justify-end md:items-end">
                            <p className="  text-xs text-muted-foreground">
                                {posts.length} {posts.length === 1 ? "post" : "posts"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* posts list */}
                <div className="divide-y divide-border mb-24">
                    {posts.map((post) => (
                        <article key={post.slug} className="group py-8 grid md:grid-cols-12 gap-4 items-start">
                            <div className="md:col-span-2">
                                <time className="  text-xs text-muted-foreground">
                                    {formatDate(post.date)}
                                </time>
                            </div>
                            <div className="md:col-span-9">
                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {post.tags.map((t) => (
                                        <Badge key={t} variant="secondary" className="  text-xs">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-1 flex md:justify-end md:pt-1">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    aria-label={`Read ${post.title}`}
                                    className="text-muted-foreground group-hover:text-primary transition-colors"
                                >
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}
