"use client";

import { CaseStudySection } from "@/content/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

type KeyDecisionsProps = Extract<CaseStudySection, { type: 'key-decisions' }>;

export function CsKeyDecisions({ title, decisions }: KeyDecisionsProps) {
    return (
        <section className="bg-[#F6F4EF] text-[#141414] py-24 md:py-32">
            <div className="w-[95vw] md:w-[85%] max-w-[1440px] mx-auto">

                {/* Section Header */}
                <Reveal>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-8 md:mb-16 block" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                        {title}
                    </h2>
                </Reveal>

                <div className="space-y-16 relative">
                    {decisions.map((decision, index) => (
                        <div
                            key={index}
                            className="rounded-[24px] md:rounded-[32px] p-5 md:p-8 md:pb-16 text-white overflow-hidden sticky shadow-2xl min-h-[80vh] md:min-h-0"
                            style={{
                                top: `${96 + index * 40}px`, // 96px (pt-24) + 40px overlap per card
                                backgroundColor: decision.backgroundColor || '#0A0A0A'
                            }}
                        >

                            {/* Number ID (Absolute for desktop, relative for mobile?) */}
                            <div className="md:absolute md:top-8 md:left-8 text-sm font-bold text-neutral-500 mb-6 md:mb-0">
                                {decision.id}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-0 md:pt-12">
                                {/* Left: Title & Image Area (Spans 7 cols) */}
                                <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
                                    <h3
                                        className="text-xl md:text-3xl lg:text-4xl font-medium leading-tight md:max-w-[90%]"
                                        style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                                    >
                                        {decision.title}
                                    </h3>

                                    {/* Image Container */}
                                    <div className="w-full aspect-[16/9] bg-neutral-900 rounded-2xl border border-white/10 relative overflow-hidden">
                                        <img
                                            src={decision.image}
                                            alt={decision.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Right: Description & Details (Spans 5 cols) */}
                                <div className="lg:col-span-5 flex flex-col justify-between pt-0">

                                    {/* Main Description */}
                                    <div className="mb-4 md:mb-6">
                                        <p className="text-lg md:text-2xl leading-relaxed text-neutral-200">
                                            {decision.description}
                                        </p>
                                    </div>

                                    {/* Secondary Details Container */}
                                    {/* Hidden on mobile to reduce card height */}
                                    <div className="hidden md:block space-y-4 md:space-y-6">

                                        {/* Rationale */}
                                        <div>
                                            <h4 className="text-xs md:text-sm font-bold text-white mb-2 md:mb-4 uppercase tracking-wide">Rationale</h4>
                                            {Array.isArray(decision.rationale) ? (
                                                <ul className="space-y-2 md:space-y-3">
                                                    {decision.rationale.map((point, i) => (
                                                        <li key={i} className="flex items-start text-neutral-400 leading-tight text-sm md:text-base">
                                                            <span className="mr-2 md:mr-3 text-white">•</span>
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                                                    {decision.rationale}
                                                </p>
                                            )}
                                        </div>

                                        {/* Tradeoff */}
                                        <div>
                                            <h4 className="text-xs md:text-sm font-bold text-white mb-2 md:mb-4 uppercase tracking-wide">Tradeoff</h4>
                                            <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                                                {decision.tradeoff}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
