import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { cn } from "../lib/utils";
import { Input } from "@/components/ui/input";
import type { InputFieldConfig } from "../types";

interface Props {
    config: InputFieldConfig;
    field: ControllerRenderProps<FieldValues, string>;
    isDisabled: boolean;
}

export function InputField({ config, field, isDisabled }: Props) {
    const Icon = config.icon;
    const hasIcon = !!Icon;
    const hasPrefix = !!config.prefix && !hasIcon; // icon takes priority over text prefix
    const hasSuffix = !!config.suffix;

    return (
        <div className="relative flex items-center">

            {Icon && (
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50 z-10">
                    <Icon aria-hidden="true" size={16} />
                </div>
            )}

            {hasPrefix && (
                <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50 z-10 select-none">
                    {config.prefix}
                </span>
            )}

            <Input
                {...field}
                type={config.type ?? "text"}
                placeholder={config.placeholder}
                disabled={isDisabled}
                min={config.min}
                max={config.max}
                step={config.step}
                value={field.value ?? ""}
                className={cn(
                    "peer",
                    hasIcon && "ps-9",
                    hasPrefix && "ps-7",
                    hasSuffix && "pe-12",
                    config.inputClassName,
                )}
                onChange={(e) => {
                    if (config.type === "number") {
                        const v = e.target.value === "" ? undefined : e.target.valueAsNumber;
                        field.onChange(isNaN(v as number) ? undefined : v);
                    } else {
                        field.onChange(e.target.value);
                    }
                }}
            />

            {hasSuffix && (
                <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground text-sm peer-disabled:opacity-50 select-none">
                    {config.suffix}
                </span>
            )}
        </div>
    );
}
