"use client";

import { CaseStudySection } from "@/content/site";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { MediaRenderer } from "@/components/MediaRenderer";

// Extract the specific TLDR type for props
type TLDRProps = Extract<CaseStudySection, { type: 'tldr' }>;

export function CsTLDR({ intro, cards, title }: TLDRProps) {
    const targetRef = useRef<HTMLDivElement>(null); // HMR force
    const cardsRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Dynamically calculate the horizontal scroll distance
    useEffect(() => {
        if (!cardsRef.current) return;

        const updateScrollRange = () => {
            if (cardsRef.current) {
                const scrollWidth = cardsRef.current.scrollWidth;
                const clientWidth = window.innerWidth;
                const rect = cardsRef.current.getBoundingClientRect();

                // Calculate total distance to scroll: (Left Offset + Total Content Width) - (Screen Width) + (Safety Buffer)
                // Increased buffer from 50 to 200 to prevent cutoff issues (hit-or-miss loading).
                const distance = (rect.left + scrollWidth) - clientWidth + 200;

                if (window.innerWidth < 768) {
                    setScrollRange(0);
                } else {
                    setScrollRange(distance > 0 ? distance : 0);
                }
            }
        };

        // Initial calculation
        updateScrollRange();

        // Force re-calculation after a delay to catch layout shifts/font loading
        const timer = setTimeout(updateScrollRange, 1000);

        // Re-calculate on resize
        const resizeObserver = new ResizeObserver(() => updateScrollRange());
        resizeObserver.observe(cardsRef.current);
        window.addEventListener('resize', updateScrollRange);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateScrollRange);
        };
    }, [cards]);

    // Map the horizontal scroll to finish well before the section ends to ensure it's still sticky
    // p_end (un-sticking point) is approx (S * 3) / (100vh + S * 3).
    // Mapping to [0, 0.9] ensures the scroll finishes effectively at the end of the sticky period.
    const x = useTransform(scrollYProgress, [0, 0.9], ["0px", `-${scrollRange}px`]);

    return (
        // 1. Dynamic height: Viewport Height + Horizontal Scroll Distance
        // This ensures a "weighted" feel with the 2.5x multiplier.
        // On mobile (scrollRange === 0), height is auto.
        <section
            ref={targetRef}
            className="relative bg-[#0A0A0A] text-white pb-24 rounded-b-[25px]"
            style={{ height: scrollRange > 0 ? `calc(100vh + ${scrollRange * 3}px)` : 'auto' }}
        >

            {/* 2. Sticky Container: Locks into view while scrolling the parent */}
            {/* Mobile: Top alignment + padding ensures header visibility. Native scroll. */}
            {/* 2. Sticky Container: Locks into view while scrolling the parent */}
            {/* Mobile: Top alignment + padding ensures header visibility. Native scroll. */}
            {/* Switched to min-h-screen to allow content to expand naturally without overlap */}
            <div className="relative md:sticky top-0 h-auto min-h-screen flex flex-col justify-start overflow-visible md:overflow-hidden">

                <div className="w-full md:w-[85%] max-w-[1440px] mx-auto flex flex-col h-full justify-start pt-24 md:pt-24">

                    {/* Header & Intro */}
                    {/* mb-8 adds exactly 32px gap between intro text and cards */}
                    <div className="w-[90%] md:w-full md:max-w-[75%] mx-auto md:mx-0 mb-8 shrink-0">
                        <Reveal>
                            <span className="text-sm font-bold uppercase tracking-wider text-white mb-4 block" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                {title || "TL;DR (0–20 seconds)"}
                            </span>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-xl md:text-3xl leading-snug md:leading-[45px] text-neutral-200" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                {highlightIntro(intro)}
                            </p>
                        </Reveal>
                    </div>

                    {/* Horizontal Scroll Track */}
                    {/* Mobile: overflow-x-auto, snap-x. Desktop: overflow-hidden (handled by motion.div) */}
                    {/* Added overflow-y-hidden to prevent vertical scrolling/wobble inside the track */}
                    <div className="w-full overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory no-scrollbar pb-4 md:pb-0 px-[5%] md:px-0">
                        <motion.div
                            ref={cardsRef}
                            style={{ x }}
                            className="flex gap-6 w-max px-0 md:px-0 pr-6 md:pr-0"
                        >
                            {/* Cards */}
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    // Widths: 90vw (Mobile), 55vw (Table), 36vw (Desktop) -> ~20% increase
                                    // Height: 60vh layout fix, min-h-600px to prevent text crowding on laptops
                                    // Height: Mobile reduced to 400px to prevent overflow with header
                                    className="w-[80vw] md:w-[55vw] lg:w-[36vw] shrink-0 h-[60vh] min-h-[500px] md:h-[55vh] md:min-h-[500px]"
                                >
                                    {/* Card Container: #242424, rounded-32px */}
                                    {/* Padding: pt-4 px-4 (16px), pb-4 (16px bottom gap - reduced 50%) */}
                                    <div className="bg-[#242424] rounded-[32px] flex flex-col h-full pt-4 px-4 pb-4">

                                        {/* Image Area - 55% Mobile / 65% Desktop */}
                                        <div className="h-[55%] md:h-[65%] w-full bg-white rounded-[20px] relative overflow-hidden shrink-0">
                                            {card.image && !card.image.includes('placeholder') && (
                                                <MediaRenderer
                                                    src={card.image}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center text-neutral-300 text-sm font-medium p-4 text-center">
                                                {!card.image || card.image.includes('placeholder') ? "Relevant image here" : ""}
                                            </div>
                                        </div>

                                        {/* Content Area - 45% Mobile / 35% Desktop */}
                                        {/* pt-8 (32px) from image top edge */}
                                        {/* px-2 (+Parent px-4) = 24px horiz. */}
                                        {/* pb-4 combined with Parent pb-4 = 32px from bottom tile edge */}
                                        <div className="h-[45%] md:h-[35%] flex flex-col justify-start pt-4 px-2 pb-4 gap-1">
                                            {/* Gap-1 ensures tighter spacing between Title and Description */}
                                            <Reveal height="auto">
                                                <h3 className="text-lg md:text-[22px] font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                                    {card.title}
                                                </h3>
                                            </Reveal>
                                            <Reveal delay={0.1} height="auto">
                                                <p className="text-[#999999] text-base md:text-lg font-normal leading-snug md:leading-relaxed overflow-y-auto" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                                    {card.description}
                                                </p>
                                            </Reveal>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

// Helper to bold specific phrase
function highlightIntro(text: string) {
    const target = "discover CEU content, purchase quickly, complete quizzes, and download certificates";
    if (!text.includes(target)) return text;
    const parts = text.split(target);
    return (
        <>
            {parts[0]}
            <strong className="text-white font-bold">{target}</strong>
            {parts[1]}
        </>
    );
}
