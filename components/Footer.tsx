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
        <footer ref={containerRef} id="site-footer" className="relative w-full min-h-[400px] md:min-h-[600px] flex items-end justify-center overflow-hidden bg-[#F6F4EF] pt-12 pb-4 md:pt-32 md:pb-6">

            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                {/* Mobile Background: Custom image with text, bottom aligned */}
                <motion.img
                    style={{ y, scale }}
                    src="/images/footer-bg-mobile.png"
                    alt="Footer Background Mobile"
                    className="w-full h-auto absolute bottom-0 md:hidden object-contain object-bottom"
                />
                {/* Desktop Background: Original image, covers full area */}
                <motion.img
                    style={{ y, scale }}
                    src="/images/footer-bg.png"
                    alt="Footer Background Desktop"
                    className="hidden md:block w-full h-full object-cover object-bottom"
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-[95vw] mx-auto">
                {/* Navigation Tiles Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { label: "work", href: "/#work" },
                        { label: "about", href: "/#about" },
                        { label: "contact", href: "mailto:hello@example.com" },
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
                            className="group relative h-32 md:h-96 rounded-3xl overflow-hidden transition-colors duration-300"
                        >
                            {/* Glass Effect Background */}
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-500 group-hover:bg-white/60" />

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
