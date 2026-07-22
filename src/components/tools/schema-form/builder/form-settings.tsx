import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, SettingsIcon } from "lucide-react";
import { ControlGrid, GroupLabel, SelectControl, TextControl, ToggleControl } from "./controls";
import type { BuilderSettings } from "./types";

interface FormSettingsProps {
    settings: BuilderSettings;
    onChange: (patch: Partial<BuilderSettings>) => void;
}

export function FormSettings({ settings, onChange }: FormSettingsProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center gap-2 bg-muted/30 px-2 py-1.5 text-left"
            >
                {open
                    ? <ChevronDownIcon className="size-3.5 text-muted-foreground" />
                    : <ChevronRightIcon className="size-3.5 text-muted-foreground" />
                }
                <SettingsIcon className="size-3.5 text-muted-foreground" />
                <span className="text-sm font-medium">Form settings</span>
            </button>

            {open && (
                <div className="border-t border-border/50 p-3">
                    <ControlGrid>
                        <GroupLabel>Layout</GroupLabel>
                        <SelectControl
                            label="Layout"
                            value={settings.layout}
                            onChange={(v) => onChange({ layout: v })}
                            options={[
                                { label: "Grid", value: "grid" as const },
                                { label: "Stack", value: "stack" as const },
                            ]}
                        />
                        <SelectControl
                            label="Columns"
                            value={String(settings.columns)}
                            onChange={(v) => onChange({ columns: Number(v) as 1 | 2 | 3 })}
                            options={[
                                { label: "1", value: "1" },
                                { label: "2", value: "2" },
                                { label: "3", value: "3" },
                            ]}
                        />

                        <GroupLabel>Actions</GroupLabel>
                        <TextControl
                            label="Submit label"
                            value={settings.submitLabel}
                            onChange={(v) => onChange({ submitLabel: v ?? "" })}
                        />
                        <SelectControl
                            label="Submit variant"
                            value={settings.submitVariant}
                            onChange={(v) => onChange({ submitVariant: v })}
                            options={[
                                { label: "Default", value: "default" as const },
                                { label: "Secondary", value: "secondary" as const },
                                { label: "Destructive", value: "destructive" as const },
                                { label: "Outline", value: "outline" as const },
                                { label: "Ghost", value: "ghost" as const },
                                { label: "Link", value: "link" as const },
                            ]}
                        />
                        <ToggleControl
                            label="Cancel button"
                            checked={settings.showCancel}
                            onChange={(v) => onChange({ showCancel: v })}
                        />
                        {settings.showCancel && (
                            <TextControl
                                label="Cancel label"
                                value={settings.cancelLabel}
                                onChange={(v) => onChange({ cancelLabel: v ?? "" })}
                            />
                        )}

                        <GroupLabel>Behavior</GroupLabel>
                        <ToggleControl
                            label="Only submit if dirty"
                            checked={settings.onlySubmitIfDirty}
                            onChange={(v) => onChange({ onlySubmitIfDirty: v })}
                        />
                        <ToggleControl
                            label="Only submit if valid"
                            checked={settings.onlySubmitIfValid}
                            onChange={(v) => onChange({ onlySubmitIfValid: v })}
                        />
                        <ToggleControl
                            label="Required indicator"
                            checked={settings.showRequiredIndicator}
                            onChange={(v) => onChange({ showRequiredIndicator: v })}
                        />
                        <ToggleControl
                            label="Focus first error"
                            checked={settings.focusFirstError}
                            onChange={(v) => onChange({ focusFirstError: v })}
                        />
                        <ToggleControl
                            label="Loading"
                            checked={settings.loading}
                            onChange={(v) => onChange({ loading: v })}
                        />
                        <ToggleControl
                            label="Disabled"
                            checked={settings.disabled}
                            onChange={(v) => onChange({ disabled: v })}
                        />
                    </ControlGrid>
                </div>
            )}
        </div>
    );
}
