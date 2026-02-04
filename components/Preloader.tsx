import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LotusIcon } from "./icons/LotusIcon";
import { useLoading } from "@/context/LoadingContext";

export function Preloader() {
    const { isLoading, setIsLoading } = useLoading();
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Counter Logic
        // We want a non-linear counter that "hangs" a bit at 80-90% to simulate real loading
        // then snaps to 100 once everything is "ready".

        let start = 0;
        const totalDuration = 2000; // 2 seconds total minimum load time
        const intervalTime = 20; // Update every 20ms
        const steps = totalDuration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps; // 0 to 1

            // Ease out cubic: starts fast, slows down
            // const easedProgress = 1 - Math.pow(1 - progress, 3); 

            // Simpler Linear for now, but let's cap it at 99 until we clear it
            let nextCount = Math.min(Math.round(progress * 100), 99);

            if (currentStep >= steps) {
                // Time's up, wait for actual load signal or just finish?
                // For a portfolio, "fake" loading that ensures minimum brand time is standard.
                // We'll trust that 2s is enough for our eager assets to download.

                // If we wanted real loading, we'd check document.readyState
                if (document.readyState === 'complete') {
                    clearInterval(timer);
                    setCount(100);
                    // Slight delay before lifting curtain
                    setTimeout(() => setIsLoading(false), 500);
                } else {
                    // Wait a bit more
                    window.onload = () => {
                        clearInterval(timer);
                        setCount(100);
                        setTimeout(() => setIsLoading(false), 500);
                    }
                }
            } else {
                setCount(nextCount);
            }
        }, intervalTime);

        // Fallback safety to force close after 4s (if window.onload hangs)
        const safetyOverride = setTimeout(() => {
            clearInterval(timer);
            setCount(100);
            setIsLoading(false);
        }, 4000);

        return () => {
            clearInterval(timer);
            clearTimeout(safetyOverride);
        }

    }, [setIsLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center text-[#F6F4EF]"
                    initial={{ y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Curtain effect
                    }}
                >
                    {/* Lotus Icon */}
                    <div className="mb-8">
                        <LotusIcon className="w-24 h-24 md:w-32 md:h-32 text-[#F6F4EF]" />
                    </div>

                    {/* Counter */}
                    <div className="overflow-hidden h-12 md:h-16 flex items-center justify-center">
                        <motion.span
                            className="text-4xl md:text-6xl font-bold tracking-tighter"
                            style={{ fontFamily: 'Clash Display, sans-serif' }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            {count}%
                        </motion.span>
                    </div>

                    {/* Brand Label (Optional) */}
                    <motion.div
                        className="absolute bottom-12 text-sm uppercase tracking-widest opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5, transition: { delay: 0.5 } }}
                    >
                        Manohar Achar
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
