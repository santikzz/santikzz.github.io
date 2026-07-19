import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import GradualBlurMemo from "../thirdparty/gradual-blur";

const linkGroups = [
    [{ href: "/", label: "Home" }],
    [
        { href: "/projects", label: "Projects" },
        { href: "/packages", label: "Packages" },
        { href: "/tools", label: "Tools" },
    ],
    [
        { href: "/blog", label: "Writings" },
        { href: "/#about", label: "About me" },
    ],
];

export default function Navbar() {

    const router = useRouter();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) => {
        if (href.includes("#")) return false;
        if (href === "/") return router.pathname === "/";
        return router.pathname.startsWith(href);
    };

    const linkClass = (href: string) =>
        `text-sm transition-colors ${isActive(href)
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`;

    return (
        <>

            <GradualBlurMemo
                target="page"
                position="top"
                height="6rem"
                strength={2}
                divCount={5}
                curve="bezier"
                exponential={true}
                opacity={1}
                zIndex={500}
            />

            <header
                style={{ zIndex: 1000 }}
                className="sticky top-0 z-50"
            >

                <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
{/* 
                    <Link
                        href="/"
                        className="text-sm font-medium tracking-tight text-foreground hover:text-primary transition-colors"
                    >
                        
                    </Link> */}

                    <nav className="hidden md:flex items-center gap-10">
                        {linkGroups.map((group, i) => (
                            <div key={i} className="flex items-center gap-10">
                                {i > 0 && <span className="h-4 w-px bg-border" aria-hidden />}
                                {group.map((l) => (
                                    <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </nav>

                    <button
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {open && (
                    <nav className="md:hidden bg-background border-b border-border px-4 pb-4 flex flex-col">
                        {linkGroups.flat().map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className={`py-2.5 ${linkClass(l.href)}`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

        </>
    );
}
