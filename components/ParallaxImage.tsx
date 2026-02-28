"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    offset?: number; // How much parallax movement (pixels or %)
}

export function ParallaxImage({ src, alt, className, offset = 25 }: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const currentOffset = isMobile ? 10 : offset;

    // Track scroll progress of the container relative to the viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
        // "start end" = when top of element hits bottom of viewport (enter)
        // "end start" = when bottom of element hits top of viewport (exit)
    });

    // Map scroll progress (0 to 1) to Y transform (-offset to +offset)
    // Re-added useSpring since global Lenis has been removed to prevent macOS native scroll jitter
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const y = useTransform(smoothProgress, [0, 1], [-currentOffset, currentOffset]);

    return (
        <div ref={ref} className={cn("relative overflow-hidden w-full h-full", className)}>
            <motion.img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                style={{ y, scale: 1.08 }} // Direct y mapping for stability
            />
        </div>
    );
}
