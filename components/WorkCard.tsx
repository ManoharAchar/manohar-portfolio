"use client";

import Link from "next/link";
import { Project } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
import { ParallaxImage } from "@/components/ParallaxImage";

interface WorkCardProps {
    project: Project;
    index: number;
}

export function WorkCard({ project, index }: WorkCardProps) {
    const paddedIndex = (index + 1).toString().padStart(2, '0');

    return (
        <div
            className="w-full h-full bg-[#111111] rounded-[1.25rem] p-5 md:p-6 flex flex-col justify-between gap-4 md:gap-5 group overflow-hidden relative"
            onMouseEnter={() => {
                const video = document.getElementById(`video-${project.slug}`) as HTMLVideoElement;
                if (video) video.play();
            }}
            onMouseLeave={() => {
                const video = document.getElementById(`video-${project.slug}`) as HTMLVideoElement;
                if (video) {
                    video.pause();
                    video.load(); // Forces the poster to show again
                }
            }}
        >
            {/* Top Section: Index and Content */}
            <div className="flex flex-col gap-3 md:gap-4">
                {/* Index */}
                <span className="text-white/40 font-mono text-xs tracking-widest leading-none">
                    {paddedIndex}
                </span>

                {/* Header Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6">
                    {/* Title */}
                    <div className="lg:col-span-4">
                        <h2 className="text-2xl md:text-3xl font-medium text-white leading-[1.05] tracking-tight min-h-[2.1em] line-clamp-2">
                            {project.title}
                        </h2>
                    </div>

                    {/* Description (Problem) */}
                    <div className="lg:col-span-8 flex items-start">
                        <p className="text-base md:text-xl text-white/90 leading-snug min-h-[2.5em] line-clamp-2">
                            {project.problem}
                        </p>
                    </div>
                </div>

                {/* Media Area - Moved Above Metadata */}
                <Link
                    href={`/work/${project.slug}`}
                    className="relative w-full aspect-[2/1] overflow-hidden rounded-md bg-[#1C1C1C] cursor-pointer block mt-1"
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
                            <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs uppercase tracking-widest">
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


            {/* Metadata Grid - Moved Below Media */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 md:gap-y-0 pt-2">
                {/* Role */}
                <div className="flex flex-col gap-1">
                    <span className="text-white font-bold text-[10px] md:text-xs tracking-wide uppercase opacity-80">Role</span>
                    <span className="text-white/70 text-xs md:text-sm leading-tight">{project.role}</span>
                </div>

                {/* Scope */}
                <div className="flex flex-col gap-1">
                    <span className="text-white font-bold text-[10px] md:text-xs tracking-wide uppercase opacity-80">Scope</span>
                    <span className="text-white/70 text-xs md:text-sm leading-tight">{project.scope}</span>
                </div>

                {/* Platform */}
                <div className="flex flex-col gap-1">
                    <span className="text-white font-bold text-[10px] md:text-xs tracking-wide uppercase opacity-80">Platform</span>
                    <span className="text-white/70 text-xs md:text-sm leading-tight">{project.platform}</span>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-1">
                    <span className="text-white font-bold text-[10px] md:text-xs tracking-wide uppercase opacity-80">Timeline</span>
                    <span className="text-white/70 text-xs md:text-sm leading-tight">{project.timeframe}</span>
                </div>
            </div>
        </div>
    );
}

