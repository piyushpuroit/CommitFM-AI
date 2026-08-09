import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRepository } from "../contexts/RepositoryContext";

const EngineeringDecisionInsights = () => {
    const { analysisResults, analysisLoading } = useRepository();
    const [selectedTab, setSelectedTab] = useState("strengths");

    if (analysisLoading || !analysisResults) {
        return (
            <div className="premium-card bg-brand-surface border border-white/5 h-full flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
                <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                <span>Generating decision insights...</span>
            </div>
        );
    }

    const { repositorySummary, repositoryMetrics, repositoryActivity } = analysisResults;

    const numLangs = Object.keys(repositorySummary.languageDistribution || {}).length;
    const isMultilingual = numLangs > 1;

    const insights = {
        strengths: [
            {
                title: isMultilingual ? "Multilingual Architecture" : "Focused Core Technology Stack",
                description: `This codebase implements ${numLangs} active languages, led by ${repositoryMetrics.defaultLanguage || "Unknown"}, encouraging single-responsibility patterns.`
            },
            {
                title: "Decoupled Git Workspace Integration",
                description: `Consumes data securely using OAuth credentials for ${repositorySummary.owner}, ensuring direct API updates without database dependencies.`
            }
        ],
        debt: [
            {
                title: repositoryMetrics.numberOfFiles > 150 ? "Directory Density Warning" : "Directory Layout Status",
                description: `Workspace maps ${repositoryMetrics.numberOfFiles} files across ${repositoryMetrics.numberOfDirectories} folders. Consider simplifying path hierarchies.`
            },
            {
                title: "Repository Engagement Signals",
                description: `Visibility and code reuse signals show ${repositorySummary.stars} stars and ${repositorySummary.forks} forks, which suggests personal or internal-focused project settings.`
            }
        ],
        refactoring: [
            {
                title: "Flatten Complex Directory Trees",
                description: `Identified ${repositoryMetrics.numberOfDirectories} subdirectories. Flattening folder scopes can help reduce navigation nesting in IDEs.`
            },
            {
                title: `Strict Verification for ${repositoryMetrics.defaultLanguage || "Main Stack"}`,
                description: `Configuring strict compilation guidelines for ${repositoryMetrics.defaultLanguage || "your main language"} will reduce runtime crashes.`
            }
        ],
        maintainability: [
            {
                title: "Clean Branch Posture",
                description: `This workspace integrates files around the default branch '${repositorySummary.defaultBranch}', with ${repositoryActivity.activeBranches?.length || 1} active branches monitored.`
            },
            {
                title: "Cohesive Codebase Volume",
                description: `Estimated workspace codebase size is ${repositoryMetrics.totalSize} KB, keeping build times and network payloads extremely lightweight.`
            }
        ]
    };

    const tabs = [
        { id: "strengths", label: "Architectural Strengths", icon: "🛡️", color: "text-[#22D3EE] border-[#22D3EE]/20 bg-[#22D3EE]/5" },
        { id: "debt", label: "Technical Debt", icon: "⚠️", color: "text-amber-400 border-amber-500/20 bg-amber-500/5" },
        { id: "refactoring", label: "Refactoring Paths", icon: "🔄", color: "text-[#8B5CF6] border-[#8B5CF6]/20 bg-[#8B5CF6]/5" },
        { id: "maintainability", label: "Maintainability", icon: "👁️", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" }
    ];

    const currentTab = tabs.find(t => t.id === selectedTab);
    const activeList = insights[selectedTab] || [];

    return (
        <div className="premium-card bg-brand-surface flex flex-col gap-4 border border-white/5 h-full relative overflow-hidden text-left">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="border-b border-white/5 pb-3 relative z-10">
                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Engineering Decisions Diagnostic</h4>
                <p className="text-[9px] text-brand-muted mt-0.5">Codebase heuristics and design pattern analysis</p>
            </div>

            {/* Tab Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-brand-bg/50 p-1 rounded-md border border-white/5 relative z-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`px-2 py-1.5 rounded text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer select-none ${
                            selectedTab === tab.id
                                ? "bg-brand-primary text-white"
                                : "text-brand-muted hover:text-brand-text hover:bg-white/5"
                        }`}
                    >
                        <span>{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label.split(" ")[0]}</span>
                        <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    </button>
                ))}
            </div>

            {/* Content Display */}
            <div className="flex-1 min-h-[160px] relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded border text-[8px] font-extrabold uppercase tracking-widest ${currentTab.color}`}>
                                {currentTab.label}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {activeList.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-3 rounded-premium bg-brand-bg/40 border border-white/5 hover:border-white/10 transition duration-200"
                                >
                                    <h5 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                                        {item.title}
                                    </h5>
                                    <p className="text-[10px] text-brand-muted leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}

                            {activeList.length === 0 && (
                                <div className="text-center py-8 text-[10px] text-brand-muted">
                                    No diagnostics reported for this category.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EngineeringDecisionInsights;
