"use client";

import { motion, Variants } from "framer-motion";

export function LotusIcon({ className }: { className?: string }) {
    // 5-Petal Design matching the reference image
    // Animation: Center draws first, then sides slide out.

    // Center Petal: Draws path
    const centerVariant: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 1, ease: "easeInOut" },
                opacity: { duration: 0.1 }
            }
        }
    };

    // Inner Petals: Slide out from center
    const innerLeftVariant: Variants = {
        hidden: { x: 20, opacity: 0 }, // Start tucked in towards center
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.5, // Wait for center to half-draw
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const innerRightVariant: Variants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.5,
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    // Outer Petals: Slide out from inner petals
    const outerLeftVariant: Variants = {
        hidden: { x: 30, opacity: 0 }, // Start tucked in deeper
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.8, // Wait for inner to start sliding
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const outerRightVariant: Variants = {
        hidden: { x: -30, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.8,
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.svg
            width="100"
            height="100"
            viewBox="0 0 100 80" // Adjusted for wider 5-petal ratio
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            initial="hidden"
            animate="visible"
        >
            {/* 
               Paths approximated based on standard 5-petal lotus geometry.
               Coordinate system: 0,0 top-left to 100,100 bottom-right.
               Center is roughly x=50. Base is y=75.
            */}

            {/* Center Petal (Draws) */}
            <motion.path
                d="M50 75 C50 75 35 40 50 10 C65 40 50 75 50 75Z" // Teardrop shape
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={centerVariant}
            />

            {/* Inner Left Petal (Slides) */}
            <motion.path
                d="M45 75 C40 75 25 55 35 25 C42 40 48 60 50 70" // Curves out to left
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={innerLeftVariant}
            />

            {/* Inner Right Petal (Slides) */}
            <motion.path
                d="M55 75 C60 75 75 55 65 25 C58 40 52 60 50 70" // Curves out to right
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={innerRightVariant}
            />

            {/* Outer Left Petal (Slides) */}
            <motion.path
                d="M35 75 C25 75 5 55 15 35 C25 45 35 60 40 70" // Wider curve to left
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={outerLeftVariant}
            />

            {/* Outer Right Petal (Slides) */}
            <motion.path
                d="M65 75 C75 75 95 55 85 35 C75 45 65 60 60 70" // Wider curve to right
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={outerRightVariant}
            />

        </motion.svg>
    );
}
