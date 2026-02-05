"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { Button } from "./Button";
import { ContactButtonFramer } from "./ContactButton";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { SkipLink } from "./SkipLink";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

export function TopBar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 100], [1, 0.85]);
    // Static transparent bar, no scroll state needed for transparency
    const [isVisible, setIsVisible] = useState(true);
    // Case Study Refs
    const footerVisible = useRef(false);
    const wibVisible = useRef(false);
    const wibPrevVisible = useRef(false);
    const reflectionVisible = useRef(false);
    const proxiesVisible = useRef(false);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;

        // Small timeout to ensure DOM is ready after route change
        const timer = setTimeout(() => {
            const footer = document.getElementById('site-footer');
            const whatIBuilt = document.getElementById('what-i-built');
            const wibPrev = document.getElementById('wib-prev');
            const reflection = document.getElementById('reflection');
            const proxies = document.getElementById('proxies');

            const updateVisibility = () => {
                // Hide if strictly inside Case Study sections (WhatIBuilt active etc)
                // Footer hiding logic removed as per user request (Bug 2)
                const wibActive = wibVisible.current && !wibPrevVisible.current && !reflectionVisible.current && !proxiesVisible.current;
                const shouldHide = wibActive;
                setIsVisible(!shouldHide);
            };

            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.target === footer) footerVisible.current = entry.isIntersecting;
                    if (entry.target === whatIBuilt) wibVisible.current = entry.isIntersecting;
                    if (entry.target === wibPrev) wibPrevVisible.current = entry.isIntersecting;
                    if (entry.target === reflection) reflectionVisible.current = entry.isIntersecting;
                    if (entry.target === proxies) proxiesVisible.current = entry.isIntersecting;
                });
                updateVisibility();
            }, {
                threshold: 0.1 // Trigger when 10% is visible
            });

            if (footer) observer.observe(footer);
            if (whatIBuilt) observer.observe(whatIBuilt);
            if (wibPrev) observer.observe(wibPrev);
            if (reflection) observer.observe(reflection);
            if (proxies) observer.observe(proxies);
        }, 800); // 800ms delay for hydration/rendering

        return () => {
            clearTimeout(timer);
            if (observer) observer.disconnect();
        };
    }, [pathname]);

    const variants = {
        visible: { y: "0%" },
        hidden: { y: "-100%" }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transition: any = { duration: 0.5, ease: [0.42, 0, 0.58, 1] };

    return (
        <>
            <SkipLink />

            {/* Layer 1: Text Content (Blended) - Calculates difference against background */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 py-6 bg-transparent pointer-events-none mix-blend-difference text-white"
                initial="visible"
                animate={isVisible ? "visible" : "hidden"}
                variants={variants}
                transition={transition}
            >
                <div className="w-[95vw] mx-auto h-full flex items-center justify-between">

                    {/* MOBILE LEFT */}
                    <motion.div
                        className="md:hidden flex flex-col leading-none gap-2"
                        style={{ scale, originX: 0, originY: 0.5 }}
                    >
                        <span className="text-[16px] font-semibold tracking-tight">System-First</span>
                        <span className="text-[16px] font-semibold tracking-tight">Designer</span>
                    </motion.div>

                    {/* DESKTOP COLUMNS */}
                    <motion.div
                        className="hidden md:flex flex-col leading-none gap-2"
                        style={{ scale, originX: 0, originY: 0.5 }}
                    >
                        <span className="text-[16px] font-semibold">{siteConfig.header.location.label}</span>
                        <span className="text-[16px] text-[#707070]">{siteConfig.header.location.value}</span>
                    </motion.div>

                    <motion.div
                        className="hidden md:flex flex-col leading-none gap-2"
                        style={{ scale, originX: 0, originY: 0.5 }}
                    >
                        <span className="text-[16px] font-semibold">{siteConfig.header.currentRole.label}</span>
                        <span className="text-[16px] text-[#707070]">{siteConfig.header.currentRole.value}</span>
                    </motion.div>

                    <motion.div
                        className="hidden md:flex flex-col leading-none gap-2"
                        style={{ scale, originX: 0, originY: 0.5 }}
                    >
                        <span className="text-[16px] font-semibold">{siteConfig.header.availability.label}</span>
                        <span className="text-[16px] text-[#707070]">{siteConfig.header.availability.value}</span>
                    </motion.div>

                    {/* Invisible Spacer for CTA alignment */}
                    <div className="flex justify-end opacity-0">
                        <div className="w-[140px] h-10" />
                    </div>
                </div>
            </motion.header>

            {/* Layer 2: CTA Button (Normal) - Sits on top, no blending */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 py-6 bg-transparent pointer-events-none"
                initial="visible"
                animate={isVisible ? "visible" : "hidden"}
                variants={variants}
                transition={transition}
            >
                <div className="w-[95vw] mx-auto h-full flex items-center justify-between">

                    {/* Invisible Spacers to match Layer 1 layout precisely */}
                    <div className="md:hidden opacity-0 flex flex-col leading-none gap-2">
                        <span className="text-[16px] font-semibold tracking-tight">System-First</span>
                        <span className="text-[16px] font-semibold tracking-tight">Designer</span>
                    </div>

                    <div className="hidden md:flex flex-col opacity-0 leading-none gap-2">
                        <span className="text-[16px] font-semibold">{siteConfig.header.location.label}</span>
                        <span className="text-[16px] text-[#707070]">{siteConfig.header.location.value}</span>
                    </div>
                    <div className="hidden md:flex flex-col opacity-0 leading-none gap-2">
                        <span className="text-[16px] font-semibold">{siteConfig.header.currentRole.label}</span>
                        <span className="text-[16px] text-[#707070]">{siteConfig.header.currentRole.value}</span>
                    </div>
                    <div className="hidden md:flex flex-col opacity-0 leading-none gap-2">
                        <span className="text-[16px] font-semibold">{siteConfig.header.availability.label}</span>
                        <span className="text-[16px] text-[#707070]">{siteConfig.header.availability.value}</span>
                    </div>

                    {/* Visible CTA */}
                    <div className="flex justify-end pointer-events-auto">
                        <ContactButtonFramer
                            href={siteConfig.header.cta.href}
                            label={siteConfig.header.cta.label}
                            emoji="🤙"
                        />
                    </div>
                </div>
            </motion.header>
        </>
    );
}
