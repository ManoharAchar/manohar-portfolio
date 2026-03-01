"use client";

import { siteConfig } from "@/content/site";
import { WorkCard } from "@/components/WorkCard";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function WorkSection() {
    return (
        <section id="work" className="w-full pt-12 md:pt-32 pb-12">
            <div className="w-[95vw] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-12 max-w-7xl mx-auto lg:px-8">
                    <Reveal>
                        <svg viewBox="0 0 550 180" className="h-20 md:h-[130px] lg:h-[180px] w-auto fill-black">
                            <text
                                x="0"
                                y="50%"
                                dominantBaseline="middle"
                                fontFamily="Clash Display, sans-serif"
                                fontWeight="800"
                                fontSize="180"
                                letterSpacing="-0.02em"
                                textAnchor="start"
                            >
                                WORK
                            </text>
                        </svg>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <svg viewBox="0 0 280 180" className="h-20 md:h-[130px] lg:h-[180px] w-auto fill-black">
                            <text
                                x="100%"
                                y="50%"
                                dominantBaseline="middle"
                                fontFamily="Clash Display, sans-serif"
                                fontWeight="800"
                                fontSize="180"
                                letterSpacing="-0.02em"
                                textAnchor="end"
                            >
                                '25
                            </text>
                        </svg>
                    </Reveal>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto lg:px-8">
                    {siteConfig.projects.map((project, index) => (
                        <Reveal key={project.slug} delay={index * 0.1} width="100%" className="h-full">
                            <WorkCard project={project} index={index} />
                        </Reveal>
                    ))}
                </div>

                {/* See All Button */}
                <div className="flex justify-center mt-12 md:mt-20">
                    <Reveal delay={0.2} direction="up">
                        <Link
                            href="/work"
                            className="group flex items-center justify-center gap-1.5 text-[#050505] font-medium text-sm md:text-base hover:opacity-70 transition-opacity duration-300"
                        >
                            See all
                            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
