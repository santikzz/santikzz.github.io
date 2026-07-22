import { z, type ZodType } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

import type { FieldConfig } from "@/components/schema-form";
import { ICONS } from "./catalog";
import type { BuilderField } from "./types";

const NAME_RE = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

export function isValidName(name: string) {
    return NAME_RE.test(name);
}

/** Fields that can actually be rendered: valid identifier, no duplicates. */
export function usableFields(fields: BuilderField[]): BuilderField[] {
    const seen = new Set<string>();
    return fields.filter((f) => {
        if (!isValidName(f.name) || seen.has(f.name)) return false;
        seen.add(f.name);
        return true;
    });
}

export function duplicateNames(fields: BuilderField[]): Set<string> {
    const seen = new Set<string>();
    const dupes = new Set<string>();
    for (const f of fields) {
        if (seen.has(f.name)) dupes.add(f.name);
        seen.add(f.name);
    }
    return dupes;
}

/** Changing any of these requires rebuilding the schema / remounting the form. */
export function schemaSignature(fields: BuilderField[]): string {
    return JSON.stringify(
        fields.map((f) => [
            f.name, f.component, f.type, f.required, f.min, f.max,
            f.minLength, f.maxLength, f.length, f.valueFormat, f.multiple, f.step,
        ]),
    );
}

// ─── Runtime schema ───────────────────────────────────────────────────────────

export function buildSchema(fields: BuilderField[]) {
    const shape: Record<string, ZodType> = {};
    for (const f of fields) shape[f.name] = fieldSchema(f);
    return z.object(shape);
}

// keep in sync with `fieldSchemaCode` below
function fieldSchema(f: BuilderField): ZodType {
    const optionalString = (base: z.ZodString) =>
        f.required ? base : base.optional().or(z.literal(""));

    switch (f.component) {
        case "input": {
            if (f.type === "number") {
                let n = z.number({ error: "Enter a number" });
                if (f.min !== undefined) n = n.min(f.min, `Must be ≥ ${f.min}`);
                if (f.max !== undefined) n = n.max(f.max, `Must be ≤ ${f.max}`);
                return f.required ? n : n.optional();
            }
            let s = z.string();
            if (f.type === "email") s = s.email("Invalid email");
            if (f.type === "url") s = s.url("Invalid URL");
            // email/url already reject an empty string
            const formatted = f.type === "email" || f.type === "url";
            return optionalString(withLength(s, f, !formatted));
        }

        case "password":
        case "textarea":
            return optionalString(withLength(z.string(), f));

        case "phone": {
            const base = z.string().refine(isValidPhoneNumber, { message: "Enter a valid phone number" });
            return f.required ? base : base.or(z.literal(""));
        }

        case "otp": {
            const len = f.length ?? 6;
            const base = z.string().length(len, `Enter the ${len}-digit code`);
            return f.required ? base : base.optional().or(z.literal(""));
        }

        case "select":
        case "select-api":
        case "radio":
        case "color":
            return optionalString(f.required ? z.string().min(1, "Required") : z.string());

        case "date": {
            if (f.valueFormat === "date") {
                const d = z.date({ error: "Select a date" });
                return f.required ? d : d.optional();
            }
            const base = f.valueFormat === "datetime"
                ? z.string().min(1, "Select a date")
                : z.string().date("Select a date");
            return f.required ? base : base.optional().or(z.literal(""));
        }

        case "currency": {
            let n = z.coerce.number({ error: "Enter an amount" });
            if (f.min !== undefined) n = n.min(f.min, `Must be ≥ ${f.min}`);
            if (f.max !== undefined) n = n.max(f.max, `Must be ≤ ${f.max}`);
            return f.required ? n : n.optional();
        }

        case "slider": {
            let n = z.number();
            n = n.min(f.min ?? 0, `Must be ≥ ${f.min ?? 0}`);
            n = n.max(f.max ?? 100, `Must be ≤ ${f.max ?? 100}`);
            return n;
        }

        case "switch":
            return z.boolean();

        case "checkbox":
            return f.required ? z.literal(true, { error: "This field is required" }) : z.boolean();

        case "file": {
            if (f.multiple) {
                const arr = z.array(fileInstance());
                return f.required ? arr.min(1, "Upload at least one file") : arr.optional();
            }
            const file = fileInstance();
            return f.required ? file : file.optional();
        }

        case "tags": {
            let arr = z.array(z.string());
            if (f.max !== undefined) arr = arr.max(f.max, `At most ${f.max} tags`);
            return f.required ? arr.min(1, "Add at least one") : arr.optional();
        }

        default:
            return z.unknown();
    }
}

