import { motion } from "framer-motion";

const InsightCard = ({ title, subtitle, summary, confidenceScore, icon, previewMetric, onOpen }) => {
    return (
        <motion.div 
            className="premium-card bg-brand-surface border border-white/5 hover:border-white/10 hover:shadow-glow transition-all duration-300 flex flex-col justify-between h-full p-5 text-left relative overflow-hidden"
            whileHover={{ y: -2 }}
        >
            {/* Ambient subtle glow based on confidence */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />

            <div>
                {/* Header Row */}
                <div className="flex justify-between items-start gap-2 mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xl select-none">{icon}</span>
                        <div>
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{title}</h3>
                            <p className="text-[10px] text-brand-muted font-medium mt-0.5">{subtitle}</p>
                        </div>
                    </div>
                    {confidenceScore && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold select-none shrink-0">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            {confidenceScore}%
                        </div>
                    )}
                </div>

                {/* Summary */}
                <p className="text-xs text-brand-muted leading-relaxed font-medium mb-4">
                    {summary}
                </p>

                {/* Preview Metric */}
                {previewMetric && (
                    <div className="mb-5 p-2 rounded-premium bg-brand-bg/40 border border-white/5 flex items-center justify-between gap-2">
                        <span className="text-[9px] text-brand-muted uppercase font-bold tracking-wider">{previewMetric.label}</span>
                        <span className="text-[10px] font-black text-white">{previewMetric.value}</span>
                    </div>
                )}
            </div>

            {/* CTA Button */}
            <button 
                onClick={onOpen}
                className="w-full btn-premium-secondary py-2 text-xs font-semibold rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
            >
                <span>Open Workspace</span>
                <svg className="w-3 h-3 text-brand-accent" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </motion.div>
    );
};

export default InsightCard;
