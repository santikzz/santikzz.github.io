import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { PackageSource } from "@/data/packages";

type Props = {
    sources: PackageSource[];
    tags: string[];
    query: string;
    activeSource: PackageSource | null;
    activeTags: string[];
    onQueryChange: (query: string) => void;
    onSourceChange: (source: PackageSource | null) => void;
    onTagToggle: (tag: string) => void;
    onClear: () => void;
};

const sourceLabels: Record<PackageSource, string> = {
    npm: "npm",
    pypi: "PyPI",
    github: "GitHub",
};

export default function PackageFilters({
    sources,
    tags,
    query,
    activeSource,
    activeTags,
    onQueryChange,
    onSourceChange,
    onTagToggle,
    onClear,
}: Props) {
    const hasFilters = query !== "" || activeSource !== null || activeTags.length > 0;

    return (
        <div className="mb-8 space-y-3">
            <div className="relative max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search packages"
                    aria-label="Search packages"
                    className="h-9 pl-8 text-xs"
                />
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {sources.map((s) => {
                    const active = activeSource === s;
                    return (
                        <button
                            key={s}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onSourceChange(active ? null : s)}
                            className={cn(
                                "rounded-4xl border px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                                active
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                            )}
                        >
                            {sourceLabels[s]}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
                {tags.map((tag) => {
                    const active = activeTags.includes(tag);
                    return (
                        <button
                            key={tag}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onTagToggle(tag)}
                            className={cn(
                                "rounded-4xl border px-2 py-0.5 text-[11px] transition-colors",
                                active
                                    ? "border-primary/40 bg-primary/10 text-primary"
                                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                            )}
                        >
                            {tag}
                        </button>
                    );
                })}

                {hasFilters && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="ml-1 inline-flex items-center gap-1 rounded-4xl px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="size-3" />
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    );
}
