import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/data/posts";
import SectionLabel from "@/components/index/section-label";

const latestPosts = posts.slice(0, 3);

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function PostThumbnail({ post }: { post: (typeof posts)[number] }) {
    if (post.image) {
        return (
            <div className="relative w-full h-full overflow-hidden bg-muted">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="128px"
                />
            </div>
        );
    }
    // placeholder: tag-colored gradient block
    return (
        <div className="w-full h-full bg-muted flex items-end p-2">
            <span className="text-[10px] text-muted-foreground/60 leading-none truncate">
                {post.tags[0] ?? "post"}
            </span>
        </div>
    );
}

export default function SectionWriting() {
    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="flex items-center justify-between mb-8">
                    <SectionLabel label="Writing" />
                    <Link
                        href="/blog"
                        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors shrink-0 ml-4 mb-8"
                    >
                        View all
                        <ArrowUpRight className="h-3 w-3" />
                    </Link>
                </div>

                <div className="divide-y divide-border">
                    {latestPosts.map((post) => (
                        <article key={post.slug} className="group py-5 flex gap-5 items-start">
                            {/* thumbnail */}
                            <Link
                                href={`/blog/${post.slug}`}
                                className="shrink-0 w-24 h-16 sm:w-32 sm:h-20 block overflow-hidden relative"
                                tabIndex={-1}
                                aria-hidden
                            >
                                <PostThumbnail post={post} />
                            </Link>

                            {/* content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <Link href={`/blog/${post.slug}`}>
                                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                                            {post.title}
                                        </h3>
                                    </Link>
                                    <time className="text-xs text-muted-foreground shrink-0 pt-px">
                                        {formatDate(post.date)}
                                    </time>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                    {post.summary}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {post.tags.map((t) => (
                                        <Badge key={t} variant="secondary" className="text-xs">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
