import { Slider } from "@/components/ui/slider";

type Props = {
    label: string;
    display: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
};

export default function SliderRow({ label, display, value, min, max, step, onChange }: Props) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium tabular-nums text-foreground">{display}</span>
            </div>
            <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
        </div>
    );
}
