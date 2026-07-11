import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const storyChapters = {
    arc: {
        title: "The 90-Day Arc",
        subtitle: "A shift in development posture",
        narrative: "Over the last 90 days, your development footprint transitioned from rapid feature implementation to high-impact, architecture-focused refactoring. While your daily commit frequency saw a slight deceleration, the structural complexity and code longevity of your changes increased significantly. You started treating the codebase less like a series of disjointed features and more like a single cohesive engine, consolidating common layout components and refactoring core states.",
        highlight: "Commit frequency decreased, but systemic impact and complexity increased by 42%.",
        meta: "Focus: Core Architecture & Reusability"
    },
    adaptability: {
        title: "Technical Adaptability",
        subtitle: "Type safety & system confidence",
        narrative: "Your technical lineage shows a conscious shift toward type-safe boundaries and robust compilation standards. By migrating legacy vanilla JavaScript utilities and state configurations directly to TypeScript strict setups, you successfully eradicated a latent class of runtime errors. This wasn't merely a syntax migration—it was a philosophical upgrade to codebase predictability, ensuring self-documenting code for future scale.",
        highlight: "Successfully converted 85% of critical utility entrypoints to TypeScript strict configurations.",
        meta: "Focus: Code Stability & Strict Typing"
    },
    collaboration: {
        title: "Collaboration & Influence",
        subtitle: "Evolving as a codebase anchor",
        narrative: "You have increasingly taken on the role of an engineering anchor. Your commit descriptions have matured from simple action summaries into high-context engineering journals, describing the *why* behind your technical tradeoffs. This proactive documentation style directly reduced peer review loop times, transforming your commits into living documentation that helps onboard other developers.",
        highlight: "Reduced average PR review latency by 1.2 hours through high-fidelity commit summaries.",
        meta: "Focus: Communication & Documentation"
    }
};

const EngineeringStory = () => {
    const [activeChapter, setActiveChapter] = useState("arc");

    const current = storyChapters[activeChapter];

    return (
        <div className="premium-card bg-brand-surface flex flex-col gap-4 border border-white/5 h-full relative overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 relative z-10">
                <div>
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Engineering Narrative</h4>
                    <p className="text-[9px] text-brand-muted mt-0.5">AI-synthesized narrative of your engineering evolution</p>
                </div>

                {/* Chapter Selectors */}
                <div className="flex gap-1 bg-brand-bg/50 p-0.5 rounded-md border border-white/5 self-start sm:self-auto">
                    {Object.keys(storyChapters).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveChapter(key)}
                            className={`px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer select-none ${
                                activeChapter === key
                                    ? "bg-brand-primary text-white"
                                    : "text-brand-muted hover:text-brand-text"
                            }`}
                        >
                            {storyChapters[key].title.split(" ")[0]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Story Content Area */}
            <div className="flex flex-col justify-between flex-1 relative z-10 min-h-[180px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeChapter}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-4 text-left"
                    >
                        {/* Subtitles */}
                        <div>
                            <span className="text-[9px] text-brand-accent font-semibold uppercase tracking-widest">{current.meta}</span>
                            <h3 className="text-sm font-bold text-white mt-0.5">{current.title}</h3>
                            <p className="text-[10px] text-brand-muted italic">{current.subtitle}</p>
                        </div>

                        {/* Main Text */}
                        <p className="text-xs text-brand-text/90 leading-relaxed font-medium font-serif bg-brand-bg/20 p-3 rounded-premium border border-white/5 italic">
                            "{current.narrative}"
                        </p>

                        {/* Highlight Callout */}
                        <div className="flex gap-2 items-start p-2 rounded-premium bg-brand-primary/5 border border-brand-primary/10">
                            <span className="text-xs">💡</span>
                            <p className="text-[10px] text-brand-muted font-medium leading-relaxed">
                                <strong className="text-white">Key takeaway:</strong> {current.highlight}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Footer AI Analyst Stamp */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[8px] text-brand-muted uppercase font-bold tracking-wider">
                    <span>Model: CommitFM-Narrative-v1</span>
                    <span className="flex items-center gap-1 text-brand-accent">
                        <span className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
                        Analysis verified
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EngineeringStory;
