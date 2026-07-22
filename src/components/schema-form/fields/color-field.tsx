import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    ColorPicker,
    ColorPickerAlpha,
    ColorPickerEyeDropper,
    ColorPickerFormat,
    ColorPickerHue,
    ColorPickerOutput,
    ColorPickerSelection,
} from "../lib/color-picker";
import type { ColorFieldConfig } from "../types";

interface Props {
    config: ColorFieldConfig;
    field: ControllerRenderProps<FieldValues, string>;
    isDisabled: boolean;
}

// color picker in a popover - stores a hex string ("#RRGGBB", "#RRGGBBAA" with alpha)
export function ColorField({ config, field, isDisabled }: Props) {
    const value: string = field.value || "";

    return (
        <Popover onOpenChange={(open) => { if (!open) field.onBlur(); }}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    disabled={isDisabled}
                    className={cn(
                        "border-input focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full items-center justify-start gap-2 rounded-md border bg-input/30 px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer font-normal",
                        config.inputClassName,
                    )}
                >
                    <span
                        className="size-4 shrink-0 rounded-sm border border-border/60"
                        style={{ background: value || "transparent" }}
                    />
                    <span className={cn(!value && "text-muted-foreground")}>
                        {value || (config.placeholder ?? "Pick a color")}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" align="start">
                <ColorPicker
                    value={value || undefined}
                    onChange={field.onChange}
                    className="gap-3"
                >
                    <ColorPickerSelection className="h-36" />
                    <div className="flex items-center gap-3">
                        <ColorPickerEyeDropper className="size-8" />
                        <div className="grid w-full gap-1.5">
                            <ColorPickerHue />
                            {config.showAlpha && <ColorPickerAlpha />}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ColorPickerOutput />
                        <ColorPickerFormat />
                    </div>
                </ColorPicker>
            </PopoverContent>
        </Popover>
    );
}
