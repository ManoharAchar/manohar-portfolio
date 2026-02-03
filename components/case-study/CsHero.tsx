"use client";

import { cn } from "@/lib/utils";
import { CaseStudySection } from "@/content/site";
import { RotatingButton } from "@/components/RotatingButton";
import { Reveal } from "@/components/Reveal";

// Extract the specific Hero type for props
type HeroProps = Extract<CaseStudySection, { type: 'hero' }>;

export function CsHero({ title, subtitle, image, meta, footnote, liveUrl, ctaLabel, buttonColor }: HeroProps) {
    return (
        <section className="relative w-full bg-[#0A0A0A] text-white pt-8 pb-12 md:pb-16">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">

                {/* 1. Hero Image Container with Overlay Text */}
                {/* Aspect Ratio roughly 16:9 or custom per design */}
                <div className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[2.4/1] bg-neutral-900 rounded-3xl overflow-hidden mb-4 md:mb-16">
                    {/* Background Image */}
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Gradient Overlay: Darker localized gradient behind text for better readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 via-45% to-transparent" />

                    {/* Headline Overlay - Positioned for Red Box area on mobile, Bottom Left on Desktop */}
                    <div className="absolute bottom-36 md:bottom-0 left-0 p-6 md:p-12 w-full max-w-5xl z-10">
                        {/* Split title into lines if needed or rely on natural wrap */}
                        <Reveal>
                            <h1 className="text-3xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-wide text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                {title}
                            </h1>
                        </Reveal>
                        {subtitle && (
                            <Reveal delay={0.1} className="hidden md:block">
                                <p className="text-lg md:text-2xl lg:text-3xl font-normal leading-[1.3] tracking-normal text-white mt-4 md:mt-6 max-w-[90%]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                    {subtitle}
                                </p>
                            </Reveal>
                        )}
                    </div>

                    {/* Mobile Only: Subtitle Overlay (Blue Box area) - Replaces Role */}
                    {subtitle && (
                        <div className="md:hidden absolute bottom-6 left-6 z-20 max-w-[60%]">
                            <Reveal delay={0.2}>
                                <p className="text-sm font-medium text-neutral-200 leading-tight" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                    {subtitle}
                                </p>
                            </Reveal>
                        </div>
                    )}

                    {/* Mobile Only: CTA Button (Green Circle area) */}
                    {liveUrl && (
                        <div className="md:hidden absolute bottom-6 right-6 z-20">
                            <RotatingButton
                                href={liveUrl}
                                topText="CLICK HERE"
                                bottomText={ctaLabel || "GO TO LIVE SITE"}
                                className="w-24 h-24"
                                color={buttonColor || "#A29BFE"}
                            />
                        </div>
                    )}

                    {/* Live Site Button - Desktop: Bottom Right, Mobile: Hidden (shown below) */}
                    {liveUrl && (
                        <div className="hidden md:block absolute bottom-12 right-12 z-20">
                            <RotatingButton
                                href={liveUrl}
                                topText="CLICK HERE"
                                bottomText={ctaLabel || "GO TO LIVE SITE"}
                                className="w-28 h-28"
                                color={buttonColor || "#A29BFE"}
                            />
                        </div>
                    )}
                </div>



                {/* 2. Metadata Grid */}
                {/* 4 Columns: Role, Scope, Platform, Meta (Timeline/Users combined or separate?) */}
                {/* Based on design: Role, Scope, Platform, (Primary Users + Timeline) */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-white/10 pt-12">
                    {meta.map((item, index) => (
                        <Reveal
                            key={index}
                            delay={0.2 + (index * 0.1)}
                            className="flex flex-col gap-4"
                        >
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
