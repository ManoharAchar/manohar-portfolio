import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    target?: React.HTMLAttributeAnchorTarget; // Add target prop explicitly or intersect types
    variant?: "primary" | "secondary" | "link";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
        const variants = {
            primary:
                "bg-primary text-primary-foreground hover:bg-neutral-800 hover:-translate-y-px transition-all duration-200 border border-transparent shadow-sm",
            secondary:
                "bg-secondary text-secondary-foreground hover:bg-neutral-200 hover:-translate-y-px transition-all duration-200 border border-transparent",
            link: "text-primary hover:underline underline-offset-4 bg-transparent p-0",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
        };

        // If variant is link, ignore size classes
        const sizeClasses = variant === "link" ? "" : sizes[size];

        const classes = cn(
            "inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            variants[variant],
            sizeClasses,
            className
        );

        if (href) {
            return (
                <Link href={href} className={classes} target={props.target} aria-label={props["aria-label"]}>
                    {props.children}
                </Link>
            );
        }

        return <button className={classes} ref={ref as React.Ref<HTMLButtonElement>} {...props} />;
    }
);
Button.displayName = "Button";

export { Button };
