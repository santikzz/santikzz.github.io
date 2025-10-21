import { useState } from 'react';
import { FileText, Home, Info, Layers, LayoutGrid, Mail, Menu, X } from "lucide-react"
import clsx from "clsx";

export default function Header() {

    const [isOpen, setOpen] = useState(false);

    const links = [
        {
            href: "#hero",
            icon: <Home className="inline mb-1 mr-1 md:size-4 size-6" />,
            text: "Home"
        },
        {
            href: "#projects",
            icon: <LayoutGrid className="inline mb-1 mr-1 md:size-4 size-6" />,
            text: "Projects"
        },
        {
            href: "#stack",
            icon: <Layers className="inline mb-1 mr-1 md:size-4 size-6" />,
            text: "Stack"
        },
    ]

    const Links = () => (
        <div className="flex md:flex-row flex-col md:gap-6 gap-12">
            {links.map((link, index) => (
                <a key={index} href={link.href} className="text-white/70 lato-regular text-2xl md:text-base hover:text-purple-300 transition-colors duration-200">
                    {link.icon}
                    {link.text}
                </a>
            ))}
        </div>
    );

    const toggleMenu = () => {
        setOpen(!isOpen);
    }

    return (
        <>
            <header className="absolute top-0 left-0 right-0 z-50 hidden md:flex justify-center">

                <div className="bg-zinc-500/15 backdrop-blur-md border border-zinc-500/35 rounded-full h-10 flex-1 mx-12 mt-8 flex items-center justify-between px-6">

                    <Links />

                    <div className="flex flex-row gap-8 items-center">
                        <a href="https://github.com/santikzz" className="hover:brightness-75 transition-all ease-linear duration-150 hidden md:flex text-white gap-1">
                            <svg className="text-white size-6" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/santiago-bugn%C3%B3n-a71a54217/" target="_blank" className="hover:brightness-75 transition-all duration-150 ease-linear hidden md:flex text-white gap-1">
                            <svg className="text-white size-6" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            Linkedin
                        </a>
                        <a href="mailto:santiago_bugnon@hotmail.com" target="_blank" className="hover:brightness-75 transition-all duration-150 ease-linear hidden md:flex text-white gap-1">
                            <Mail className='text-white size-6' strokeWidth={1.3} color="#fff" />
                            Email
                        </a>

                    </div>

                </div>
            </header>
            <div style={{ position: 'fixed' }} className="absolute md:hidden top-0 left-0 m-4 flex items-center justify-center bg-zinc-500/15 backdrop-blur-md border border-zinc-500/35 rounded-lg size-10 z-50">
                <button onClick={toggleMenu} className="z-50">
                    <Menu className="text-white/70 size-8" />
                </button>
            </div>
            <aside style={{ position: 'fixed' }} className={clsx("md:hidden fixed top-0 left-0 bottom-0 w-[75vw] z-50 flex bg-zinc-950/50 backdrop-blur-md border border-zinc-500/35 z-100 px-8 py-12 transition-transform duration-300 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full",
            )}>
                <button onClick={toggleMenu} className="absolute right-0 top-0 z-50 p-6">
                    <X className="text-white/70 size-8" />
                </button>
                <Links />
            </aside>
        </>
    );
}