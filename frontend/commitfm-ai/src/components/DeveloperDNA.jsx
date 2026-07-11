import React from "react";
import { motion } from "framer-motion";

const defaultDNA = {
  archetype: "Refactor Wizard",
  archetypeIcon: "🧙‍♂️",
  archetypeDescription: "Known for leaving code cleaner than they found it. Constantly simplifies complex logic and trims dependency bloat.",
  collaborationStyle: "Async Catalyst - Prefers rich, detailed pull request documentations and asynchronous code review cycles over synchronous standups.",
  strengths: [
    "Simplifies modular architectures",
    "High test coverage standards",
    "Optimizes runtime execution paths"
  ],
  improvements: [
    "Reduce average commit size",
    "Increase frequency of early draft PRs",
    "Address technical debts faster"
  ],
  confidenceScore: 96
};

export function DeveloperDNA({ dna = defaultDNA }) {
  const data = { ...defaultDNA, ...dna };

  return (
    <motion.div
      className="premium-card bg-brand-surface/80 backdrop-blur-md flex flex-col gap-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl pointer-events-none" />

      {/* Header Panel */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Developer DNA</h3>
          <p className="text-[10px] text-brand-muted">Behavioral and architectural profile</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-accent/15 border border-brand-accent/25 text-brand-accent text-[10px] font-bold select-none">
          <span className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
          AI Confidence: {data.confidenceScore}%
        </div>
      </div>

      {/* Archetype Showcase */}
      <div className="flex items-start gap-3 bg-brand-bg/50 p-3 rounded-premium border border-white/5">
        <span className="text-2xl select-none" role="img" aria-label="archetype icon">
          {data.archetypeIcon}
        </span>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-white mb-0.5">
            Archetype: <span className="gradient-text-primary">{data.archetype}</span>
          </h4>
          <p className="text-[10px] text-brand-muted leading-relaxed">
            {data.archetypeDescription}
          </p>
        </div>
      </div>

      {/* Collaboration Style */}
      <div className="space-y-1">
        <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Collaboration Style</h4>
        <p className="text-[10px] text-brand-muted leading-relaxed bg-brand-bg/30 p-2.5 rounded-premium border border-white/5">
          {data.collaborationStyle}
        </p>
      </div>

      {/* Strengths & Improvement Areas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {/* Strengths */}
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <span>✓</span> Strengths
          </h4>
          <ul className="space-y-1">
            {data.strengths.map((strength, idx) => (
              <li key={idx} className="text-[10px] text-brand-text flex items-start gap-1.5">
                <span className="text-emerald-500 font-semibold">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvement Areas */}
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1">
            <span>▲</span> Focus Areas
          </h4>
          <ul className="space-y-1">
            {data.improvements.map((improvement, idx) => (
              <li key={idx} className="text-[10px] text-brand-muted flex items-start gap-1.5">
                <span className="text-brand-primary font-semibold">•</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default DeveloperDNA;
