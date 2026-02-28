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

    return (
        <motion.div
            ref={element}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: isInView ? 1 : 0.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={className}
        >
            {text}
        </motion.div>
    );
}
