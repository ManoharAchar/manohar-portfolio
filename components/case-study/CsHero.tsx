"use client";

import { cn } from "@/lib/utils";
import { CaseStudySection } from "@/content/site";
import { RotatingButton } from "@/components/RotatingButton";
import { Reveal } from "@/components/Reveal";

// Extract the specific Hero type for props
type HeroProps = Extract<CaseStudySection, { type: 'hero' }>;

export function CsHero({ title, image, meta, footnote, liveUrl }: HeroProps) {
    return (
        <section className="relative w-full bg-[#0A0A0A] text-white pt-8 pb-12 md:pb-16">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">

                {/* 1. Hero Image Container with Overlay Text */}
                {/* Aspect Ratio roughly 16:9 or custom per design */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.4/1] bg-neutral-900 rounded-3xl overflow-hidden mb-12 md:mb-24">
                    {/* Background Image */}
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                        />
                    )}

                    {/* Gradient Overlay: Bottom fade for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                    {/* Headline Overlay - Bottom Left */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full max-w-5xl">
                        {/* Split title into lines if needed or rely on natural wrap */}
                        <Reveal>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-wide text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                {title}
                            </h1>
                        </Reveal>
                    </div>

                    {/* Live Site Button - Desktop: Bottom Right, Mobile: Hidden (shown below) */}
                    {liveUrl && (
                        <div className="hidden md:block absolute bottom-12 right-12 z-20">
                            <RotatingButton
                                href={liveUrl}
                                topText="CLICK HERE"
                                bottomText="GO TO LIVE SITE"
                                className="w-28 h-28"
                            />
                        </div>
                    )}
                </div>

                {/* Live Site Button - Mobile Only: Below image */}
                {liveUrl && (
                    <div className="md:hidden flex justify-end -mt-16 mb-8 relative z-20 pr-6">
                        <RotatingButton
                            href={liveUrl}
                            topText="CLICK HERE"
                            bottomText="GO TO LIVE SITE"
                            className="w-20 h-20"
                        />
                    </div>
                )}

                {/* 2. Metadata Grid */}
                {/* 4 Columns: Role, Scope, Platform, Meta (Timeline/Users combined or separate?) */}
                {/* Based on design: Role, Scope, Platform, (Primary Users + Timeline) */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-white/10 pt-12">
                    {meta.map((item, index) => (
                        <Reveal key={index} delay={0.2 + (index * 0.1)} className="flex flex-col gap-4">
                            <span className="text-sm font-bold uppercase tracking-wider text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                {item.label}
                            </span>
                            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed whitespace-pre-line" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                {item.value}
                            </p>
                        </Reveal>
                    ))}
                </div>

                {/* 3. Footnote */}
                {footnote && (
                    <div className="mt-12 md:mt-24 w-full flex justify-end">
                        <Reveal delay={0.6} width="100%" className="flex justify-end">
                            <p className="text-sm text-neutral-500 max-w-md text-right leading-relaxed" style={{ fontFamily: 'var(--font-archivo)' }}>
                                {footnote}
                            </p>
                        </Reveal>
                    </div>
                )}

            </div>
        </section>
    );
}
