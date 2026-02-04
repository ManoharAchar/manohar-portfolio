import { siteConfig } from "@/content/site";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CsHero } from "@/components/case-study/CsHero";
import { CsTLDR } from "@/components/case-study/CsTLDR";
import { BodyBackgroundController } from "@/components/BodyBackgroundController";
import { CsProblemContext } from "@/components/case-study/CsProblemContext";
import { CsConstraints } from "@/components/case-study/CsConstraints";
import { CsApproach } from "@/components/case-study/CsApproach";
import { CsKeyDecisions } from "@/components/case-study/CsKeyDecisions";
import { CsWhatIShipped } from "@/components/case-study/CsWhatIShipped";
import { CsProxies } from "@/components/case-study/CsProxies";
import { CsMeasurementPlan } from "@/components/case-study/CsMeasurementPlan";
import { CsChallenges } from "@/components/case-study/CsChallenges";
import { CsCollaboration } from "@/components/case-study/CsCollaboration";
import { CsIterationRoadmap } from "@/components/case-study/CsIterationRoadmap";
import { CsIterationGallery } from "@/components/case-study/CsIterationGallery";
import { CsReflection } from '@/components/case-study/CsReflection';
import { CsDesignExecution } from "@/components/case-study/CsDesignExecution";
import { CsTestingResults } from "@/components/case-study/CsTestingResults";


interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return siteConfig.projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = siteConfig.projects.find((p) => p.slug === slug);
    if (!project) return {};

    return {
        title: project.title,
        description: project.problem,
    };
}

export const viewport: Metadata = {
    themeColor: '#0A0A0A',
};

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const project = siteConfig.projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="w-full bg-[#0A0A0A] min-h-screen">
            {/* Force body background to black for overscroll handling */}
            <BodyBackgroundController color="#0A0A0A" />

            {/* 
                Modular Content Renderer 
                Iterates through the content array and renders the matching component for each section type.
            */}
            {project.content.map((section, index) => {
                // Determine if this section is the one immediately before "what-i-shipped"
                const nextSection = project.content[index + 1];
                const isPrevToWib = nextSection?.type === 'what-i-shipped';
                const dynamicId = isPrevToWib ? 'wib-prev' : undefined;

                // Helper to pass ID if supported - cast to any to avoid TS errors for components missing 'id' type
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const commonProps: any = { key: index, ...section, id: dynamicId };

                switch (section.type) {
                    case 'hero':
                        return <CsHero {...commonProps} />;

                    case 'tldr':
                        return <CsTLDR {...commonProps} />;

                    case 'problem-context':
                        return <CsProblemContext {...commonProps} />;

                    case 'approach':
                        return <CsApproach {...commonProps} />;

                    case 'key-decisions':
                        // @ts-ignore - Component needs update to accept ID
                        return <CsKeyDecisions {...commonProps} />;

                    case 'what-i-shipped':
                        return <CsWhatIShipped {...commonProps} />;

                    case 'proxies':
                        return <CsProxies {...commonProps} />;

                    case 'measurement-plan':
                        return <CsMeasurementPlan {...commonProps} />;

                    case 'constraints':
                        return <CsConstraints {...commonProps} />;

                    case 'challenges':
                        return <CsChallenges {...commonProps} />;

                    case 'collaboration':
                        return <CsCollaboration {...commonProps} />;

                    case 'iteration-roadmap':
                        return <CsIterationRoadmap {...commonProps} />;

                    case 'iteration-gallery':
                        return <CsIterationGallery {...commonProps} />;

                    case 'reflection':
                        return <CsReflection {...commonProps} />;

                    case 'design-execution':
                        // @ts-ignore - Component needs update to accept ID
                        return <CsDesignExecution {...commonProps} />;

                    case 'testing-results':
                        return <CsTestingResults {...commonProps} />;

                    // Future sections will be added here
                    case 'text':
                        return <div key={index} className="text-white p-10">Text Section (Coming Soon)</div>;

                    default:
                        return null;
                }
            })}
        </main>
    );
}
