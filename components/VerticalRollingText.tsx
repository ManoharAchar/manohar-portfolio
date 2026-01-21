"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VerticalRollingTextProps {
    items: string[];
    interval?: number;
    className?: string;
    style?: React.CSSProperties;
}

export function VerticalRollingText({ items, interval = 3000, className, style }: VerticalRollingTextProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!items || items.length === 0) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, interval);
        return () => clearInterval(timer);
    }, [items, interval]);

    if (!items || items.length === 0) return null;

    return (
        <div className={cn("relative overflow-hidden h-[1.5em] w-full block", className)} style={style}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={index}
                    initial={{ y: "100%", filter: "blur(2px)", opacity: 0 }}
                    animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                    exit={{ y: "-100%", filter: "blur(2px)", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full truncate"
                >
                    {items[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
