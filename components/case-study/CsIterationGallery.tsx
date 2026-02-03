"use client";

import { CaseStudySection } from "@/content/site";
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaRenderer } from "@/components/MediaRenderer";

type IterationGalleryProps = Extract<CaseStudySection, { type: 'iteration-gallery' }>;

export function CsIterationGallery({ title, items }: IterationGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <section className="bg-[#C58F9D] pt-16 pb-16 md:pt-32 md:pb-48 w-full overflow-hidden">
            <div className="w-full md:w-[85%] max-w-[1440px] mx-auto px-4 md:px-0">
                <div className="mb-8 md:mb-12">
                    <Reveal>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {title}
                        </h2>
                    </Reveal>
                </div>

                {/* Mobile View: Horizontal Scroll */}
                <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 no-scrollbar -mx-4 px-4">
                    {items.map((item, index) => (
                        <div key={index} className="min-w-[85vw] snap-center bg-white rounded-[24px] overflow-hidden flex flex-col justify-between">
                            <div className="p-6 pb-2">
                                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-6 leading-tight" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                    {item.title}
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <div className="mb-1">
                                            <span className="font-bold text-sm uppercase tracking-wider text-[#0A0A0A]">What we saw:</span>
                                        </div>
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            {item.whatWeSaw}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="mb-1">
                                            <span className="font-bold text-sm uppercase tracking-wider text-[#0A0A0A]">What I changed:</span>
                                        </div>
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            {item.whatIChanged}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Image Area */}
                            <div className="mt-4 bg-neutral-100 h-[280px] shrink-0 mx-6 mb-6 rounded-[16px] overflow-hidden flex items-center justify-center text-center p-0 relative">
                                {item.image ? (
                                    <MediaRenderer src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="p-4">
                                        <span className="text-neutral-400 font-medium text-sm">
                                            {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"} iteration image here
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View: Carousel Card */}
                <div className="hidden md:flex items-center justify-between gap-6 relative">
                    {/* Navigation Buttons - Positioned relative to card */}
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-100 hover:bg-neutral-50 transition-colors shrink-0"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-[#C58F9D]" />
                    </button>

                    {/* Main Card */}
                    <div className="bg-white rounded-[32px] w-full max-w-[1240px] p-12 lg:p-16 grid grid-cols-12 gap-12 min-h-[620px] relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className="col-span-12 grid grid-cols-12 gap-12 w-full"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {/* Left Content */}
                                <div className="col-span-5 flex flex-col justify-center">
                                    <h3 className="text-2xl md:text-4xl font-medium text-[#0A0A0A] mb-12 leading-tight" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                        {items[activeIndex].title}
                                    </h3>

                                    <div className="space-y-8">
                                        <div>
                                            <div className="mb-2">
                                                <span className="font-bold text-base uppercase tracking-wider text-[#0A0A0A]">What we saw:</span>
                                            </div>
                                            <p className="text-base text-neutral-600 leading-relaxed">
                                                {items[activeIndex].whatWeSaw}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="mb-2">
                                                <span className="font-bold text-base uppercase tracking-wider text-[#0A0A0A]">What I changed:</span>
                                            </div>
                                            <p className="text-base text-neutral-600 leading-relaxed">
                                                {items[activeIndex].whatIChanged}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Image Area */}
                                <div className="col-span-7 bg-neutral-100 rounded-[24px] flex items-center justify-center min-h-[400px] overflow-hidden relative">
                                    {items[activeIndex].image ? (
                                        <MediaRenderer src={items[activeIndex].image} alt={items[activeIndex].title} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-neutral-400 font-medium text-lg">
                                            {activeIndex === 0 ? "1st" : activeIndex === 1 ? "2nd" : "3rd"} iteration image here
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-100 hover:bg-neutral-50 transition-colors shrink-0"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-[#C58F9D]" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    activeIndex === index
                                        ? "w-12 bg-white"
                                        : "w-12 bg-black/20 hover:bg-black/30"
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
