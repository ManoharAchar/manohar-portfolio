"use client";

import { Reveal } from "./Reveal";
import { ScrollRevealText } from "./ScrollRevealText";
import { AboutCarousel } from "./AboutCarousel";
import { ResumeOverlay } from "./ResumeOverlay";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function AboutSection() {
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const gridRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const [pinBounds, setPinBounds] = useState({ start: 0, max: 0 });

    useEffect(() => {
        const updateBounds = () => {
            if (gridRef.current && rightColRef.current) {
                const rect = gridRef.current.getBoundingClientRect();
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const absoluteTop = rect.top + scrollTop;
                
                // 25vh is our desired visual "sticky" top margin
                const vh25 = window.innerHeight * 0.25;
                const start = Math.max(0, absoluteTop - vh25);
                
                // Max translation is difference in height between parent grid and the image itself
                const max = Math.max(0, gridRef.current.offsetHeight - rightColRef.current.offsetHeight);
                
                setPinBounds({ start, max });
            }
        };

        const observer = new ResizeObserver(updateBounds);
        if (gridRef.current) observer.observe(gridRef.current);
        if (rightColRef.current) observer.observe(rightColRef.current);

        updateBounds();

        return () => observer.disconnect();
    }, []);

    const { scrollY } = useScroll();
    
    // Engine: Cancels out scroll movement precisely to emulate sticky behavior on the main thread
    const yTranslate = useTransform(
        scrollY, 
        [pinBounds.start, pinBounds.start + pinBounds.max], 
        [0, pinBounds.max]
    );

    return (
        <section id="about" className="relative w-full bg-[#F3F2ED] text-black py-12 md:py-32">
            {/* Container matches exact width of expanded Hero video (95vw) */}
            <div className="w-[95vw] mx-auto">
                <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
                    {/* Left Column: Text - Aligns with Left Edge. No special alignment, it defines height. */}
                    <div className="flex flex-col gap-8 pb-24">
                        <Reveal width="100%">
                            <span className="text-sm font-semibold uppercase tracking-wide px-4 lg:px-0" style={{ fontFamily: 'Clash Display, sans-serif' }}>About</span>
                        </Reveal>

                        {/* Mobile Only Video - Placed here to be between Label and Text */}
                        <div className="lg:hidden w-full h-auto">
                            <AboutCarousel enableParallax />
                        </div>

                        <div className="text-2xl md:text-3xl lg:text-4xl leading-tight font-medium px-4 lg:px-0" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                            <ScrollRevealText text="Product designer with an engineering backbone and a systems-first mindset. I map systems, identify leverage points, and craft interfaces that feel simple and inevitable. I’m especially drawn to the AI era of products, where trust, transparency, and edge cases matter, and I bring a bias toward clarity, tight interaction design, and shipping work that holds up in the real world." />
                        </div>

                        {/* Resume BTN */}
                        <div className="px-4 lg:px-0 mt-4">
                            <motion.button
                                onClick={() => setIsResumeOpen(true)}
                                className="relative z-10 inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#1C1C1C] text-white text-[15px] font-semibold shadow-2xl transition-colors hover:bg-black"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                View Resume
                            </motion.button>
                        </div>
                    </div>

                    {/* Right Column: Mathematical Pinning Engine */}
                    {/* Replaced CSS 'sticky' to prevent compositor desync with Lenis and Framer text reveals */}
                    <div className="hidden lg:block relative min-h-full">
                        <motion.div 
                            ref={rightColRef}
                            style={{ y: yTranslate }}
                            className="w-full h-auto ml-auto lg:max-w-none"
                        >
                            <AboutCarousel />
                        </motion.div>
                    </div>


                </div>
            </div>

            {/* Resume Overlay Modal */}
            <ResumeOverlay 
                isOpen={isResumeOpen} 
                onClose={() => setIsResumeOpen(false)} 
            />
        </section>
    );
}
