"use client";

import { CaseStudySection } from "@/content/site";
import { Reveal } from "@/components/Reveal";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type IterationRoadmapProps = Extract<CaseStudySection, { type: 'iteration-roadmap' }>;

export function CsIterationRoadmap({ title, items }: IterationRoadmapProps) {
    const sectionRef = useRef<HTMLElement>(null);

    // Parallax scroll tracking
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Determine direction based on scroll (similar to ruler)
    const x = useTransform(scrollYProgress, [0, 1], ["0px", "-200px"]);

    return (
        <section ref={sectionRef} className="relative w-full pt-0 pb-0 md:pt-32 md:pb-16 bg-[#DDD6CC] text-[#141414] overflow-hidden min-h-[550px] 2xl:min-h-[750px]">

            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto h-full relative z-10">

                {/* Desktop Section Title */}
                <div className="hidden lg:block">
                    <Reveal>
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {title}
                        </h2>
                    </Reveal>
                </div>

                {/* 
                    CONTENT LAYER 
                    Now acts as the "Scene" for both the Road and the Text.
                    They share the same coordinate system relative to this container.
                */}
                <div className="hidden lg:block relative h-[520px] 2xl:h-[700px] [--road-top:160px] 2xl:[--road-top:240px] [--road-height:192px] [--gap:64px] [--col-spacing:375px] 2xl:[--col-spacing:440px]">
                    {/* ... (existing desktop road code) ... */}
                    <motion.div
                        style={{ x }}
                        className="absolute left-[calc(50%-1500px+600px)] w-[3000px] h-[var(--road-height)] top-[var(--road-top)] pointer-events-none z-0"
                    >
                        {/* Background Rectangle 114 */}
                        <div className="absolute inset-0 bg-[#242424]" />

                        {/* Frame 18 (Horizontal Bars) */}
                        <div className="absolute left-0 top-[90px] w-full h-[12px] flex items-center gap-[104px]">
                            {Array.from({ length: 20 }).map((_, index) => {
                                // 10th item (index 9) is dark/invisible
                                const isInvisible = index === 9;
                                return (
                                    <div
                                        key={index}
                                        className={`w-[56px] h-[12px] shrink-0 ${isInvisible ? 'bg-[#242424]' : 'bg-[#DDD6CC]'}`}
                                    />
                                );
                            })}
                        </div>

                        {/* Frame 19 (Vertical Stacked Bars - Crosswalk) */}
                        <div className="absolute left-[1428px] top-0 w-[80px] h-full flex flex-col items-start gap-[8px]">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="w-[80px] h-[12px] bg-[#DDD6CC]"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Top Items (Rows 1-3) */}
                    {items.filter(i => i.position === 'top').map((item, idx) => (
                        <div
                            key={`top-${idx}`}
                            className="absolute w-[320px]"
                            style={{
                                bottom: `calc(100% - var(--road-top) + var(--gap))`,
                                left: `calc(${item.column - 1} * var(--col-spacing))`
                            }}
                        >
                            <Reveal delay={0.1 + (item.column * 0.1)}>
                                <p className="text-xl 2xl:text-[24px] leading-snug font-medium">{item.text}</p>
                            </Reveal>
                        </div>
                    ))}

                    {/* Bottom Items (Rows 4-5) */}
                    {items.filter(i => i.position === 'bottom').map((item, idx) => (
                        <div
                            key={`bottom-${idx}`}
                            className="absolute w-[320px]"
                            style={{
                                top: `calc(var(--road-top) + var(--road-height) + var(--gap))`,
                                left: `calc((${item.column - 1} * var(--col-spacing)) + (var(--col-spacing) / 2))`
                            }}
                        >
                            <Reveal delay={0.3 + (item.column * 0.1)}>
                                <p className="text-xl 2xl:text-[24px] leading-snug font-medium">{item.text}</p>
                            </Reveal>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Layout: Vertical Road Timeline (Flush Left) */}
            <div className="lg:hidden relative w-full mt-0 pb-0">
                {/* The Vertical Road - Flush Left */}
                <div className="absolute left-0 top-0 bottom-0 w-[64px] bg-[#242424]">
                    {/* Center Dashed Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2"
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, #DDD6CC 50%, transparent 50%)',
                            backgroundSize: '4px 40px',
                            opacity: 0.5
                        }}
                    />
                </div>

                {/* Content Items - Pushed right of road */}
                <div className="flex flex-col gap-16 pl-[96px] pr-[5%] pt-24 pb-24">
                    {/* Mobile Section Title */}
                    <Reveal>
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-0" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {title}
                        </h2>
                    </Reveal>

                    {items.map((item, idx) => (
                        <Reveal key={idx} delay={0.1 + (idx * 0.1)}>
                            <div className="relative">
                                {/* Connector Line to Road */}
                                <div className="absolute left-[-32px] top-[14px] w-[24px] h-[2px] bg-[#242424]" />

                                <p className="text-lg md:text-xl font-medium leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section >
    );
}
