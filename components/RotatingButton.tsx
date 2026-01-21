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
        <Link href={href} className={cn("group relative block w-24 h-24 md:w-32 md:h-32", className)}>
            {/* Main Circle Container */}
            <div className="absolute inset-0 rounded-full bg-[#A34F35] flex items-center justify-center border border-[#A34F35]/20 overflow-hidden transition-transform duration-300 hover:scale-110">

                {/* Rotating Container (Text + Arrow) */}
                <div className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] group-hover:[animation-play-state:paused]">
                    <svg viewBox="0 0 100 100" className="w-full h-full px-2">
                        <defs>
                            {/* Path going Clockwise for Top Text */}
                            <path id="pathTop" d="M 15, 50 a 35,35 0 1,1 70,0" fill="none" />
                            {/* Path going Counter-Clockwise for Bottom Text */}
                            <path id="pathBottom" d="M 15, 50 a 35,35 0 0,0 70,0" fill="none" />
                        </defs>
                        <text fontSize="10.5" fontWeight="bold" fill="white" letterSpacing="1" style={{ fontFamily: 'var(--font-archivo)' }} dominantBaseline="middle">
                            <textPath href="#pathTop" startOffset="50%" textAnchor="middle">
                                {topText}
                            </textPath>
                        </text>
                        <text fontSize="10.5" fontWeight="bold" fill="white" letterSpacing="1" style={{ fontFamily: 'var(--font-archivo)' }} dominantBaseline="middle">
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
