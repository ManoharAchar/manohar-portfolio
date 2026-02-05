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
                className="relative z-10 flex items-center justify-center h-12 px-6 rounded-full bg-neutral-900 text-white font-medium border border-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <RollingText text={label} />
            </motion.div>

            {/* Emoji Circle */}
            <motion.div
                className="absolute top-0 right-0 z-0 flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 text-xl text-white"
                initial={{ x: 0, rotate: 0, opacity: 0 }}
                whileHover={{
                    x: -56, // Moves left by approx 100% + gap
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
