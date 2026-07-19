export type ProjectLink = {
    label: string;
    href: string;
};

export type Project = {
    slug: string;
    title: string;
    year: string;
    country: string;
    summary: string;
    description: string;
    stack: string[];
    image: string;
    images?: string[];
    video?: string;
    youtube?: string;
    links?: ProjectLink[];
};

// first 6 show on the home page, array order is display order
export const projects: Project[] = [
    {
        slug: "epsilon",
        title: "Epsilon",
        year: "2025",
        country: "fr",
        summary: "Anime and manga reader with 100k+ series and end-to-end encryption DRM.",
        description:
            "High-concurrency reader platform with +600k montly users, end-to-end encryption DRM, Performance-tuned to serve heavy concurrent traffic without degrading the read experience.",
        stack: ["React", "Inertia", "Laravel", "PostgreSQL", "Redis", "Docker", "Caddy"],
        image: "/assets/screenshots/epsilon_1.jpg",
        images: [
            "/assets/screenshots/epsilon_2.jpg",
            "/assets/screenshots/epsilon_3.jpg",
            "/assets/screenshots/epsilon_4.jpg",
        ],
        links: [{ label: "epsilonsoft.to", href: "http://epsilonsoft.to" }],
    },
    {
        slug: "anda",
        title: "Andá",
        year: "2026",
        country: "ar",
        summary: "Walk-to-earn app: walk around Tandil, earn points, redeem real prizes.",
        description:
            "Walk-to-earn mobile app for the city of Tandil. The app tracks users' walks and converts distance into points they can redeem for real prizes. Built with React Native and Expo on top of a Laravel API, with PostgreSQL and Redis backing activity tracking and leaderboards.",
        stack: ["Expo", "Laravel", "PostgreSQL", "Redis", "React Native"],
        image: "/assets/screenshots/anda_1.jpg",
        links: [{ label: "anda.ar", href: "https://anda.ar/" }],
    },
    {
        slug: "nexo",
        title: "Nexo",
        year: "2026",
        country: "ar",
        summary: "My own task manager with time tracking, tickets, invoicing and a secrets vault.",
        description:
            "My own all-in-one work hub: task and ticket management, time tracking, calendar, invoicing and a .env secrets vault. Built with Laravel, React and PostgreSQL, with Meilisearch for instant search and API integrations with Google Calendar, AFIP for electronic invoicing, and GitHub Actions.",
        stack: ["Laravel", "React", "PostgreSQL", "Meilisearch"],
        image: "/assets/screenshots/nexo_0.jpg",
        images: [
            "/assets/screenshots/nexo_1.jpg",
            "/assets/screenshots/nexo_2.jpg",
            "/assets/screenshots/nexo_3.jpg",
            "/assets/screenshots/nexo_4.jpg",
        ],
    },
    {
        slug: "epic-bariloche",
        title: "Epic Bariloche",
        year: "2024",
        country: "ar",
        summary: "High-performance landing for a Patagonian ski school.",
        description:
            "Marketing site with editorial typography and motion. Focused on conversion and clarity for a niche ski and snowboard tourism audience.",
        stack: ["Next.js", "Tailwind", "Framer Motion"],
        image: "/assets/screenshots/epicbariloche_1.png",
        links: [{ label: "epicbariloche.com", href: "https://epicbariloche.com/" }],
    },
    {
        slug: "jobu",
        title: "Jobu",
        year: "2024",
        country: "co",
        summary: "AI-powered recruiting platform that matches candidates to roles.",
        description:
            "Web product that streamlines recruiting with LLM-driven candidate matching, ranking and recruiter workflows. I worked on backend services and the integration with the AI layer.",
        stack: ["React", "Laravel", "Python", "OpenAI API", "MySQL"],
        image: "/assets/screenshots/jobu_1.png",
        links: [{ label: "getjobu.com", href: "https://getjobu.com/" }],
    },
    {
        slug: "my-office-taxes",
        title: "My Office Taxes",
        year: "2024",
        country: "us",
        summary: "E-signature and document workflow with Stripe & Square billing.",
        description:
            "Platform for digital signatures and document management. Real-time chat, automated staff workflows and Stripe & Square integration for invoicing and subscriptions.",
        stack: ["React", "Laravel", "MySQL", "Stripe", "Square"],
        image: "/assets/screenshots/officetaxes_1.jpg",
    },
    {
        slug: "blucenter",
        title: "Blucenter",
        year: "2025",
        country: "ar",
        summary: "E-commerce with a fully editable admin panel.",
        description:
            "Landing page and e-commerce fully editable from an intuitive admin panel. Complete product catalog, inventory and sales management for a growing retail operation.",
        stack: ["Laravel", "React", "MySQL", "Tailwind"],
        image: "https://nebulasolutions.com.ar/assets/blucenter.webp",
        links: [{ label: "nebulasolutions.com.ar", href: "https://nebulasolutions.com.ar/en/projects/blucenter" }],
    },
    {
        slug: "elite-law",
        title: "Elite Law",
        year: "2025",
        country: "fr",
        summary: "Multipage marketing site for a French law firm.",
        description:
            "Professional and elegant multipage site for a prestigious French law firm. Strong typography, careful pacing and SEO-driven content structure.",
        stack: ["Next.js", "Tailwind", "Framer Motion"],
        image: "https://nebulasolutions.com.ar/assets/lawfirm.jpg",
        links: [{ label: "nebulasolutions.com.ar", href: "https://nebulasolutions.com.ar/en/projects/lawfirm" }],
    },
];
