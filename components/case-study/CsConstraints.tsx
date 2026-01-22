"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CaseStudySection } from "@/content/site";
import { Reveal } from "@/components/Reveal";

type ConstraintsProps = Extract<CaseStudySection, { type: 'constraints' }>;

export function CsConstraints({ title, cards }: ConstraintsProps) {
    // Default to the first card (index 0) being active
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="bg-[#0A0A0A] text-white pt-24 pb-16 md:py-32 mb-24 overflow-hidden">
            <div className="w-full md:w-[85%] max-w-[1440px] mx-auto">

                {/* Header */}
                <div className="mb-8 max-w-4xl w-[90%] md:w-full mx-auto md:mx-0 flex items-end justify-between">
                    <Reveal>
                        <span className="text-sm font-bold uppercase tracking-wider text-white block" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {title}
                        </span>
                    </Reveal>
                    {/* Interaction Prompt - Desktop Only, aligned with title */}
                    <Reveal delay={0.2} className="hidden md:block">
                        <p className="text-sm text-neutral-500 font-medium tracking-wide text-right">
                            Try hovering to fight constraints
                        </p>
                    </Reveal>
                    {/* Intro text removed per user request */}
                </div>

                {/* Interactive Cards Container */}
                {/* Mobile: Horizontal scroll (carousel). Desktop: Flex accordion. */}
                <div
                    className="flex flex-row gap-4 h-auto md:h-[350px] overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-8 md:pb-0 px-[5%] md:px-0"
                    onMouseLeave={() => !isMobile && setActiveIndex(0)} // Reset to first card on leave (Desktop only)
                >
                    {cards.map((card, index) => {
                        // Desktop: Active state controls styling. Mobile: All cards look "active" (beige).
                        const isActive = activeIndex === index;
                        const isCardVisible = isMobile || isActive;

                        return (
                            <motion.div
                                key={index}
                                onMouseEnter={() => !isMobile && setActiveIndex(index)}
                                // onClick removed for mobile as interaction is no longer needed for visibility
                                className={cn(
                                    "relative overflow-hidden rounded-[24px] border p-8 flex flex-col justify-between transition-colors duration-500 cursor-default",
                                    // Mobile Layout: Fixed width (62vw), auto height with min-height to match Proxies
                                    "w-[62vw] md:w-auto h-auto min-h-[300px] md:aspect-auto md:min-w-0 md:min-h-0 snap-center shrink-0 md:shrink",
                                    // Styling: Mobile always beige. Desktop depends on active state.
                                    (isMobile || isActive)
                                        ? "bg-[#E6E2D6] border-transparent"
                                        : "bg-transparent border-white/20"
                                )}
                                animate={isMobile ? {} : {
                                    flex: isActive ? 2 : 1, // Active card takes 2x space (Desktop only)
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 30
                                }}
                            >
                                {/* Card Content */}
                                <div className="flex flex-col justify-between h-full relative z-10 gap-6 md:gap-0">
                                    <Reveal delay={0.1}>
                                        <h3
                                            className={cn(
                                                "text-2xl font-bold mb-4 transition-colors duration-300",
                                                (isMobile || isActive) ? "text-black" : "text-white"
                                            )}
                                            style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                                        >
                                            {card.title}
                                        </h3>
                                    </Reveal>

                                    <Reveal delay={0.2}>
                                        <motion.p
                                            className={cn(
                                                "text-xl md:text-2xl leading-relaxed transition-colors duration-300",
                                                (isMobile || isActive) ? "text-black/80 font-medium" : "text-neutral-400"
                                            )}
                                            animate={{
                                                opacity: (isMobile || isActive) ? 1 : 0.7
                                            }}
                                        >
                                            {card.description}
                                        </motion.p>
                                    </Reveal>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}
