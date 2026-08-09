import { useMemo } from "react";
import { useRepository } from "../../contexts/RepositoryContext";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { buildLearningRoadmap } from "./dashboardUtils";

const LearningRoadmapAnalysis = () => {
    const { analysisResults, analysisLoading, analysisError } = useRepository();

    const roadmap = useMemo(() => buildLearningRoadmap(analysisResults), [analysisResults]);

    if (analysisLoading) {
        return <LoadingSkeleton count={4} variant="cards" />;
    }

    if (analysisError) {
        return (
            <div className="premium-card bg-brand-surface border border-white/5 h-full flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
                <span>⚠️ Unable to load learning roadmap</span>
            </div>
        );
    }

    if (!analysisResults) {
        return (
            <div className="premium-card bg-brand-surface border border-white/5 h-full flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
                <span>No analysis data available to build a roadmap.</span>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-0.5">Skill Evolution</span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider pl-0.5">AI Learning Roadmap</h2>
            </div>

            <div className="premium-card bg-brand-surface border border-white/5 p-4 rounded-premium">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-2">Detected Stack</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[10px] text-brand-muted">
                    <div className="rounded-premium bg-brand-bg/40 border border-white/5 p-3">
                        <p className="font-semibold text-white uppercase tracking-widest text-[8px]">Languages</p>
                        <p className="mt-2">{roadmap.languages.join(", ")}</p>
                    </div>
                    <div className="rounded-premium bg-brand-bg/40 border border-white/5 p-3">
                        <p className="font-semibold text-white uppercase tracking-widest text-[8px]">Frameworks</p>
                        <p className="mt-2">{roadmap.frameworks.join(", ")}</p>
                    </div>
                    <div className="rounded-premium bg-brand-bg/40 border border-white/5 p-3">
                        <p className="font-semibold text-white uppercase tracking-widest text-[8px]">Architecture</p>
                        <p className="mt-2">{roadmap.architecture}</p>
                    </div>
                </div>
            </div>

            <div className="premium-card bg-brand-surface border border-white/5 p-4 space-y-4 rounded-premium shadow-premium">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-2">Recommended Next Topics</h4>
                <div className="relative border-l border-white/10 pl-6 space-y-6">
                    {roadmap.nextTopics.map((topic, idx) => (
                        <div key={idx} className="relative">
                            <span className="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-brand-primary border-2 border-brand-bg flex items-center justify-center" />
                            <div className="flex justify-between items-start gap-3">
                                <div>
                                    <span className="text-[8px] font-bold text-brand-accent uppercase tracking-widest">Milestone #{idx + 1}</span>
                                    <h4 className="text-xs font-bold text-white mt-0.5">{topic}</h4>
                                </div>
                                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-sm select-none bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                                    Up Next
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
