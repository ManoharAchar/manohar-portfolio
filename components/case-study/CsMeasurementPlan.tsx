"use client";

import { CaseStudySection } from "@/content/site";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";

type MeasurementPlanProps = Extract<CaseStudySection, { type: 'measurement-plan' }>;

export function CsMeasurementPlan({ title, description, items }: MeasurementPlanProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);

    // Standard scroll tracking for sticky cards (start-start to end-end)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Extended scroll tracking for ruler (enters screen to leaves screen)
    const { scrollYProgress: rulerProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    // Dynamic horizontal scroll calculation
    useEffect(() => {
        if (!cardsRef.current) return;

        const updateScrollRange = () => {
            if (cardsRef.current) {
                const scrollWidth = cardsRef.current.scrollWidth;
                const clientWidth = window.innerWidth;
                const rect = cardsRef.current.getBoundingClientRect();
                // Buffer increased to 200px for safety
                const distance = (rect.left + scrollWidth) - clientWidth + 200;
                setScrollRange(distance > 0 ? distance : 0);
            }
        };

        updateScrollRange();
        const timer = setTimeout(updateScrollRange, 1000); // Safety check
        const resizeObserver = new ResizeObserver(() => updateScrollRange());
        resizeObserver.observe(cardsRef.current);
        window.addEventListener('resize', updateScrollRange);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateScrollRange);
        };
    }, [items]);

    const x = useTransform(scrollYProgress, [0, 0.85], ["0px", `-${scrollRange}px`]);
    // Move ruler continuously across the entire visibility range
    const rulerX = useTransform(rulerProgress, [0, 1], ["0px", "-1000px"]);

    return (
        <section
            ref={targetRef}
            className="relative bg-[#8F542D] text-white"
            style={{ height: (scrollRange > 0 && window.innerWidth >= 768) ? `calc(100vh + ${scrollRange * 2.5}px)` : 'auto' }}
        >
            <div className="relative md:sticky top-0 h-auto md:h-screen flex flex-col overflow-visible md:overflow-hidden">
                <div className="flex flex-col h-full pt-24 md:pt-24 2xl:pt-32 relative z-10 text-left md:pb-[172px]">

                    {/* Header - Constrained width */}
                    <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto mb-8 md:mb-0 shrink-0">
                        <Reveal height="auto">
                            <span className="text-sm font-bold uppercase tracking-wider text-white mb-4 block" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                {title}
                            </span>
                        </Reveal>
                        <Reveal delay={0.1} height="auto">
                            <p className="text-2xl md:text-[32px] leading-tight text-white" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                {description}
                            </p>
                        </Reveal>
                    </div>

                    {/* Horizontal Scroll Track - Full width on mobile, constrained on desktop */}
                    <div className="w-full md:w-[85%] max-w-[1440px] md:mx-auto mb-[200px] md:mb-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-8 md:pb-0 md:flex-1 md:flex md:flex-col md:justify-center">
                        <motion.div
                            ref={cardsRef}
                            style={{ x: (typeof window !== 'undefined' && window.innerWidth >= 768) ? x : 0 }}
                            className="flex gap-4 md:gap-6 w-max px-[5%] md:px-0"
                        >
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-[70vw] md:w-[280px] 2xl:w-[400px] shrink-0 h-[320px] 2xl:h-[450px] snap-center"
                                >
                                    <div className="bg-white text-[#8F542D] rounded-[24px] p-6 2xl:p-8 h-full flex flex-col justify-between relative shadow-xl">
                                        <div className="flex flex-col gap-2 2xl:gap-4">
                                            <div>
                                                <h3 className="text-lg md:text-lg 2xl:text-xl font-bold text-black leading-tight" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                                    {item.title}
                                                </h3>
                                                <span className="text-base md:text-base 2xl:text-lg font-bold text-black block">
                                                    {item.subtitle}
                                                </span>
                                            </div>
                                            <p className="text-black text-sm md:text-sm 2xl:text-base leading-relaxed">
                                                {item.steps}
                                            </p>
                                        </div>

                                        <div className="mt-4 2xl:mt-8">
                                            <Reveal delay={0.3}>
                                                <p className="text-[#8F542D] font-bold text-xl md:text-lg 2xl:text-3xl leading-tight">
                                                    {item.goal}
                                                </p>
                                            </Reveal>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="block">
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-[171px] bg-[#B56A3A] z-0 pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(90deg, #8F542D 4px, transparent 4px),
                                linear-gradient(90deg, #8F542D 4px, transparent 4px),
                                linear-gradient(90deg, #8F542D 4px, transparent 4px)
                            `,
                            backgroundSize: `
                                200px 90px,
                                100px 55px,
                                20px 30px
                            `,
                            backgroundRepeat: 'repeat-x',
                            backgroundPositionX: rulerX,
                            backgroundPositionY: 'top'
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
