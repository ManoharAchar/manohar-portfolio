"use client";

import Link from "next/link";
import { Project } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import { ParallaxImage } from "@/components/ParallaxImage";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, useState } from "react";

interface WorkCardProps {
    project: Project;
    index: number;
}

export function WorkCard({ project, index }: WorkCardProps) {
    const paddedIndex = (index + 1).toString().padStart(2, '0');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="w-full h-full bg-[#E0DFD9] rounded-[1.25rem] p-5 md:p-6 group overflow-hidden relative transition-shadow duration-500 hover:shadow-xl"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                setIsHovering(true);
                const video = document.getElementById(`video-${project.slug}`) as HTMLVideoElement;
                if (video) video.play();
            }}
            onMouseLeave={() => {
                setIsHovering(false);
                const video = document.getElementById(`video-${project.slug}`) as HTMLVideoElement;
                if (video) {
                    video.pause();
                    video.load(); // Forces the poster to show again
                }
            }}
        >
            {/* Expanding Circle Overlay */}
            <motion.div
                className="pointer-events-none absolute inset-0"
                initial={false}
                animate={{
                    clipPath: isHovering ? "circle(150% at var(--mouse-x) var(--mouse-y))" : "circle(0% at var(--mouse-x) var(--mouse-y))"
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                style={{
                    backgroundColor: project.accentColor || '#ffffff',
                    // Use a simple motion template to pipe the coordinates into CSS vars
                    "--mouse-x": useMotionTemplate`${mouseX}px`,
                    "--mouse-y": useMotionTemplate`${mouseY}px`,
                } as React.CSSProperties}
            />

            {/* Content Wrapper ensures it sits above the background */}
            <div className="relative z-10 flex flex-col justify-start gap-4 md:gap-5 h-full">
                {/* Top Section: Index and Content */}
                <div className="flex flex-col gap-3 md:gap-4">
                {/* Index */}
                <span className="text-[#050505]/40 font-mono text-xs tracking-widest leading-none">
                    {paddedIndex}
                </span>

                {/* Header Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6">
                    {/* Title */}
                    <div className="lg:col-span-4">
                        <h2 className="text-2xl md:text-3xl font-medium text-[#050505] leading-[1.05] tracking-tight min-h-[2.1em] line-clamp-2">
                            {project.title}
                        </h2>
                    </div>

                    {/* Description (Problem) */}
                    <div className="lg:col-span-8 flex items-start">
                        <p className="text-base md:text-xl text-[#050505]/90 leading-snug min-h-[2.5em] line-clamp-2">
                            {project.problem}
                        </p>
                    </div>
                </div>

                {/* Media Area - Moved Above Metadata */}
                <Link
                    href={`/work/${project.slug}`}
                    className="relative w-full aspect-[2/1] overflow-hidden rounded-md bg-black/5 cursor-pointer block mt-1"
                >
                    {/* Image/Video */}
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                        {project.video ? (
                            <video
                                id={`video-${project.slug}`}
                                src={project.video}
                                loop
                                muted
                                playsInline
                                poster={project.thumbnail} // Show thumbnail when static
                                className="w-full h-full object-cover"
                            />
                        ) : project.thumbnail ? (
                            <ParallaxImage
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#050505]/20 font-mono text-xs uppercase tracking-widest">
                                No Preview
                            </div>
                        )}
                    </div>

                    {/* Circular Button - Bottom Right */}
                    <div
                        className="absolute bottom-3 right-3 w-12 h-12 md:w-16 md:h-16 bg-[#9B6238] rounded-full flex items-center justify-center text-white transform transition-transform duration-300 group-hover:scale-110 shadow-lg z-10"
                        style={{
                            backgroundColor: '#9B6238', // Default
                        }}
                    >
                        <div
                            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ backgroundColor: project.accentColor || '#B56A3A' }}
                        />
                        <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 relative z-10" />
                    </div>
                </Link>
            </div>


            {/* Metadata Footer - Inline Role and Timeline */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-y-2 gap-x-4 mt-auto">
                {/* Role */}
                <div className="flex items-baseline gap-2">
                    <span className="text-[#050505] font-bold text-[10px] md:text-xs tracking-wide uppercase opacity-80 whitespace-nowrap">Role</span>
                    <span className="text-[#050505]/70 text-xs md:text-sm leading-tight line-clamp-1">{project.role}</span>
                </div>

                {/* Timeline */}
                <div className="flex items-baseline gap-2 sm:text-right">
                    <span className="text-[#050505] font-bold text-[10px] md:text-xs tracking-wide uppercase opacity-80 whitespace-nowrap">Timeline</span>
                    <span className="text-[#050505]/70 text-xs md:text-sm leading-tight whitespace-nowrap">{project.timeframe}</span>
                </div>
            </div>
            </div>
        </div>
    );
}

