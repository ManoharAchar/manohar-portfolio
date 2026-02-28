"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { RollingText } from "@/components/RollingText";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

export function NavigationDock() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [defaultScale, setDefaultScale] = useState(0.8);
    const [hoverScale, setHoverScale] = useState(1);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest: number) => {
        const previous = scrollY.getPrevious() ?? 0;
        
        // Ignore micro-bounces from smooth scrolling libraries
        if (Math.abs(latest - previous) < 10 && latest > 50) return;

        if (latest <= 50) {
            setIsVisible(true);
        } else if (latest > previous) {
            setIsVisible(false); // Hide on scroll down
        } else {
            setIsVisible(true); // Show on scroll up
        }
    });

    useEffect(() => {
        const updateScales = () => {
            const isMonitor = window.innerWidth >= 1440; // Desktop vs Monitor cutoff
            setDefaultScale(isMonitor ? 0.8 : 0.72); // 10% smaller default on desktop
            setHoverScale(isMonitor ? 1 : 0.9); // 10% smaller hover on desktop
        };

        updateScales();
        window.addEventListener('resize', updateScales);

        return () => {
            window.removeEventListener('resize', updateScales);
        };
    }, []);

    useEffect(() => {
        setIsVisible(true);
    }, [pathname]);

    return (
        <div className="fixed bottom-2 md:bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
            <motion.nav
                initial={{ y: 20, opacity: 0, scale: defaultScale }}
                animate={{
                    y: isVisible ? 0 : 150,
                    opacity: isVisible ? 1 : 0,
                    scale: defaultScale
                }}
                whileHover={{ scale: hoverScale }}
                transition={{
                    y: { duration: 0.5, ease: "easeInOut" },
                    opacity: { duration: 0.5, ease: "easeInOut" },
                    scale: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="pointer-events-auto flex items-center gap-6 pl-[12px] pr-[32px] py-[12px] rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl origin-bottom transition-colors duration-500 hover:bg-white/60"
            >
                {/* Avatar Placeholder - User to replace src */}
                <div className="relative w-[72px] h-[64px] overflow-hidden rounded-full border border-white/40 shrink-0">
                    <img
                        src="/images/manohar-nav.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    {[
                        { label: "home", href: "/" },
                        { label: "work", href: "/work" },
                        { label: "about", href: "/#about" }
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
                            className="text-black text-sm font-bold tracking-wide transition-colors lowercase font-sans"
                        >
                            <RollingText text={item.label} />
                        </Link>
                    ))}
                </div>
            </motion.nav>
        </div>
    );
}
