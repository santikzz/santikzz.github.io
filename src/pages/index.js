import Head from "next/head";
import Header from "../components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceStudiesSection } from "@/components/ExperienceStudiesSection";

export default function Home() {

  return (
    <>
      <Head>
        <title>Santiago Bugnón</title>
        <meta name="description" content="My personal portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/pc.png" />
      </Head>
      <main className="px-12 md:px-0 flex flex-col md:gap-4 gap-32">
        <div className="layout-grid"></div>

        <Header/>
        <HeroSection />

        <div className="flex flex-col gap-48">
          <TechStackSection />
          <ProjectsSection />
          <ExperienceStudiesSection />
        </div>

        <footer className="h-32"></footer>

      </main>
    </>
  );
}
