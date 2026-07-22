import { Button } from "@/components/ui/button";
import { GithubIcon, NpmIcon } from "@/components/icons";
import { ThemeToggle } from "./theme-toggle";
import { ImportThemeDialog } from "./import-theme-dialog";

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur sm:px-6">
            <div className="lg:hidden">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    SchemaForm
                </p>
            </div>
            <div className="hidden lg:block" />

            <div className="flex items-center gap-1.5">
                <Button asChild variant="ghost" size="icon" className="text-muted-foreground">
                    <a
                        href="https://github.com/santikzz/schema-form"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub repository"
                    >
                        <GithubIcon className="size-4" />
                    </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="text-muted-foreground">
                    <a
                        href="https://www.npmjs.com/package/@santikzz/schema-form"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="npm package"
                    >
                        <NpmIcon className="size-4" />
                    </a>
                </Button>
                <div className="mx-1 h-5 w-px bg-border" />
                <ImportThemeDialog />
                <ThemeToggle />
            </div>
        </header>
    );
}
