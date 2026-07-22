export type ComponentKind =
    | "input"
    | "password"
    | "textarea"
    | "currency"
    | "date"
    | "tags"
    | "select"
    | "select-api"
    | "switch"
    | "checkbox"
    | "radio"
    | "file"
    | "phone"
    | "otp"
    | "slider"
    | "color";

export interface BuilderOption {
    label: string;
    value: string;
}

/**
 * Flat superset of every FieldConfig variant. Keeping one shape (instead of a
 * discriminated union) makes the editor controls trivial - each control just
 * patches one key - and `toFieldConfig` narrows it back down per component.
 */
export interface BuilderField {
    id: string;
    component: ComponentKind;
    name: string;
    label: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    colSpan?: 1 | 2 | 3;
    /** key into ICONS - input and password only */
    icon?: string;
    inputClassName?: string;

    // input
    type?: "text" | "email" | "number" | "url" | "tel";
    prefix?: string;
    suffix?: string;

    // numeric range - input[number], slider, and tag count
    min?: number;
    max?: number;
    step?: number;

    // string length
    minLength?: number;
    maxLength?: number;

    // password
    showStrength?: boolean;

    // textarea
    rows?: number;

    // select / radio / tags
    options: BuilderOption[];
    searchable?: boolean;
    searchPlaceholder?: string;
    emptyText?: string;

    // select-api
    route?: string;
    labelKey?: string;
    valueKey?: string;

    // radio
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "cards";

    // file
    accept?: string;
    multiple?: boolean;
    preview?: boolean;
    maxSizeMb?: number;

    // otp
    length?: number;

    // slider
    showValue?: boolean;

    // currency
    currencySymbol?: string;
    currencyCode?: string;

    // date
    valueFormat?: "iso" | "datetime" | "date";
    displayFormat?: string;

    // tags
    strict?: boolean;

    // color
    showAlpha?: boolean;
}

export interface BuilderSettings {
    layout: "stack" | "grid";
    columns: 1 | 2 | 3;
    submitLabel: string;
    submitVariant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    showCancel: boolean;
    cancelLabel: string;
    loading: boolean;
    disabled: boolean;
    onlySubmitIfDirty: boolean;
    onlySubmitIfValid: boolean;
    showRequiredIndicator: boolean;
    focusFirstError: boolean;
}

export interface BuilderState {
    fields: BuilderField[];
    settings: BuilderSettings;
}
