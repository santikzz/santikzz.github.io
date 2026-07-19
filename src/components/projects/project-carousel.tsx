"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselItem = {
    type: "image" | "video";
    src: string;
};

export default function ProjectCarousel({ items, title }: { items: CarouselItem[]; title: string }) {
    const [index, setIndex] = useState(0);
    const touchX = useRef<number | null>(null);

    const prev = () => setIndex((i) => Math.max(0, i - 1));
    const next = () => setIndex((i) => Math.min(items.length - 1, i + 1));

    const onTouchStart = (e: React.TouchEvent) => {
        touchX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 40) return;
        if (dx < 0) next();
        else prev();
    };

    return (
        <div>
            <div
                className="relative overflow-hidden bg-muted aspect-video"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex h-full transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {items.map((item, i) => (
                        <div key={i} className="relative w-full h-full shrink-0">
                            {item.type === "video" ? (
                                <video
                                    src={item.src}
                                    controls
                                    preload="metadata"
                                    className="w-full h-full object-contain bg-background"
                                />
                            ) : (
                                <Image
                                    src={item.src}
                                    alt={`${title} screenshot ${i + 1}`}
                                    fill
                                    priority={i === 0}
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 896px"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {index > 0 && (
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background text-foreground border border-border hover:text-primary transition-colors"
                    >
                        <ChevronLeft className="size-5" />
                    </button>
                )}
                {index < items.length - 1 && (
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background text-foreground border border-border hover:text-primary transition-colors"
                    >
                        <ChevronRight className="size-5" />
                    </button>
                )}
            </div>

            {items.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto">
                    {items.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={cn(
                                "relative w-20 aspect-video shrink-0 overflow-hidden bg-muted border transition-all",
                                i === index
                                    ? "border-primary"
                                    : "border-transparent opacity-60 hover:opacity-100"
                            )}
                        >
                            {item.type === "video" ? (
                                <span className="flex items-center justify-center w-full h-full text-muted-foreground">
                                    <Play className="size-4" />
                                </span>
                            ) : (
                                <Image
                                    src={item.src}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
