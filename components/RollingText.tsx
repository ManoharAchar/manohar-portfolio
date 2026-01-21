"use client";

import { motion } from "framer-motion";

interface RollingTextProps {
    text: string;
    className?: string;
}

export function RollingText({ text, className = "" }: RollingTextProps) {
    const characters = text.split("");

    return (
        <motion.div
            className={`relative flex overflow-hidden whitespace-nowrap ${className}`}
            initial="initial"
            whileHover="hover"
        >
            <div className="flex">
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        className="relative block"
                        variants={{
                            initial: { y: 0 },
                            hover: { y: "-100%" }
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.33, 1, 0.68, 1], // Cubic-bezier for smooth pop
                            delay: 0.02 * i // Stagger effect
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </div>
            <div className="absolute inset-0 flex">
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        className="relative block"
                        variants={{
                            initial: { y: "100%" },
                            hover: { y: 0 }
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.33, 1, 0.68, 1],
                            delay: 0.02 * i
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}
