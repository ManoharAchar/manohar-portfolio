import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: "h1" | "h2" | "h3" | "overline";
    as?: React.ElementType;
}

export function Heading({ level = "h1", as, className, children, ...props }: HeadingProps) {
    // Map level to semantic HTML elements unless overridden
    const defaultAs = level === "overline" ? "span" : level;
    const Component = as || defaultAs;

    const styles = {
        h1: "text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-semibold font-sans",
        h2: "text-3xl md:text-4xl tracking-tight leading-tight font-medium font-sans",
        h3: "text-xl md:text-2xl tracking-normal leading-snug font-medium font-sans",
        overline: "text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-semibold font-sans",
    };

    return (
        <Component className={cn(styles[level], className)} {...props}>
            {children}
        </Component>
    );
}
