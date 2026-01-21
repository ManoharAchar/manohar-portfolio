"use client";

import { CaseStudySection } from "@/content/site";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

type CollaborationProps = Extract<CaseStudySection, { type: 'collaboration' }>;

export function CsCollaboration({ title, description, items, image }: CollaborationProps) {
    return (
        <section className="relative w-full py-24 md:py-32 bg-[#F6F4EF] text-[#141414]">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left Column: Text Content */}
                    <div className="flex-1 max-w-xl">
                        {/* Section Label */}
                        <Reveal>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                {title}
                            </h2>
                        </Reveal>

                        {/* Main Headline */}
                        <Reveal delay={0.1}>
                            <h3 className="text-3xl md:text-4xl leading-tight mb-12" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                {description}
                            </h3>
                        </Reveal>

                        {/* Bullet Points */}
                        <ul className="flex flex-col gap-6">
                            {items.map((item, i) => (
                                <li key={i} className="flex gap-4 text-lg md:text-xl text-[#141414]/80 leading-snug">
                                    <Reveal delay={0.2 + (i * 0.1)} width="100%">
                                        <div className="flex gap-4">
                                            <span className="font-bold select-none">-</span>
                                            <span>{item}</span>
                                        </div>
                                    </Reveal>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column: Image/Card Placeholder */}
                    <div className="flex-1 w-full relative">
                        <div className="bg-white rounded-[32px] w-full aspect-[4/3] flex items-center justify-center relative overflow-hidden shadow-sm">
                            <Reveal delay={0.3}>
                                <div className="text-center p-8">
                                    <p className="text-[#141414]/40 font-bold mb-2">Handoff document</p>
                                    <p className="text-[#141414]/30 text-sm">related image here</p>
                                </div>
                            </Reveal>
                            {/* Real image would go here:
                           <Image 
                                src={image} 
                                alt="Handoff documentation preview" 
                                fill 
                                className="object-cover" 
                           /> 
                           */}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
