"use client";

import { siteConfig } from "@/content/site";
import { Reveal } from "./Reveal";

export function MindsetSection() {
    const { mindset } = siteConfig.home;

    return (
        <section className="w-full pt-12 pb-2 md:py-24">
            {/* Container matching Work section width (95vw) */}
            <div className="w-[95vw] mx-auto">
                {/* Outer Container - Light */}
                <div className="bg-[#E0DFD9] rounded-[25px] pt-6 md:pt-12 lg:pt-16 pb-[25px] flex flex-col gap-16 text-[#050505] overflow-hidden">

                    {/* Header Group */}
                    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-6 lg:px-8">
                        {/* Label - Matching About Section Styles */}
                        <span className="text-sm font-semibold uppercase tracking-wide text-[#050505]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {mindset.title}
                        </span>

                        {/* Body - Scroll Reveal Animation */}
                        <div className="text-xl md:text-2xl lg:text-3xl leading-snug font-medium text-[#050505] text-balance" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                            <Reveal delay={0.1}>
                                <p>{mindset.description}</p>
                            </Reveal>
                        </div>
                    </div>

                    {/* Inner Container: Principles List */}
                    {/* Relative wrapper spanning the entire width container to anchor the background */}
                    <div className="relative w-full">
                        {/* Absolute beige background locked to 25px margins from outer container edge */}
                        <div className="absolute inset-y-0 left-[16px] xl:left-[25px] right-[16px] xl:right-[25px] bg-[#F6F4EF] rounded-[20px]" />
                        
                        {/* Content grid precisely locked to header alignments */}
                        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-6">
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
                                        <p className="text-lg md:text-xl lg:text-2xl text-[#050505]/80 leading-normal md:max-w-[70%]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
