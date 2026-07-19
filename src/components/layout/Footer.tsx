import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Footer() {
    return (
        <footer className="border-t border-border mt-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <p className="  text-sm font-medium text-foreground">Santiago Bugnón</p>
                    <p className="mt-1   text-xs text-muted-foreground">
                        Tandil, Argentina · {new Date().getFullYear()}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/santikzz"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <GithubIcon className="h-4 w-4" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/santiago-Bugnón"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <LinkedinIcon className="h-4 w-4" />
                    </a>
                    <a
                        href="mailto:hello@santikzz.dev"
                        aria-label="Email"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Mail className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
