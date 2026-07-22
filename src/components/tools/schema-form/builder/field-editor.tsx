import { useState } from "react";
import {
    ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, CopyIcon, TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { FIELD_KINDS, ICON_NAMES } from "./catalog";
import { isValidName } from "./schema-gen";
import {
    ControlGrid, GroupLabel, NumberControl, OptionsControl, SelectControl, TextControl, ToggleControl,
} from "./controls";
import type { BuilderField } from "./types";

const WITH_PLACEHOLDER = new Set([
    "input", "password", "textarea", "currency", "select", "select-api", "tags", "phone", "color",
]);
const WITH_ICON = new Set(["input", "password"]);

interface FieldEditorProps {
    field: BuilderField;
    index: number;
    total: number;
    duplicated: boolean;
    gridLayout: boolean;
    onChange: (patch: Partial<BuilderField>) => void;
    onMove: (direction: -1 | 1) => void;
    onDuplicate: () => void;
    onRemove: () => void;
}

export function FieldEditor({
    field, index, total, duplicated, gridLayout, onChange, onMove, onDuplicate, onRemove,
}: FieldEditorProps) {
    const [open, setOpen] = useState(true);
    const kind = FIELD_KINDS.find((k) => k.component === field.component);
    const Icon = kind?.icon;
    const nameError = !isValidName(field.name)
        ? "Not a valid identifier"
        : duplicated
            ? "Duplicate name"
            : undefined;

    return (
        <div className={cn(
            "rounded-xl border bg-card/40 overflow-hidden",
            nameError ? "border-destructive/50" : "border-border/60",
        )}>
            <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-2 py-1.5">
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                    {open
                        ? <ChevronDownIcon className="size-3.5 shrink-0 text-muted-foreground" />
                        : <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground" />
                    }
                    {Icon && <Icon className="size-3.5 shrink-0 text-muted-foreground" />}
                    <span className="truncate text-sm font-medium">{field.label || field.name}</span>
                    <Badge variant="secondary" className="shrink-0 font-mono text-[10px]">
                        {field.component}
                    </Badge>
                </button>

                <div className="flex shrink-0 items-center">
                    <Button
                        type="button" variant="ghost" size="icon"
                        className="size-7 text-muted-foreground disabled:opacity-30"
                        disabled={index === 0}
                        onClick={() => onMove(-1)}
                        aria-label="Move up"
                    >
                        <ChevronUpIcon className="size-3.5" />
                    </Button>
                    <Button
                        type="button" variant="ghost" size="icon"
                        className="size-7 text-muted-foreground disabled:opacity-30"
                        disabled={index === total - 1}
                        onClick={() => onMove(1)}
                        aria-label="Move down"
                    >
                        <ChevronDownIcon className="size-3.5" />
                    </Button>
                    <Button
                        type="button" variant="ghost" size="icon"
                        className="size-7 text-muted-foreground"
                        onClick={onDuplicate}
                        aria-label="Duplicate field"
                    >
                        <CopyIcon className="size-3.5" />
                    </Button>
                    <Button
                        type="button" variant="ghost" size="icon"
                        className="size-7 text-muted-foreground hover:text-destructive"
                        onClick={onRemove}
                        aria-label="Remove field"
                    >
                        <TrashIcon className="size-3.5" />
                    </Button>
                </div>
            </div>

            {open && (
                <div className="p-3">
                    <ControlGrid>
                        <TextControl
                            label="Name"
                            value={field.name}
                            onChange={(v) => onChange({ name: v ?? "" })}
                            placeholder="field_name"
                            error={nameError}
                            mono
                        />
                        <TextControl
                            label="Label"
                            value={field.label}
                            onChange={(v) => onChange({ label: v ?? "" })}
                            placeholder="Field label"
                        />

                        {WITH_PLACEHOLDER.has(field.component) && (
                            <TextControl
                                label="Placeholder"
                                value={field.placeholder}
                                onChange={(v) => onChange({ placeholder: v })}
                            />
                        )}

                        {WITH_ICON.has(field.component) && (
                            <SelectControl
                                label="Icon"
                                value={field.icon ?? "none"}
                                onChange={(v) => onChange({ icon: v === "none" ? undefined : v })}
                                options={[
                                    { label: "None", value: "none" },
                                    ...ICON_NAMES.map((name) => ({ label: name.replace("Icon", ""), value: name })),
                                ]}
                            />
                        )}

                        <TextControl
                            label="Description"
                            value={field.description}
                            onChange={(v) => onChange({ description: v })}
                            placeholder="Helper text below the input"
                            wide
                        />

                        <ToggleControl
                            label="Required"
                            checked={field.required}
                            onChange={(v) => onChange({ required: v })}
                        />
                        <ToggleControl
                            label="Disabled"
                            checked={field.disabled}
                            onChange={(v) => onChange({ disabled: v })}
                        />

                        {gridLayout && (
                            <SelectControl
                                label="Column span"
                                value={String(field.colSpan ?? 1)}
                                onChange={(v) => onChange({ colSpan: Number(v) as 1 | 2 | 3 })}
                                options={[
                                    { label: "1 column", value: "1" },
                                    { label: "2 columns", value: "2" },
                                    { label: "Full width", value: "3" },
                                ]}
                            />
                        )}
                        <TextControl
                            label="Input class"
                            value={field.inputClassName}
                            onChange={(v) => onChange({ inputClassName: v })}
                            placeholder="min-h-[200px]"
                            mono
                        />

                        <TypeControls field={field} onChange={onChange} />
                    </ControlGrid>
                </div>
            )}
        </div>
    );
}

// ─── Per-component options ────────────────────────────────────────────────────

function TypeControls({ field, onChange }: {
    field: BuilderField;
    onChange: (patch: Partial<BuilderField>) => void;
}) {
    const lengthControls = (
        <>
            <NumberControl
                label="Min length"
                value={field.minLength}
                onChange={(v) => onChange({ minLength: v })}
                min={0}
            />
            <NumberControl
                label="Max length"
                value={field.maxLength}
                onChange={(v) => onChange({ maxLength: v })}
                min={0}
            />
        </>
    );

    switch (field.component) {
        case "input":
            return (
                <>
                    <GroupLabel>Input</GroupLabel>
                    <SelectControl
                        label="Type"
                        value={field.type ?? "text"}
                        onChange={(v) => onChange({ type: v })}
                        options={[
                            { label: "Text", value: "text" as const },
                            { label: "Email", value: "email" as const },
                            { label: "Number", value: "number" as const },
                            { label: "URL", value: "url" as const },
                            { label: "Tel", value: "tel" as const },
                        ]}
                    />
                    <TextControl
                        label="Prefix"
                        value={field.prefix}
                        onChange={(v) => onChange({ prefix: v })}
                        placeholder="@"
                    />
                    <TextControl
                        label="Suffix"
                        value={field.suffix}
                        onChange={(v) => onChange({ suffix: v })}
                        placeholder="USD"
                    />
                    {field.type === "number" ? (
                        <>
                            <NumberControl label="Min" value={field.min} onChange={(v) => onChange({ min: v })} />
                            <NumberControl label="Max" value={field.max} onChange={(v) => onChange({ max: v })} />
                            <NumberControl label="Step" value={field.step} onChange={(v) => onChange({ step: v })} />
                        </>
                    ) : lengthControls}
                </>
            );

        case "password":
            return (
                <>
                    <GroupLabel>Password</GroupLabel>
                    <ToggleControl
                        label="Strength meter"
                        checked={field.showStrength}
                        onChange={(v) => onChange({ showStrength: v })}
                        wide
                    />
                    {lengthControls}
                </>
            );

        case "textarea":
            return (
                <>
                    <GroupLabel>Textarea</GroupLabel>
                    <NumberControl label="Rows" value={field.rows} onChange={(v) => onChange({ rows: v })} min={1} />
                    {lengthControls}
                </>
            );

        case "currency":
            return (
                <>
                    <GroupLabel>Currency</GroupLabel>
                    <TextControl label="Symbol" value={field.currencySymbol} onChange={(v) => onChange({ currencySymbol: v })} placeholder="$" />
                    <TextControl label="ISO code" value={field.currencyCode} onChange={(v) => onChange({ currencyCode: v })} placeholder="USD" />
                    <NumberControl label="Min" value={field.min} onChange={(v) => onChange({ min: v })} />
                    <NumberControl label="Max" value={field.max} onChange={(v) => onChange({ max: v })} />
                </>
            );

        case "date":
            return (
                <>
                    <GroupLabel>Date</GroupLabel>
                    <SelectControl
                        label="Value format"
                        value={field.valueFormat ?? "iso"}
                        onChange={(v) => onChange({ valueFormat: v })}
                        options={[
                            { label: "ISO (2026-04-03)", value: "iso" as const },
                            { label: "Datetime", value: "datetime" as const },
                            { label: "Date object", value: "date" as const },
                        ]}
                    />
                    <TextControl
                        label="Display format"
                        value={field.displayFormat}
                        onChange={(v) => onChange({ displayFormat: v })}
                        placeholder="PPP"
                        mono
                    />
                </>
            );

        case "tags":
            return (
                <>
                    <GroupLabel>Tags</GroupLabel>
                    <NumberControl label="Max tags" value={field.max} onChange={(v) => onChange({ max: v })} min={1} />
                    <ToggleControl
                        label="Strict (options only)"
                        checked={field.strict}
                        onChange={(v) => onChange({ strict: v })}
                    />
                    <OptionsControl
                        label="Suggestions"
                        mode="single"
                        options={field.options}
                        onChange={(options) => onChange({ options })}
                    />
                </>
            );

        case "select":
            return (
                <>
                    <GroupLabel>Select</GroupLabel>
                    <ToggleControl
                        label="Searchable"
                        checked={field.searchable}
                        onChange={(v) => onChange({ searchable: v })}
                        wide
                    />
                    {field.searchable && (
                        <>
                            <TextControl label="Search placeholder" value={field.searchPlaceholder} onChange={(v) => onChange({ searchPlaceholder: v })} placeholder="Search..." />
                            <TextControl label="Empty text" value={field.emptyText} onChange={(v) => onChange({ emptyText: v })} placeholder="No results" />
                        </>
                    )}
                    <OptionsControl
                        label="Options"
                        mode="pair"
                        options={field.options}
                        onChange={(options) => onChange({ options })}
                    />
                </>
            );

        case "select-api":
            return (
                <>
                    <GroupLabel>Remote options</GroupLabel>
                    <TextControl label="Route" value={field.route} onChange={(v) => onChange({ route: v })} placeholder="/api/categories" wide mono />
                    <TextControl label="Label key" value={field.labelKey} onChange={(v) => onChange({ labelKey: v })} placeholder="name" mono />
                    <TextControl label="Value key" value={field.valueKey} onChange={(v) => onChange({ valueKey: v })} placeholder="id" mono />
                </>
            );

        case "radio":
            return (
                <>
                    <GroupLabel>Radio</GroupLabel>
                    <SelectControl
                        label="Variant"
                        value={field.variant ?? "default"}
                        onChange={(v) => onChange({ variant: v })}
                        options={[
                            { label: "Default", value: "default" as const },
                            { label: "Cards", value: "cards" as const },
                        ]}
                    />
                    <SelectControl
                        label="Orientation"
                        value={field.orientation ?? "vertical"}
                        onChange={(v) => onChange({ orientation: v })}
                        options={[
                            { label: "Vertical", value: "vertical" as const },
                            { label: "Horizontal", value: "horizontal" as const },
                        ]}
                    />
                    <OptionsControl
                        label="Options"
                        mode="pair"
                        options={field.options}
                        onChange={(options) => onChange({ options })}
                    />
                </>
            );

        case "file":
            return (
                <>
                    <GroupLabel>File</GroupLabel>
                    <TextControl label="Accept" value={field.accept} onChange={(v) => onChange({ accept: v })} placeholder="image/*" mono />
                    <NumberControl label="Max size (MB)" value={field.maxSizeMb} onChange={(v) => onChange({ maxSizeMb: v })} min={1} />
                    <ToggleControl label="Multiple" checked={field.multiple} onChange={(v) => onChange({ multiple: v })} />
                    <ToggleControl label="Image preview" checked={field.preview !== false} onChange={(v) => onChange({ preview: v })} />
                </>
            );

        case "otp":
            return (
                <>
                    <GroupLabel>OTP</GroupLabel>
                    <NumberControl label="Digits" value={field.length ?? 6} onChange={(v) => onChange({ length: v })} min={2} />
                </>
            );

        case "slider":
            return (
                <>
                    <GroupLabel>Slider</GroupLabel>
                    <NumberControl label="Min" value={field.min} onChange={(v) => onChange({ min: v })} />
                    <NumberControl label="Max" value={field.max} onChange={(v) => onChange({ max: v })} />
                    <NumberControl label="Step" value={field.step} onChange={(v) => onChange({ step: v })} min={0} />
                    <ToggleControl label="Show value" checked={field.showValue} onChange={(v) => onChange({ showValue: v })} />
                </>
            );

        case "color":
            return (
                <>
                    <GroupLabel>Color</GroupLabel>
                    <ToggleControl label="Alpha slider" checked={field.showAlpha} onChange={(v) => onChange({ showAlpha: v })} wide />
                </>
            );

        default:
            return null;
    }
}
