"use client";

import { motion } from "framer-motion";
import { CaseStudySection } from "@/content/site";
import { Reveal } from "@/components/Reveal";

type ApproachProps = Extract<CaseStudySection, { type: 'approach' }>;

export function CsApproach({ title, image1, image2, steps }: ApproachProps) {
    return (
        <section className="bg-[#0A0A0A] text-white pt-0 pb-24 md:pt-0 md:pb-32">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">

                {/* Header */}
                <Reveal>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-8 block" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                        {title}
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Column: Images (Spans 8 cols) */}
                    {/* Mobile: Flex Column, Auto Height. Desktop: Grid 2-col, Fixed Height. */}
                    <div className="md:col-span-8 flex flex-col md:grid md:grid-cols-2 gap-4 h-auto md:h-[600px]">
                        {/* High Fidelity (Now First/Left) */}
                        <div className="bg-[#1A1A1A] rounded-[24px] flex items-center justify-center border border-white/5 p-8 relative overflow-hidden group aspect-[16/11] md:aspect-auto md:h-full">
                            {/* Placeholder visual */}
                            <div className="text-neutral-500 text-center">
                                <span className="block mb-2 text-sm uppercase tracking-widest">High Fidelity</span>
                                <span className="text-xs opacity-50">Image Placeholder</span>
                            </div>
                            <img src={image2} alt="High fidelity design" className="absolute inset-0 w-full h-full object-cover" />
                        </div>

                        {/* Low Fidelity (Now Second/Right) */}
                        <div className="bg-[#1A1A1A] rounded-[24px] flex items-center justify-center border border-white/5 p-8 relative overflow-hidden group aspect-[16/11] md:aspect-auto md:h-full">
                            {/* Placeholder visual */}
                            <div className="text-neutral-500 text-center">
                                <span className="block mb-2 text-sm uppercase tracking-widest">Low Fidelity</span>
                                <span className="text-xs opacity-50">Image Placeholder</span>
                            </div>
                            {/* Actual Image Tag */}
                            <img src={image1} alt="Low fidelity wireframes" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Right Column: Steps List (Spans 4 cols) */}
                    {/* Mobile: 2-Column Grid. Desktop: Vertical Flex Stack. */}
                    <div className="md:col-span-4 grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:flex-col md:justify-center md:space-y-10 md:gap-0 md:mt-0">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-1" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                    {step.title}
                                </h3>
                                <p className="text-neutral-400 text-sm md:text-base leading-snug md:leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
