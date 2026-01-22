"use client";

import { CaseStudySection } from "@/content/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

type ProxiesProps = Extract<CaseStudySection, { type: 'proxies' }>;

export function CsProxies({ title, description, items }: ProxiesProps) {
    return (
        <section className="bg-[#F6F4EF] text-[#141414] py-24 md:py-32">
            <div className="w-[90%] md:w-[85%] max-w-[1440px] mx-auto">
                <div className="mb-8 md:max-w-4xl">
                    <Reveal>
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {title}
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="text-2xl md:text-[32px] md:leading-[44px] text-[#141414]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
                            {description}
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Content Container - Full width on mobile for carousel */}
            <div className="w-full md:w-[85%] max-w-[1440px] mx-auto">
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-4 md:gap-8 px-[5%] md:px-0 no-scrollbar snap-x snap-mandatory">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex flex-col justify-center h-auto md:h-full min-h-[280px] gap-6 p-8 md:p-12 rounded-[32px] snap-center shrink-0 w-[62vw] md:w-auto bg-[#DDD6CC]"
                            )}
                        >
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold leading-tight">
                                    {item.id} — {item.title}
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {item.points.map((point, i) => (
                                    <li key={i} className="flex items-start text-base md:text-lg leading-relaxed text-neutral-800">
                                        <span className="mr-3 font-bold text-black">-</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
