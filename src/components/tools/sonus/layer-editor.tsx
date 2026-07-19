import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import SliderRow from "./slider-row";
import { filterTypes, round, waveforms, type LayerState, type NoiseState, type ToneState } from "./recipe";

type Props = {
    layer: LayerState;
    index: number;
    canRemove: boolean;
    onChange: (layer: LayerState) => void;
    onRemove: () => void;
};

export default function LayerEditor({ layer, index, canRemove, onChange, onRemove }: Props) {
    const patch = (p: Partial<ToneState> | Partial<NoiseState>) => onChange({ ...layer, ...p } as LayerState);

    return (
        <div className="space-y-4 rounded-lg border border-border bg-muted/20 p-4">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">
                    layer {index + 1} · <span className="text-muted-foreground">{layer.kind}</span>
                </span>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onRemove}
                    disabled={!canRemove}
                    aria-label="Remove layer"
                    className="text-muted-foreground hover:text-destructive"
                >
                    <Trash2 />
                </Button>
            </div>

            {layer.kind === "tone" ? (
                <>
                    <OptionGroup label="waveform" options={waveforms} value={layer.waveform} onSelect={(v) => patch({ waveform: v })} />
                    <SliderRow label="frequency" display={`${round(layer.frequency, 0)} Hz`} value={layer.frequency} min={50} max={4000} step={10} onChange={(v) => patch({ frequency: v })} />
                    <SliderRow label="detune" display={`${round(layer.detune, 0)} cents`} value={layer.detune} min={-100} max={100} step={1} onChange={(v) => patch({ detune: v })} />
                    <Toggle label="glide" checked={layer.glide} onChange={(v) => patch({ glide: v })} />
                    {layer.glide && (
                        <>
                            <SliderRow label="glideTo" display={`${round(layer.glideTo, 0)} Hz`} value={layer.glideTo} min={50} max={4000} step={10} onChange={(v) => patch({ glideTo: v })} />
                            <SliderRow label="glideTime" display={`${round(layer.glideTime, 2)} s`} value={layer.glideTime} min={0.02} max={0.5} step={0.01} onChange={(v) => patch({ glideTime: v })} />
                        </>
                    )}
                </>
            ) : (
                <>
                    <OptionGroup label="filterType" options={filterTypes} value={layer.filterType} onSelect={(v) => patch({ filterType: v })} />
                    <SliderRow label="filterFrequency" display={`${round(layer.filterFrequency, 0)} Hz`} value={layer.filterFrequency} min={100} max={8000} step={50} onChange={(v) => patch({ filterFrequency: v })} />
                    <SliderRow label="filterQ" display={`${round(layer.filterQ, 1)}`} value={layer.filterQ} min={0.1} max={8} step={0.1} onChange={(v) => patch({ filterQ: v })} />
                    <Toggle label="filter glide" checked={layer.filterGlide} onChange={(v) => patch({ filterGlide: v })} />
                    {layer.filterGlide && (
                        <SliderRow label="filterGlideTo" display={`${round(layer.filterGlideTo, 0)} Hz`} value={layer.filterGlideTo} min={100} max={8000} step={50} onChange={(v) => patch({ filterGlideTo: v })} />
                    )}
                </>
            )}

            <SliderRow label="offset" display={`${round(layer.offset, 2)} s`} value={layer.offset} min={0} max={0.3} step={0.01} onChange={(v) => patch({ offset: v })} />
            <SliderRow label="attack" display={`${round(layer.attack, 3)} s`} value={layer.attack} min={0.001} max={0.3} step={0.001} onChange={(v) => patch({ attack: v })} />
            <SliderRow label="decay" display={`${round(layer.decay, 2)} s`} value={layer.decay} min={0.01} max={1} step={0.01} onChange={(v) => patch({ decay: v })} />
            <SliderRow label="peak" display={`${round(layer.peak, 2)}`} value={layer.peak} min={0.01} max={0.5} step={0.01} onChange={(v) => patch({ peak: v })} />
        </div>
    );
}

function OptionGroup<T extends string>({
    label,
    options,
    value,
    onSelect,
}: {
    label: string;
    options: readonly T[];
    value: T;
    onSelect: (value: T) => void;
}) {
    return (
        <div className="space-y-2">
            <span className="text-xs text-muted-foreground">{label}</span>
            <div className="grid grid-cols-4 gap-2">
                {options.map((option) => (
                    <Button
                        key={option}
                        variant={value === option ? "default" : "secondary"}
                        size="sm"
                        onClick={() => onSelect(option)}
                        className="capitalize"
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
    return (
        <label className="flex items-center gap-3 text-xs text-muted-foreground">
            <Switch checked={checked} onCheckedChange={onChange} />
            {label}
        </label>
    );
}
