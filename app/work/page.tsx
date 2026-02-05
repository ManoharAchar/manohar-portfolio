import { siteConfig } from "@/content/site";
import { WorkCard } from "@/components/WorkCard";
import { Reveal } from "@/components/Reveal";

export default function WorkPage() {
    return (
        <section className="w-full bg-[#F3F2ED] pt-20 md:pt-32 pb-12 min-h-screen">
            <div className="w-[95vw] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <Reveal>
                        <h1 className="text-[15vw] md:text-[10rem] font-bold leading-none tracking-wide uppercase text-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            Work
                        </h1>
                    </Reveal>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {siteConfig.projects.map((project, index) => (
                        <Reveal key={project.slug} delay={index * 0.1} width="100%" className="h-full">
                            <WorkCard project={project} index={index} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
