"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ArrowDownRight } from "lucide-react";

export function GetInTouchSection() {
    const [copied, setCopied] = useState(false);
    const email = "manohar.create@gmail.com";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <section className="w-full bg-[#F6F4EF] py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full max-w-3xl mx-auto flex flex-col relative px-6 text-[#1C1C1C]">
                
                {/* Header Text */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="self-start text-2xl md:text-3xl lg:text-4xl leading-tight font-medium"
                    style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                >
                    <p>I&apos;d love to solve your problem</p>
                    <p>Get in touch with me!</p>
                </motion.div>

                {/* Arrow */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="self-center my-6 md:my-10 ml-12 md:ml-32"
                >
                    <ArrowDownRight strokeWidth={2} className="w-10 h-10 md:w-16 md:h-16 text-[#1C1C1C]" />
                </motion.div>

                {/* Email with Copy */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="self-end mt-2"
                >
                    <button 
                        onClick={handleCopy}
                        className="group flex items-center gap-3 text-lg md:text-xl transition-all hover:text-[#B55A3A]"
                        style={{ fontFamily: 'var(--font-work-sans), sans-serif' }}
                        aria-label="Copy email address"
                    >
                        <span>{email}</span>
                        <div className="p-1.5 md:p-2 rounded-md bg-transparent group-hover:bg-black/5 transition-colors">
                            {copied ? (
                                <Check className="w-5 h-5 text-green-600" />
                            ) : (
                                <Copy className="w-5 h-5" />
                            )}
                        </div>
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
