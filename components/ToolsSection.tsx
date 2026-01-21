"use client";

export function ToolsSection() {
    return (
        <section className="relative w-full py-16 md:py-24 bg-[#F6F4EF] overflow-hidden">
            {/* Marquee Container */}
            <div className="relative w-full">
                {/* Scrolling wrapper - multiple copies for seamless loop */}
                <div className="flex animate-marquee">
                    {/* Render 4 copies to ensure always visible content during scroll */}
                    {[...Array(4)].map((_, index) => (
                        <img
                            key={index}
                            src="/images/tools-carousel.png"
                            alt="Tools"
                            className="h-16 md:h-20 w-auto max-w-none flex-shrink-0 mr-[30px] grayscale"
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-25%);
                    }
                }

                .animate-marquee {
                    animation: marquee 12s linear infinite;
                    display: flex;
                }
            `}</style>
        </section>
    );
}

