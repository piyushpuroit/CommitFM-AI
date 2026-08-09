import { useMemo } from "react";
import SectionHeader from "../common/SectionHeader";
import LoadingSkeleton from "../common/LoadingSkeleton";
import EmptyState from "../common/EmptyState";
import { useRepository } from "../../contexts/RepositoryContext";
import { buildCommitMetrics } from "./dashboardUtils";

const CommitAnalysis = ({ loading: propLoading }) => {
    const { analysisResults, analysisLoading, analysisError } = useRepository();
    const loading = propLoading || analysisLoading;

    const metrics = useMemo(() => buildCommitMetrics(analysisResults), [analysisResults]);

    if (loading) {
        return <LoadingSkeleton count={4} variant="cards" />;
    }

    if (analysisError) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-[11px] text-red-400 font-semibold gap-2 text-center px-4 min-h-[300px]">
                <span>⚠️ Failed to load commit analysis</span>
                <span className="text-zinc-500 font-medium">{analysisError}</span>
            </div>
        );
    }

    if (!analysisResults) {
        return <EmptyState title="No commit telemetry" description="Connect a repository to analyze its commit history." />;
    }

    return (
        <div className="space-y-4 text-left w-full">
            <SectionHeader
                badge="Commit Stream"
                title="Commit Intelligence"
                subtitle="Live GitHub-backed commit patterns, streaks, and contributor signals"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Core Commit Metrics</h3>
                    {[
                        { label: "Commit Frequency", value: metrics.frequency },
                        { label: "Longest Streak", value: `${metrics.longestStreak} days` },
                        { label: "Current Streak", value: `${metrics.currentStreak} days` },
                        { label: "Average Commit Size", value: metrics.averageCommitSize },
                        { label: "Largest Commit", value: metrics.largestCommit },
                        { label: "Smallest Commit", value: metrics.smallestCommit }
                    ].map((metric) => (
                        <div key={metric.label} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                            <span className="text-[10px] text-brand-muted">{metric.label}</span>
                            <span className="text-[10px] font-semibold text-white">{metric.value}</span>
                        </div>
                    ))}
                </div>

                <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Commit Message Quality</h3>
                    <div className="rounded-premium bg-brand-bg/50 border border-white/5 p-3">
                        <p className="text-[10px] font-semibold text-white">{metrics.messageQuality.label}</p>
                        <p className="text-[10px] text-brand-muted mt-1">{metrics.messageQuality.detail}</p>
                    </div>
                    <div className="rounded-premium bg-brand-bg/50 border border-white/5 p-3">
                        <p className="text-[10px] text-brand-muted">Primary language</p>
                        <p className="text-[10px] font-semibold text-white">{metrics.dominantLanguage}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Commit Heatmap</h3>
                    <div className="space-y-2">
                        {metrics.heatmap.length ? metrics.heatmap.map(([day, count]) => (
                            <div key={day} className="flex items-center justify-between text-[10px] text-brand-muted">
                                <span>{day}</span>
                                <span className="font-semibold text-white">{count} commits</span>
                            </div>
                        )) : <p className="text-[10px] text-brand-muted">No daily commit history available.</p>}
                    </div>
                </div>

                <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Top Authors</h3>
                    <div className="space-y-2">
                        {metrics.topAuthors.length ? metrics.topAuthors.map((author) => (
                            <div key={author.author} className="flex items-center justify-between text-[10px] text-brand-muted">
                                <span>{author.author}</span>
                                <span className="font-semibold text-white">{author.count} commits</span>
                            </div>
                        )) : <p className="text-[10px] text-brand-muted">No contributor commit counts available.</p>}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Top Modified Files</h3>
                    <div className="space-y-2">
                        {metrics.topFiles.length ? metrics.topFiles.map((file) => (
                            <div key={file} className="text-[10px] text-brand-muted">• {file}</div>
                        )) : <p className="text-[10px] text-brand-muted">No modified file telemetry exposed by the current payload.</p>}
                    </div>
                </div>

                <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Contribution Context</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-brand-muted">
                            <span>Contributors tracked</span>
                            <span className="font-semibold text-white">{metrics.contributorCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-brand-muted">
                            <span>Peak activity hour</span>
                            <span className="font-semibold text-white">{metrics.hourly[0]?.hour || "N/A"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommitAnalysis;
