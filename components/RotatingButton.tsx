"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RotatingButtonProps {
    href: string;
    className?: string;
    topText?: string;
    bottomText?: string;
    color?: string;
}

export function RotatingButton({
    href,
    className,
    topText = "CLICK HERE",
    bottomText = "TO DIVE DEEPER",
    color = "#A34F35"
}: RotatingButtonProps) {
    return (
        <Link href={href} scroll={true} className={cn("group relative block w-24 h-24 md:w-32 md:h-32", className)}>
            {/* Main Circle Container */}
            <div
                className="absolute inset-0 rounded-full flex items-center justify-center border overflow-hidden transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: color, borderColor: `${color}33` }} // 33 is approx 20% opacity in hex
            >

                {/* Rotating Container (Text + Arrow) */}
                <div className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] group-hover:[animation-play-state:paused]">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                            {/* Path going Clockwise for Top Text - Radius 37 */}
                            <path id="pathTop" d="M 13, 50 a 37,37 0 1,1 74,0" fill="none" />
                            {/* Path going Counter-Clockwise for Bottom Text - Radius 37 */}
                            <path id="pathBottom" d="M 13, 50 a 37,37 0 0,0 74,0" fill="none" />
                        </defs>
                        <text fontSize="11.25" fontWeight="bold" fill="white" letterSpacing="1" style={{ fontFamily: 'var(--font-archivo)' }} dominantBaseline="middle">
                            <textPath href="#pathTop" startOffset="50%" textAnchor="middle">
                                {topText}
                            </textPath>
                        </text>
                        <text fontSize="11.25" fontWeight="bold" fill="white" letterSpacing="1" style={{ fontFamily: 'var(--font-archivo)' }} dominantBaseline="middle">
                            <textPath href="#pathBottom" startOffset="50%" textAnchor="middle">
                                {bottomText}
                            </textPath>
                        </text>
                    </svg>

                    {/* Arrow rotating with the text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
