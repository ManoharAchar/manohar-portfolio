"use client";

import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Button } from "./Button";
import { ContactButtonFramer } from "./ContactButton";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { SkipLink } from "./SkipLink";
import { AnimatePresence, motion } from "framer-motion";

export function TopBar() {
    // Static transparent bar, no scroll state needed for transparency
    const [isVisible, setIsVisible] = useState(true);
    const footerVisible = useRef(false);
    const wibVisible = useRef(false);
    const reflectionVisible = useRef(false);
    const proxiesVisible = useRef(false);

    useEffect(() => {
        const footer = document.getElementById('site-footer');
        const whatIBuilt = document.getElementById('what-i-built');
        const reflection = document.getElementById('reflection');
        const proxies = document.getElementById('proxies');

        const updateVisibility = () => {
            // Hide if Footer is visible
            // OR if WhatIBuilt is visible AND neither Reflection NOR Proxies is visible
            const shouldHide = footerVisible.current || (wibVisible.current && !reflectionVisible.current && !proxiesVisible.current);
            setIsVisible(!shouldHide);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === footer) {
                    footerVisible.current = entry.isIntersecting;
                }
                if (entry.target === whatIBuilt) {
                    wibVisible.current = entry.isIntersecting;
                }
                if (entry.target === reflection) {
                    reflectionVisible.current = entry.isIntersecting;
                }
                if (entry.target === proxies) {
                    proxiesVisible.current = entry.isIntersecting;
                }
            });
            updateVisibility();
        }, {
            threshold: 0.1 // Trigger when 10% is visible
        });

        if (footer) observer.observe(footer);
        if (whatIBuilt) observer.observe(whatIBuilt);
        if (reflection) observer.observe(reflection);
        if (proxies) observer.observe(proxies);

        return () => observer.disconnect();
    }, []);

    const variants = {
        visible: { y: "0%" },
        hidden: { y: "-100%" }
    };

    const transition = { duration: 0.5, ease: "easeInOut" };

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
                    <div className="md:hidden flex flex-col leading-none gap-2">
                        <span className="text-[16px] font-semibold tracking-tight">Open to</span>
                        <span className="text-[16px] font-semibold tracking-tight">Roles</span>
                    </div>

                    {/* DESKTOP COLUMNS */}
                    <div className="hidden md:flex flex-col leading-none gap-2">
                        <span className="text-[16px] font-semibold">{siteConfig.header.location.label}</span>
                        <span className="text-[16px] text-[#707070]">{siteConfig.header.location.value}</span>
                    </div>

                    <div className="hidden md:flex flex-col leading-none gap-2">
                        <span className="text-[16px] font-semibold">{siteConfig.header.currentRole.label}</span>
                        <span className="text-[16px] text-[#707070]">{siteConfig.header.currentRole.value}</span>
                    </div>

                    <div className="hidden md:flex flex-col leading-none gap-2">
                        <span className="text-[16px] font-semibold">{siteConfig.header.availability.label}</span>
                        <span className="text-[16px] text-[#707070]">{siteConfig.header.availability.value}</span>
                    </div>

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
                        <span className="text-[16px] font-semibold tracking-tight">Open to</span>
                        <span className="text-[16px] font-semibold tracking-tight">Roles</span>
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
