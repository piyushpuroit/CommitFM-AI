import { useMemo } from "react";
import { motion } from "framer-motion";
import { useRepository } from "../contexts/RepositoryContext";
import LoadingSkeleton from "./common/LoadingSkeleton";
import { buildStoryTimeline } from "./analysis/dashboardUtils";

const EngineeringStory = () => {
    const { analysisResults, analysisLoading, analysisError } = useRepository();

    const timeline = useMemo(() => buildStoryTimeline(analysisResults), [analysisResults]);

    if (analysisLoading) {
        return <LoadingSkeleton count={3} variant="lists" />;
    }

    if (analysisError) {
        return (
            <div className="premium-card bg-brand-surface border border-white/5 h-full flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
                <span>⚠️ Unable to load engineering story</span>
            </div>
        );
    }

    if (!analysisResults) {
        return (
            <div className="premium-card bg-brand-surface border border-white/5 h-full flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
                <span>No repository history available.</span>
            </div>
        );
    }

    return (
        <div className="premium-card bg-brand-surface flex flex-col gap-4 border border-white/5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 relative z-10">
                <div>
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Engineering Narrative</h4>
                    <p className="text-[9px] text-brand-muted mt-0.5">Chronological view of repository evolution from live GitHub history</p>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                {timeline.map((step, index) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="rounded-premium border border-white/5 bg-brand-bg/30 p-3"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-[9px] font-bold text-brand-accent uppercase tracking-wider">{step.title}</span>
                            <span className="text-[9px] text-brand-muted">{step.date}</span>
                        </div>
                        <p className="text-[10px] text-brand-muted leading-relaxed mt-2">{step.detail}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default EngineeringStory;
