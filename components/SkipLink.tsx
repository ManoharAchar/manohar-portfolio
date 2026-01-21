import { cn } from "@/lib/utils";

export function SkipLink() {
    return (
        <a
            href="#main-content"
            className={cn(
                "fixed top-4 left-4 z-[100] -translate-y-[150%] rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm transition-transform focus:translate-y-0"
            )}
        >
            Skip to content
        </a>
    );
}
