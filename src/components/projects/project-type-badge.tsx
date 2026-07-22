import { cn } from "@/lib/utils";
import type { ProjectType } from "@/data/projects";

export const projectTypeLabels: Record<ProjectType, string> = {
    personal: "Personal",
    client: "Client",
};

const styles: Record<ProjectType, string> = {
    personal: "border-primary/40 text-primary",
    client: "border-border text-muted-foreground",
};

export default function ProjectTypeBadge({ type, className }: { type: ProjectType; className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center rounded-4xl border px-2 py-0.5 text-[11px] leading-none",
                styles[type],
                className
            )}
        >
            {projectTypeLabels[type]}
        </span>
    );
}
