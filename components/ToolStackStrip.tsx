"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// Define the tool stack data
const TOOLS = [
    { name: "Figma", file: "figma.svg" },
    { name: "Framer", file: "framer.svg" },
    { name: "Notion", file: "notion.svg" },
    { name: "Miro", file: "miro.svg" },
    { name: "GitHub", file: "github.svg" },
    { name: "Storybook", file: "storybook.svg" },
    { name: "Jira", file: "jira.svg" },
    { name: "Google Analytics", file: "googleanalytics.svg" },
    { name: "Hotjar", file: "hotjar.svg" },
    { name: "WordPress", file: "wordpress.svg" },
    { name: "ChatGPT", file: "ChatGPT.svg" },
    { name: "Claude", file: "Claude.svg" },
    { name: "Google Gemini", file: "Gemini.svg" },
    { name: "Google Anti-Gravity", file: "antigravity.svg" },
    { name: "Nano Banana", file: "nanobanana.svg" },
    { name: "React", file: "react.svg" },
    { name: "Tailwind", file: "tailwind.svg" },
    { name: "Next.js", file: "nextjs.svg" },
];

export function ToolStackStrip() {
    // We'll use a manual animation loop driven by useAnimationFrame to allow for:
    // 1. Infinite looping (wrapping around)
    // 2. Drag to pause/scroll
    // 3. Resume on release

    // We duplicate the list to create the seamless loop effect
    const duplicatedTools = [...TOOLS, ...TOOLS];

    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Motion value for the x-offset
    const x = useMotionValue(0);

    // speed in pixels per second (approx). 
    // Original duration was 35s for the full width. 
    // We'll calibrate this dynamically or pick a reasonable default.
    const speed = 50; // pixels per second? Let's tune this.

    // Measure the width of one set of tools (half the total width)
    useEffect(() => {
        if (containerRef.current) {
            // Total scroll width includes both sets. We want the width of ONE set to know when to wrap.
            const totalWidth = containerRef.current.scrollWidth;
            setContentWidth(totalWidth / 2);
        }
    }, []);

    useAnimationFrame((time, delta) => {
        if (!isDragging && contentWidth > 0) {
            // Move left by a small amount based on delta time
            // Adjust speed factor to match desired "35s" feel.
            // If width is e.g. 2000px, 35s means ~57px/s.
            const moveBy = (contentWidth / 35000) * delta;

            let newX = x.get() - moveBy;

            // Seamless Loop Logic:
            // Since we move LEFT (negative x), if we go past -contentWidth, we wrap back to 0.
            if (newX <= -contentWidth) {
                newX = 0;
            }
            // Support right dragging wrap-around too:
            else if (newX > 0) {
                newX = -contentWidth;
            }

            x.set(newX);
        } else if (isDragging && contentWidth > 0) {
            // While dragging, we still want to enforce the wrap-around logic 
            // so the user doesn't hit a wall or whitespace.
            let currentX = x.get();
            if (currentX <= -contentWidth) {
                x.set(currentX + contentWidth);
            } else if (currentX > 0) {
                x.set(currentX - contentWidth);
            }
        }
    });

    return (
        <div id="tool-stack" className="w-full py-12 md:py-16 bg-[#F3F2ED] overflow-hidden cursor-grab active:cursor-grabbing">
            <div className="w-full">
                {/* Marquee Container */}
                <div className="flex relative overflow-hidden" ref={containerRef}>
                    <motion.div
                        className="flex items-center gap-12 md:gap-20 shrink-0 pr-12 md:pr-20"
                        style={{ x }}
                        drag="x"
                        dragConstraints={{ left: -100000, right: 100000 }} // Effectively infinite
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
                    // We strictly control x via the animation loop and drag updates.
                    // When dragging, Framer updates 'x' automatically based on gesture.
                    // We check bounds in the render loop.
                    >
                        {duplicatedTools.map((tool, idx) => (
                            <ToolIcon key={`${tool.name}-${idx}`} tool={tool} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function ToolIcon({ tool }: { tool: { name: string; file: string } }) {
    const [error, setError] = useState(false);

    if (error) return null;

    return (
        <div className="group relative shrink-0 flex flex-col items-center justify-center">
            {/* Tooltip */}
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs uppercase font-bold px-3 py-1.5 rounded pointer-events-none whitespace-nowrap z-10">
                {tool.name}
            </div>

            {/* Icon */}
            {/* 
               Added active: styles for mobile tap-to-highlight support.
               active:scale-110 gives immediate tactile feedback.
               active:grayscale-0 and active:opacity-100 ensure it lights up when touched.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`/icons/${tool.file}`}
                alt={tool.name}
                className="w-12 h-12 md:w-16 md:h-16 object-contain opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 active:grayscale-0 active:opacity-100 active:scale-110 transition-all duration-300 pointer-events-none select-none"
                onError={() => setError(true)}
                draggable={false} // Prevent native image drag ghost
            />
        </div>
    );
}
