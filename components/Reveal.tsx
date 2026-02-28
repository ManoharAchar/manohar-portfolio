"use client";

import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    height?: string; // Added height prop
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
}

export function Reveal({
    children,
    width = "fit-content",
    height = "100%", // Default to 100% for backward compatibility
    className,
    delay = 0.25,
    direction = "up",
    duration = 0.5,
}: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
            x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
            filter: "blur(4px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.25, 0.25, 0, 1], // Custom cubic-bezier for "modern" feel
            },
        },
    };

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={controls}
            className={className}
            style={{ width, height }}
            onAnimationComplete={() => {
                // Remove the filter completely after animation allows text to regain subpixel anti-aliasing
                if (ref.current) {
                    (ref.current as HTMLElement).style.filter = 'none';
                }
            }}
        >
            {children}
        </motion.div>
    );
}
