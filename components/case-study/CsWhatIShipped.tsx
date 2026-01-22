"use client";

import { CaseStudySection } from "@/content/site";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { MediaRenderer } from "@/components/MediaRenderer";

type WhatIShippedProps = Extract<CaseStudySection, { type: 'what-i-shipped' }>;

export function CsWhatIShipped({ title, items }: WhatIShippedProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-rotation logic
    useEffect(() => {
        if (isPaused) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 6000); // 6 seconds per tab

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, items.length]);

    return (
        <section className="bg-[#0A0A0A] text-white py-16 md:py-32 w-full overflow-hidden">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">
                <div className="flex items-end justify-between mb-8">
                    <Reveal>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {title}
                        </h2>
                    </Reveal>
                    <span className="text-xs text-neutral-500 font-medium hidden md:block">
                        Hover on labels to pause
                    </span>
                </div>

                {/* Tabs Grid */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-4 mb-6 border-b border-white/10 pb-4 no-scrollbar snap-x snap-mandatory mask-gradient-right">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer min-w-[40vw] md:min-w-0 snap-start flex-shrink-0"
                            onMouseEnter={() => {
                                setIsPaused(true);
                                setActiveIndex(index);
                            }}
                            onMouseLeave={() => setIsPaused(false)}
                            onClick={() => setActiveIndex(index)}
                        >
                            <h3
                                className={cn(
                                    "text-lg font-bold transition-colors duration-300 mb-2",
                                    activeIndex === index ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                                )}
                            >
                                {item.label}
                            </h3>

                            {/* Active Tab Indicator (Optional underline or marker) */}
                            {activeIndex === index && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Dynamic Content Area */}
                <div className="h-[120px] md:h-[100px] mb-8 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-0 left-0 w-full md:w-[var(--tab-width)] md:ml-[calc(var(--active-tab)*16.666%)] md:pr-4 transition-all duration-300 ease-in-out"
                            style={{
                                '--active-tab': activeIndex,
                                '--tab-width': activeIndex === 5 ? '25%' : '35%'
                            } as React.CSSProperties}
                        >
                            {/* 
                                Using a grid to position the text under the correct generic column area.
                                Since strict column alignment is hard with varying widths, we'll just show the text clearly.
                                For desktop, we can try to offset, but simply left-aligning or using a max-width container is cleaner.
                                Let's simulate the 'under the label' feel by just rendering it.
                            */}
                            <ul className="space-y-1">
                                {items[activeIndex].description.map((point, i) => (
                                    <li key={i} className="text-neutral-400 text-sm leading-snug flex items-start">
                                        <span className="mr-2 text-white/50">-</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Video / Media Display Area - Widen to 95vw on mobile */}
            <div className="w-[95vw] md:w-[85%] max-w-[1440px] mx-auto">

                {/* Video / Media Display Area */}
                <div className="w-full aspect-[16/9] md:aspect-[2.5/1] bg-white rounded-[24px] md:rounded-[32px] flex items-center justify-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            className="absolute inset-0 flex items-center justify-center bg-white text-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Media Display */}
                            {items[activeIndex].media && !items[activeIndex].media.includes('placeholder') ? (
                                <MediaRenderer
                                    src={items[activeIndex].media}
                                    alt={items[activeIndex].label}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center">
                                    <p className="font-bold text-lg mb-2">{items[activeIndex].label}</p>
                                    <p className="text-neutral-400">Video element here</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
