import Link from "next/link";
import ToolsLayout from "@/components/tools/tools-layout";
import { tools } from "@/data/tools";

export default function ToolsPage() {
    return (
        <ToolsLayout title="Tools">
            <h1 className="font-heading text-3xl font-bold text-foreground">Tools</h1>
            <p className="mt-3 text-muted-foreground">
                Small live web tools I built. Pick one from the list.
            </p>

            <div className="mt-8 divide-y divide-border">
                {tools.map((t) => (
                    <Link key={t.slug} href={`/tools/${t.slug}`} className="group block py-4">
                        <h3 className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                            {t.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
                    </Link>
                ))}
            </div>
        </ToolsLayout>
    );
}
