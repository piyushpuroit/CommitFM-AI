import MetricCard from "../common/MetricCard";

const OverviewAnalysis = ({ commits = [], commitsLoading, onOpenPanel }) => {
    const cards = [
        { id: "health", title: "Repository Health", score: "94%", icon: "🏥", trend: { type: "up", label: "Stable" } },
        { id: "dna", title: "AI Confidence", score: "96%", icon: "🧬", trend: { type: "up", label: "+2% week" } },
        { id: "health", title: "Primary Language", score: "TypeScript", icon: "💻", trend: { type: "stable", label: "55% share" } },
        { id: "commits", title: "Ingested Commits", score: commitsLoading ? "..." : `${commits.length}`, icon: "💻", trend: { type: "up", label: "Active Feed" } },
        { id: "prs", title: "Active Contributors", score: "3 Active", icon: "👥", trend: { type: "stable", label: "Healthy" } },
        { id: "recommendations", title: "Open Issues / Flags", score: "4 Flags", icon: "⚠️", trend: { type: "down", label: "-1 resolved" } },
        { id: "commits", title: "Last Activity", score: commits[0] ? new Date(commits[0].date).toLocaleDateString() : "Just now", icon: "📡", trend: { type: "stable", label: "Synced" } }
    ];

    return (
        <div className="space-y-4 text-left">
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-0.5">Diagnostic Overview</span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider pl-0.5">Workspace Metrics Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {cards.map((card, idx) => (
                    <MetricCard
                        key={idx}
                        title={card.title}
                        score={card.score}
                        icon={card.icon}
                        trend={card.trend}
                        onOpen={() => onOpenPanel(card.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default OverviewAnalysis;
