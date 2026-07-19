import Head from "next/head";
import { ArrowUpRight } from "lucide-react";
import { packages } from "@/data/packages";
import SectionLabel from "@/components/index/section-label";

export default function PackagesPage() {
    return (
        <>
            <Head>
                <title>Packages - Santiago Bugnón</title>
                <meta name="description" content="Open source packages I publish and maintain." />
            </Head>

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <SectionLabel label="Packages" />

                <div className="divide-y divide-border">
                    {packages.map((pkg) => (
                        <a
                            key={pkg.name}
                            href={pkg.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group block py-5"
                        >
                            <h3 className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                                {pkg.name}
                                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                {pkg.description}
                            </p>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}
