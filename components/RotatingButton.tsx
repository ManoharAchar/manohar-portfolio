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
}

export function RotatingButton({
    href,
    className,
    topText = "CLICK HERE",
    bottomText = "TO DIVE DEEPER"
}: RotatingButtonProps) {
    return (
        <Link href={href} scroll={true} className={cn("group relative block w-24 h-24 md:w-32 md:h-32", className)}>
            {/* Main Circle Container */}
            <div className="absolute inset-0 rounded-full bg-[#A34F35] flex items-center justify-center border border-[#A34F35]/20 overflow-hidden transition-transform duration-300 hover:scale-110">

                {/* Rotating Container (Text + Arrow) */}
                <div className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] group-hover:[animation-play-state:paused]">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                            {/* Path going Clockwise for Top Text - Radius 34 (moved inward to match bottom) */}
                            <path id="pathTop" d="M 16, 50 a 34,34 0 1,1 68,0" fill="none" />
                            {/* Path going Counter-Clockwise for Bottom Text - Radius 40 */}
                            <path id="pathBottom" d="M 10, 50 a 40,40 0 0,0 80,0" fill="none" />
                        </defs>
                        <text fontSize="12.5" fontWeight="bold" fill="white" letterSpacing="1" style={{ fontFamily: 'var(--font-archivo)' }} dominantBaseline="middle">
                            <textPath href="#pathTop" startOffset="50%" textAnchor="middle">
                                {topText}
                            </textPath>
                        </text>
                        <text fontSize="12.5" fontWeight="bold" fill="white" letterSpacing="1" style={{ fontFamily: 'var(--font-archivo)' }} dominantBaseline="middle">
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
