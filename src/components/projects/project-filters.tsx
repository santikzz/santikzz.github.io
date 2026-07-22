import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectType } from "@/data/projects";

type Props = {
    types: ProjectType[];
    tags: string[];
    activeType: ProjectType | null;
    activeTags: string[];
    onTypeChange: (type: ProjectType | null) => void;
    onTagToggle: (tag: string) => void;
    onClear: () => void;
};

const typeLabels: Record<ProjectType, string> = {
    personal: "Personal",
    client: "Client",
};

export default function ProjectFilters({
    types,
    tags,
    activeType,
    activeTags,
    onTypeChange,
    onTagToggle,
    onClear,
}: Props) {
    const hasFilters = activeType !== null || activeTags.length > 0;

    return (
        <div className="mb-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
                {types.map((t) => {
                    const active = activeType === t;
                    return (
                        <button
                            key={t}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onTypeChange(active ? null : t)}
                            className={cn(
                                "rounded-4xl border px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                                active
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                            )}
                        >
                            {typeLabels[t]}
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
