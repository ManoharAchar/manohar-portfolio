"use client";

import { useState } from "react";
import { CaseStudySection } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type TestingResultsProps = Extract<CaseStudySection, { type: 'testing-results' }>;

export function CsTestingResults({ title, rounds }: TestingResultsProps) {
    const [activeRoundIndex, setActiveRoundIndex] = useState(0);

    return (
        <section className="bg-[#0A0A0A] text-white py-24 md:py-32">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">

                {/* Header */}
                <Reveal>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-16 block" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                        {title}
                    </h2>
                </Reveal>

                {/* Mobile: Horizontal Tabs */}
                <div className="md:hidden flex space-x-4 mb-8 overflow-x-auto no-scrollbar pb-2">
                    {rounds.map((round, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveRoundIndex(index)}
                            className={cn(
                                "px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-colors border",
                                activeRoundIndex === index
                                    ? "bg-[#C58F9D] text-white border-[#C58F9D]"
                                    : "bg-transparent text-neutral-400 border-neutral-700"
                            )}
                        >
                            {round.title}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-stretch">

                    {/* Desktop Left: Tiles */}
                    <div className="hidden md:flex flex-col w-[320px] shrink-0 z-20 gap-2 min-h-[620px]">
                        {rounds.map((round, index) => {
                            const isActive = activeRoundIndex === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveRoundIndex(index)}
                                    className={cn(
                                        "p-8 text-left transition-all duration-300 relative flex-1 flex flex-col justify-center items-center",
                                        isActive
                                            ? "bg-[#C58F9D] text-white rounded-l-[32px] rounded-r-none translate-x-[2px]" // Push 2px to definitely overlap
                                            : cn(
                                                "bg-[#E6E0D4] text-[#141414] rounded-[32px] scale-[0.95] origin-left opacity-90 hover:opacity-100 hover:scale-[0.97]",
                                                index === 0 ? "rounded-br-none" : "rounded-tr-none"
                                            )
                                    )}
                                    style={{
                                        marginRight: 0
                                    }}
                                >
                                    <div className="flex flex-col items-start text-left">
                                        <span className={cn("text-3xl font-bold mb-3 block", isActive ? "text-white" : "text-[#141414]")} style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                            {round.title}
                                        </span>
                                        <span className={cn("text-base font-bold max-w-[140px]", isActive ? "text-white/90" : "text-[#141414]/70")}>
                                            {round.subtitle}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Content Area */}
                    <div className="flex-1 md:w-auto relative z-10 flex">
                        <div
                            className={cn(
                                "bg-[#C58F9D] p-8 md:p-16 md:pl-24 w-full flex items-center transition-all duration-300",
                                // Explicit border radius logic to guarantee corners
                                activeRoundIndex === 0
                                    ? "rounded-tr-[32px] rounded-br-[32px] rounded-bl-[32px] rounded-tl-none"
                                    : "rounded-tr-[32px] rounded-br-[32px] rounded-tl-[32px] rounded-bl-none"
                            )}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeRoundIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    {/* Mobile Only Header */}
                                    <h3 className="text-white font-bold text-xl md:text-2xl mb-8 md:hidden flex flex-col gap-1">
                                        <span>{rounds[activeRoundIndex].title}</span>
                                        <span className="font-normal opacity-70 text-lg">{rounds[activeRoundIndex].subtitle}</span>
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                                        {rounds[activeRoundIndex].stats.map((stat, i) => {
                                            // Check if it's a "Note" item (no label/value)
                                            const isNote = !stat.label && !stat.value;
                                            return (
                                                <div key={i} className={cn("flex flex-col",
                                                    i === rounds[activeRoundIndex].stats.length - 1 && rounds[activeRoundIndex].stats.length % 2 !== 0 ? "md:col-span-2 md:max-w-lg" : "",
                                                    isNote ? "h-full justify-end" : ""
                                                )}>
                                                    {stat.label && (
                                                        <span className="text-xs md:text-sm uppercase tracking-wide text-white/70 font-bold mb-3">
                                                            {stat.label}
                                                        </span>
                                                    )}
                                                    {stat.value && (
                                                        <span
                                                            className="text-5xl md:text-7xl font-bold text-white mb-4 block"
                                                            style={{ fontFamily: 'var(--font-archivo), sans-serif', letterSpacing: '-0.03em' }}
                                                        >
                                                            {stat.value}
                                                        </span>
                                                    )}
                                                    <p className={cn("text-white/90 text-base md:text-lg leading-relaxed", isNote ? "font-medium" : "font-bold")}>
                                                        {stat.description}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
