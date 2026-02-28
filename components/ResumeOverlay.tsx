"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { useEffect } from "react";

interface ResumeOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ResumeOverlay({ isOpen, onClose }: ResumeOverlayProps) {
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-start overflow-y-auto bg-white/40 backdrop-blur-xl p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    data-lenis-prevent="true"
                >
                    {/* Close Overlay by clicking background */}
                    <div className="fixed inset-0 z-0" onClick={onClose} />

                    {/* Resume Images & Controls Container */}
                    <div 
                        className="relative w-full max-w-[850px] mx-auto flex flex-col gap-8 mt-24 md:mt-32 pb-12 z-10 cursor-auto px-4 lg:px-0" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Controls (matching the mockup style, aligned to top edge of resume) */}
                        <div className="absolute -top-16 right-4 lg:top-0 lg:-right-[120px] lg:flex-col xl:flex-row xl:-top-16 xl:right-0 flex items-center gap-4 z-[110]">
                            <motion.a
                                href="/resume/Manohar Achar - Resume .pdf"
                                download
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-black shadow-2xl hover:bg-white/60"
                                aria-label="Download Resume"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Download strokeWidth={2.5} className="w-6 h-6" />
                            </motion.a>
                            <motion.button
                                onClick={onClose}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-black shadow-2xl hover:bg-white/60"
                                aria-label="Close Resume"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <X strokeWidth={2.5} className="w-6 h-6" />
                            </motion.button>
                        </div>

                        <motion.img 
                            src="/resume/Manohar Achar - Resume page 1.jpg" 
                            alt="Resume Page 1" 
                            className="w-full h-auto rounded-xl shadow-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
                        />
                        <motion.img 
                            src="/resume/Manohar Achar - Resume page 2.jpg" 
                            alt="Resume Page 2" 
                            className="w-full h-auto rounded-xl shadow-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