// File does not exist while the page is prerendered on the server
function fileInstance(): ZodType {
    if (typeof File === "undefined") return z.any();
    return z.instanceof(File, { message: "Upload a file" });
}

function withLength(s: z.ZodString, f: BuilderField, implicitMin = true): z.ZodString {
    let out = s;
    if (f.minLength !== undefined) out = out.min(f.minLength, `At least ${f.minLength} characters`);
    else if (f.required && implicitMin) out = out.min(1, "Required");
    if (f.maxLength !== undefined) out = out.max(f.maxLength, `At most ${f.maxLength} characters`);
    return out;
}

// ─── Generated schema source ──────────────────────────────────────────────────

export function schemaCode(fields: BuilderField[]): string {
    if (fields.length === 0) return "const schema = z.object({});";
    const pad = Math.max(...fields.map((f) => f.name.length));
    const lines = fields.map((f) => `    ${(f.name + ":").padEnd(pad + 1)} ${fieldSchemaCode(f)},`);
    return `const schema = z.object({\n${lines.join("\n")}\n});`;
}

// keep in sync with `fieldSchema` above
function fieldSchemaCode(f: BuilderField): string {
    const optionalString = (base: string) =>
        f.required ? base : `${base}.optional().or(z.literal(""))`;

    const range = (base: string) => {
        let out = base;
        if (f.min !== undefined) out += `.min(${f.min}, "Must be ≥ ${f.min}")`;
        if (f.max !== undefined) out += `.max(${f.max}, "Must be ≤ ${f.max}")`;
        return out;
    };

    switch (f.component) {
        case "input": {
            if (f.type === "number") {
                const n = range(`z.number({ error: "Enter a number" })`);
                return f.required ? n : `${n}.optional()`;
            }
            let s = "z.string()";
            if (f.type === "email") s += `.email("Invalid email")`;
            if (f.type === "url") s += `.url("Invalid URL")`;
            const formatted = f.type === "email" || f.type === "url";
            return optionalString(withLengthCode(s, f, !formatted));
        }

        case "password":
        case "textarea":
            return optionalString(withLengthCode("z.string()", f));

        case "phone": {
            const base = `z.string().refine(isValidPhoneNumber, { message: "Enter a valid phone number" })`;
            return f.required ? base : `${base}.or(z.literal(""))`;
        }

        case "otp": {
            const len = f.length ?? 6;
            const base = `z.string().length(${len}, "Enter the ${len}-digit code")`;
            return f.required ? base : `${base}.optional().or(z.literal(""))`;
        }

        case "select":
        case "select-api":
        case "radio":
        case "color":
            return optionalString(f.required ? `z.string().min(1, "Required")` : "z.string()");

        case "date": {
            if (f.valueFormat === "date") {
                const d = `z.date({ error: "Select a date" })`;
                return f.required ? d : `${d}.optional()`;
            }
            const base = f.valueFormat === "datetime"
                ? `z.string().min(1, "Select a date")`
                : `z.string().date("Select a date")`;
            return f.required ? base : `${base}.optional().or(z.literal(""))`;
        }

        case "currency": {
            const n = range(`z.coerce.number({ error: "Enter an amount" })`);
            return f.required ? n : `${n}.optional()`;
        }

        case "slider":
            return `z.number().min(${f.min ?? 0}).max(${f.max ?? 100})`;

        case "switch":
            return "z.boolean()";

        case "checkbox":
            return f.required
                ? `z.literal(true, { error: "This field is required" })`
                : "z.boolean()";

        case "file": {
            if (f.multiple) {
                const arr = "z.array(z.instanceof(File))";
                return f.required ? `${arr}.min(1, "Upload at least one file")` : `${arr}.optional()`;
            }
            const file = `z.instanceof(File, { message: "Upload a file" })`;
            return f.required ? file : `${file}.optional()`;
        }

        case "tags": {
            let arr = "z.array(z.string())";
            if (f.max !== undefined) arr += `.max(${f.max}, "At most ${f.max} tags")`;
            return f.required ? `${arr}.min(1, "Add at least one")` : `${arr}.optional()`;
        }

        default:
            return "z.unknown()";
    }
}

