import { useMemo } from "react";
import SectionHeader from "../common/SectionHeader";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { useRepository } from "../../contexts/RepositoryContext";
import { buildHealthMetrics } from "./dashboardUtils";

const CodebaseHealth = () => {
    const { analysisResults, analysisLoading, analysisError } = useRepository();

    const metrics = useMemo(() => buildHealthMetrics(analysisResults), [analysisResults]);

    if (analysisLoading) {
        return <LoadingSkeleton count={6} variant="cards" />;
    }

    if (analysisError) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-[11px] text-red-400 font-semibold gap-2 text-center px-4 min-h-[300px]">
                <span>⚠️ Failed to load codebase health</span>
                <span className="text-zinc-500 font-medium">{analysisError}</span>
            </div>
        );
    }

    if (!analysisResults) {
        return (
            <div className="flex-1 flex items-center justify-center py-20 text-[10px] text-brand-muted font-semibold min-h-[300px]">
                No health metrics available for this repository.
            </div>
        );
    }

    const cards = [
        { label: "Repository Health Score", value: `${metrics.repositoryHealthScore}/100` },
        { label: "Documentation Score", value: `${metrics.documentationScore}/100` },
        { label: "Branch Hygiene", value: `${metrics.branchHygiene}/100` },
        { label: "Maintenance Score", value: `${metrics.maintenanceScore}/100` },
        { label: "Repository Risk", value: metrics.repositoryRisk },
        { label: "Bus Factor", value: `${metrics.busFactor} contributor(s)` },
        { label: "Repository Growth", value: metrics.repositoryGrowth },
        { label: "Large File Detection", value: metrics.largeFileDetection },
        { label: "Repository Complexity", value: metrics.repositoryComplexity }
    ];

    return (
        <div className="space-y-6 text-left w-full">
            <SectionHeader
                badge="Stability Signals"
                title="Codebase Integrity Analysis"
                subtitle="Live repository health, risk, and complexity signals derived from the GitHub analysis payload"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <div key={card.label} className="premium-card bg-brand-surface border border-white/5 p-4 flex flex-col justify-between rounded-premium shadow-premium">
                        <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">{card.label}</p>
                        <h3 className="text-base font-black text-white mt-3">{card.value}</h3>
                    </div>
                ))}
            </div>

            <div className="premium-card bg-brand-surface/80 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden text-left p-4 rounded-premium border border-white/5">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Technical Debt Indicators</h4>
                <ul className="space-y-1.5 mt-2">
                    {metrics.technicalDebtIndicators.map((debt, idx) => (
                        <li key={idx} className="text-[10px] text-brand-muted flex items-start gap-1.5 leading-normal">
                            <span className="text-brand-primary font-bold mt-0.5">•</span>
                            <span>{debt}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CodebaseHealth;
