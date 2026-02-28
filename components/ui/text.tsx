import React from "react";
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: "bodyLarge" | "bodyRegular" | "caption" | "ui";
    as?: React.ElementType;
}

export function Text({ variant = "bodyRegular", as, className, children, ...props }: TextProps) {
    // Default to paragraph for body text, span for smaller elements
    const defaultAs = (variant === "caption" || variant === "ui") ? "span" : "p";
    const Component = as || defaultAs;

    const styles = {
        bodyLarge: "text-lg md:text-xl tracking-normal leading-relaxed text-foreground/90 font-serif font-normal",
        bodyRegular: "text-base tracking-normal leading-relaxed text-foreground/80 font-serif font-normal",
        caption: "text-sm tracking-normal leading-normal font-sans font-normal text-muted-foreground",
        ui: "text-sm tracking-normal leading-normal font-sans font-medium",
    };

    return (
        <Component className={cn(styles[variant], className)} {...props}>
            {children}
        </Component>
    );
}
