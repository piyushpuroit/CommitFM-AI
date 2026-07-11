import { motion } from "framer-motion";

const defaultEvolutionMetrics = [
    {
        id: "maturity",
        label: "Coding Maturity",
        score: 94,
        delta: "+16.5%",
        color: "text-[#22D3EE]",
        sparklineData: "M 0 25 Q 10 18 20 22 T 40 12 T 60 18 T 80 5 L 100 8",
        history: "Shifted from rapid commits to high-longevity codebase contributions."
    },
    {
        id: "architecture",
        label: "Architecture Thinking",
        score: 88,
        delta: "+22.4%",
        color: "text-[#8B5CF6]",
        sparklineData: "M 0 28 Q 10 25 20 18 T 40 22 T 60 12 T 80 8 L 100 2",
        history: "Consolidated state patterns and extracted custom domain abstractions."
    },
    {
        id: "quality",
        label: "Code Quality Growth",
        score: 92,
        delta: "+11.8%",
        color: "text-emerald-400",
        sparklineData: "M 0 20 Q 10 22 20 15 T 40 18 T 60 10 T 80 8 L 100 4",
        history: "Migrated utility libraries directly to strict TypeScript module types."
    },
    {
        id: "ownership",
        label: "Repository Ownership",
        score: 85,
        delta: "+18.2%",
        color: "text-amber-400",
        sparklineData: "M 0 30 Q 10 28 20 22 T 40 25 T 60 15 T 80 12 L 100 6",
        history: "Expanded codebase footprint across core layouts and telemetry scripts."
    }
];

const DeveloperEvolution = ({ metrics = defaultEvolutionMetrics }) => {
    return (
        <div className="premium-card bg-brand-surface flex flex-col gap-4 border border-white/5 h-full relative overflow-hidden text-left shadow-premium">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="border-b border-white/5 pb-3 relative z-10">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Developer Evolution Score</h4>
                <p className="text-[9px] text-brand-muted mt-0.5">90-day trajectory of your developer profile parameters</p>
            </div>

            {/* Growth Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {metrics.map((metric) => (
                    <div
                        key={metric.id}
                        className="p-3.5 rounded-premium bg-brand-bg/40 border border-white/5 hover:border-white/10 transition duration-200 flex flex-col justify-between min-h-[140px]"
                    >
                        {/* Title & Delta Row */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{metric.label}</span>
                                <span className={`text-[9px] font-bold ${metric.color} bg-white/5 border border-white/10 px-1.5 py-0.2 rounded-sm`}>
                                    {metric.delta} ▲
                                </span>
                            </div>
                            <p className="text-[9px] text-brand-muted leading-relaxed line-clamp-2">
                                {metric.history}
                            </p>
                        </div>

                        {/* Sparkline & Score Row */}
                        <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/5 mt-3">
                            {/* Trend Sparkline */}
                            <div className="h-8 w-20 relative">
                                <svg viewBox="0 0 100 30" className={`w-full h-full ${metric.color} overflow-visible`}>
                                    <motion.path
                                        d={metric.sparklineData}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.2, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>

                            {/* Score Value Bar */}
                            <div className="text-right flex-shrink-0">
                                <span className="text-base sm:text-lg font-black text-white">{metric.score}</span>
                                <span className="text-[9px] text-brand-muted font-normal">/100</span>
                            </div>
                        </div>

                        {/* Miniature Progress Slider */}
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                            <motion.div
                                className={`h-full ${metric.color.replace("text-", "bg-") || "bg-brand-primary"}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${metric.score}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeveloperEvolution;
