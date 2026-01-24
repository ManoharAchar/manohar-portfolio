"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function SmoothScroll() {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5, // Higher duration = "Denser" / Heavier feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard ease-out
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Force scroll to top on route change
    useEffect(() => {
        if (lenisRef.current) {
            // Immediate scroll to top
            lenisRef.current.scrollTo(0, { immediate: true });

            // Safety fallback: scroll native window closely after
            // This handles cases where Lenis might be momentarily detached or fighting
            window.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}
