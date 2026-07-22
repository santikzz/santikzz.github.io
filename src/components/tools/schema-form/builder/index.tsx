import { useEffect, useMemo, useState } from "react";
import { CodeIcon, EyeIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import "../i18n";
import "../mock-api";
import { SandboxThemeProvider } from "../sandbox-theme";
import { Navbar } from "../navbar";
import { Sidenav } from "../sidenav";

import { createField, duplicateField, DEFAULT_SETTINGS, FIELD_KINDS, STARTER_FIELDS } from "./catalog";
import { duplicateNames, usableFields } from "./schema-gen";
import { generateCode } from "./code-gen";
import { FieldEditor } from "./field-editor";
import { FormSettings } from "./form-settings";
import { Preview } from "./preview";
import { CodeView } from "./code-view";
import type { BuilderField, BuilderSettings, BuilderState, ComponentKind } from "./types";

const STORAGE_KEY = "schema-form-builder";

export default function SchemaFormBuilder() {
    const [fields, setFields] = useState<BuilderField[]>(STARTER_FIELDS);
    const [settings, setSettings] = useState<BuilderSettings>(DEFAULT_SETTINGS);
    const [loaded, setLoaded] = useState(false);

    /* eslint-disable react-hooks/set-state-in-effect -- localStorage is only readable after hydration */
    useEffect(() => {
        const saved = readState();
        if (saved) {
            setFields(saved.fields);
            setSettings(saved.settings);
        }
        setLoaded(true);
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    useEffect(() => {
        if (!loaded) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ fields, settings }));
        } catch {
            // storage full or unavailable - the builder still works in-memory
        }
    }, [loaded, fields, settings]);

    const dupes = useMemo(() => duplicateNames(fields), [fields]);
    const renderable = useMemo(() => usableFields(fields), [fields]);
    const code = useMemo(() => generateCode(renderable, settings), [renderable, settings]);

    const addField = (component: ComponentKind) =>
        setFields((prev) => [...prev, createField(component, prev)]);

    const patchField = (id: string, patch: Partial<BuilderField>) =>
        setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));

    const removeField = (id: string) =>
        setFields((prev) => prev.filter((f) => f.id !== id));

    const copyField = (id: string) =>
        setFields((prev) => {
            const index = prev.findIndex((f) => f.id === id);
            if (index === -1) return prev;
            const next = [...prev];
            next.splice(index + 1, 0, duplicateField(prev[index], prev));
            return next;
        });

    const moveField = (id: string, direction: -1 | 1) =>
        setFields((prev) => {
            const index = prev.findIndex((f) => f.id === id);
            const target = index + direction;
            if (index === -1 || target < 0 || target >= prev.length) return prev;
            const next = [...prev];
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });

    const reset = () => {
        setFields(STARTER_FIELDS);
        setSettings(DEFAULT_SETTINGS);
    };

    return (
        <SandboxThemeProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />

                <div className="flex">
                    <Sidenav active="builder" />

                    {/* ── Field palette ── */}
                    <aside className="hidden md:flex sticky top-14 h-[calc(100vh-3.5rem)] w-44 shrink-0 flex-col gap-1 overflow-y-auto border-r border-border/60 bg-muted/10 p-3">
                        <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                            Add field
                        </p>
                        <PaletteButtons onAdd={addField} />
                    </aside>

                    {/* ── Editor ── */}
                    <div className="flex min-w-0 flex-1 flex-col md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto border-r border-border/60">
                        <div className="flex items-center justify-between gap-2 border-b border-border/50 bg-muted/20 px-4 py-2">
                            <div>
                                <p className="text-sm font-semibold">Editor</p>
                                <p className="text-[11px] text-muted-foreground">
                                    {fields.length} field{fields.length === 1 ? "" : "s"}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={reset}
                                className="h-7 gap-1.5 text-xs text-muted-foreground"
                            >
                                <RotateCcwIcon className="size-3.5" />
                                Reset
                            </Button>
                        </div>

                        {/* mobile palette */}
                        <div className="flex gap-1.5 overflow-x-auto border-b border-border/50 p-2 md:hidden">
                            <PaletteButtons onAdd={addField} inline />
                        </div>

                        <div className="flex flex-col gap-3 p-4">
                            <FormSettings
                                settings={settings}
                                onChange={(patch) => setSettings((prev) => ({ ...prev, ...patch }))}
                            />

                            {fields.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
                                    No fields yet - pick one from the palette.
                                </div>
                            ) : (
                                fields.map((field, index) => (
                                    <FieldEditor
                                        key={field.id}
                                        field={field}
                                        index={index}
                                        total={fields.length}
                                        duplicated={dupes.has(field.name)}
                                        gridLayout={settings.layout === "grid"}
                                        onChange={(patch) => patchField(field.id, patch)}
                                        onMove={(direction) => moveField(field.id, direction)}
                                        onDuplicate={() => copyField(field.id)}
                                        onRemove={() => removeField(field.id)}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {/* ── Preview / code ── */}
                    <div className="flex min-w-0 flex-1 flex-col md:sticky md:top-14 md:h-[calc(100vh-3.5rem)]">
                        <Tabs defaultValue="preview" className="flex h-full flex-col gap-0">
                            <div className="flex items-center justify-between gap-2 border-b border-border/50 bg-muted/20 px-4 py-2">
                                <p className="text-sm font-semibold">Output</p>
                                <TabsList>
                                    <TabsTrigger value="preview" className="gap-1.5 text-xs">
                                        <EyeIcon className="size-3.5" />
                                        Preview
                                    </TabsTrigger>
                                    <TabsTrigger value="code" className="gap-1.5 text-xs">
                                        <CodeIcon className="size-3.5" />
                                        Code
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            {/* forceMount keeps values typed into the preview when switching tabs */}
                            <TabsContent value="preview" forceMount className="overflow-y-auto data-[state=inactive]:hidden">
                                <Preview fields={renderable} settings={settings} />
                            </TabsContent>

                            <TabsContent value="code" className="overflow-auto bg-[#24292e]">
                                <CodeView code={code} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </SandboxThemeProvider>
    );
}

// ─── Palette ──────────────────────────────────────────────────────────────────

function PaletteButtons({ onAdd, inline }: {
    onAdd: (component: ComponentKind) => void;
    inline?: boolean;
}) {
    return (
        <>
            {FIELD_KINDS.map(({ component, label, icon: Icon }) => (
                <button
                    key={component}
                    type="button"
                    onClick={() => onAdd(component)}
                    className={cn(
                        "group flex items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border/60 hover:bg-muted/60 hover:text-foreground",
                        inline && "shrink-0 border-border/60 whitespace-nowrap text-xs",
                    )}
                >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="flex-1 text-left">{label}</span>
                    {!inline && (
                        <PlusIcon className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                </button>
            ))}
        </>
    );
}

// ─── Persistence ──────────────────────────────────────────────────────────────

function readState(): BuilderState | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<BuilderState>;
        if (!Array.isArray(parsed.fields)) return null;
        return {
            fields: parsed.fields.map((f) => ({ ...f, options: f.options ?? [] })),
            settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
        };
    } catch {
        return null;
    }
}
