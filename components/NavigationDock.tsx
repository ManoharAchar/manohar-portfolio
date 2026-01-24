"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { RollingText } from "@/components/RollingText";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function NavigationDock() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            // If footer is intersecting (visible), hide the dock
            setIsVisible(!entry.isIntersecting);
        }, {
            threshold: 0.1 // Trigger when 10% of footer is visible
        });

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed bottom-2 md:bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
            <motion.nav
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{
                    y: isVisible ? 0 : 150,
                    opacity: isVisible ? 1 : 0,
                    scale: 0.8
                }}
                whileHover={{ scale: 1 }}
                transition={{
                    y: { duration: 0.5, ease: "easeInOut" },
                    opacity: { duration: 0.5, ease: "easeInOut" },
                    scale: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="pointer-events-auto flex items-center gap-6 pl-[12px] pr-[32px] py-[12px] rounded-full bg-[#141414] border border-white/5 shadow-2xl origin-bottom"
            >
                {/* Avatar Placeholder - User to replace src */}
                <div className="relative w-[72px] h-[64px] overflow-hidden rounded-full border border-white/10 shrink-0">
                    <img
                        src="/images/manohar-nav.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    {[
                        { label: "HOME", href: "/" },
                        { label: "WORK", href: "/#work" },
                        { label: "CAVE", href: "/#cave" } // Assuming generic link for now
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-white text-sm font-bold tracking-wide transition-colors"
                        >
                            <RollingText text={item.label} />
                        </Link>
                    ))}
                </div>
            </motion.nav>
        </div>
    );
}
