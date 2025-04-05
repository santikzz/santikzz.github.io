import { Calendar } from "lucide-react";

export const ExperienceStudiesSection = () => {
    return (
        <section className="flex flex-col space-y-8" id="experience">

            <div className="flex flex-row items-end gap-4">
                <h2 className="text-orange-500 text-2xl md:text-6xl font-grotesque-display glow">EXPERIENCE & STUDIES</h2>
            </div>

            <div className="flex flex-col">
                <label className="underline text-white text-xl flex flex-row items-center gap-2"><Calendar size={18} /> 2024 - 2025</label>
                <p className="text-xl text-neutral-300">For the past year, I have been working as a freelance web developer, building a diverse range of applications tailored to different business needs. My projects have included everything from sleek, high-performance landing pages to fully functional, full-stack SaaS applications, ensuring scalability, security, and an optimal user experience. Through these experiences, I have honed my skills in front-end and back-end development, database management, and cloud deployment, delivering high-quality solutions that align with client objectives.</p>
            </div>

            <div className="flex flex-col">
                <label className="underline text-white text-xl flex flex-row items-center gap-2"><Calendar size={18} /> 2021 - 2024</label>
                <p className="text-xl text-neutral-300">I've studied TUDAI "University Degree in Computer Applications Development" at <a href="https://www.unicen.edu.ar/" className="underline">UNICEN</a>, where i learned modern concepts and build robust FullStack web applications with technologies like, PHP, PostgreSQL, Springboot, JavaScript, Docker, Microservices, etc..</p>
            </div>

            <div className="flex flex-col">
                <label className="underline text-white text-xl flex flex-row items-center gap-2"><Calendar size={18} /> 2020 - 2021</label>
                <p className="text-xl text-neutral-300">I spent a year working at Creadores de Sitios, a web development company, where I helped create and improve websites for different clients. I worked on both the frontend and backend, using tools like HTML, CSS, JavaScript, PHP and MySQL, and learned a lot about building responsive, user-friendly sites.</p>
            </div>

        </section>

    );
}