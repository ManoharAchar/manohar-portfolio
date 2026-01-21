import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <Section className="text-center">
                <h1 className="text-9xl font-bold text-neutral-100 dark:text-neutral-900 select-none">404</h1>
                <h2 className="text-2xl font-semibold -mt-12 mb-4 relative z-10">Page not found</h2>
                <p className="text-muted-foreground mb-8 text-balance max-w-sm mx-auto relative z-10">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <div className="relative z-10">
                    <Button href="/">Back to Home</Button>
                </div>
            </Section>
        </div>
    );
}