function withLengthCode(base: string, f: BuilderField, implicitMin = true): string {
    let out = base;
    if (f.minLength !== undefined) out += `.min(${f.minLength}, "At least ${f.minLength} characters")`;
    else if (f.required && implicitMin) out += `.min(1, "Required")`;
    if (f.maxLength !== undefined) out += `.max(${f.maxLength}, "At most ${f.maxLength} characters")`;
    return out;
}

// ─── Default values ───────────────────────────────────────────────────────────

/** Only values that must be seeded - the rest start as an empty string. */
export function seededDefaults(fields: BuilderField[]): Record<string, unknown> {
    const values: Record<string, unknown> = {};
    for (const f of fields) {
        if (f.component === "switch" || f.component === "checkbox") values[f.name] = false;
        else if (f.component === "tags") values[f.name] = [];
        else if (f.component === "file" && f.multiple) values[f.name] = [];
        else if (f.component === "slider") values[f.name] = f.min ?? 0;
    }
    return values;
}

export function buildDefaultValues(fields: BuilderField[]): Record<string, unknown> {
    const seeded = seededDefaults(fields);
    const values: Record<string, unknown> = {};
    for (const f of fields) {
        if (f.name in seeded) {
            values[f.name] = seeded[f.name];
            continue;
        }
        const isNumeric =
            f.component === "currency" || (f.component === "input" && f.type === "number");
        const isDateObject = f.component === "date" && f.valueFormat === "date";
        values[f.name] = isNumeric || isDateObject || f.component === "file" ? undefined : "";
    }
    return values;
}

// ─── Builder field -> library FieldConfig ─────────────────────────────────────

const blank = (v?: string) => (v && v.trim() ? v : undefined);

export function toFieldConfig(f: BuilderField): FieldConfig {
    const base = {
        name: f.name,
        label: blank(f.label),
        description: blank(f.description),
        placeholder: blank(f.placeholder),
        required: f.required || undefined,
        disabled: f.disabled || undefined,
        colSpan: f.colSpan,
        inputClassName: blank(f.inputClassName),
    };
    const icon = f.icon ? ICONS[f.icon] : undefined;

    switch (f.component) {
        case "input":
            return { ...base, component: "input", icon, type: f.type, min: f.min, max: f.max, step: f.step, prefix: blank(f.prefix), suffix: blank(f.suffix) };
        case "password":
            return { ...base, component: "password", icon, showStrength: f.showStrength };
        case "textarea":
            return { ...base, component: "textarea", rows: f.rows };
        case "currency":
            return { ...base, component: "currency", currencySymbol: blank(f.currencySymbol), currencyCode: blank(f.currencyCode) };
        case "date":
            return { ...base, component: "date", valueFormat: f.valueFormat, displayFormat: blank(f.displayFormat) };
        case "tags":
            return { ...base, component: "tags", options: f.options.length ? f.options.map((o) => o.value) : undefined, strict: f.strict, max: f.max };
        case "select":
            return { ...base, component: "select", options: f.options, searchable: f.searchable, searchPlaceholder: blank(f.searchPlaceholder), emptyText: blank(f.emptyText) };
        case "select-api":
            return { ...base, component: "select-api", route: f.route ?? "", labelKey: blank(f.labelKey), valueKey: blank(f.valueKey) };
        case "switch":
            return { ...base, component: "switch" };
        case "checkbox":
            return { ...base, component: "checkbox" };
        case "radio":
            return { ...base, component: "radio", options: f.options, orientation: f.orientation, variant: f.variant };
        case "file":
            return { ...base, component: "file", accept: blank(f.accept), multiple: f.multiple, preview: f.preview, maxSizeMb: f.maxSizeMb };
        case "phone":
            return { ...base, component: "phone" };
        case "otp":
            return { ...base, component: "otp", length: f.length };
        case "slider":
            return { ...base, component: "slider", min: f.min, max: f.max, step: f.step, showValue: f.showValue };
        case "color":
            return { ...base, component: "color", showAlpha: f.showAlpha };
    }
}
