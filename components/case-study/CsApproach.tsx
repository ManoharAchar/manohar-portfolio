"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CaseStudySection } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { ScanSearch, Layers, ClipboardList, Video, RefreshCw } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    ScanSearch,
    Layers,
    ClipboardList,
    Video,
    RefreshCw
};

type ApproachProps = Extract<CaseStudySection, { type: 'approach' }>;

function CsApproachCards({ title, image1, image2, steps, backgroundColor = '#0A0A0A' }: ApproachProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);

    // Track scroll for sticky pinning
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Track scroll for ruler background (if we used it, but we might just use solid color or simple gradient)
    // CsMeasurementPlan had a ruler. Screenshot for Senior Mode seems plain pink.
    // keeping generic if needed, but likely unused for plain pink.

    useEffect(() => {
        if (!cardsRef.current) return;

        const updateScrollRange = () => {
            if (cardsRef.current) {
                const scrollWidth = cardsRef.current.scrollWidth;
                const clientWidth = window.innerWidth;
                const rect = cardsRef.current.getBoundingClientRect();
                const distance = (rect.left + scrollWidth) - clientWidth + 200;
                setScrollRange(distance > 0 ? distance : 0);
            }
        };

        updateScrollRange();
        const timer = setTimeout(updateScrollRange, 1000);
        const resizeObserver = new ResizeObserver(() => updateScrollRange());
        resizeObserver.observe(cardsRef.current);
        window.addEventListener('resize', updateScrollRange);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateScrollRange);
        };
    }, [steps]);

    const x = useTransform(scrollYProgress, [0, 0.85], ["0px", `-${scrollRange}px`]);
    const bgColor = backgroundColor || '#C58F9D'; // Default to pink if not specified but variant is cards, or fallback

    return (
        <section
            ref={targetRef}
            className="relative text-white"
            style={{
                backgroundColor: bgColor,
                height: (scrollRange > 0 && typeof window !== 'undefined' && window.innerWidth >= 768)
                    ? `calc(100vh + ${scrollRange * 2.5}px)`
                    : 'auto'
            }}
        >
            <div className="relative md:sticky top-0 h-auto md:h-screen flex flex-col overflow-visible md:overflow-hidden">
                <div className="flex flex-col h-full pt-24 md:pt-0 relative z-10 text-left md:justify-center">

                    {/* Header */}
                    <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto mb-8 shrink-0">
                        <Reveal>
                            <span className="text-sm font-bold uppercase tracking-wider text-white block" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                {title}
                            </span>
                        </Reveal>
                    </div>

                    {/* Horizontal Scroll Track */}
                    <div className="w-full md:w-[85%] max-w-[1440px] md:mx-auto mb-16 md:mb-0 overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory no-scrollbar pb-8 md:pb-0">
                        <motion.div
                            ref={cardsRef}
                            style={{ x: (typeof window !== 'undefined' && window.innerWidth >= 768) ? x : 0 }}
                            className="flex gap-4 md:gap-6 w-max px-[5%] md:px-0"
                        >
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="w-[70vw] md:w-[280px] 2xl:w-[400px] shrink-0 h-[450px] snap-center"
                                >
                                    <div className="bg-white rounded-[24px] p-6 2xl:p-8 h-full flex flex-col justify-between relative shadow-xl">
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-2xl font-bold text-black leading-tight mb-4 min-h-[60px]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                                {step.title}
                                            </h3>
                                            <p className="text-black text-xl md:text-2xl leading-relaxed md:leading-[1.3]">
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Big Number at Bottom */}
                                        {/* Big Number at Bottom + Icon */}
                                        <div className="mt-4 2xl:mt-8 flex justify-between items-end">
                                            <Reveal delay={0.1 * index}>
                                                <p
                                                    className="font-bold text-6xl md:text-[64px] 2xl:text-7xl leading-none opacity-100"
                                                    style={{ color: bgColor }} // Use the section background color for the number
                                                >
                                                    {index + 1}
                                                </p>
                                            </Reveal>
                                            {step.icon && iconMap[step.icon] && (
                                                <Reveal delay={(0.1 * index) + 0.2}>
                                                    {(() => {
                                                        const Icon = iconMap[step.icon!];
                                                        return (
                                                            <Icon
                                                                className="w-12 h-12 md:w-[52px] md:h-[52px] opacity-40 mix-blend-multiply"
                                                                style={{ color: bgColor }}
                                                                strokeWidth={1.5}
                                                            />
                                                        );
                                                    })()}
                                                </Reveal>
                                            )}
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

function CsApproachDefault({ title, image1, image2, steps }: ApproachProps) {
    return (
        <section className="bg-[#0A0A0A] text-white pt-0 pb-24 md:pt-0 md:pb-32">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">

                {/* Header */}
                <Reveal>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-8 block" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                        {title}
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Column: Images (Spans 8 cols) */}
                    <div className="md:col-span-8 flex flex-col md:grid md:grid-cols-2 gap-4 h-auto md:h-[600px]">
                        {/* High Fidelity */}
                        {image2 && (
                            <div className="bg-[#1A1A1A] rounded-[24px] flex items-center justify-center border border-white/5 p-8 relative overflow-hidden group aspect-[16/11] md:aspect-auto md:h-full">
                                <div className="text-neutral-500 text-center">
                                    <span className="block mb-2 text-sm uppercase tracking-widest">High Fidelity</span>
                                    <span className="text-xs opacity-50">Image Placeholder</span>
                                </div>
                                <img src={image2} alt="High fidelity design" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                        )}

                        {/* Low Fidelity */}
                        {image1 && (
                            <div className="bg-[#1A1A1A] rounded-[24px] flex items-center justify-center border border-white/5 p-8 relative overflow-hidden group aspect-[16/11] md:aspect-auto md:h-full">
                                <div className="text-neutral-500 text-center">
                                    <span className="block mb-2 text-sm uppercase tracking-widest">Low Fidelity</span>
                                    <span className="text-xs opacity-50">Image Placeholder</span>
                                </div>
                                <img src={image1} alt="Low fidelity wireframes" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    {/* Right Column: Steps List */}
                    <div className="md:col-span-4 grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:flex-col md:justify-center md:space-y-10 md:gap-0 md:mt-0">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-1" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                    {step.title}
                                </h3>
                                <p className="text-neutral-400 text-sm md:text-base leading-snug md:leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export function CsApproach(props: ApproachProps) {
    if (props.variant === 'cards') {
        return <CsApproachCards {...props} />;
    }
    return <CsApproachDefault {...props} />;
}
