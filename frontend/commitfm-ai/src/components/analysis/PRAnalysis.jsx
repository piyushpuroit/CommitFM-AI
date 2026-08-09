import { useMemo } from "react";
import SectionHeader from "../common/SectionHeader";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { useRepository } from "../../contexts/RepositoryContext";
import { buildPrMetrics } from "./dashboardUtils";

const PRAnalysis = () => {
    const { analysisResults, analysisLoading, analysisError } = useRepository();

    const metrics = useMemo(() => buildPrMetrics(analysisResults), [analysisResults]);

    if (analysisLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
                <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                <span>Fetching pull request telemetry...</span>
            </div>
        );
    }

    if (analysisError) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-[11px] text-red-400 font-semibold gap-2 text-center px-4 min-h-[300px]">
                <span>⚠️ Failed to load pull requests</span>
                <span className="text-zinc-500 font-medium">{analysisError}</span>
            </div>
        );
    }

    if (!analysisResults || !analysisResults.repositoryActivity) {
        return (
            <div className="flex-1 flex items-center justify-center py-20 text-[10px] text-brand-muted font-semibold min-h-[300px]">
                No pull request metadata available.
            </div>
        );
    }

    const prs = analysisResults.repositoryActivity.pullRequests || [];

    return (
        <div className="space-y-4 text-left w-full">
            <SectionHeader
                badge="Developer PRs"
                title="Pull Request Collaboration"
                subtitle="Live merge-rate and participation signals from GitHub pull request data"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[
                    { label: "Merge Rate", value: `${metrics.mergeRate}%` },
                    { label: "Average Merge Time", value: metrics.averageMergeTime },
                    { label: "Contributor Participation", value: metrics.contributorParticipation }
                ].map((metric) => (
                    <div key={metric.label} className="premium-card bg-brand-surface border border-white/5 p-4">
                        <p className="text-[9px] text-brand-muted uppercase font-bold tracking-wider">{metric.label}</p>
                        <p className="text-sm font-black text-white mt-2">{metric.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Open vs. Closed</h3>
                    <div className="flex items-center justify-between text-[10px] text-brand-muted">
                        <span>Open</span>
                        <span className="font-semibold text-white">{metrics.openVsClosed.open}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-brand-muted">
                        <span>Closed</span>
                        <span className="font-semibold text-white">{metrics.openVsClosed.closed}</span>
                    </div>
                </div>

                <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Reviewer Activity</h3>
                    <p className="text-[10px] text-brand-muted">{metrics.reviewerActivity}</p>
                </div>
            </div>

            <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-4 rounded-premium shadow-premium">
                <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Pull Request Timeline</h3>
                {prs.length === 0 ? (
                    <div className="py-6 text-center text-xs text-brand-muted font-semibold">
                        No pull requests found in this repository.
                    </div>
                ) : (
                    <div className="divide-y divide-white/5 max-h-96 overflow-y-auto pr-1">
                        {prs.map((pr, idx) => (
                            <div key={idx} className="py-3 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-white truncate" title={pr.title}>{pr.title}</p>
                                    <div className="flex items-center gap-2 mt-1 text-[10px] text-brand-muted">
                                        <span className="font-semibold text-zinc-400">{pr.author}</span>
                                        <span>•</span>
                                        <span>{pr.id}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm select-none ${pr.status === "Open"
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-purple-500/10 text-purple-400"
                                        }`}>
                                        {pr.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PRAnalysis;
