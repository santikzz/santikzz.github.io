import SectionLabel from "@/components/index/section-label";
import LogoLoop, { type LogoItem } from "@/components/thirdparty/logo-loop";

function chip(name: string, slug: string): LogoItem {
    return {
        title: name,
        ariaLabel: name,
        node: (
            <span className="flex items-center gap-3 border border-border px-5 py-3 whitespace-nowrap">
                <img
                    src={`https://cdn.simpleicons.org/${slug}/a4a4a4`}
                    alt=""
                    className="h-5 w-5"
                    loading="lazy"
                />
                <span className="text-sm font-medium text-foreground">{name}</span>
            </span>
        ),
    };
}

const stackRow = [
    chip("Laravel", "laravel"),
    chip("React", "react"),
    chip("Next.js", "nextdotjs"),
    chip("TypeScript", "typescript"),
    chip("PHP", "php"),
    chip("Python", "python"),
    chip("Tailwind CSS", "tailwindcss"),
    chip("Node.js", "nodedotjs"),
    chip("PostgreSQL", "postgresql"),
    chip("MySQL", "mysql"),
    chip("Redis", "redis"),
];

const infraRow = [
    chip("Docker", "docker"),
    chip("Linux", "linux"),
    chip("Ubuntu", "ubuntu"),
    chip("Nginx", "nginx"),
    chip("Caddy", "caddy"),
    chip("Proxmox", "proxmox"),
    chip("Cloudflare", "cloudflare"),
    chip("Grafana", "grafana"),
    chip("Git", "git"),
    chip("GitHub", "github"),
    chip("Wireshark", "wireshark"),
];

export default function SectionAbout() {
    return (
        <section id="about" className="border-b border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
                <SectionLabel label="About" />
                <div className="grid md:grid-cols-12 gap-10">

                    <div className="md:col-span-4 min-w-0">
                        <h2 className="font-heading text-3xl font-medium text-foreground leading-snug">
                            <span className="text-primary">I build solutions</span> that scale, ship fast, and stay safe under load.
                        </h2>
                    </div>

                    <div className="md:col-span-8 min-w-0 space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            Full stack engineer with +10 years shipping production software: backend services,
                            APIs, UI, and the infrastructure underneath. I studied Systems Engineering at{" "}
                            <a
                                href="http://unicen.edu.ar/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-foreground underline underline-offset-4"
                            >
                                UNICEN
                            </a>.
                        </p>
                        <p>
                            On the side I work as an independent security researcher, studying how web apps,
                            networks and infrastructure break. Today I lead engineering at{" "}
                            <a
                                href="https://nebulasolutions.com.ar"
                                target="_blank"
                                rel="noreferrer"
                                className="text-foreground underline underline-offset-4"
                            >
                                Nebula Solutions
                            </a>
                            , the software factory I co-founded as CTO.
                        </p>
                    </div>
                </div>
            </div>

            {/* full-bleed double marquee, rows run in opposite directions */}
            <div className="py-16 md:py-20 flex flex-col gap-3 overflow-hidden">
                <LogoLoop
                    logos={stackRow}
                    speed={36}
                    direction="left"
                    gap={12}
                    pauseOnHover={false}
                    fadeOut={true}
                    fadeOutColor={"var(--background)"}
                    ariaLabel="Development stack"
                />
                <LogoLoop
                    logos={infraRow}
                    speed={28}
                    direction="right"
                    gap={12}
                    pauseOnHover={false}
                    fadeOut={true}
                    fadeOutColor={"var(--background)"}
                    ariaLabel="Infrastructure and tools"
                />
            </div>
        </section>
    );
}
