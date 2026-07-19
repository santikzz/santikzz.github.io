import { useRef, useState, type ReactNode } from "react";
import { defineSounds, useSounds, type PlayOptions } from "sonus-js";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const customSounds = defineSounds({
    laser: {
        masterGain: 0.4,
        layers: [
            { kind: "tone", waveform: "sawtooth", frequency: 1800, glideTo: 200, glideTime: 0.12, attack: 0.002, decay: 0.14, peak: 0.05 },
        ],
    },
});

const STREAK_RESET_MS = 1500;
const MAX_STREAK_PITCH = 14;

export default function Sonus() {
    const { play, names, enabled, setEnabled, volume, setVolume } = useSounds({ sounds: customSounds });
    const [pitch, setPitch] = useState(0);
    const [rate, setRate] = useState(1);
    const [streak, setStreak] = useState(0);
    const streakRef = useRef(0);
    const streakTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const modifiers: PlayOptions = { pitch, rate };

    const claimPoint = () => {
        streakRef.current += 1;
        setStreak(streakRef.current);
        play("coin", { pitch: Math.min(streakRef.current - 1, MAX_STREAK_PITCH) });
        clearTimeout(streakTimer.current);
        streakTimer.current = setTimeout(() => {
            streakRef.current = 0;
            setStreak(0);
        }, STREAK_RESET_MS);
    };

    return (
        <div className="space-y-10">
            <header>
                <h1 className="font-heading text-3xl font-bold text-foreground">Sonus Playground</h1>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                    Sonus is a React hook for synthesized UI sounds - zero audio files, zero
                    dependencies. Every sound is generated live with the Web Audio API from a small
                    declarative recipe, and every play can be altered in real time (pitch, rate,
                    volume, detune).
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                        <a href="https://www.npmjs.com/package/sonus-js" target="_blank" rel="noreferrer">
                            <Package /> npm
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                        <a href="https://github.com/santikzz/sonus-js" target="_blank" rel="noreferrer">
                            <GithubIcon /> GitHub
                        </a>
                    </Button>
                </div>
            </header>

            <section className="rounded-xl border border-border p-5">
                <h2 className="text-sm font-semibold text-foreground">Claim points</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Each claim replays the <Code>coin</Code> recipe one semitone higher. Pause 1.5s
                    and the streak resets.
                </p>
                <div className="mt-4 flex items-center gap-4">
                    <Button onClick={claimPoint} className="py-5">Claim point</Button>
                    <span className="text-lg font-bold tabular-nums text-primary">
                        {streak > 0 ? `+${streak}` : ""}
                    </span>
                </div>
            </section>

            <section className="rounded-xl border border-border p-5">
                <h2 className="text-sm font-semibold text-foreground">Soundboard</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                    Every button plays with the modifiers below applied live.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                    {names.map((name) => (
                        <Button
                            key={name}
                            variant="secondary"
                            size="sm"
                            onClick={() => play(name, modifiers)}
                            className="justify-between gap-1 py-5 capitalize"
                        >
                            <span className="truncate">{name}</span>
                            {name === "laser" && <span className="text-[10px] text-primary">custom</span>}
                        </Button>
                    ))}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <SliderRow
                        label="pitch"
                        display={`${pitch > 0 ? "+" : ""}${pitch} st`}
                        value={pitch}
                        min={-12}
                        max={12}
                        step={1}
                        onChange={setPitch}
                    />
                    <SliderRow
                        label="rate"
                        display={`${rate.toFixed(2)}×`}
                        value={rate}
                        min={0.5}
                        max={2}
                        step={0.05}
                        onChange={setRate}
                    />
                </div>
            </section>

            <section className="rounded-xl border border-border p-5">
                <h2 className="text-sm font-semibold text-foreground">Global</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-2 sm:items-center">
                    <SliderRow
                        label="volume"
                        display={`${Math.round(volume * 100)}%`}
                        value={volume}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={setVolume}
                    />
                    <label className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Switch checked={enabled} onCheckedChange={setEnabled} />
                        sounds {enabled ? "on" : "off"}
                    </label>
                </div>
            </section>
        </div>
    );
}

function SliderRow({
    label,
    display,
    value,
    min,
    max,
    step,
    onChange,
}: {
    label: string;
    display: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}) {
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

function Code({ children }: { children: ReactNode }) {
    return (
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">{children}</code>
    );
}

function GithubIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58C20.56 22.29 24 17.79 24 12.5 24 5.87 18.63.5 12 .5Z" />
        </svg>
    );
}
