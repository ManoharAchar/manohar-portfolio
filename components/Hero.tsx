"use client";

import { useRef, useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { useScroll, useTransform, motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress, scrollY } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"], // Critical: ensures animation starts at 0% when page is at top
    });

    // Responsive Logic
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Mouse Interaction Logic
    const mouseX = useMotionValue(0);
    // Tuned for "aggressive" follow with minimal lag (High stiffness, moderate damping)
    const smoothMouseX = useSpring(mouseX, { stiffness: 400, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Disable tracking on mobile
            if (window.innerWidth < 768) return;

            // Normalize X position: -1 (Left) to 1 (Right)
            if (typeof window !== "undefined") {
                const xInfo = (e.clientX / window.innerWidth) * 2 - 1;
                mouseX.set(xInfo);
            }
        };
        if (typeof window !== "undefined") {
            window.addEventListener("mousemove", handleMouseMove);
        }
        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("mousemove", handleMouseMove);
            }
        }
    }, [mouseX]);

    // Map normalized X (-1 to 1) to constrained pixel movement (-250px to 250px)
    // Increased range based on user feedback (very aggressive tracking)
    const cardXMovement = useTransform(smoothMouseX, [-1, 1], [-250, 250]);

    // Create a 'Scroll Influence' value:
    // Using scrollY directly (pixels) is more reliable than progress for "initial state" detection.
    // 0px -> 1 (full movement)
    // 100px -> 0 (no movement, locked to center)
    const scrollInfluence = useTransform(scrollY, [0, 100], [1, 0]);

    // Combine both using useMotionTemplate for robust string generation
    const xDesktop = useMotionTemplate`calc(${cardXMovement} * ${scrollInfluence} * 1px)`;
    const x = isMobile ? "0px" : xDesktop;

    // Responsive Dimensions State
    // We calculate exact pixels to ensure smooth interpolation (avoiding unit conflicts like vw vs vh)
    // and to enforce a strict aspect ratio at start.
    const [dims, setDims] = useState({
        startW: 0, startH: 0,
        endW: 0, endH: 0
    });

    useEffect(() => {
        const calculateDims = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;

            // Start: 25vw width, 16:10 aspect ratio (Width * 0.625) or 16:9 (Width * 0.5625)
            // User liked the previous 14.25vw/25vw ratio which is ~0.57. Let's stick to 16:9 (0.5625) for cinema feel.
            const sW = w * 0.25;
            const sH = sW * (9 / 16); // Strict 16:9 Ratio

            // End: 95vw, 95vh
            const eW = w * 0.95;
            const eH = h * 0.95;

            setDims({ startW: sW, startH: sH, endW: eW, endH: eH });
        };

        calculateDims();
        window.addEventListener("resize", calculateDims);
        return () => window.removeEventListener("resize", calculateDims);
    }, []);

    // Animation Transforms using Calculated Pixels
    // Fallback to 0 if dimensions aren't loaded yet (SSR safety)
    const width = useTransform(scrollYProgress, [0, 1], [dims.startW || "25vw", dims.endW || "95vw"]);
    const height = useTransform(scrollYProgress, [0, 1], [dims.startH || "14vw", dims.endH || "95vh"]);
    const top = useTransform(scrollYProgress, [0, 1], ["12%", "2.5%"]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["1.5rem", "1.5rem"]);

    // Text Animation (Desktop Only) - fades out synced with expansion
    const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]); // Fade out slightly earlier to be clean
    const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section
            ref={containerRef}
            // Mobile: h-auto (natural scroll)
            // Desktop: h-[200vh] (Reduced from 300vh so it finishes snappier and scrolls up immediately after max width)
            className={`relative w-full bg-[#F6F4EF] ${isMobile ? "h-[100vh] flex flex-col justify-start pt-0" : "h-[200vh]"}`}
        >
            <div
                // Mobile: Relative/Flex (swaps order naturally) with larger negative top margin to pull up right below header
                className={`${isMobile ? "relative flex flex-col items-center gap-20 -mt-10" : "sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"}`}
            >

                {/* Media Container */}
                <motion.div
                    // Mobile: Entry animation. Desktop: Use calculated pixel dimensions to match transform
                    initial={isMobile
                        ? { opacity: 0, y: 20, filter: "blur(5px)" }
                        : { width: dims.startW || "25vw", height: dims.startH || "14vw", borderRadius: "1.5rem", top: "12%" }
                    }
                    animate={isMobile ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}

                    style={isMobile ? {
                        width: "95vw",
                        height: "210px",
                        borderRadius: "1.5rem",
                        x: 0 // No mouse tracking
                    } : {
                        width,
                        height,
                        borderRadius,
                        top,
                        x // Apply blended X position
                    }}
                    className={`z-20 bg-neutral-900 overflow-hidden flex items-center justify-center ${isMobile ? "relative order-1 mt-2" : "absolute"}`}
                >
                    {/* Placeholder for Video */}
                    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center overflow-hidden">
                        <video
                            className="w-full h-full object-cover opacity-80"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                        </video>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center transform transition-transform duration-500 hover:scale-110">
                                <span className="text-neutral-400 font-mono uppercase tracking-widest text-xs bg-black/50 px-2 py-1 rounded">
                                    Showreel
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Text Statement */}
                <motion.div
                    // Mobile: Animation props for entry (delayed)
                    initial={isMobile ? { opacity: 0, y: 20, filter: "blur(5px)" } : {}}
                    animate={isMobile ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.25, 0, 1] }}

                    style={isMobile ? {
                        y: 0
                        // opacity handled by animate prop above
                    } : {
                        opacity: textOpacity,
                        y: textY
                    }}
                    className={`z-10 px-4 w-full max-w-[90vw] text-center ${isMobile ? "relative order-2 mt-8" : "absolute top-[42%]"}`}
                >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-[#0E0E0E] text-balance leading-[1.1]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                        Product Designer who ships intuitive, research-backed products turning Complex systems into simple experiences.
                    </h1>
                </motion.div>

            </div>
        </section>
    );
}

// Version 2: Simpler "Container Scroll" approach where the whole wrapper is the scroll track
// and items move inside.

export function HeroSimple() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"] // standard parallax track
    });

    // Strategy:
    // 1. Sticky wrapper for 2-3 screens height.
    // 2. Text is at top.
    // 3. Media is below text.
    // 4. As we scroll, Media scales up to cover viewport.

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const width = useTransform(scrollYProgress, [0, 0.5], ["60%", "100%"]);
    const radius = useTransform(scrollYProgress, [0, 0.4], ["24px", "0px"]);

    // Move slightly up to cover text? 
    // User says "As soon as video fills screen, next section starts"
    // This implies the video stays Fixed Full Screen for a moment or just naturally scrolls up.

    return (
        <div ref={containerRef} className="h-[200vh] w-full bg-background relative">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                {/* Text Layer - Absolute or just above? */}
                <div className="absolute top-0 left-0 right-0 h-1/2 flex flex-col items-center justify-center text-center p-6 z-0">
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
                        {siteConfig.home.hero.headline}
                    </h1>
                </div>

                {/* Media Layer - z-index higher to cover text if needed */}
                <motion.div
                    style={{
                        width: width,
                        height: "100%", // Fill height?
                        borderRadius: radius,
                    }}
                    className="relative z-10 bg-neutral-900 mt-[30vh] shadow-2xl overflow-hidden flex items-center justify-center"
                >
                    <div className="text-white/20 font-bold text-xl uppercase tracking-widest">Hero Media / Video</div>
                </motion.div>
            </div>
        </div>
    )
}
