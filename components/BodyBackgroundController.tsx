"use client";

import { useEffect } from "react";

interface BodyBackgroundControllerProps {
    color: string;
}

export function BodyBackgroundController({ color }: BodyBackgroundControllerProps) {
    useEffect(() => {
        // Save original color to revert later
        const originalColor = document.body.style.backgroundColor;

        // Set target color
        document.body.style.backgroundColor = color;

        // Revert on unmount
        return () => {
            document.body.style.backgroundColor = originalColor;
        };
    }, [color]);

    return null;
}
