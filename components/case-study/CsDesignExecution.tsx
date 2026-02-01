"use client";

import { CaseStudySection } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils"; // Added cn import

// Defined DesignExecutionItem type
type DesignExecutionItem = {
    title: string;
    description: string;
    image?: string;
};

// Updated DesignExecutionProps type
type DesignExecutionProps = {
    title: string;
    items: DesignExecutionItem[];
    // New props for variant
    variant?: 'dark' | 'light';
    intro?: string;
};

export function CsDesignExecution({ title, items, variant = 'dark', intro }: DesignExecutionProps) {
    const isLight = variant === 'light';

    return (
        <section className={cn(
            "py-24 md:py-32",
            isLight ? "bg-[#F6F4EF] text-[#0E0E0E]" : "bg-[#0A0A0A] text-white"
        )}>
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">
                {/* Header */}
                <Reveal>
                    <div className="mb-16">
                        <h2 className={cn(
                            "text-sm font-bold uppercase tracking-wider mb-8 block",
                            isLight ? "text-[#0E0E0E]" : "text-white"
                        )} style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {title}
                        </h2>
                        {/* Interactive Intro for Trust Section */}
                        {intro && (
                            <p className="text-2xl md:text-4xl font-medium leading-tight max-w-4xl" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                {intro}
                            </p>
                        )}
                    </div>
                </Reveal>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col h-full">
                            {/* Text Content Top */}
                            <div className="mb-8 md:min-h-[140px]">
                                <h3 className="text-2xl font-medium mb-4 leading-tight" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                                    {item.title}
                                </h3>
                                <p className={cn(
                                    "text-lg leading-relaxed",
                                    isLight ? "text-[#0E0E0E]/80" : "text-neutral-400"
                                )}>
                                    {item.description}
                                </p>
                            </div>

                            {/* Image / Placeholder Bottom */}
                            <div className={cn(
                                "mt-auto w-full aspect-square rounded-[24px] flex items-center justify-center relative overflow-hidden text-center p-8",
                                isLight ? "bg-white text-neutral-400" : "bg-white text-neutral-400"
                            )}>
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <span className="font-medium text-sm text-neutral-300">Place holder for<br />image</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
