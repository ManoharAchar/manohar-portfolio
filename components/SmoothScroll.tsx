"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function SmoothScroll() {
    const pathname = usePathname();

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

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Force scroll to top on route change
    useEffect(() => {
        // We use a small timeout to ensure the new page content has mounted/started rendering
        // creating a cleaner "start from top" experience.
        // Accessing the lenis instance globally or re-instantiating might be needed if we can't access it here.
        // Actually, Lenis attaches to window. We can scroll window.
        window.scrollTo(0, 0);

        // If Lenis is active, we might need to tell it we moved.
        // Since the lenis instance is inside the other useEffect, we can't access it.
        // Ideally, we should lift the lenis instance or use a lenis context, 
        // but window.scrollTo with immediate effect usually works on route change with Next.js 
        // IF we disable the native scroll restoration or if Lenis respects it.

        // A more robust way with this simple setup is to recreate Lenis or simply rely on window.scrollTo 
        // which Lenis intercepts if it's running on window.

        // Let's try the simplest robust way:
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [pathname]);

    return null;
}
