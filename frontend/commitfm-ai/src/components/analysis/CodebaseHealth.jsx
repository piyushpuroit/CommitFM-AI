import SectionHeader from "../common/SectionHeader";

const CodebaseHealth = () => {
    const qualityMetrics = [
        { name: "Code Stability Index", score: "94/100", status: "Optimal" },
        { name: "Documentation Coverage", score: "78%", status: "Requires Update" },
        { name: "Duplicate Code Percentage", score: "2.4%", status: "Optimal" },
        { name: "Complexity Hotspots", score: "0 detected", status: "Optimal" }
    ];

    return (
        <div className="space-y-4 text-left w-full">
            <SectionHeader 
                badge="Stability Signals"
                title="Codebase Integrity Analysis"
                subtitle="High-density diagnostic analysis of code health, hotspots, and duplicate code parameters"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qualityMetrics.map((metric, idx) => (
                    <div key={idx} className="premium-card bg-brand-surface border border-white/5 p-4 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">{metric.name}</p>
                            <h3 className="text-base font-black text-white mt-1">{metric.score}</h3>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm select-none ${
                            metric.status === "Optimal" 
                                ? "bg-emerald-500/10 text-emerald-400" 
                                : "bg-amber-500/10 text-amber-400"
                        }`}>
                            {metric.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CodebaseHealth;
