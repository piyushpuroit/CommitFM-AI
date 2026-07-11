import { motion } from "framer-motion";

const OverviewCard = ({ title, score, icon, trend, onOpen }) => {
    return (
        <motion.div 
            className="premium-card bg-brand-surface border border-white/5 hover:border-white/10 hover:shadow-glow transition-all duration-300 flex flex-col justify-between !p-2 text-left relative overflow-hidden"
            whileHover={{ y: -1 }}
        >
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />

            <div>
                {/* Header Info */}
                <div className="flex justify-between items-center gap-1.5 mb-1">
                    <span className="text-[10px] sm:text-[11px] text-brand-muted uppercase font-bold tracking-wider">{title}</span>
                    <span className="text-base select-none">{icon}</span>
                </div>

                {/* Score and Trend */}
                <div className="flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-black text-white">{score}</span>
                    {trend && (
                        <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-sm select-none ${
                            trend.type === "up" 
                                ? "bg-emerald-500/10 text-emerald-400" 
                                : trend.type === "down" 
                                    ? "bg-red-500/10 text-red-400" 
                                    : "bg-white/5 text-brand-muted"
                        }`}>
                            {trend.label}
                        </span>
                    )}
                </div>
            </div>

            {/* CTA action */}
            <button
                onClick={onOpen}
                className="mt-2 text-[9px] font-bold uppercase tracking-wider text-brand-accent hover:underline flex items-center gap-1 self-start cursor-pointer transition"
            >
                <span>Open Analysis</span>
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </motion.div>
    );
};

export default OverviewCard;
