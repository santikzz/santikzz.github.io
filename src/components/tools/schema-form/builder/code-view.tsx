import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlighterPromise = createHighlighter({
    themes: ["github-dark"],
    langs: ["tsx"],
});

export function CodeView({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    const [html, setHtml] = useState("");

    useEffect(() => {
        let cancelled = false;
        highlighterPromise.then((h) => {
            if (cancelled) return;
            setHtml(h.codeToHtml(code, { lang: "tsx", theme: "github-dark" }));
        });
        return () => { cancelled = true; };
    }, [code]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative h-full">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="absolute top-3 right-4 z-10 size-7 text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
                aria-label="Copy code"
            >
                {copied
                    ? <CheckIcon size={14} className="text-emerald-400" />
                    : <CopyIcon size={14} />
                }
            </Button>

            {html ? (
                <div
                    className="h-full text-xs [&>pre]:m-0 [&>pre]:h-full [&>pre]:overflow-x-auto [&>pre]:p-5 [&>pre]:font-mono [&>pre]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            ) : (
                <pre className="h-full overflow-x-auto bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-200">
                    <code>{code}</code>
                </pre>
            )}
        </div>
    );
}
