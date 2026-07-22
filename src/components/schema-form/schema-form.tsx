import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import { cn } from "./lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FieldRenderer } from "./field-renderer";
import type { FieldConfig, FormSection, SchemaFormProps } from "./types";
import { Loader2 } from "lucide-react";

/**
 * Schema-driven form built on React Hook Form + Zod + shadcn/ui.
 *
 * Define fields once as a typed config array and get a fully validated,
 * accessible form - labels, errors, responsive grid layout, and submit
 * handling included.
 *
 * @see {@link SchemaFormProps} for all available props.
 * @see {@link FieldConfig} for all field type configs.
 */
export function SchemaForm<T extends ZodType = ZodType>({
    fields,
    sections,
    schema,
    defaultValues,
    onSubmit,
    serverErrors,
    loading = false,
    submitLabel = "Submit",
    submitIcon: SubmitIcon,
    submitVariant = "default",
    layout = "grid",
    columns = 2,
    disabled = false,
    onlySubmitIfDirty = false,
    onlySubmitIfValid = false,
    focusFirstError = true,
    showRequiredIndicator = true,
    onCancel,
    cancelLabel = "Cancel",
    before,
    after,
    formClassName,
    actionsClassName,
}: SchemaFormProps<T>) {

    const form = useForm({
        resolver: zodResolver(schema as never),
        defaultValues: defaultValues as Record<string, unknown>,
        mode: "onTouched",
    });

    const allFields = useMemo(
        () => sections ? sections.flatMap((s) => s.fields) : fields ?? [],
        [sections, fields],
    );
    const hasConditionalFields = useMemo(
        () => allFields.some((f) => typeof f.hidden === "function"),
        [allFields],
    );
    const formValues = hasConditionalFields ? form.watch() : ({} as Record<string, unknown>);
    const prevServerErrorKeys = useRef<string[]>([]);

    useEffect(() => {
        if (!serverErrors || Object.keys(serverErrors).length === 0) return;

        if (prevServerErrorKeys.current.length > 0) {
            form.clearErrors(prevServerErrorKeys.current as Parameters<typeof form.clearErrors>[0]);
        }

        const keys = Object.keys(serverErrors);
        keys.forEach((key) => {
            form.setError(key as Parameters<typeof form.setError>[0], {
                type: "server",
                message: serverErrors[key],
            });
        });
        prevServerErrorKeys.current = keys;
    }, [serverErrors]); // eslint-disable-line react-hooks/exhaustive-deps

    const isSubmitDisabled = useMemo(() => {
        if (disabled || loading) return true;
        if (onlySubmitIfDirty && !form.formState.isDirty) return true;
        if (onlySubmitIfValid && !form.formState.isValid) return true;
        return false;
    }, [disabled, loading, onlySubmitIfDirty, onlySubmitIfValid, form.formState.isDirty, form.formState.isValid]);

    const handleSubmit = form.handleSubmit(
        async (data) => {
            await onSubmit(data as never);
        },
        focusFirstError
            ? (errors) => {
                const firstKey = Object.keys(errors)[0];
                if (!firstKey) return;
                try {
                    form.setFocus(firstKey as never);
                } catch {
                    // field has no registered ref (button-based controls)
                }
                const el =
                    document.querySelector<HTMLElement>(`[name="${firstKey}"]`) ??
                    document.getElementById(firstKey);
                if (el) {
                    if (document.activeElement !== el) el.focus({ preventScroll: true });
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }
            : undefined,
    );

    const gridClass = (cols: 1 | 2 | 3) =>
        layout === "grid"
            ? cn(
                "grid items-start gap-x-6 gap-y-5",
                cols === 1 && "grid-cols-1",
                cols === 2 && "grid-cols-1 md:grid-cols-2",
                cols === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            )
            : "flex flex-col gap-5";

    const renderFields = (list: FieldConfig[]) =>
        list.map((config) => (
            <FieldWrapper
                key={config.name}
                config={config}
                form={form}
                formValues={formValues}
                layout={layout}
                globalDisabled={disabled}
                showRequiredIndicator={showRequiredIndicator}
            />
        ));

    const renderSection = (section: FormSection, index: number) => (
        <div
            key={index}
            className={cn("space-y-5", section.separator && "border-t pt-6", section.className)}
        >
            {(section.title || section.description) && (
                <div className="space-y-1">
                    {section.title && (
                        <h3 className="text-base font-medium leading-none">{section.title}</h3>
                    )}
                    {section.description && (
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                    )}
                </div>
            )}
            <div className={gridClass(section.columns ?? columns)}>
                {renderFields(section.fields)}
            </div>
        </div>
    );

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className={cn("space-y-6", formClassName)} noValidate>
                {before}

                {sections ? (
                    <div className="space-y-8">{sections.map(renderSection)}</div>
                ) : (
                    <div className={gridClass(columns)}>{renderFields(fields ?? [])}</div>
                )}

                {after}

                <div className={cn("flex items-center justify-end gap-3 pt-1", actionsClassName)}>
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={loading || disabled}
                        >
                            {cancelLabel}
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className='cursor-pointer'
                        disabled={loading || isSubmitDisabled}
                        variant={submitVariant}
                    >
                        {submitLabel}
                        {loading ? <Loader2 className="animate-spin" />
                            : SubmitIcon && <SubmitIcon className="size-5" />}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

interface FieldWrapperProps {
    config: FieldConfig;
    form: ReturnType<typeof useForm>;
    formValues: Record<string, unknown>;
    layout: "stack" | "grid";
    globalDisabled: boolean;
    showRequiredIndicator: boolean;
}

function FieldWrapper({ config, form, formValues, layout, globalDisabled, showRequiredIndicator }: FieldWrapperProps) {
    const isHidden =
        typeof config.hidden === "function" ? config.hidden(formValues) : config.hidden;
    if (isHidden) return null;

    const colSpanClass =
        layout === "grid"
            ? cn(
                config.colSpan === 2 && "md:col-span-2",
                config.colSpan === 3 && "col-span-full",
            )
            : "";

    const isInline = config.component === "switch" || config.component === "checkbox";
    const RequiredMark = showRequiredIndicator && config.required
        ? <span className="text-destructive ml-0.5">*</span>
        : null;

    if (isInline) {
        return (
            <FormField
                control={form.control as never}
                name={config.name}
                render={({ field }) => (
                    <FormItem
                        className={cn(
                            "flex flex-row items-center justify-between rounded-lg border border-border/50 bg-muted/10 px-4 py-3 shadow-xs",
                            colSpanClass,
                            config.className,
                        )}
                    >
                        <div className="space-y-0.5">
                            {config.label && (
                                <FormLabel className={cn("cursor-pointer text-sm font-medium leading-none", config.labelClassName)}>
                                    {config.label}
                                    {RequiredMark}
                                </FormLabel>
                            )}
                            {config.description && (
                                <FormDescription className={cn("text-xs", config.descriptionClassName)}>{config.description}</FormDescription>
                            )}
                            <FormMessage />
                        </div>
                        <FormControl>
                            <FieldRenderer
                                config={config}
                                field={field as never}
                                form={form as never}
                                formValues={formValues}
                                disabled={globalDisabled}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        );
    }

    return (
        <FormField
            control={form.control as never}
            name={config.name}
            render={({ field }) => (
                <FormItem className={cn(colSpanClass, config.className)}>
                    {config.label && (
                        <FormLabel className={config.labelClassName}>
                            {config.label}
                            {RequiredMark}
                        </FormLabel>
                    )}
                    <FormControl>
                        <FieldRenderer
                            config={config}
                            field={field as never}
                            form={form as never}
                            formValues={formValues}
                            disabled={globalDisabled}
                        />
                    </FormControl>
                    {config.description && <FormDescription className={config.descriptionClassName}>{config.description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
