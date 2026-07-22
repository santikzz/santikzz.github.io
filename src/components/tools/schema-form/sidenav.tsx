import Link from "next/link";
import { WandSparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const DOC_NAV = [
    { id: "getting-started", label: "Getting started" },
    { id: "inputs", label: "Input" },
    { id: "password", label: "Password" },
    { id: "textarea", label: "Textarea" },
    { id: "currency", label: "Currency" },
    { id: "date", label: "Date" },
    { id: "tags", label: "Tags" },
    { id: "select", label: "Select" },
    { id: "select-api", label: "Select API" },
    { id: "toggles", label: "Switch & Checkbox" },
    { id: "radio", label: "Radio" },
    { id: "file", label: "File" },
    { id: "phone", label: "Phone" },
    { id: "otp", label: "OTP" },
    { id: "slider", label: "Slider" },
    { id: "color", label: "Color" },
    { id: "custom", label: "Custom" },
    { id: "form-sections", label: "Sections" },
    { id: "behavior", label: "Behaviors" },
];

interface SidenavProps {
    active: "docs" | "builder";
}

export function Sidenav({ active }: SidenavProps) {
    const prefix = active === "docs" ? "" : "/tools/schema-form";

    return (
        <aside className="hidden lg:flex flex-col sticky top-14 h-[calc(100vh-3.5rem)] w-52 shrink-0 border-r border-border/60 bg-muted/10 py-8 px-4 overflow-y-auto">
            <div className="mb-6 px-2">
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                    Schema Form
                </p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">Sandbox</p>
            </div>

            <nav className="flex flex-col gap-0.5">
                <Link
                    href="/tools/schema-form/builder"
                    className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                        active === "builder"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    )}
                >
                    <WandSparklesIcon className="size-3.5" />
                    Builder
                </Link>

                <div className="my-2 h-px bg-border/60" />

                {DOC_NAV.map((item) => (
                    <a
                        key={item.id}
                        href={`${prefix}#${item.id}`}
                        className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            <div className="mt-auto pt-6 px-2">
                <Link
                    href="/tools"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                    ← Back to portfolio
                </Link>
            </div>
        </aside>
    );
}
