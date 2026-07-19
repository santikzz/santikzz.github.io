import type { NoiseLayer, SoundLayer, SoundRecipe, ToneLayer } from "sonus-js";

export const waveforms = ["sine", "square", "sawtooth", "triangle"] as const;
export type Waveform = (typeof waveforms)[number];

export const filterTypes = ["lowpass", "highpass", "bandpass", "notch"] as const;
export type FilterType = (typeof filterTypes)[number];

export type ToneState = {
    id: number;
    kind: "tone";
    waveform: Waveform;
    frequency: number;
    detune: number;
    glide: boolean;
    glideTo: number;
    glideTime: number;
    offset: number;
    attack: number;
    decay: number;
    peak: number;
};

export type NoiseState = {
    id: number;
    kind: "noise";
    filterType: FilterType;
    filterFrequency: number;
    filterQ: number;
    filterGlide: boolean;
    filterGlideTo: number;
    offset: number;
    attack: number;
    decay: number;
    peak: number;
};

export type LayerState = ToneState | NoiseState;

export type ShimmerState = {
    on: boolean;
    delay: number;
    feedback: number;
    wet: number;
    lowpass: number;
};

export const round = (value: number, decimals: number) => {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
};

export function createTone(id: number): ToneState {
    return {
        id,
        kind: "tone",
        waveform: "sawtooth",
        frequency: 1800,
        detune: 0,
        glide: true,
        glideTo: 200,
        glideTime: 0.12,
        offset: 0,
        attack: 0.002,
        decay: 0.14,
        peak: 0.05,
    };
}

export function createNoise(id: number): NoiseState {
    return {
        id,
        kind: "noise",
        filterType: "bandpass",
        filterFrequency: 2200,
        filterQ: 1.4,
        filterGlide: false,
        filterGlideTo: 600,
        offset: 0,
        attack: 0.002,
        decay: 0.12,
        peak: 0.08,
    };
}

export function createShimmer(): ShimmerState {
    return { on: false, delay: 0.12, feedback: 0.25, wet: 0.16, lowpass: 4200 };
}

// load a built-in recipe into editable builder state, filling defaults for absent optional fields
export function fromRecipe(recipe: SoundRecipe, nextId: () => number) {
    const layers: LayerState[] = recipe.layers.map((layer) => {
        if (layer.kind === "tone") {
            const base = createTone(nextId());
            return {
                ...base,
                waveform: (waveforms as readonly string[]).includes(layer.waveform) ? (layer.waveform as Waveform) : base.waveform,
                frequency: layer.frequency,
                detune: layer.detune ?? 0,
                glide: layer.glideTo !== undefined,
                glideTo: layer.glideTo ?? base.glideTo,
                glideTime: layer.glideTime ?? base.glideTime,
                offset: layer.offset ?? 0,
                attack: layer.attack,
                decay: layer.decay,
                peak: layer.peak,
            };
        }
        const base = createNoise(nextId());
        return {
            ...base,
            filterType: (filterTypes as readonly string[]).includes(layer.filterType) ? (layer.filterType as FilterType) : base.filterType,
            filterFrequency: layer.filterFrequency,
            filterQ: layer.filterQ ?? base.filterQ,
            filterGlide: layer.filterGlideTo !== undefined,
            filterGlideTo: layer.filterGlideTo ?? base.filterGlideTo,
            offset: layer.offset ?? 0,
            attack: layer.attack,
            decay: layer.decay,
            peak: layer.peak,
        };
    });

    return {
        masterGain: recipe.masterGain,
        layers,
        shimmer: recipe.shimmer ? { on: true, ...recipe.shimmer } : createShimmer(),
    };
}

function toneLayer(l: ToneState): ToneLayer {
    return {
        kind: "tone",
        waveform: l.waveform,
        frequency: round(l.frequency, 0),
        ...(l.detune !== 0 ? { detune: round(l.detune, 0) } : {}),
        ...(l.glide ? { glideTo: round(l.glideTo, 0), glideTime: round(l.glideTime, 2) } : {}),
        ...(l.offset > 0 ? { offset: round(l.offset, 2) } : {}),
        attack: round(l.attack, 3),
        decay: round(l.decay, 2),
        peak: round(l.peak, 2),
    };
}

function noiseLayer(l: NoiseState): NoiseLayer {
    return {
        kind: "noise",
        filterType: l.filterType,
        filterFrequency: round(l.filterFrequency, 0),
        filterQ: round(l.filterQ, 2),
        ...(l.filterGlide ? { filterGlideTo: round(l.filterGlideTo, 0) } : {}),
        ...(l.offset > 0 ? { offset: round(l.offset, 2) } : {}),
        attack: round(l.attack, 3),
        decay: round(l.decay, 2),
        peak: round(l.peak, 2),
    };
}

export function toRecipe(masterGain: number, layers: LayerState[], shimmer: ShimmerState): SoundRecipe {
    const built: SoundLayer[] = layers.map((l) => (l.kind === "tone" ? toneLayer(l) : noiseLayer(l)));
    return {
        masterGain: round(masterGain, 2),
        layers: built,
        ...(shimmer.on
            ? {
                  shimmer: {
                      delay: round(shimmer.delay, 2),
                      feedback: round(shimmer.feedback, 2),
                      wet: round(shimmer.wet, 2),
                      lowpass: round(shimmer.lowpass, 0),
                  },
              }
            : {}),
    };
}

// pretty-print the recipe object as a TS literal so the snippet always matches what plays
function serialize(value: unknown, indent: number): string {
    const pad = "  ".repeat(indent);
    const padIn = "  ".repeat(indent + 1);
    if (Array.isArray(value)) {
        if (value.length === 0) return "[]";
        const items = value.map((v) => padIn + serialize(v, indent + 1)).join(",\n");
        return `[\n${items},\n${pad}]`;
    }
    if (value && typeof value === "object") {
        const body = Object.entries(value as Record<string, unknown>)
            .map(([k, v]) => `${padIn}${k}: ${serialize(v, indent + 1)}`)
            .join(",\n");
        return `{\n${body},\n${pad}}`;
    }
    if (typeof value === "string") return `"${value}"`;
    return String(value);
}

export function buildSnippet(recipe: SoundRecipe): string {
    return [
        'import { defineSounds } from "sonus-js";',
        "",
        "const sounds = defineSounds({",
        `  custom: ${serialize(recipe, 1)},`,
        "});",
    ].join("\n");
}
