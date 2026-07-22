import { schemaCode, seededDefaults } from "./schema-gen";
import type { BuilderField, BuilderSettings } from "./types";

const str = (v: string) => JSON.stringify(v);

/** Props emitted per component, in the order they read best. */
function fieldProps(f: BuilderField, optionsIndent: number): [string, string][] {
    const props: [string, string][] = [
        ["name", str(f.name)],
        ["component", str(f.component)],
    ];
    const push = (key: string, value: string | undefined) => {
        if (value !== undefined) props.push([key, value]);
    };
    const text = (key: string, value?: string) => {
        if (value && value.trim()) push(key, str(value));
    };
    const num = (key: string, value?: number) => {
        if (value !== undefined) push(key, String(value));
    };
    const bool = (key: string, value?: boolean) => {
        if (value) push(key, "true");
    };

    text("label", f.label);

    switch (f.component) {
        case "input":
            if (f.type && f.type !== "text") text("type", f.type);
            text("prefix", f.prefix);
            text("suffix", f.suffix);
            num("min", f.min);
            num("max", f.max);
            num("step", f.step);
            break;
        case "password":
            bool("showStrength", f.showStrength);
            break;
        case "textarea":
            num("rows", f.rows);
            break;
        case "currency":
            text("currencySymbol", f.currencySymbol);
            text("currencyCode", f.currencyCode);
            break;
        case "date":
            if (f.valueFormat && f.valueFormat !== "iso") text("valueFormat", f.valueFormat);
            text("displayFormat", f.displayFormat);
            break;
        case "tags":
            if (f.options.length) push("options", `[${f.options.map((o) => str(o.value)).join(", ")}]`);
            bool("strict", f.strict);
            num("max", f.max);
            break;
        case "select":
            push("options", optionsLiteral(f.options, optionsIndent));
            bool("searchable", f.searchable);
            text("searchPlaceholder", f.searchPlaceholder);
            text("emptyText", f.emptyText);
            break;
        case "select-api":
            text("route", f.route);
            text("labelKey", f.labelKey);
            text("valueKey", f.valueKey);
            break;
        case "radio":
            push("options", optionsLiteral(f.options, optionsIndent));
            if (f.orientation === "horizontal") text("orientation", f.orientation);
            if (f.variant === "cards") text("variant", f.variant);
            break;
        case "file":
            text("accept", f.accept);
            bool("multiple", f.multiple);
            if (f.preview === false) push("preview", "false");
            num("maxSizeMb", f.maxSizeMb);
            break;
        case "otp":
            num("length", f.length);
            break;
        case "slider":
            num("min", f.min);
            num("max", f.max);
            num("step", f.step);
            bool("showValue", f.showValue);
            break;
        case "color":
            bool("showAlpha", f.showAlpha);
            break;
    }

    if (f.icon && (f.component === "input" || f.component === "password")) push("icon", f.icon);
    text("placeholder", f.placeholder);
    text("description", f.description);
    bool("required", f.required);
    bool("disabled", f.disabled);
    if (f.colSpan && f.colSpan > 1) num("colSpan", f.colSpan);
    text("inputClassName", f.inputClassName);

    return props;
}

function optionsLiteral(options: { label: string; value: string }[], indent: number): string {
    if (options.length === 0) return "[]";
    const items = options.map((o) => `{ label: ${str(o.label)}, value: ${str(o.value)} }`);
    if (options.length <= 2) return `[${items.join(", ")}]`;
    const pad = " ".repeat(indent + 4);
    return `[\n${items.map((i) => `${pad}${i},`).join("\n")}\n${" ".repeat(indent)}]`;
}

const WRAP_AT = 110;

function fieldLiteral(f: BuilderField): string {
    const inline = fieldProps(f, 20).map(([k, v]) => `${k}: ${v}`);
    const oneLine = `${" ".repeat(16)}{ ${inline.join(", ")} },`;
    if (oneLine.length <= WRAP_AT && !oneLine.includes("\n")) return oneLine;

    const body = fieldProps(f, 24)
        .map(([k, v]) => `${" ".repeat(20)}${k}: ${v},`)
        .join("\n");
    return `${" ".repeat(16)}{\n${body}\n${" ".repeat(16)}},`;
}

function defaultsLiteral(fields: BuilderField[]): string | null {
    const seeded = seededDefaults(fields);
    const entries = Object.entries(seeded);
    if (entries.length === 0) return null;
    const lines = entries.map(([k, v]) => `${" ".repeat(16)}${k}: ${JSON.stringify(v)},`);
    return `{\n${lines.join("\n")}\n${" ".repeat(12)}}`;
}

export function generateCode(fields: BuilderField[], settings: BuilderSettings): string {
    const icons = [...new Set(
        fields
            .filter((f) => f.icon && (f.component === "input" || f.component === "password"))
            .map((f) => f.icon as string),
    )].sort();

    const imports = [`import { z } from "zod";`];
    if (fields.some((f) => f.component === "phone")) {
        imports.push(`import { isValidPhoneNumber } from "react-phone-number-input";`);
    }
    if (icons.length) imports.push(`import { ${icons.join(", ")} } from "lucide-react";`);
    imports.push(`import { SchemaForm } from "@/components/schema-form";`);

    const defaults = defaultsLiteral(fields);

    const props: string[] = [`schema={schema}`];
    if (defaults) props.push(`defaultValues={${defaults}}`);
    props.push(`fields={[\n${fields.map(fieldLiteral).join("\n")}\n${" ".repeat(12)}]}`);
    props.push(`onSubmit={handleSubmit}`);
    if (settings.submitLabel !== "Submit") props.push(`submitLabel=${str(settings.submitLabel)}`);
    if (settings.submitVariant !== "default") props.push(`submitVariant=${str(settings.submitVariant)}`);
    if (settings.layout !== "grid") props.push(`layout=${str(settings.layout)}`);
    if (settings.layout === "grid" && settings.columns !== 2) props.push(`columns={${settings.columns}}`);
    if (settings.showCancel) {
        props.push(`onCancel={() => history.back()}`);
        if (settings.cancelLabel !== "Cancel") props.push(`cancelLabel=${str(settings.cancelLabel)}`);
    }
    if (settings.loading) props.push(`loading`);
    if (settings.disabled) props.push(`disabled`);
    if (settings.onlySubmitIfDirty) props.push(`onlySubmitIfDirty`);
    if (settings.onlySubmitIfValid) props.push(`onlySubmitIfValid`);
    if (!settings.showRequiredIndicator) props.push(`showRequiredIndicator={false}`);
    if (!settings.focusFirstError) props.push(`focusFirstError={false}`);

    const propsBlock = props.map((p) => `${" ".repeat(12)}${p}`).join("\n");

    return `${imports.join("\n")}

${schemaCode(fields)}

export function MyForm() {
    const handleSubmit = (data: z.infer<typeof schema>) => {
        console.log(data);
    };

    return (
        <SchemaForm
${propsBlock}
        />
    );
}
`;
}
