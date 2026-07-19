import Image from "next/image";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, NpmIcon } from "@/components/icons";

const socials = [
    { href: "https://github.com/santikzz", label: "GitHub", Icon: GithubIcon },
    { href: "https://www.linkedin.com/in/santiago-Bugnón", label: "LinkedIn", Icon: LinkedinIcon },
    { href: "https://www.npmjs.com/~santikzz", label: "npm", Icon: NpmIcon },
    { href: "mailto:hello@santikzz.dev", label: "Email", Icon: Mail },
];

export default function SectionHero() {
    return (
        <section className="bg-background border-b border-border overflow-hidden">
            <div className="mx-auto max-w-7xl grid md:grid-cols-12 md:min-h-[calc(100svh-3.5rem)]">

                <div className="md:col-span-6 order-2 md:order-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 pb-16 md:py-24">

                    <img
                        src="/assets/signature.png"
                        alt="Santiago Bugnón"
                        className="object-contain"
                    />

                    <h2 className="mt-6 text-primary font-heading font-bold text-2xl"><span className="text-white">I'm</span> Santiago Bugnón</h2>

                    <p className="mt-2 text-lg text-muted-foreground leading-relaxed max-w-md">
                        Full stack engineer,{" "}
                        <span className="text-foreground">co-founder &amp; CTO at Nebula Solutions</span>, and
                        independent security researcher. I build software that scales and break the kind that
                        doesn&apos;t.
                    </p>

                    <div className="mt-8 flex items-center gap-2">
                        {socials.map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noreferrer" : undefined}
                                aria-label={label}
                                className="p-2 -ml-2 first:ml-0 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-6 order-1 md:order-2 relative aspect-4/5 sm:aspect-3/4 md:aspect-auto">
                    <Image
                        src="/assets/me-dither.png"
                        alt="Santiago Bugnón"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top"
                    />
                    <div className="hidden md:block absolute inset-0 bg-linear-to-r from-background to-transparent to-40%" />
                    <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
                </div>

            </div>
        </section>
    );
}
