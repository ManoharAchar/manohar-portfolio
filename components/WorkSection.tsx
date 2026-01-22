"use client";

import { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

import { VerticalRollingText } from "@/components/VerticalRollingText";
import { RotatingButton } from "@/components/RotatingButton";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "./Reveal";

export function WorkSection() {
    const [activeSlug, setActiveSlug] = useState(siteConfig.projects[0].slug);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoHovered, setIsVideoHovered] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const activeProject = siteConfig.projects.find((p) => p.slug === activeSlug) || siteConfig.projects[0];

    useEffect(() => {
        // Force play on source change (Critical for mobile reliability)
        if (videoRef.current) {
            videoRef.current.load(); // Reload video source to be safe
            videoRef.current.play().catch(() => {
                // Autoplay was prevented. This is normal in some low-power modes.
                // We silently fail and fall back to the poster.
            });
        }
    }, [activeProject.video]);



    // ... existing imports

    return (
        <section id="work" className="relative w-full bg-[#F3F2ED] pt-2 pb-12 md:py-12">
            <div className="w-[95vw] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <Reveal>
                        <h2 className="text-[18vw] md:text-[12rem] font-bold leading-none tracking-wide uppercase text-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            Work
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <span className="text-[18vw] md:text-[12rem] font-bold leading-none tracking-wide uppercase text-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            '25
                        </span>
                    </Reveal>
                </div>

                {/* Main Container */}
                <div className="relative bg-[#0A0A0A] rounded-3xl p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 h-auto lg:h-[660px] overflow-hidden">

                    {/* Desktop Sidebar Background Layer */}
                    <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[25%] bg-[#242424] rounded-r-3xl pointer-events-none" />

                    {/* Sidebar / Project List (Bottom on Mobile, Left on Desktop) */}
                    <div data-lenis-prevent className="relative z-10 lg:col-span-3 order-2 lg:order-first flex flex-row lg:flex-col gap-4 lg:gap-6 overflow-x-auto lg:overflow-y-auto w-full lg:h-full pb-2 lg:pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {siteConfig.projects.map((project) => (
                            <button
                                key={project.slug}
                                onClick={() => setActiveSlug(project.slug)}
                                className={cn(
                                    "relative w-36 md:w-56 lg:w-full aspect-[4/3] lg:aspect-[3/2] shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 ease-in-out group overflow-hidden",
                                    activeSlug === project.slug
                                        ? "bg-[#F3F2ED] scale-100 z-10"
                                        : "bg-[#1F1F1F] z-0"
                                )}
                            >
                                {/* Logo / Image Layer */}
                                <div className="w-full h-full flex items-center justify-center z-0">
                                    {project.logo ? (
                                        <ParallaxImage
                                            src={project.logo}
                                            alt={project.title}
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center p-8">
                                            <span className="uppercase tracking-widest text-white">{project.title.split(' ')[0]}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Inactive Overlay with Title */}
                                <div className={cn(
                                    "absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-500 z-20",
                                    activeSlug === project.slug ? "opacity-0 pointer-events-none" : "opacity-100"
                                )}>
                                    <span className="text-white font-bold text-xs md:text-sm lg:text-xl uppercase tracking-widest text-center px-2 drop-shadow-md">
                                        {project.title}
                                    </span>
                                </div>
                            </button>
                        ))}
                        {/* Spacer to ensure last item is fully visible on scroll */}
                        <div className="w-6 shrink-0 lg:hidden" />
                        <div className="hidden lg:block min-h-[6rem] w-full" />
                    </div>

                    {/* Active Project Detail View - Right Panel */}
                    <div className="lg:col-span-9 pt-0 flex flex-col relative order-1">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.slug}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col h-full relative"
                            >

                                {/* Top Content Group: Video + Text */}
                                <div className="flex flex-col gap-6 w-full">
                                    {/* Main Preview Image/Video Area */}
                                    {/* Distinct White Box per design - Matching Sidebar Radius */}
                                    <Link
                                        href={`/work/${activeProject.slug}`}
                                        className="relative w-full aspect-[640/384] h-auto md:h-[400px] md:aspect-auto bg-white rounded-2xl overflow-hidden shadow-sm flex items-center justify-center shrink-0 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                                        onMouseEnter={() => setIsVideoHovered(true)}
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            setCursorPosition({
                                                x: e.clientX - rect.left,
                                                y: e.clientY - rect.top
                                            });
                                        }}
                                        onMouseLeave={() => setIsVideoHovered(false)}
                                    >
                                        {activeProject.video ? (
                                            <video
                                                ref={videoRef}
                                                key={activeProject.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover pointer-events-none"
                                                src={activeProject.video}
                                                poster={activeProject.thumbnail || activeProject.logo}
                                            />
                                        ) : activeProject.thumbnail ? (
                                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-black font-medium">
                                                {/* Fallback to thumbnail or text if no video */}
                                                Video Element here
                                            </div>
                                        ) : (
                                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-black" />
                                        )}

                                        {/* Cursor Tooltip */}
                                        {isVideoHovered && (
                                            <div
                                                className="absolute pointer-events-none z-50 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-opacity duration-200"
                                                style={{
                                                    left: `${cursorPosition.x}px`,
                                                    top: `${cursorPosition.y}px`,
                                                    transform: 'translate(12px, 12px)',
                                                    fontFamily: 'var(--font-archivo)'
                                                }}
                                            >
                                                Click to dive deeper
                                            </div>
                                        )}
                                    </Link>

                                    {/* Bottom Info - Dark Theme Text */}
                                    <div className="w-full md:w-[80%] px-0">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide leading-[1.1] mb-2 text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                            {activeProject.summary || activeProject.title}
                                        </h3>
                                        <div className="space-y-1">
                                            <p className="text-neutral-300 font-semibold text-xl" style={{ fontFamily: 'var(--font-archivo)' }}>A Learning + Commerce platform (Designed + Built)</p>
                                            {activeProject.details && activeProject.details.length > 0 ? (
                                                <VerticalRollingText
                                                    items={activeProject.details}
                                                    className="text-[#B56A3A] font-semibold text-[24px] mt-4"
                                                    style={{ fontFamily: 'var(--font-archivo)' }}
                                                />
                                            ) : (
                                                <p className="text-[#B56A3A] font-semibold text-[24px] mt-4" style={{ fontFamily: 'var(--font-archivo)' }}>Role: {activeProject.role}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Independent CTA Button - Bottom Right on Desktop, In-flow on Mobile */}
                                <div className="static md:absolute mt-6 md:mt-0 bottom-0 right-0 flex justify-end">
                                    <RotatingButton href={`/work/${activeProject.slug}`} />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* See All Button */}
                <div className="w-full flex justify-center mt-12">
                    <Link
                        href="/work"
                        className="flex items-center gap-2 text-[#0E0E0E] text-2xl font-bold hover:gap-4 transition-all duration-300"
                        style={{ fontFamily: 'var(--font-archivo)' }}
                    >
                        See all <ArrowRight className="w-8 h-8" strokeWidth={2.5} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
