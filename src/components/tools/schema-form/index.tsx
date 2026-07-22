import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import "./i18n";
import "./mock-api";
import { SandboxThemeProvider } from "./sandbox-theme";
import { Navbar } from "./navbar";
import { Sidenav } from "./sidenav";
import { GithubIcon, NpmIcon } from "@/components/icons";

import { InputSection } from "@/components/schema-form/examples/sections/input-section";
import { PasswordSection } from "@/components/schema-form/examples/sections/password-section";
import { TextareaSection } from "@/components/schema-form/examples/sections/textarea-section";
import { CurrencySection } from "@/components/schema-form/examples/sections/currency-section";
import { DateSection } from "@/components/schema-form/examples/sections/date-section";
import { SelectSection } from "@/components/schema-form/examples/sections/select-section";
import { SelectApiSection } from "@/components/schema-form/examples/sections/select-api-section";
import { ToggleSection } from "@/components/schema-form/examples/sections/toggle-section";
import { RadioSection } from "@/components/schema-form/examples/sections/radio-section";
import { FileSection } from "@/components/schema-form/examples/sections/file-section";
import { PhoneSection } from "@/components/schema-form/examples/sections/phone-section";
import { OtpSection } from "@/components/schema-form/examples/sections/otp-section";
import { TagsSection } from "@/components/schema-form/examples/sections/tags-section";
import { SliderSection } from "@/components/schema-form/examples/sections/slider-section";
import { CustomSection } from "@/components/schema-form/examples/sections/custom-section";
import { BehaviorSection } from "@/components/schema-form/examples/sections/behavior-section";
import { ColorSection } from "@/components/schema-form/examples/sections/color-section";
import { FormSectionsSection } from "@/components/schema-form/examples/sections/form-sections-section";

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ id, title, subtitle, children }: {
    id: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-20 flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            </div>
            {children}
        </section>
    );
}

// ─── Install command ──────────────────────────────────────────────────────────

const INSTALL_CMD = "npx @santikzz/schema-form add schema-form";

function InstallCommand() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(INSTALL_CMD);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex max-w-xl items-center justify-between gap-3 rounded-lg border border-border bg-muted/50 px-4 py-2.5">
            <code className="overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground">
                <span className="text-muted-foreground select-none">$ </span>
                {INSTALL_CMD}
            </code>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="size-7 shrink-0 text-muted-foreground"
                aria-label="Copy install command"
            >
                {copied
                    ? <CheckIcon size={14} className="text-emerald-400" />
                    : <CopyIcon size={14} />
                }
            </Button>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SchemaFormDemo() {
    return (
        <SandboxThemeProvider>
        <div className="min-h-screen bg-background text-foreground">

            <Navbar />

            <div className="flex">

            {/* ── Sidebar ── */}
            <Sidenav active="docs" />

            {/* ── Content ── */}
            <main className="flex-1 max-w-4xl mx-auto px-6 py-10 flex flex-col gap-14">

                {/* ── Getting started ── */}
                <div id="getting-started" className="scroll-mt-20 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight">SchemaForm</h1>
                        <Badge variant="secondary" className="font-mono text-xs">v1.1.0</Badge>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
                        Schema-driven forms built on{" "}
                        <span className="text-foreground font-medium">React Hook Form</span> +{" "}
                        <span className="text-foreground font-medium">Zod</span> +{" "}
                        <span className="text-foreground font-medium">shadcn/ui</span>.
                        Define fields once as a typed config - labels, validation, layout, and
                        submit handling are handled automatically. Distributed shadcn-style:
                        the CLI copies the source into your project, you own the code.
                    </p>
                    <InstallCommand />
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <a
                            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                            href="https://www.npmjs.com/package/@santikzz/schema-form"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <NpmIcon className="h-3.5 w-3.5" />
                            npm
                        </a>
                        <a
                            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                            href="https://github.com/santikzz/schema-form"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GithubIcon className="h-3.5 w-3.5" />
                            GitHub
                        </a>
                    </div>
                </div>

                <Separator />

                {/* ── Sections ── */}

                <Section id="inputs" title="Input" subtitle="Text, number, email, URL - with leading icons, text prefix, and trailing suffix.">
                    <InputSection />
                </Section>

                <Separator />

                <Section id="password" title="Password" subtitle="Show/hide toggle. Optional strength meter with requirement checklist.">
                    <PasswordSection />
                </Section>

                <Separator />

                <Section id="textarea" title="Textarea" subtitle="Multi-line text with configurable row height.">
                    <TextareaSection />
                </Section>

                <Separator />

                <Section id="currency" title="Currency" subtitle="Numeric input with leading currency symbol and trailing ISO code. Normalises to float on blur.">
                    <CurrencySection />
                </Section>

                <Separator />

                <Section id="date" title="Date picker" subtitle="Calendar popover with month/year dropdowns. Localized via i18n. Stores ISO strings by default.">
                    <DateSection />
                </Section>

                <Separator />

                <Section id="tags" title="Tags input" subtitle="Free-form tag entry or searchable autocomplete from a fixed options list.">
                    <TagsSection />
                </Section>

                <Separator />

                <Section id="select" title="Select" subtitle="Plain dropdown or searchable combobox from a static options list.">
                    <SelectSection />
                </Section>

                <Separator />

                <Section id="select-api" title="Select API" subtitle="Fetches options from an endpoint with debounced live search and AbortController.">
                    <SelectApiSection />
                </Section>

                <Separator />

                <Section id="toggles" title="Switch & Checkbox" subtitle="Horizontal card layout - label on the left, control on the right.">
                    <ToggleSection />
                </Section>

                <Separator />

                <Section id="radio" title="Radio" subtitle="Single-select options. Default list, horizontal, plan cards, or icon cards.">
                    <RadioSection />
                </Section>

                <Separator />

                <Section id="file" title="File upload" subtitle="Dashed upload zone with image preview. Supports edit-mode URL defaultValues.">
                    <FileSection />
                </Section>

                <Separator />

                <Section id="phone" title="Phone" subtitle="Country flag selector + E.164 formatted input.">
                    <PhoneSection />
                </Section>

                <Separator />

                <Section id="otp" title="OTP" subtitle="One-time-password / PIN input. Two groups separated by a dash.">
                    <OtpSection />
                </Section>

                <Separator />

                <Section id="slider" title="Slider" subtitle="Range slider with optional live value display.">
                    <SliderSection />
                </Section>

                <Separator />

                <Section id="color" title="Color" subtitle="Popover color picker with eyedropper, hue/alpha sliders, and format output.">
                    <ColorSection />
                </Section>

                <Separator />

                <Section id="custom" title="Custom field" subtitle="Full escape hatch for any component - tag inputs, colour pickers, rich text, etc.">
                    <CustomSection />
                </Section>

                <Separator />

                <Section id="form-sections" title="Sections" subtitle="Visually group fields into titled sections with their own grid settings.">
                    <FormSectionsSection />
                </Section>

                <Separator />

                <Section id="behavior" title="Behaviors" subtitle="onlySubmitIfDirty, onlySubmitIfValid, and conditional field visibility.">
                    <BehaviorSection />
                </Section>

                <div className="pb-12" />
            </main>

            </div>
        </div>
        </SandboxThemeProvider>
    );
}
