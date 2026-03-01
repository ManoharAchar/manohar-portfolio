"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealTextProps {
    text: string;
    className?: string;
}

export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
    const element = useRef(null);
    // Trigger when the element is 20% of the way up from the bottom of the screen
    const isInView = useInView(element, { once: true, margin: "0px 0px -20% 0px" });

    // CSS-based hardware accelerated fade-in
    return (
        <motion.div
            ref={element}
            initial={{ opacity: 0.1, y: 15 }}
            animate={{ 
                opacity: isInView ? 1 : 0.1,
                y: isInView ? 0 : 15
            }}
            transition={{ 
                duration: 1.2, 
                ease: [0.25, 1, 0.5, 1] // Custom refined spring-like easing
            }}
            className={className}
        >
            {text}
        </motion.div>
    );
}
