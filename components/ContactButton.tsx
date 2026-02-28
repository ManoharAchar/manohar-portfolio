"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { RollingText } from "./RollingText";

interface ContactButtonProps {
    href: string;
    label: string;
    emoji?: string;
    className?: string;
}

export function ContactButtonFramer({ href, label, emoji = "🤙", className }: ContactButtonProps) {
    return (
        <Link href={href} target="_blank" rel="noopener noreferrer" className={cn("relative inline-block group", className)}>
            <motion.div
                className="relative z-10 flex items-center justify-center h-8 px-3 md:h-9 md:px-4 xl:h-12 xl:px-6 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-black text-xs md:text-[13px] xl:text-base font-semibold shadow-2xl transition-colors duration-300 group-hover:bg-white/60"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <RollingText text={label} />
            </motion.div>

            {/* Emoji Circle */}
            <motion.div
                className="absolute top-0 right-0 z-0 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 xl:w-12 xl:h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-base md:text-lg xl:text-xl text-black shadow-2xl group-hover:bg-white/60 transition-colors duration-300"
                initial={{ x: 0, rotate: 0, opacity: 0 }}
                whileHover={{
                    x: -42, // Adjusted distance for smaller circle
                    rotate: -360, // Rolls counter-clockwise
                    opacity: 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {emoji}
            </motion.div>
        </Link>
    );
}
