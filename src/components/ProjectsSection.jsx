import { Link } from "lucide-react";

export const ProjectsSection = () => {

  const Badge = ({ text }) => (
    <div className="bg-orange-500/50 border border-orange-500/75 rounded-full px-2.5 py text-orange-300 text-lg">
      {text}
    </div>
  );

  const ProjectCard = ({ thumbnail, title, description, url, badges }) => (
    <div className="bg-zinc-500/15 backdrop-blur border border-zinc-500/35 rounded-2xl flex-1 p-4 flex flex-col md:flex-row gap-4">
      <a href={url} className="flex aspect-video h-48">
        <img src={thumbnail} className="object-cover rounded-xl" />
      </a>
      <div className="flex flex-col justify-between py-2">
        <a className="text-white text-4xl lato-bold hover:underline" href={url}>
          {title}
          <Link className="inline mb-2.5 ml-2" size={20} />
        </a>
        <p className="text-white/75 text-lg">
          {description}
        </p>
        <div className="flex flex-row gap-4 flex-wrap">
          {badges.map((badge, index) => (
            <Badge text={badge} key={index} />
          ))}
        </div>
      </div>
    </div>
  );

  const projects = [
    {
      title: 'NEBULA SOLUTIONS',
      description: 'Nebula Solutions in the landing page of my personal brand. It showcases my skills and projects, and serves as a portfolio for potential clients and employers. The design is clean and modern, with a focus on usability and accessibility.',
      url: 'https://nebulasolutions.com.ar',
      thumbnail: '/static/nebula.jpg',
      badges: ['React', 'Next.js', 'Tailwindcss', 'Framer Motion', 'Parallax']
    },
    {
      title: 'KEY CORE',
      description: 'Key Core is a fullstack SAAS application designed for users to create and manage applications and their licenses and keys. With multi user support, resellers and permission based access, Google oauth and a powerful admin panel, Key Core is a complete solution for software licensing.',
      url: 'https://darkslategray-penguin-805073.hostingersite.com/',
      thumbnail: '/static/keycore.jpg',
      badges: ['React', 'Vite', 'Tailwindcss', 'Laravel', 'MySQL', 'Inertia 2.0']
    },
    {
      title: 'DIABOLICAL',
      description: 'Diabolical is a landing page with a dark theme, designed to showcase the features and benefits of a product or service. Each section has a nice parallax effect that creates a sense of depth and movement as the user scrolls down the page.',
      url: 'https://santikzz.github.io/diabolical',
      thumbnail: '/static/diabolical.jpg',
      badges: ['React', 'Next.js', 'Tailwindcss', 'Parallax', 'Framer Motion']
    },
    {
      title: 'SQUAD',
      description: 'Squad is a web app designed to help students create and find study groups. This personal project focused on improving student collaboration by offering a platform for group creation, chat, and resource sharing.',
      url: 'https://squad.net.ar',
      thumbnail: '/static/squad_banner.jpg',
      badges: ['React', 'Vite', 'Tailwindcss', 'Socket.io', 'Express', 'MongoDB']
    },
    {
      title: 'ECOBITE',
      description: 'Ecobite is a React Native app designed for restaurants to sell their leftover food at a reduced price instead of discarding it. The app aims to minimize food waste while offering customers affordable meal options.',
      url: '#',
      thumbnail: '/static/ecobite_banner.jpg',
      badges: ['React Native', 'Expo', 'Tailwindcss', 'Laravel', 'MySQL']
    }

  ]

  return (
    <section className="flex flex-col gap-8 relative" id="projects">

      <h2 className="text-orange-500 text-2xl md:text-6xl font-grotesque-display glow">MY PROJECTS</h2>

      <div className="absolute min-h-screen inset-0 overflow-x-hidden flex items-center justify-center">
        <div className="absolute rounded-full bg-gradient-to-br from-orange-400 to-orange-600 size-[600px] blur-[70px] animate-[blobFloat_6s_ease-in-out_infinite] opacity-35"></div>
      </div>

      {projects.map((project, index) => (
        <ProjectCard thumbnail={project.thumbnail} title={project.title} description={project.description} url={project.url} badges={project.badges} key={index} />
      ))}

    </section>
  );
}