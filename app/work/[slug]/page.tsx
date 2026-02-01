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
                switch (section.type) {
                    case 'hero':
                        return <CsHero key={index} {...section} />;

                    case 'tldr':
                        return <CsTLDR key={index} {...section} />;

                    case 'problem-context':
                        return <CsProblemContext key={index} {...section} />;

                    case 'approach':
                        return <CsApproach key={index} {...section} />;

                    case 'key-decisions':
                        return <CsKeyDecisions key={index} {...section} />;

                    case 'what-i-shipped':
                        return <CsWhatIShipped key={index} {...section} />;

                    case 'proxies':
                        return <CsProxies key={index} {...section} />;

                    case 'measurement-plan':
                        return <CsMeasurementPlan key={index} {...section} />;

                    case 'constraints':
                        return <CsConstraints key={index} {...section} />;

                    case 'challenges':
                        return <CsChallenges key={index} {...section} />;

                    case 'collaboration':
                        return <CsCollaboration key={index} {...section} />;

                    case 'iteration-roadmap':
                        return <CsIterationRoadmap key={index} {...section} />;

                    case 'iteration-gallery':
                        return <CsIterationGallery key={index} {...section} />;

                    case 'reflection':
                        return <CsReflection key={index} {...section} />;

                    case 'design-execution':
                        return <CsDesignExecution key={index} {...section} />;

                    case 'testing-results':
                        return <CsTestingResults key={index} {...section} />;

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
