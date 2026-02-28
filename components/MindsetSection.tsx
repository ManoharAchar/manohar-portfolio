"use client";

import { siteConfig } from "@/content/site";
import { ScrollRevealText } from "./ScrollRevealText";
import { Reveal } from "./Reveal";

export function MindsetSection() {
    const { mindset } = siteConfig.home;

    return (
        <section className="w-full pt-12 pb-2 md:py-24">
            {/* Container matching Work section width (95vw) */}
            <div className="w-[95vw] mx-auto">
                {/* Outer Container - Light */}
                <div className="bg-[#E0DFD9] rounded-[25px] pt-6 md:pt-12 lg:pt-16 px-[25px] pb-[25px] flex flex-col gap-16 text-[#050505]">

                    {/* Header Group */}
                    <div className="flex flex-col gap-8 max-w-5xl pl-6 md:pl-10">
                        {/* Label - Matching About Section Styles */}
                        <span className="text-sm font-semibold uppercase tracking-wide text-[#050505]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {mindset.title}
                        </span>

                        {/* Body - Scroll Reveal Animation */}
                        <div className="text-2xl md:text-3xl lg:text-4xl leading-[1.1] font-medium text-[#050505] text-balance" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                            <ScrollRevealText text={mindset.description} />
                        </div>
                    </div>

                    {/* Inner Container: Principles List */}
                    {/* Background slightly lighter to distinguish. Corners relative to outer (slightly less). */}
                    <div className="bg-[#F6F4EF] rounded-[20px] px-6 md:px-10 py-4">
                        {mindset.principles.map((item, index) => (
                            <Reveal
                                key={item.id}
                                width="100%"
                                delay={index * 0.1} // Stagger the rows slightly
                                className={`grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-8 py-10 md:py-12 ${index !== mindset.principles.length - 1 ? 'border-b border-[#050505]/10' : ''}`}
                            >
                                {/* ID */}
                                <div className="md:col-span-1 text-sm font-bold text-[#050505]/40 pt-1" style={{ fontFamily: 'var(--font-archivo)' }}>
                                    {item.id}
                                </div>

                                {/* Title */}
                                <div className="md:col-span-4">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#050505]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-7">
                                    <p className="text-lg md:text-xl text-[#050505]/80 leading-relaxed md:max-w-[60%]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                        {item.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
