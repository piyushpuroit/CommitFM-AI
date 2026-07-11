const LearningRoadmapAnalysis = () => {
    const milestones = [
        { title: "Advanced Abstractions & API Boundaries", type: "Design Patterns", desc: "Refactor active controllers into decoupled service providers.", status: "In Progress" },
        { title: "Query Optimization & DB Trimming", type: "Backend Performance", desc: "Minimize redundant sub-queries inside transaction blocks.", status: "Up Next" },
        { title: "Event Driven Integration patterns", type: "System Architecture", desc: "Transition static state hook updates to message-broker emitters.", status: "Planned" }
    ];

    return (
        <div className="space-y-6 text-left">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-0.5">Skill Evolution</span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider pl-0.5">AI Learning Roadmap</h2>
            </div>

            <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-4">
                <div className="relative border-l border-white/10 pl-6 space-y-6">
                    {milestones.map((milestone, idx) => (
                        <div key={idx} className="relative">
                            <span className="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-brand-primary border-2 border-brand-bg flex items-center justify-center" />
                            <div className="flex justify-between items-start gap-3">
                                <div>
                                    <span className="text-[8px] font-bold text-brand-accent uppercase tracking-widest">{milestone.type}</span>
                                    <h4 className="text-xs font-bold text-white mt-0.5">{milestone.title}</h4>
                                    <p className="text-[10px] text-brand-muted mt-1 leading-relaxed">{milestone.desc}</p>
                                </div>
                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm select-none ${
                                    milestone.status === "In Progress" 
                                        ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                                        : "bg-white/5 text-brand-muted"
                                }`}>
                                    {milestone.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningRoadmapAnalysis;
