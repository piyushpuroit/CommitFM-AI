import { useMemo } from "react";
import { useRepository } from "../../contexts/RepositoryContext";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { buildOverviewMetrics } from "./dashboardUtils";

const OverviewAnalysis = ({ onOpenPanel }) => {
    const { analysisResults, analysisLoading, analysisError } = useRepository();

    const metrics = useMemo(() => buildOverviewMetrics(analysisResults), [analysisResults]);

    if (analysisLoading) {
        return <LoadingSkeleton count={6} variant="cards" />;
    }

    if (analysisError) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-[11px] text-red-400 font-semibold gap-2 text-center px-4 min-h-[300px]">
                <span>⚠️ Failed to load repository analysis</span>
                <span className="text-zinc-500 font-medium">{analysisError}</span>
            </div>
        );
    }

    if (!analysisResults) {
        return (
            <div className="flex-1 flex items-center justify-center py-20 text-[10px] text-brand-muted font-semibold min-h-[300px]">
                No analysis data available for this repository.
            </div>
        );
    }

    const moduleByLabel = {
        "Repository Age": "story",
        "Days Since Last Commit": "overview",
        "Activity Trend": "prs",
        "Contributors": "dna",
        "Commits": "commits",
        "Branches": "health",
        "Releases": "overview",
        "Issues": "prs",
        "Pull Requests": "prs",
        "Stars": "overview",
        "Forks": "overview",
        "Watchers": "overview",
        "Repository Size": "health",
        "Topics": "roadmap",
        "License": "health",
        "Visibility": "overview",
        "Default Branch": "health",
        "Latest Release": "overview"
    };

    return (
        <div className="space-y-4 text-left w-full">
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-0.5">Repository Analysis Engine</span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider pl-0.5">Live Workspace Metrics</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {metrics.map((metric, idx) => (
                    <div
                        key={`${metric.label}-${idx}`}
                        className="premium-card bg-brand-surface border border-white/5 hover:border-white/10 hover:shadow-glow transition-all duration-300 flex flex-col justify-between p-3.5 text-left relative overflow-hidden rounded-premium shadow-premium"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />

                        <div className="space-y-2">
                            <div className="flex justify-between items-center gap-1.5">
                                <span className="text-[9px] text-brand-muted uppercase font-bold tracking-wider">{metric.label}</span>
                                <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-sm select-none bg-brand-primary/10 text-brand-primary">
                                    Live
                                </span>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-base sm:text-lg font-black text-white truncate max-w-[220px]" title={metric.value}>
                                    {metric.value}
                                </span>
                            </div>

                            <p className="text-[10px] text-brand-muted leading-relaxed font-medium line-clamp-2 h-10">
                                {metric.detail}
                            </p>
                        </div>

                        <button
                            onClick={() => onOpenPanel(moduleByLabel[metric.label] || "overview")}
                            className="mt-3.5 text-[8px] font-bold uppercase tracking-wider text-brand-accent hover:underline flex items-center gap-1 self-start cursor-pointer transition focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded px-1"
                        >
                            <span>View details</span>
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverviewAnalysis;
