import SectionHeader from "../common/SectionHeader";
import LoadingSkeleton from "../common/LoadingSkeleton";
import EmptyState from "../common/EmptyState";

const CommitAnalysis = ({ commits = [], loading }) => {
    if (loading) {
        return <LoadingSkeleton count={3} />;
    }

    return (
        <div className="space-y-4 text-left w-full">
            <SectionHeader 
                badge="Commit Stream"
                title="Recent Git Commits"
                subtitle="Real-time ingestion of recent repository commits and metadata details"
            />

            <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-4">
                {commits.length === 0 ? (
                    <EmptyState title="No commits synced" description="Ingest commits by connecting your repository." />
                ) : (
                    <div className="divide-y divide-white/5">
                        {commits.map((commit, idx) => (
                            <div key={idx} className="py-3 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-white truncate">{commit.message}</p>
                                    <div className="flex items-center gap-2 mt-1 text-[10px] text-brand-muted">
                                        <span className="font-semibold text-zinc-400">{commit.author}</span>
                                        <span>•</span>
                                        <span>{new Date(commit.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <span className="font-mono text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-brand-muted shrink-0 select-none">
                                    {commit.hash ? commit.hash.substring(0, 7) : "0000000"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommitAnalysis;
