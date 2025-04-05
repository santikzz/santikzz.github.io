import { Mail, X } from "lucide-react";

export default function Aside({ isOpen, setIsOpen }) {
    return (
        <>
            <aside className={`fixed left-0 top-0 h-[100vh] bg-neutral-900 bg-opacity-75 backdrop-blur-lg w-[80vw] z-50 transition-transform 200ms ease-linear ${!isOpen && '-translate-x-full'}`}>
                <div className="flex justify-end p-8">
                    <button className="text-white" onClick={() => {setIsOpen(false)}}><X size={32} /></button>
                </div>
                <div className="flex flex-col gap-8 p-8">
                    <a href="#me" className="text-white text-lg   hover:brightness-75 transition-all ease-linear duration-150 hover:underline">Me</a>
                    <a href="#stack" className="text-white text-lg   hover:brightness-75 transition-all ease-linear duration-150 hover:underline">Stack</a>
                    <a href="#experience" className="text-white text-lg   hover:brightness-75 transition-all ease-linear duration-150 hover:underline">Experience</a>
                    <a href="#projects" className="text-white text-lg   hover:brightness-75 transition-all ease-linear duration-150 hover:underline">Projects</a>
                    <a href="https://github.com/santikzz" className="flex flex-row text-white items-center gap-2   text-lg">
                        <svg className="text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/santiago-bugn%C3%B3n-a71a54217/" target="_blank" className="flex flex-row text-white items-center gap-2   text-lg">
                        <svg className="text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><title>LinkedIn</title><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        Linkedin
                    </a>
                    <a href="mailto:santiago_bugnon@hotmail.com" target="_blank" className="flex flex-row text-white items-center gap-2   text-lg">
                        <Mail size={32} strokeWidth={1.3} color="#fff" />
                        Email
                    </a>
                </div>
            </aside>
            <div className={`fixed z-40 w-[100vw] h-[100vh] bg-black bg-opacity-50 opacity-0 transition-opacity 200ms ease-linear -translate-x-full ${isOpen && 'translate-x-0 opacity-1'}`}></div>
        </>
    );
}