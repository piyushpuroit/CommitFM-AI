import React, { useState } from "react";
import { motion } from "framer-motion";

const PremiumOnboarding = ({ onConnect }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const benefits = [
        { title: "Behavioral DNA", desc: "Deconstruct your developer archetype and commit patterns." },
        { title: "Engineering Stories", desc: "Generate developer narratives and architectural decisions." },
        { title: "Career Roadmaps", desc: "Unlock skill trees and automated resume readiness scoring." }
    ];

    const previewCards = [
        {
            id: "dna",
            title: "Developer DNA",
            icon: "🧬",
            badge: "Archetype Profile",
            desc: "Profiles commit tendencies and modularity indices.",
            tooltip: "Identifies whether your contribution patterns align with a System Architect, Code Optimizer, or Feature Builder archetype."
        },
        {
            id: "story",
            title: "Engineering Story",
            icon: "📖",
            badge: "Narratives",
            desc: "Deciphers semantic commit histories into readable stories.",
            tooltip: "Converts complex branch histories and diff lines into an executive narrative of your contributions."
        },
        {
            id: "health",
            title: "Repository Health",
            icon: "🏥",
            badge: "Telemetry",
            desc: "Tracks codebase stability and documentation coverages.",
            tooltip: "Measures code duplication ratios, hotspot complexities, and coverage gaps to flag refactoring candidates."
        },
        {
            id: "commits",
            title: "Commit Analysis",
            icon: "💻",
            badge: "Analytics",
            desc: "Monitors daily ingestion rates and branch activities.",
            tooltip: "Visualizes your live code ingestion flows, commit density cycles, and code line velocities."
        },
        {
            id: "coach",
            title: "Career Coach",
            icon: "🔮",
            badge: "AI Insights",
            desc: "AI advice maps growth plans based on code.",
            tooltip: "Analyzes technical focus areas to recommend custom career paths and project ideas."
        },
        {
            id: "resume",
            title: "Resume Generator",
            icon: "📝",
            badge: "Export",
            desc: "Transforms telemetry records into markdown profiles.",
            tooltip: "Generates high-density, professional developer resumes highlighting validated git intelligence stats."
        },
        {
            id: "roadmap",
            title: "Learning Roadmap",
            icon: "🗺️",
            badge: "Growth",
            desc: "Suggests skill additions matching codebase trends.",
            tooltip: "Recommends key libraries, patterns, and technologies to master based on your code tendencies."
        }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full text-left p-1">
            {/* Left Column: Quick Connection & Benefits */}
            <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-brand-surface border border-white/5 relative overflow-hidden h-fit lg:sticky lg:top-24">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4">
                    <div>
                        <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Repository Status</span>
                        <h2 className="text-base font-bold text-white uppercase tracking-wider mt-0.5">Setup Workspace</h2>
                        <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                            Initialize CommitFM AI telemetry by linking your GitHub account.
                        </p>
                    </div>

                    {/* Benefit list */}
                    <div className="space-y-3 pt-2">
                        {benefits.map((b, idx) => (
                            <div key={idx} className="flex gap-2.5 items-start">
                                <span className="text-xs mt-0.5 select-none text-brand-primary">✦</span>
                                <div className="text-xs">
                                    <h4 className="font-bold text-white uppercase tracking-wide text-[10px]">{b.title}</h4>
                                    <p className="text-brand-muted text-[10px] leading-relaxed mt-0.5">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 space-y-4">
                    <div className="bg-brand-bg/50 p-3 rounded border border-white/5">
                        <span className="text-[9px] text-brand-muted uppercase font-bold tracking-wider">Quick Start Guide</span>
                        <p className="text-[10px] text-brand-muted leading-relaxed mt-1">
                            Click connect below, authorize repository sync, and unlock your engineering metrics dashboard instantly.
                        </p>
                    </div>

                    <button 
                        onClick={onConnect}
                        className="btn-premium-primary w-full text-xs uppercase font-bold tracking-widest py-2.5 cursor-pointer text-center block"
                    >
                        Connect GitHub Account
                    </button>
                </div>
            </div>

            {/* Right Column: Feature Previews Grid */}
            <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-col gap-0.5 pl-0.5">
                    <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Unlock Features</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Workspace Feature Preview</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {previewCards.map((card) => {
                        const isHovered = hoveredCard === card.id;

                        return (
                            <div
                                key={card.id}
                                className="premium-card bg-brand-surface/40 border border-white/5 rounded-premium p-4 flex flex-col justify-between min-h-[140px] relative transition-all duration-300 hover:border-white/10 hover:shadow-glow cursor-help overflow-visible"
                                onMouseEnter={() => setHoveredCard(card.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Locked Overlay Badge */}
                                <div className="flex justify-between items-center gap-1 mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm select-none">{card.icon}</span>
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">{card.title}</span>
                                    </div>
                                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-sm bg-white/5 border border-white/10 text-brand-muted select-none">
                                        🔒 Locked
                                    </span>
                                </div>

                                <p className="text-[10px] text-brand-muted leading-relaxed mb-4">
                                    {card.desc}
                                </p>

                                <span className="text-[9px] font-semibold text-brand-primary uppercase tracking-wider">
                                    Available after connecting
                                </span>

                                {/* Premium Educational Tooltip */}
                                {isHovered && (
                                    <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[240px] bg-brand-surface border border-brand-primary/30 p-2.5 rounded shadow-2xl z-50 text-[10px] leading-relaxed text-brand-text bg-gradient-to-br from-brand-surface to-brand-bg pointer-events-none select-none">
                                        <div className="font-bold text-brand-accent mb-0.5 uppercase tracking-wide text-[8px]">
                                            {card.badge} Info
                                        </div>
                                        {card.tooltip}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-brand-surface border-r border-b border-brand-primary/30 rotate-45" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PremiumOnboarding;
