import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultEvents = [
    {
        id: 1,
        date: "May 2026",
        type: "milestone",
        title: "Production Release of V2 State Engine",
        description: "Successfully re-architected the client-side state engine, reducing render cycles by 40% and improving visual snappiness.",
        metrics: "40% Perf Gain",
        tech: ["React", "Zustand", "TypeScript"]
    },
    {
        id: 2,
        date: "Apr 2026",
        type: "streak",
        title: "45-Day Continuous Integration Streak",
        description: "Maintained a continuous green build streak across 3 primary repositories with automated coverage and static analysis verification.",
        metrics: "45 Days Green",
        tech: ["GitHub Actions", "Vitest"]
    },
    {
        id: 3,
        date: "Mar 2026",
        type: "spike",
        title: "Productivity Spike: Codebase Consolidation",
        description: "Merged 52 pull requests in a single week to consolidate decoupled layout styles into a unified Tailwind theme configuration.",
        metrics: "52 PRs Merged",
        tech: ["TailwindCSS", "Refactoring"]
    },
    {
        id: 4,
        date: "Jan 2026",
        type: "evolution",
        title: "Migration to TypeScript Strict Mode",
        description: "Migrated legacy vanilla JS utilities and state stores to strictly typed modules, boosting confidence and eradicating type mismatches.",
        metrics: "100% Strict Mode",
        tech: ["TypeScript", "Architecture"]
    },
    {
        id: 5,
        date: "Nov 2025",
        type: "milestone",
        title: "First Core UI Library Module Published",
        description: "Abstracted and published internal dashboard telemetry charts to a private package registry for multi-application reusability.",
        metrics: "Private NPM Pkg",
        tech: ["Vite", "Rollup", "React"]
    }
];

const DeveloperTimeline = ({ events = defaultEvents }) => {
    const [activeFilter, setActiveFilter] = useState("all");

    const filteredEvents = events.filter(
        event => activeFilter === "all" || event.type === activeFilter
    );

    const getBadgeStyle = (type) => {
        switch (type) {
            case "milestone":
                return {
                    color: "text-[#22D3EE] border-[#22D3EE]/20 bg-[#22D3EE]/5",
                    label: "Milestone",
                    icon: "⭐"
                };
            case "streak":
                return {
                    color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
                    label: "Streak",
                    icon: "🔥"
                };
            case "spike":
                return {
                    color: "text-[#8B5CF6] border-[#8B5CF6]/20 bg-[#8B5CF6]/5",
                    label: "Spike",
                    icon: "⚡"
                };
            case "evolution":
                return {
                    color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
                    label: "Evolution",
                    icon: "🌱"
                };
            default:
                return {
                    color: "text-brand-muted border-white/5 bg-white/5",
                    label: "Activity",
                    icon: "⚪"
                };
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <div className="premium-card bg-brand-surface flex flex-col gap-4 border border-white/5 h-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                <div>
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Developer Evolution</h4>
                    <p className="text-[9px] text-brand-muted mt-0.5">Timeline of key engineering milestones & tech adoption</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-1 bg-brand-bg/50 p-0.5 rounded-md border border-white/5 self-start sm:self-auto">
                    {["all", "milestone", "streak", "spike", "evolution"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider transition-all duration-150 capitalize cursor-pointer select-none ${
                                activeFilter === filter
                                    ? "bg-brand-primary text-white"
                                    : "text-brand-muted hover:text-brand-text"
                            }`}
                        >
                            {filter === "all" ? "All" : filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timeline Area */}
            <div className="relative pl-4 sm:pl-6 space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {/* Vertical Line */}
                <div className="absolute left-1.5 sm:left-2.5 top-2 bottom-2 w-[1px] bg-white/5" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.map((event, index) => {
                            const badge = getBadgeStyle(event.type);
                            return (
                                <motion.div
                                    key={event.id}
                                    variants={cardVariants}
                                    layout
                                    className="relative flex gap-3 sm:gap-4 text-left"
                                >
                                    {/* Timeline Node Point */}
                                    <div className="absolute -left-[19px] sm:-left-[23px] top-1.5 w-2 h-2 rounded-full bg-brand-surface border border-white/10 flex items-center justify-center z-10">
                                        <div className="w-1 h-1 rounded-full bg-brand-primary" />
                                    </div>

                                    {/* Event Card */}
                                    <div className="flex-1 p-3 rounded-premium bg-brand-bg/40 border border-white/5 hover:border-white/10 hover:bg-brand-bg/65 transition-all duration-200">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[8px] font-bold tracking-wider ${badge.color}`}>
                                                    <span>{badge.icon}</span>
                                                    <span>{badge.label}</span>
                                                </span>
                                                <span className="text-[10px] text-white font-bold">{event.title}</span>
                                            </div>
                                            <span className="text-[9px] text-brand-muted font-medium sm:self-auto">{event.date}</span>
                                        </div>

                                        <p className="text-[10px] text-brand-muted leading-relaxed mb-2">
                                            {event.description}
                                        </p>

                                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-2">
                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-1">
                                                {event.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="px-1 py-0.2 rounded-sm bg-white/5 border border-white/5 text-white text-[8px] font-medium"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            {/* Metric Highlight */}
                                            <span className="text-[9px] font-bold text-brand-accent bg-brand-primary/10 px-1.5 py-0.5 rounded-sm">
                                                {event.metrics}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {filteredEvents.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8 text-[10px] text-brand-muted"
                        >
                            No events match the selected filter.
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default DeveloperTimeline;
