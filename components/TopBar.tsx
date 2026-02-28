"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { Button } from "./Button";
import { ContactButtonFramer } from "./ContactButton";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { SkipLink } from "./SkipLink";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export function TopBar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest: number) => {
        if (latest <= 50) {
            setIsVisible(true);
        } else if (latest > lastScrollY) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(latest);
    });

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
                    <div
                        className="md:hidden flex flex-col leading-none gap-2"
                    >
                        <span className="text-[13px] font-semibold tracking-tight">System-First</span>
                        <span className="text-[13px] font-semibold tracking-tight">Designer</span>
                    </div>

                    {/* DESKTOP COLUMNS */}
                    <div
                        className="hidden md:flex flex-col leading-none gap-2"
                    >
                        <span className="text-[13px] font-semibold">{siteConfig.header.location.label}</span>
                        <span className="text-[13px] text-[#707070]">{siteConfig.header.location.value}</span>
                    </div>

                    <div
                        className="hidden md:flex flex-col leading-none gap-2"
                    >
                        <span className="text-[13px] font-semibold">{siteConfig.header.currentRole.label}</span>
                        <span className="text-[13px] text-[#707070]">{siteConfig.header.currentRole.value}</span>
                    </div>

                    <div
                        className="hidden md:flex flex-col leading-none gap-2"
                    >
                        <span className="text-[13px] font-semibold">{siteConfig.header.availability.label}</span>
                        <span className="text-[13px] text-[#707070]">{siteConfig.header.availability.value}</span>
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
                        <span className="text-[13px] font-semibold tracking-tight">System-First</span>
                        <span className="text-[13px] font-semibold tracking-tight">Designer</span>
                    </div>

                    <div className="hidden md:flex flex-col opacity-0 leading-none gap-2">
                        <span className="text-[13px] font-semibold">{siteConfig.header.location.label}</span>
                        <span className="text-[13px] text-[#707070]">{siteConfig.header.location.value}</span>
                    </div>
                    <div className="hidden md:flex flex-col opacity-0 leading-none gap-2">
                        <span className="text-[13px] font-semibold">{siteConfig.header.currentRole.label}</span>
                        <span className="text-[13px] text-[#707070]">{siteConfig.header.currentRole.value}</span>
                    </div>
                    <div className="hidden md:flex flex-col opacity-0 leading-none gap-2">
                        <span className="text-[13px] font-semibold">{siteConfig.header.availability.label}</span>
                        <span className="text-[13px] text-[#707070]">{siteConfig.header.availability.value}</span>
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
