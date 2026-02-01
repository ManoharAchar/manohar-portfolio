"use client";

import { CaseStudySection } from "@/content/site";
import { Reveal } from "@/components/Reveal";

type ProblemContextProps = Extract<CaseStudySection, { type: 'problem-context' }>;

export function CsProblemContext({ intro, cards, footer }: ProblemContextProps) {
    return (
        <section className="relative w-full bg-[#F6F4EF] text-[#141414] py-24 md:py-32">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">

                {/* Intro Section */}
                <div className="w-full md:max-w-[75%] mb-12">
                    <Reveal>
                        <span className="text-sm font-bold uppercase tracking-wider text-black mb-4 block" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            Problem & context
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="text-2xl md:text-[32px] md:leading-[44px] text-[#141414]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                            {intro}
                        </p>
                    </Reveal>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {cards.map((card, index) => (
                        <Reveal
                            key={index}
                            delay={0.2 + (index * 0.1)}
                            className="bg-[#E6E2D6] rounded-[24px] p-8 md:p-10 flex flex-col justify-start h-full min-h-[224px]"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                {card.title}
                            </h3>
                            <p className="text-[#555555] text-xl md:text-2xl font-medium leading-[1.46]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                {card.description}
                            </p>
                        </Reveal>
                    ))}
                </div>

                {/* Footer Text */}
                <Reveal delay={0.2} width="100%" className="w-full md:max-w-[85%]">
                    <p className="text-xl md:text-[28px] md:leading-[40px] text-[#141414]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                        {footer}
                    </p>
                </Reveal>

            </div>
        </section>
    );
}
