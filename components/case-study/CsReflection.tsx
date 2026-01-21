"use client";

import { CaseStudySection } from "@/content/site";
import { motion } from "framer-motion";
import { RollingText } from "@/components/RollingText";
import { Reveal } from "@/components/Reveal";

type ReflectionProps = Extract<CaseStudySection, { type: 'reflection' }>;

export function CsReflection({ title, heading, content }: ReflectionProps) {
    return (
        <section className="w-full py-24 md:py-32 bg-[#F6F4EF] text-[#141414]">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">

                {/* Section Title */}
                <Reveal>
                    <h2 className="text-sm font-bold uppercase tracking-wider mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                        {title}
                    </h2>
                </Reveal>

                <div className="max-w-4xl">
                    {/* Main Headline */}
                    <Reveal delay={0.1}>
                        <h3 className="text-3xl md:text-5xl font-medium leading-tight mb-12" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                            {heading}
                        </h3>
                    </Reveal>

                    {/* Body Text */}
                    <Reveal delay={0.2}>
                        <p className="text-xl md:text-2xl leading-relaxed text-[#141414]/80">
                            {content.map((part, index) => (
                                <span key={index} className={part.strong ? "font-bold text-[#141414]" : ""}>
                                    {part.text}
                                </span>
                            ))}
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Scroll to Top Button - Aligned with TopBar (95vw) */}
            <div className="w-[95vw] mx-auto flex justify-end mt-24">
                <Reveal delay={0.3}>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="relative inline-block group"
                    >
                        <motion.div
                            className="relative z-10 flex items-center justify-center h-12 px-8 rounded-full bg-white text-[#0E0E0E] font-medium shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <RollingText text="Scroll to top" />
                        </motion.div>

                        {/* Arrow Circle (Hidden initially, rolls out on hover like the emoji) */}
                        <motion.div
                            className="absolute top-0 right-0 z-0 flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#0E0E0E] shadow-sm"
                            initial={{ x: 0, rotate: 0, opacity: 0 }}
                            whileHover={{
                                x: -60, // Moves left
                                rotate: -360,
                                opacity: 1
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            ↑
                        </motion.div>
                    </button>
                </Reveal>
            </div>
        </section>
    );
}
