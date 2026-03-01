"use client";

import { useState, useRef } from "react";

import { cn } from "@/lib/utils";

const IMAGES = [
    { src: "/images/about/01-headshot.jpg", label: "Hi, nice to meet you!" },
    { src: "/images/about/02-workstation.jpg", label: "The workshop." },
    { src: "/images/about/03-design-club.jpg", label: "Hosting a Design Hackathon is a handful, I'll tell you that." },
    { src: "/images/about/04-brioche.jpg", label: "TikTok recipe turned out better than I expected." },
    { src: "/images/about/05-acappella.jpg", label: "Our A Cappella version of \"Espresso\" is quite good, NGL." },
    { src: "/images/about/06-pumpkin-painting.jpg", label: "Art is a big part of how I express myself." },
    { src: "/images/about/07-crispy-fries.jpg", label: "I'll just say you can't trust me with a bag of fries." },
    { src: "/images/about/08-doodles-laughs.jpg", label: "Dropping a few caricature hacks at a club event." },
];

export function AboutCarousel({ className }: { className?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    };

    return (
        <div className={cn("group relative w-full flex flex-col gap-4 max-w-full overflow-hidden", className)}>
            <div
                ref={containerRef}
                className="relative w-full aspect-[640/384] overflow-hidden bg-[#1C1C1C] rounded-[24px]"
            >
            {/* Image Display */}

            {/* Image Display */}
            <div className="absolute inset-0 w-full h-full transition-opacity duration-300">
                <img
                    key={currentIndex}
                    src={IMAGES[currentIndex].src}
                    alt={IMAGES[currentIndex].label}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Hover Caption Overlay (Pure CSS to prevent JS thread blocking) */}
            <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap pointer-events-none transition-all duration-200 ease-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                style={{ willChange: "transform, opacity" }}
            >
                {IMAGES[currentIndex].label}
            </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="w-full flex items-center justify-between gap-1.5 md:gap-2">
                {IMAGES.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                            "relative w-full flex-1 aspect-[4/3] rounded-xl overflow-hidden transition-opacity duration-300 border-2",
                            currentIndex === idx
                                ? "border-[#B55A3A]" // Selected state: simple burnt orange border
                                : "border-transparent opacity-50 hover:opacity-100"
                        )}
                    >
                        <img src={img.src} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
