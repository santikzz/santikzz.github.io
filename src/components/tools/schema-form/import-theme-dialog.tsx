import { useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useSandboxTheme } from "./sandbox-theme";

export function ImportThemeDialog() {
    const { importTheme, resetTheme, isCustomTheme } = useSandboxTheme();
    const [open, setOpen] = useState(false);
    const [css, setCss] = useState("");
    const [error, setError] = useState(false);

    const handleApply = () => {
        if (!importTheme(css)) {
            setError(true);
            return;
        }
        setError(false);
        setCss("");
        setOpen(false);
    };

    const handleReset = () => {
        resetTheme();
        setError(false);
        setCss("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setError(false); }}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                    <Palette className="size-3.5" />
                    Import theme
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Import a shadcn theme</DialogTitle>
                    <DialogDescription>
                        Paste a shadcn/ui theme css file - build one with{" "}
                        <a
                            className="underline underline-offset-2 hover:text-foreground transition-colors"
                            href="https://tweakcn.com/editor/theme"
                            target="_blank"
                            rel="noreferrer"
                        >
                            tweakcn.com
                        </a>{" "}
                        or{" "}
                        <a
                            className="underline underline-offset-2 hover:text-foreground transition-colors"
                            href="https://ui.shadcn.com/create"
                            target="_blank"
                            rel="noreferrer"
                        >
                            ui.shadcn.com/create
                        </a>
                        , copy the exported css, and preview the whole gallery with it.
                    </DialogDescription>
                </DialogHeader>
                <Textarea
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    placeholder={":root {\n    --background: oklch(1 0 0);\n    ...\n}\n\n.dark {\n    --background: oklch(0.145 0 0);\n    ...\n}"}
                    className="h-56 resize-none font-mono text-xs"
                />
                {error && (
                    <p className="text-sm text-destructive">
                        No css variables found - paste a theme with a <code className="font-mono">:root</code> block.
                    </p>
                )}
                <DialogFooter className="gap-2 sm:justify-between">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        disabled={!isCustomTheme}
                        className="text-muted-foreground"
                    >
                        Reset to default
                    </Button>
                    <Button type="button" onClick={handleApply} disabled={!css.trim()}>
                        Apply theme
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
