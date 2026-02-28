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

    const words = text.split(" ");
    
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.03, // Stagger each word fade-in by 30ms for a rapid fluid cascade
            }
        }
    };
    
    const wordVariants = {
        hidden: { opacity: 0.1 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            ref={element}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`${className} flex flex-wrap gap-x-[0.25em]`}
        >
            {words.map((word, i) => (
                <motion.span key={i} variants={wordVariants}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
