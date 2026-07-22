import { useMemo, useState } from "react";
import { SchemaForm } from "@/components/schema-form";
import { buildDefaultValues, buildSchema, schemaSignature, toFieldConfig } from "./schema-gen";
import type { BuilderField, BuilderSettings } from "./types";

interface PreviewProps {
    fields: BuilderField[];
    settings: BuilderSettings;
}

export function Preview({ fields, settings }: PreviewProps) {
    const [submitted, setSubmitted] = useState<string | null>(null);
    const signature = schemaSignature(fields);

    const schema = useMemo(() => buildSchema(fields), [signature]); // eslint-disable-line react-hooks/exhaustive-deps
    const defaultValues = useMemo(() => buildDefaultValues(fields), [signature]); // eslint-disable-line react-hooks/exhaustive-deps
    const configs = useMemo(() => fields.map(toFieldConfig), [fields]);

    if (fields.length === 0) {
        return (
            <div className="flex h-full items-center justify-center p-10 text-center text-sm text-muted-foreground">
                Add a field from the left panel to start building.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-6">
            <div className="rounded-xl border border-border/60 bg-card/40 p-5">
                {/* remounts only when the schema shape changes, so typing a label keeps entered values */}
                <SchemaForm
                    key={signature}
                    schema={schema}
                    defaultValues={defaultValues}
                    fields={configs}
                    onSubmit={(data) => setSubmitted(serialize(data))}
                    onCancel={settings.showCancel ? () => setSubmitted(null) : undefined}
                    cancelLabel={settings.cancelLabel}
                    submitLabel={settings.submitLabel}
                    submitVariant={settings.submitVariant}
                    layout={settings.layout}
                    columns={settings.columns}
                    loading={settings.loading}
                    disabled={settings.disabled}
                    onlySubmitIfDirty={settings.onlySubmitIfDirty}
                    onlySubmitIfValid={settings.onlySubmitIfValid}
                    showRequiredIndicator={settings.showRequiredIndicator}
                    focusFirstError={settings.focusFirstError}
                />
            </div>

            {submitted && (
                <div className="rounded-xl border border-border/60 overflow-hidden">
                    <div className="border-b border-border/50 bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground">
                        Submitted payload
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
                        {submitted}
                    </pre>
                </div>
            )}
        </div>
    );
}

// files are not JSON-serialisable - show their names instead
function serialize(data: unknown): string {
    const readable: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
        if (value instanceof File) readable[key] = value.name;
        else if (Array.isArray(value)) readable[key] = value.map((v) => (v instanceof File ? v.name : v));
        else readable[key] = value;
    }
    return JSON.stringify(readable, null, 2);
}
