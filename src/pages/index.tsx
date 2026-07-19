import Head from "next/head";
import SectionHero from "@/components/index/section-hero";
import SectionAbout from "@/components/index/section-about";
import SectionWork from "@/components/index/section-work";
import SectionWriting from "@/components/index/section-writing";

export default function Home() {
    return (
        <>
            <Head>
                <title>Santiago Bugnón</title>
                <meta
                    name="description"
                    content="Full stack engineer, co-founder & CTO at Nebula Solutions, and independent security researcher. I build software that scales and break the kind that doesn't."
                />
            </Head>
            <SectionHero />
            <SectionAbout />
            <SectionWork />
            <SectionWriting />
        </>
    );
}
