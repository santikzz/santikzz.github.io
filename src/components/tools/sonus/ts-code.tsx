import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type TokenType = "kw" | "str" | "num" | "bool" | "key" | "fn" | "punct" | "plain";
type Token = { text: string; type: TokenType };

// ordered rules, first match at the cursor wins
const rules: [RegExp, TokenType][] = [
    [/^\s+/, "plain"],
    [/^"(?:[^"\\]|\\.)*"/, "str"],
    [/^\b(?:import|from|const|export|default|new)\b/, "kw"],
    [/^\b(?:true|false|null)\b/, "bool"],
    [/^-?\d+(?:\.\d+)?/, "num"],
    [/^[A-Za-z_$][\w$]*(?=\s*:)/, "key"],
    [/^[A-Za-z_$][\w$]*(?=\s*\()/, "fn"],
    [/^[A-Za-z_$][\w$]*/, "plain"],
    [/^[{}[\](),;:]/, "punct"],
    [/^[\s\S]/, "plain"],
];

const colors: Record<TokenType, string> = {
    kw: "text-[#c792ea]",
    str: "text-[#c3e88d]",
    num: "text-[#f78c6c]",
    bool: "text-[#f78c6c]",
    key: "text-[#82aaff]",
    fn: "text-[#82aaff]",
    punct: "text-slate-500",
    plain: "text-slate-200",
};

function tokenize(code: string): Token[] {
    const tokens: Token[] = [];
    let rest = code;
    while (rest.length > 0) {
        for (const [re, type] of rules) {
            const match = re.exec(rest);
            if (!match) continue;
            tokens.push({ text: match[0], type });
            rest = rest.slice(match[0].length);
            break;
        }
    }
    return tokens;
}

export default function TsCode({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard unavailable, ignore
        }
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon-sm"
                onClick={copy}
                aria-label="Copy code"
                className="absolute right-2 top-2 text-slate-400 hover:bg-white/10 hover:text-slate-100"
            >
                {copied ? <Check className="text-emerald-400" /> : <Copy />}
            </Button>
            <pre className="overflow-x-auto rounded-xl border border-border bg-[#0d1220] p-4 text-xs leading-relaxed">
                <code className="font-mono">
                    {tokenize(code).map((token, i) => (
                        <span key={i} className={colors[token.type]}>
                            {token.text}
                        </span>
                    ))}
                </code>
            </pre>
        </div>
    );
}
