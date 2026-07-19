import { cn } from "@/lib/utils";

export default function CountryFlag({ code, className }: { code: string; className?: string }) {
    return (
        <img
            src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
            alt={code.toUpperCase()}
            title={code.toUpperCase()}
            loading="lazy"
            className={cn("h-3 w-auto", className)}
        />
    );
}
