import type { ElementType } from "react";
import {
    AlignLeftIcon, AtSignIcon, BuildingIcon, CalendarIcon, ChevronDownIcon, CircleDotIcon,
    CreditCardIcon, DollarSignIcon, FileTextIcon, GlobeIcon, HashIcon, KeyIcon, KeyRoundIcon,
    LockIcon, MailIcon, MapPinIcon, PaletteIcon, PercentIcon, PhoneIcon, SearchIcon, ServerIcon,
    SlidersHorizontalIcon, SquareCheckIcon, TagIcon, TagsIcon, ToggleRightIcon, TypeIcon,
    UploadIcon, UserIcon,
} from "lucide-react";

import type { BuilderField, BuilderSettings, ComponentKind } from "./types";

// ─── Palette ──────────────────────────────────────────────────────────────────

export const FIELD_KINDS: { component: ComponentKind; label: string; icon: ElementType }[] = [
    { component: "input", label: "Input", icon: TypeIcon },
    { component: "password", label: "Password", icon: KeyRoundIcon },
    { component: "textarea", label: "Textarea", icon: AlignLeftIcon },
    { component: "currency", label: "Currency", icon: DollarSignIcon },
    { component: "date", label: "Date", icon: CalendarIcon },
    { component: "tags", label: "Tags", icon: TagsIcon },
    { component: "select", label: "Select", icon: ChevronDownIcon },
    { component: "select-api", label: "Select API", icon: ServerIcon },
    { component: "switch", label: "Switch", icon: ToggleRightIcon },
    { component: "checkbox", label: "Checkbox", icon: SquareCheckIcon },
    { component: "radio", label: "Radio", icon: CircleDotIcon },
    { component: "file", label: "File", icon: UploadIcon },
    { component: "phone", label: "Phone", icon: PhoneIcon },
    { component: "otp", label: "OTP", icon: HashIcon },
    { component: "slider", label: "Slider", icon: SlidersHorizontalIcon },
    { component: "color", label: "Color", icon: PaletteIcon },
];

// ─── Icon picker (input / password only) ──────────────────────────────────────

export const ICONS: Record<string, ElementType> = {
    UserIcon, MailIcon, AtSignIcon, LockIcon, KeyIcon, SearchIcon, GlobeIcon, PhoneIcon,
    CalendarIcon, CreditCardIcon, DollarSignIcon, PercentIcon, MapPinIcon, BuildingIcon,
    TagIcon, HashIcon, FileTextIcon,
};

export const ICON_NAMES = Object.keys(ICONS);

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_SETTINGS: BuilderSettings = {
    layout: "grid",
    columns: 2,
    submitLabel: "Submit",
    submitVariant: "default",
    showCancel: false,
    cancelLabel: "Cancel",
    loading: false,
    disabled: false,
    onlySubmitIfDirty: false,
    onlySubmitIfValid: false,
    showRequiredIndicator: true,
    focusFirstError: true,
};

const PER_KIND: Partial<Record<ComponentKind, Partial<BuilderField>>> = {
    input: { type: "text", placeholder: "Type here..." },
    password: { placeholder: "••••••••", showStrength: true, minLength: 8 },
    textarea: { rows: 4, placeholder: "Write something..." },
    currency: { currencySymbol: "$", currencyCode: "USD" },
    date: { valueFormat: "iso" },
    tags: { placeholder: "Add tags..." },
    select: {
        placeholder: "Select an option",
        options: [
            { label: "Option A", value: "a" },
            { label: "Option B", value: "b" },
        ],
    },
    "select-api": { route: "/api/categories", labelKey: "name", valueKey: "id", placeholder: "Search..." },
    radio: {
        orientation: "vertical",
        variant: "default",
        options: [
            { label: "Option A", value: "a" },
            { label: "Option B", value: "b" },
        ],
    },
    file: { accept: "image/*", preview: true, maxSizeMb: 5 },
    phone: { placeholder: "+1 555 000 0000" },
    otp: { length: 6 },
    slider: { min: 0, max: 100, step: 1, showValue: true },
    color: { showAlpha: false },
};

const LABELS: Record<ComponentKind, string> = {
    input: "Text field",
    password: "Password",
    textarea: "Description",
    currency: "Price",
    date: "Date",
    tags: "Tags",
    select: "Select",
    "select-api": "Category",
    switch: "Enabled",
    checkbox: "I accept the terms",
    radio: "Choose one",
    file: "Attachment",
    phone: "Phone",
    otp: "Verification code",
    slider: "Amount",
    color: "Color",
};

const uid = () => Math.random().toString(36).slice(2, 9);

export function createField(component: ComponentKind, existing: BuilderField[]): BuilderField {
    return {
        id: uid(),
        component,
        name: uniqueName(component.replace("-", "_"), existing),
        label: LABELS[component],
        options: [],
        ...PER_KIND[component],
    };
}

export function duplicateField(field: BuilderField, existing: BuilderField[]): BuilderField {
    return { ...field, id: uid(), name: uniqueName(field.name, existing) };
}

function uniqueName(base: string, existing: BuilderField[]): string {
    const taken = new Set(existing.map((f) => f.name));
    if (!taken.has(base)) return base;
    let i = 2;
    while (taken.has(`${base}_${i}`)) i++;
    return `${base}_${i}`;
}

export const STARTER_FIELDS: BuilderField[] = [
    {
        id: "starter_name",
        component: "input",
        name: "full_name",
        label: "Full name",
        placeholder: "John Doe",
        required: true,
        icon: "UserIcon",
        type: "text",
        minLength: 2,
        options: [],
    },
    {
        id: "starter_email",
        component: "input",
        name: "email",
        label: "Email",
        placeholder: "you@example.com",
        required: true,
        icon: "MailIcon",
        type: "email",
        options: [],
    },
];
