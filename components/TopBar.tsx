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
    // Case Study Refs
    const footerVisible = useRef(false);
    const wibVisible = useRef(false);
    const reflectionVisible = useRef(false);
    const proxiesVisible = useRef(false);

    // Home Page Refs
    const workVisible = useRef(false);
    const toolsVisible = useRef(false);

    useEffect(() => {
        const footer = document.getElementById('site-footer');
        const whatIBuilt = document.getElementById('what-i-built');
        const reflection = document.getElementById('reflection');
        const proxies = document.getElementById('proxies');

        // Home Page Sections
        const work = document.getElementById('work');
        const tools = document.getElementById('tool-stack');

        const updateVisibility = () => {
            // Hide if Footer is visible
            // OR if strictly inside Case Study sections (WhatIBuilt active etc)
            // OR if strictly inside Home Page immersive sections (Work or Tool Stack)
            const caseStudyHide = (wibVisible.current && !reflectionVisible.current && !proxiesVisible.current);
            const homePageHide = workVisible.current || toolsVisible.current;

            const shouldHide = footerVisible.current || caseStudyHide || homePageHide;
            setIsVisible(!shouldHide);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === footer) footerVisible.current = entry.isIntersecting;
                if (entry.target === whatIBuilt) wibVisible.current = entry.isIntersecting;
                if (entry.target === reflection) reflectionVisible.current = entry.isIntersecting;
                if (entry.target === proxies) proxiesVisible.current = entry.isIntersecting;

                if (entry.target === work) workVisible.current = entry.isIntersecting;
                if (entry.target === tools) toolsVisible.current = entry.isIntersecting;
            });
            updateVisibility();
        }, {
            threshold: 0.1 // Trigger when 10% is visible
        });

        if (footer) observer.observe(footer);
        if (whatIBuilt) observer.observe(whatIBuilt);
        if (reflection) observer.observe(reflection);
        if (proxies) observer.observe(proxies);

        if (work) observer.observe(work);
        if (tools) observer.observe(tools);

        return () => observer.disconnect();
    }, []);

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
