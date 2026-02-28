"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // Parallax: Start slightly shifted up (-10%) and settle to 0. Scale up slightly to cover edges.
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);
    const scale = 1.05;

    return (
        <footer ref={containerRef} id="site-footer" className="relative w-full flex items-end justify-center overflow-hidden bg-[#F6F4EF] pt-12 pb-4 md:pt-16 md:pb-6">

            {/* Background Gradient Layer (Behind text and cards) */}
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#E0DFD9] via-[#E0DFD9]/80 to-transparent pointer-events-none" />

            {/* Background Text Layer */}
            <div className="absolute inset-x-0 bottom-0 z-0 flex flex-col items-center justify-end pb-4 md:pb-6 pointer-events-none">
                <div className="w-full h-20 md:h-60 flex items-center justify-center">
                    <motion.div
                        style={{ y, scale }}
                        className="w-[70vw] flex items-center justify-center"
                    >
                    {/* SVG ensures the text perfectly fills the 70vw container and scales properly across all viewports without breaking into multiple lines or having unpredictable font-size scaling issues */}
                    <svg viewBox="0 0 1400 250" className="w-full h-auto opacity-90 fill-[#050505]">
                        <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontFamily="Clash Display, sans-serif"
                            fontWeight="800"
                            fontSize="180"
                            letterSpacing="-0.02em"
                        >
                            Manohar Achar
                        </text>
                    </svg>
                </motion.div>
                </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-[95vw] mx-auto">
                {/* Navigation Tiles Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { label: "work", href: "/work" },
                        { label: "about", href: "/#about" },
                        { label: "contact", href: "mailto:manohar.create@gmail.com" },
                        { label: "LinkedIn", href: siteConfig.meta.links.linkedin }
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => {
                                if (item.href.includes('#')) {
                                    const hash = item.href.split('#')[1];
                                    if (hash) {
                                        window.dispatchEvent(new CustomEvent('lenis-scroll-to', {
                                            detail: { target: `#${hash}` }
                                        }));
                                    }
                                }
                            }}
                            className="group relative h-20 md:h-60 rounded-3xl overflow-hidden transition-colors duration-300"
                        >
                            {/* Glass Effect Background */}
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/10 transition-all duration-500 group-hover:bg-white/70" />

                            {/* Text Content */}
                            <div className="relative h-full p-6 flex flex-col justify-start">
                                <span className="text-black text-lg md:text-xl font-bold lowercase tracking-wide" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
