import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
}

export function Section({
    className,
    as: Component = "section",
    children,
    ...props
}: SectionProps) {
    return (
        <Component
            className={cn(
                "w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}
