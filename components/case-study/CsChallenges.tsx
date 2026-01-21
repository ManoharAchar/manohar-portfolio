"use client";

import { CaseStudySection } from "@/content/site";
import { Reveal } from "@/components/Reveal";

type ChallengesProps = Extract<CaseStudySection, { type: 'challenges' }>;

export function CsChallenges({ title, items }: ChallengesProps) {
    return (
        <section className="relative w-full py-24 md:py-32 bg-[#F6F4EF] text-[#141414]">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">
                <Reveal>
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                        {title}
                    </h2>
                </Reveal>
            </div>

            {/* Cards Container - Expanded to 95vw to align with Top Bar */}
            <div className="w-[95vw] mx-auto flex flex-col gap-8">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-[32px] py-12 md:py-16 w-full min-h-[315px] flex flex-col justify-center"
                    >
                        {/* Inner Content Wrapper - Aligned to Site Grid (85% max 1440px) */}
                        <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto relative flex flex-col pt-2 md:pt-0">

                            {/* Number ID - Hanging to the left */}
                            <div className="md:absolute md:right-full md:mr-20 lg:mr-36 top-1">
                                <Reveal delay={0.1}>
                                    <span className="text-sm font-bold text-[#141414]/40" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                        {item.id}
                                    </span>
                                </Reveal>
                            </div>

                            {/* Content Grid */}
                            <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12 lg:gap-24 w-full">
                                {/* Left: Title & Description */}
                                <div className="flex-1 max-w-xl lg:max-w-md">
                                    <Reveal delay={0.1}>
                                        <h3 className="text-2xl md:text-[32px] leading-tight mb-6" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                            {item.title}
                                        </h3>
                                    </Reveal>
                                    <Reveal delay={0.2}>
                                        <div className="text-lg md:text-xl text-[#141414]/90 leading-relaxed">
                                            {highlightKeywords(item.description as string)}
                                        </div>
                                    </Reveal>
                                </div>

                                {/* Right: Solutions List */}
                                <div className="w-full lg:max-w-lg lg:ml-auto">
                                    <ul className="flex flex-col gap-4">
                                        {item.solutions.map((solution, i) => (
                                            <li key={i} className="flex gap-4 text-base md:text-lg text-[#141414]/80 leading-tight">
                                                <Reveal delay={0.3 + (i * 0.1)} width="100%">
                                                    <div className="flex gap-4">
                                                        <span className="font-bold select-none">-</span>
                                                        <span>{solution}</span>
                                                    </div>
                                                </Reveal>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div >
                ))
                }
            </div >

        </section >
    );
}

// Helper to bold specific keywords from the description string
function highlightKeywords(text: string) {
    const parts = text.split(/(LearnDash and WooCommerce|busy professionals)/g);

    return (
        <p>
            {parts.map((part, i) => {
                if (part === "LearnDash and WooCommerce" || part === "busy professionals") {
                    return <strong key={i} className="font-bold text-black">{part}</strong>;
                }
                return part;
            })}
        </p>
    );
}
