"use client";

import { useState, useRef } from "react";
import { Repeat } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const IMAGES = [
    { src: "/images/about/01-headshot.png", label: "That's me! Say Hi!!" },
    { src: "/images/about/02-workstation.jpg", label: "The workshop" },
    { src: "/images/about/03-design-club.jpg", label: "Hosting a Design Hackathon is a handful Ill tell you that" },
    { src: "/images/about/04-brioche.jpg", label: "Tiktok recipie turned out better than I expected" },
    { src: "/images/about/05-acappella.jpg", label: "Our Acapella version of \"Espresso\" is quiet good ngl" },
    { src: "/images/about/06-pumpkin-painting.jpg", label: "Art is a big part of how I express myself" },
    { src: "/images/about/07-crispy-fries.jpg", label: "Ill just say you cant trust me with a bag a fries" },
    { src: "/images/about/08-doodles-laughs.png", label: "Dropping a few Caricature hacks at a club event" },
];

export function AboutCarousel({ className, enableParallax = false }: { className?: string; enableParallax?: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse tracking for custom cursor
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth follow
    const cursorX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
    const cursorY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        // Use clientX/Y for fixed positioning
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const springY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const parallaxStyle = enableParallax ? { y: springY, scale: 1.1 } : {};

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    };

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full h-full overflow-hidden bg-[#1C1C1C] rounded-3xl cursor-none", className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Hidden Pre-mount Container for Instant Loading */}
            <div className="absolute inset-0 w-0 h-0 opacity-0 overflow-hidden pointer-events-none">
                {IMAGES.map((img, idx) => (
                    <img key={idx} src={img.src} alt="preload" loading="eager" />
                ))}
            </div>

            {/* Image Display */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={IMAGES[currentIndex].src}
                        alt={IMAGES[currentIndex].label}
                        className="w-full h-full object-cover"
                        style={parallaxStyle}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} // Try 0 for instant switch visual, or stick to basically instant swap
                        transition={{ duration: 0 }} // Instant transition
                        loading="eager" // Force eager load for current image too
                    />
                </AnimatePresence>
            </div>

            {/* Desktop Controls (Loop Button) */}
            <div className="hidden lg:block">
                <button
                    onClick={nextImage}
                    className="absolute bottom-4 left-4 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white z-10"
                    aria-label="Next image"
                >
                    <Repeat className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile Controls (Shuffle/Next Button) */}
            <div className="lg:hidden">
                <button
                    onClick={nextImage}
                    className="absolute bottom-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white z-10"
                    aria-label="Next image"
                >
                    <Repeat className="w-5 h-5" />
                </button>
            </div>
            {/* Desktop Custom Cursor */}
            <motion.div
                className="hidden lg:flex fixed pointer-events-none z-50 items-center justify-center bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                style={{
                    left: cursorX,
                    top: cursorY,
                    translateX: "-50%",
                    translateY: "-150%", // Offset to be above cursor
                }}
                animate={{
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
            >
                {IMAGES[currentIndex].label}
            </motion.div>
        </div>
    );
}
