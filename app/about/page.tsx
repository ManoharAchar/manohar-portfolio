import { Section } from "@/components/Section";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "More about me and my background.",
};

export default function AboutPage() {
    return (
        <div className="pt-20">
            <Section className="max-w-3xl">
                <Reveal>
                    <h1 className="text-4xl font-bold tracking-tight mb-8">About</h1>
                </Reveal>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <Reveal delay={0.1}>
                        <p>
                            I&apos;m {siteConfig.meta.name}, a {siteConfig.meta.tagline} based in San Francisco.
                        </p>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p>
                            With a background in computer science and a passion for design systems, I sit comfortably at the intersection of engineering and design. I believe that the best products are built when designers understand the materials they are working with.
                        </p>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p>
                            I specialize in complex, data-heavy applications where clarity is paramount. My process is systems-first: I identify the core objects and actions of a system before diving into UI details.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Experience</h2>
                        <ul className="space-y-4">
                            <li>
                                <div className="font-medium text-foreground">Senior Product Designer</div>
                                <div className="text-sm">Tech Corp Inc. • 2022 — Present</div>
                            </li>
                            <li>
                                <div className="font-medium text-foreground">Product Designer</div>
                                <div className="text-sm">Startup Ltd. • 2020 — 2022</div>
                            </li>
                        </ul>
                    </Reveal>
                </div>
            </Section>
        </div>
    );
}
