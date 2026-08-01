import React from "react";
import MetricCard from "../common/MetricCard";

const OverviewAnalysis = ({ commits = [], commitsLoading, onOpenPanel }) => {
    const cards = [
        {
            id: "health",
            title: "Repository Health",
            score: "94%",
            trend: { type: "up", label: "Stable" },
            status: "Optimal",
            summary: "Core codebase maintainability indices remain optimal with minor dependency drift.",
            viewDetailsLabel: "Codebase Health"
        },
        {
            id: "dna",
            title: "AI Confidence",
            score: "96%",
            trend: { type: "up", label: "+2% week" },
            status: "High Confidence",
            summary: "Behavioral commit pattern match has correlated heavily with standard team patterns.",
            viewDetailsLabel: "Developer DNA"
        },
        {
            id: "roadmap",
            title: "Repository Score",
            score: "A- Grade",
            trend: { type: "stable", label: "Top 15%" },
            status: "Excellent",
            summary: "Overall repository hygiene ranks inside the top 15% of peer JavaScript workspaces.",
            viewDetailsLabel: "Learning Roadmap"
        },
        {
            id: "commits",
            title: "Engineering Trend",
            score: commitsLoading ? "..." : `${commits.length} commits`,
            trend: { type: "up", label: "Active Feed" },
            status: "Growing",
            summary: "Daily commit velocity matches targets, driven by documentation and layout refactoring.",
            viewDetailsLabel: "Commit Analysis"
        },
        {
            id: "story",
            title: "Latest AI Insight",
            score: "Refactor Active",
            trend: { type: "stable", label: "Linear Flow" },
            status: "Synced",
            summary: "AI workspace component migration is 100% complete and fully verified under Vite bounds.",
            viewDetailsLabel: "Engineering Story"
        },
        {
            id: "prs",
            title: "Recent Activity",
            score: "3 active",
            trend: { type: "stable", label: "No blocks" },
            status: "Normal",
            summary: "Active contributors are aligned. Pull Request review cycles are averaging 2.4 hours.",
            viewDetailsLabel: "Pull Requests"
        }
    ];

    return (
        <div className="space-y-4 text-left w-full">
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-0.5">Executive Dashboard</span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider pl-0.5">Workspace Smart Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card, idx) => (
                    <div 
                        key={idx}
                        className="premium-card bg-brand-surface border border-white/5 hover:border-white/10 hover:shadow-glow transition-all duration-300 flex flex-col justify-between p-3.5 text-left relative overflow-hidden rounded-premium shadow-premium"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />

                        <div className="space-y-2">
                            {/* Card Header */}
                            <div className="flex justify-between items-center gap-1.5">
                                <span className="text-[9px] text-brand-muted uppercase font-bold tracking-wider">{card.title}</span>
                                <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-sm select-none ${
                                    card.status === "Optimal" || card.status === "Excellent" || card.status === "High Confidence"
                                        ? "bg-emerald-500/10 text-emerald-400" 
                                        : "bg-brand-primary/10 text-brand-primary"
                                }`}>
                                    {card.status}
                                </span>
                            </div>

                            {/* Score and Trend */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-base sm:text-lg font-black text-white">{card.score}</span>
                                {card.trend && (
                                    <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-sm select-none ${
                                        card.trend.type === "up" 
                                            ? "bg-emerald-500/10 text-emerald-400" 
                                            : "bg-white/5 text-brand-muted"
                                    }`}>
                                        {card.trend.label}
                                    </span>
                                )}
                            </div>

                            {/* Summary Sentence */}
                            <p className="text-[10px] text-brand-muted leading-relaxed font-medium">
                                {card.summary}
                            </p>
                        </div>

                        {/* CTA button */}
                        <button
                            onClick={() => onOpenPanel(card.id)}
                            className="mt-3.5 text-[8px] font-bold uppercase tracking-wider text-brand-accent hover:underline flex items-center gap-1 self-start cursor-pointer transition focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded px-1"
                        >
                            <span>View {card.viewDetailsLabel}</span>
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
