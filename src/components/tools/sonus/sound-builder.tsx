import { useMemo, useRef, useState } from "react";
import { play, SOUNDS, soundNames, type SoundName } from "sonus-js";
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SliderRow from "./slider-row";
import TsCode from "./ts-code";
import LayerEditor from "./layer-editor";
import { buildSnippet, createShimmer, createTone, createNoise, fromRecipe, round, toRecipe, type LayerState, type ShimmerState } from "./recipe";

export default function SoundBuilder() {
    const nextId = useRef(2);
    const [preset, setPreset] = useState("");
    const [layers, setLayers] = useState<LayerState[]>(() => [createTone(1)]);
    const [masterGain, setMasterGain] = useState(0.4);
    const [shimmer, setShimmer] = useState<ShimmerState>(createShimmer);

    const recipe = useMemo(() => toRecipe(masterGain, layers, shimmer), [masterGain, layers, shimmer]);
    const code = useMemo(() => buildSnippet(recipe), [recipe]);

    const updateLayer = (layer: LayerState) => setLayers((ls) => ls.map((l) => (l.id === layer.id ? layer : l)));
    const removeLayer = (id: number) => setLayers((ls) => ls.filter((l) => l.id !== id));
    const addTone = () => setLayers((ls) => [...ls, createTone(nextId.current++)]);
    const addNoise = () => setLayers((ls) => [...ls, createNoise(nextId.current++)]);
    const patchShimmer = (p: Partial<ShimmerState>) => setShimmer((s) => ({ ...s, ...p }));

    const loadPreset = (name: string) => {
        const source = SOUNDS[name as SoundName];
        if (!source) return;
        const loaded = fromRecipe(source, () => nextId.current++);
        setPreset(name);
        setLayers(loaded.layers);
        setMasterGain(loaded.masterGain);
        setShimmer(loaded.shimmer);
        play(source);
    };

    return (
        <section className="rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground">Build custom sounds</h2>
            <p className="mt-1 text-xs text-muted-foreground">
                Stack tone and noise layers, add a shimmer tail, preview it live, and copy the generated recipe.
            </p>

            <div className="mt-5 grid gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <span className="text-xs text-muted-foreground">load a preset</span>
                        <Select value={preset} onValueChange={loadPreset}>
                            <SelectTrigger className="w-full capitalize">
                                <SelectValue placeholder="Pick a built-in sound…" />
                            </SelectTrigger>
                            <SelectContent>
                                {soundNames.map((name) => (
                                    <SelectItem key={name} value={name} className="capitalize">
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <SliderRow label="masterGain" display={`${round(masterGain, 2)}`} value={masterGain} min={0} max={1} step={0.01} onChange={setMasterGain} />

                    <div className="space-y-3">
                        {layers.map((layer, i) => (
                            <LayerEditor
                                key={layer.id}
                                layer={layer}
                                index={i}
                                canRemove={layers.length > 1}
                                onChange={updateLayer}
                                onRemove={() => removeLayer(layer.id)}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="secondary" size="sm" onClick={addTone}>
                            <Plus /> Tone layer
                        </Button>
                        <Button variant="secondary" size="sm" onClick={addNoise}>
                            <Plus /> Noise layer
                        </Button>
                    </div>

                    <div className="space-y-4 rounded-lg border border-border bg-muted/20 p-4">
                        <label className="flex items-center gap-3 text-xs font-medium text-foreground">
                            <Switch checked={shimmer.on} onCheckedChange={(v) => patchShimmer({ on: v })} />
                            shimmer tail
                        </label>
                        {shimmer.on && (
                            <>
                                <SliderRow label="delay" display={`${round(shimmer.delay, 2)} s`} value={shimmer.delay} min={0.02} max={0.3} step={0.01} onChange={(v) => patchShimmer({ delay: v })} />
                                <SliderRow label="feedback" display={`${round(shimmer.feedback, 2)}`} value={shimmer.feedback} min={0} max={0.9} step={0.01} onChange={(v) => patchShimmer({ feedback: v })} />
                                <SliderRow label="wet" display={`${round(shimmer.wet, 2)}`} value={shimmer.wet} min={0} max={0.5} step={0.01} onChange={(v) => patchShimmer({ wet: v })} />
                                <SliderRow label="lowpass" display={`${round(shimmer.lowpass, 0)} Hz`} value={shimmer.lowpass} min={500} max={8000} step={100} onChange={(v) => patchShimmer({ lowpass: v })} />
                            </>
                        )}
                    </div>

                    <Button onClick={() => play(recipe)} className="w-full py-5">
                        <Play /> Play sound
                    </Button>
                </div>

                <div className="lg:sticky lg:top-20 lg:self-start">
                    <TsCode code={code} />
                </div>
            </div>
        </section>
    );
}
