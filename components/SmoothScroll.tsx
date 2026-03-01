"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useLoading } from "@/context/LoadingContext";
import { usePathname } from "next/navigation";

export function SmoothScroll() {
    const pathname = usePathname();
    const { isLoading } = useLoading();
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

    // Expose Lenis instance via custom event for decoupled components
    useEffect(() => {
        const handleScrollTo = (e: CustomEvent<{ target: string | number | HTMLElement, options?: Record<string, unknown> }>) => {
            if (lenisRef.current && e.detail.target) {
                lenisRef.current.scrollTo(e.detail.target, e.detail.options || { immediate: false });
            }
        };

        window.addEventListener('lenis-scroll-to', handleScrollTo as EventListener);
        return () => window.removeEventListener('lenis-scroll-to', handleScrollTo as EventListener);
    }, []);

    // Handle scroll on route change
    useEffect(() => {
        if (!lenisRef.current) return;

        // If loading, do nothing (Preloader acts as curtain)
        // We will handle scroll when isLoading becomes false if needed, 
        // OR we can just scroll immediately behind the scene.
        // But user prefers "page is ready".
        if (isLoading) return;

        if (window.location.hash) {
            const hash = window.location.hash;
            // Delay ensuring DOM and Layout are stable.
            // 100ms is usually enough for React state updates + microtasks.
            setTimeout(() => {
                lenisRef.current?.scrollTo(hash, { immediate: true });
            }, 500); // Increased delay to 500ms to be safe against initial render jitters
        } else {
            // Otherwise force scroll to top
            lenisRef.current.scrollTo(0, { immediate: true });
            window.scrollTo(0, 0);
        }
    }, [pathname, isLoading]);

    return null;
}
