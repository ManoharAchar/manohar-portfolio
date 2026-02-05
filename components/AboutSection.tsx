"use client";

import { Reveal } from "./Reveal";
import { ScrollRevealText } from "./ScrollRevealText";
import { AboutCarousel } from "./AboutCarousel";

export function AboutSection() {
    return (
        <section id="about" className="relative w-full bg-[#F3F2ED] text-black py-12 md:py-32">
            {/* Container matches exact width of expanded Hero video (95vw) */}
            <div className="w-[95vw] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
                    {/* Left Column: Text - Aligns with Left Edge. No special alignment, it defines height. */}
                    <div className="flex flex-col gap-8 pb-24">
                        <Reveal width="100%">
                            <span className="text-sm font-semibold uppercase tracking-wide px-4 lg:px-0" style={{ fontFamily: 'Clash Display, sans-serif' }}>About</span>
                        </Reveal>

                        {/* Mobile Only Video - Placed here to be between Label and Text */}
                        <div className="lg:hidden w-full h-auto">
                            <div className="w-full aspect-[640/384]">
                                <AboutCarousel enableParallax />
                            </div>
                        </div>

                        <div className="text-2xl md:text-3xl lg:text-4xl leading-tight font-medium px-4 lg:px-0" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                            <ScrollRevealText text="Product designer with an engineering backbone and a systems-first mindset. I map systems, identify leverage points, and craft interfaces that feel simple and inevitable. I’m especially drawn to the AI era of products, where trust, transparency, and edge cases matter, and I bring a bias toward clarity, tight interaction design, and shipping work that holds up in the real world." />
                        </div>
                    </div>

                    {/* Right Column: Media Placeholder - Aligns with Right Edge. Sticky behavior. */}
                    {/* Parent div stretches to match text height. Inner div adheres to sticky positioning. */}
                    {/* Use top-[25vh] to stick near visual center without overlapping previous section via restart/transform */}
                    <div className="hidden lg:block relative min-h-full">
                        <div className="sticky top-[25vh] w-full h-auto ml-auto lg:max-w-none">
                            <div className="w-full aspect-[640/384]">
                                <AboutCarousel />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
}
