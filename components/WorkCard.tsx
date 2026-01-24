import Link from "next/link";
import { Project } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

interface WorkCardProps {
    project: Project;
}

export function WorkCard({ project }: WorkCardProps) {
    return (
        <Link
            href={`/work/${project.slug}`}
            className="group block relative rounded-2xl border border-neutral-200 bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800 p-6 sm:p-8 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-sm"
        >
            <div className="flex flex-col h-full justify-between gap-8">
                {/* Top: Header info */}
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:underline decoration-1 underline-offset-4">
                            {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>

                    <div className="text-sm text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
                        <span>{project.role}</span>
                        <span className="opacity-30">•</span>
                        <span>{project.timeframe}</span>
                    </div>

                    <p className="text-base text-muted-foreground/90 line-clamp-2">
                        {project.problem}
                    </p>
                </div>

                {/* Middle: Thumbnail (if present) - abstract placeholder if not */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
                    {/* Video Preview (Priority) */}
                    {project.video ? (
                        <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : project.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 font-mono text-xs uppercase tracking-widest">
                            No Preview
                        </div>
                    )}
                </div>

                {/* Bottom: Outcome & Tags */}
                <div className="space-y-4">
                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <span className="text-sm font-medium text-foreground">
                            {project.outcome}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
