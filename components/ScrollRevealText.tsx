"use client";

import { useScroll, useTransform, motion, MotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealTextProps {
    text: string;
    className?: string;
}

export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start 0.9", "start 0.25"],
    });

    // Smooth out native scroll events to prevent jitter (replacing Lenis globally)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const words = text.split(" ");

    return (
        <div
            ref={element} // Reference for scroll container
            className={`${className} flex flex-wrap gap-x-[0.25em]`}
        >
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                    <Word key={i} progress={smoothProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </div>
    );
}

interface WordProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
    const opacity = useTransform(progress, range, [0.1, 1]);

    return (
        <motion.span style={{ opacity }}>
            {children}
        </motion.span>
    );
};
