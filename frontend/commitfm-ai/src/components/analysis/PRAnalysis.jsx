import SectionHeader from "../common/SectionHeader";

const PRAnalysis = () => {
    const prs = [
        { id: "#402", title: "feat: implement workspace slide-over panel", status: "Merged", author: "piyushpuroit", reviews: "2 approved" },
        { id: "#399", title: "refactor: convert landing page layout system", status: "Merged", author: "piyushpuroit", reviews: "1 approved" },
        { id: "#381", title: "fix: restore react router link anchors", status: "Closed", author: "piyushpuroit", reviews: "No reviews" }
    ];

    return (
        <div className="space-y-4 text-left w-full">
            <SectionHeader 
                badge="Developer PRs"
                title="Pull Request Collaboration"
                subtitle="Telemetry tracking indexed pull request metrics and approvals"
            />

            <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-4">
                <div className="divide-y divide-white/5">
                    {prs.map((pr, idx) => (
                        <div key={idx} className="py-3 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate">{pr.title}</p>
                                <div className="flex items-center gap-2 mt-1 text-[10px] text-brand-muted">
                                    <span className="font-semibold text-zinc-400">{pr.author}</span>
                                    <span>•</span>
                                    <span>{pr.id}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm select-none ${
                                    pr.status === "Merged" 
                                        ? "bg-purple-500/10 text-purple-400" 
                                        : "bg-zinc-500/10 text-brand-muted"
                                }`}>
                                    {pr.status}
                                </span>
                                <span className="text-[8px] text-brand-muted font-medium">{pr.reviews}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PRAnalysis;
