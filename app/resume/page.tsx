import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { siteConfig } from "@/content/site";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume",
};

export default function ResumePage() {
    return (
        <div className="pt-32 min-h-[60vh] flex flex-col items-center justify-center">
            <Section className="text-center">
                <h1 className="text-3xl font-bold mb-6">Resume</h1>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Thank you for your interest. You can view or download my resume below.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Logic: if resumeUrl is a file path, we download. If external link, new tab. */}
                    <Button href="/resume.pdf" target="_blank">
                        Download PDF
                    </Button>
                    <Button variant="secondary" href={siteConfig.meta.links.linkedin}>
                        View LinkedIn
                    </Button>
                </div>
            </Section>
        </div>
    );
}
