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
    const [isMobile, setIsMobile] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };

        // Initial check
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-rotation logic (Desktop only)
    useEffect(() => {
        // Don't auto-rotate if paused OR if on mobile
        if (isPaused || isMobile) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 6000); // 6 seconds per tab

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, isMobile, items.length]);

    return (
        <section className="bg-[#0A0A0A] text-white pt-16 pb-16 md:py-32 w-full overflow-hidden">
            <div className="w-full md:w-[85%] max-w-[1440px] mx-auto">
                <div className="flex items-end justify-between mb-8 px-6 md:px-0">
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
                {/* Mobile: Edge-to-edge scrolling with start padding for alignment */}
                <div className="flex overflow-x-auto overflow-y-hidden md:grid md:grid-cols-6 gap-4 mb-6 border-b border-white/10 pb-4 no-scrollbar snap-x snap-mandatory mask-gradient-right md:px-0">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "relative group cursor-pointer min-w-[40vw] md:min-w-0 snap-start flex-shrink-0",
                                index === 0 ? "pl-6 md:pl-0" : "",
                                index === items.length - 1 ? "pr-6 md:pr-0" : ""
                            )}
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
                                    className={cn(
                                        "absolute -bottom-[17px] h-[2px] bg-white",
                                        index === 0 ? "left-6 md:left-0" : "left-0",
                                        index === items.length - 1 ? "right-6 md:right-0" : "right-0"
                                    )}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Dynamic Content Area */}
                <div className="h-[160px] md:h-[100px] mb-8 relative md:px-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-0 left-0 w-full md:w-[var(--tab-width)] md:ml-[calc(var(--active-tab)*16.666%)] md:pr-4 transition-all duration-300 ease-in-out px-6 md:pl-0 md:pr-4"
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
