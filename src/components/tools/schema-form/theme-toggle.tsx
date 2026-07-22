import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSandboxTheme } from "./sandbox-theme";

export function ThemeToggle() {
    const { mode, setMode } = useSandboxTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className="text-muted-foreground"
            aria-label="Toggle theme"
        >
            {mode === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </Button>
    );
}
