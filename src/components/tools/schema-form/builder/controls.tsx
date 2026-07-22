import { PlusIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { BuilderOption } from "./types";

// ─── Layout helpers ───────────────────────────────────────────────────────────

export function ControlGrid({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-2 gap-x-3 gap-y-3">{children}</div>;
}

export function GroupLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="col-span-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
            {children}
        </p>
    );
}

function Labeled({ label, error, wide, children }: {
    label: string;
    error?: string;
    wide?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className={cn("flex flex-col gap-1", wide && "col-span-2")}>
            <label className="text-[11px] font-medium text-muted-foreground">{label}</label>
            {children}
            {error && <p className="text-[11px] text-destructive">{error}</p>}
        </div>
    );
}

// ─── Controls ─────────────────────────────────────────────────────────────────

export function TextControl({ label, value, onChange, placeholder, error, wide, mono }: {
    label: string;
    value?: string;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
    error?: string;
    wide?: boolean;
    mono?: boolean;
}) {
    return (
        <Labeled label={label} error={error} wide={wide}>
            <Input
                value={value ?? ""}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value || undefined)}
                className={cn("text-xs", mono && "font-mono", error && "border-destructive")}
            />
        </Labeled>
    );
}

export function NumberControl({ label, value, onChange, placeholder, min, wide }: {
    label: string;
    value?: number;
    onChange: (value: number | undefined) => void;
    placeholder?: string;
    min?: number;
    wide?: boolean;
}) {
    return (
        <Labeled label={label} wide={wide}>
            <Input
                type="number"
                min={min}
                value={value ?? ""}
                placeholder={placeholder}
                onChange={(e) => {
                    const next = e.target.valueAsNumber;
                    onChange(e.target.value === "" || isNaN(next) ? undefined : next);
                }}
                className="text-xs"
            />
        </Labeled>
    );
}

export function SelectControl<T extends string>({ label, value, onChange, options, wide }: {
    label: string;
    value: T;
    onChange: (value: T) => void;
    options: { label: string; value: T }[];
    wide?: boolean;
}) {
    return (
        <Labeled label={label} wide={wide}>
            <Select value={value} onValueChange={(v) => onChange(v as T)}>
                <SelectTrigger className="w-full text-xs">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </Labeled>
    );
}

export function ToggleControl({ label, checked, onChange, wide }: {
    label: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
    wide?: boolean;
}) {
    return (
        <label
            className={cn(
                "flex cursor-pointer items-center justify-between gap-2 rounded-md border border-border/50 bg-muted/20 px-2.5 py-1.5",
                wide && "col-span-2",
            )}
        >
            <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
            <Switch checked={!!checked} onCheckedChange={onChange} />
        </label>
    );
}

// ─── Options editor ───────────────────────────────────────────────────────────

export function OptionsControl({ label, options, onChange, mode }: {
    label: string;
    options: BuilderOption[];
    onChange: (options: BuilderOption[]) => void;
    /** "pair" edits label + value, "single" keeps them identical (tags) */
    mode: "pair" | "single";
}) {
    const patch = (index: number, next: BuilderOption) =>
        onChange(options.map((option, i) => (i === index ? next : option)));

    return (
        <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-muted-foreground">{label}</label>

            {options.length === 0 && (
                <p className="text-[11px] text-muted-foreground/60">No options yet.</p>
            )}

            {options.map((option, index) => (
                <div key={index} className="flex items-center gap-1.5">
                    <Input
                        value={option.label}
                        placeholder={mode === "single" ? "Tag" : "Label"}
                        onChange={(e) =>
                            patch(index, mode === "single"
                                ? { label: e.target.value, value: e.target.value }
                                : { ...option, label: e.target.value })
                        }
                        className="text-xs"
                    />
                    {mode === "pair" && (
                        <Input
                            value={option.value}
                            placeholder="value"
                            onChange={(e) => patch(index, { ...option, value: e.target.value })}
                            className="font-mono text-xs"
                        />
                    )}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => onChange(options.filter((_, i) => i !== index))}
                        aria-label="Remove option"
                    >
                        <XIcon className="size-3.5" />
                    </Button>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 w-fit gap-1 text-xs"
                onClick={() => onChange([...options, { label: "", value: "" }])}
            >
                <PlusIcon className="size-3.5" />
                Add option
            </Button>
        </div>
    );
}
