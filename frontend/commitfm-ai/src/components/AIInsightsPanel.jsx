import React from "react";
import { motion } from "framer-motion";

const defaultInsights = {
  weeklySummary: "Your velocity increased by +14.8% this week. Primary focuses were refactoring core layout files and improving design system classes.",
  repositoryFindings: "Decoupling score across logical modules is optimal. However, unit test coverage sits at 76%. Core abstractions lack defensive assertion blocks.",
  codingHabits: "Prefers granular, semantic commit messages and extensive PR documentations. Highly active in asynchronous PR reviews.",
  productivityObservations: "Consistent commit distribution over a 7-day streak. Average review response time remains stable at 1.2 hours."
};

export function AIInsightsPanel({ insights = defaultInsights }) {
  const data = { ...defaultInsights, ...insights };

  return (
    <motion.div
      className="premium-card bg-brand-surface/80 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="pb-2.5 border-b border-white/5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Engineering Intelligence Report</h3>
        <p className="text-[10px] text-brand-muted">Repository observations and behavior signals</p>
      </div>

      {/* Weekly Summary */}
      <div className="space-y-1">
        <h4 className="text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
          <span className="text-brand-accent">⚡</span> Weekly Summary
        </h4>
        <p className="text-xs text-brand-text leading-relaxed">
          {data.weeklySummary}
        </p>
      </div>

      {/* Key Findings */}
      <div className="space-y-1 pt-1">
        <h4 className="text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
          <span className="text-brand-primary">💡</span> Key Findings
        </h4>
        <p className="text-xs text-brand-muted leading-relaxed">
          {data.repositoryFindings}
        </p>
      </div>

      {/* Coding Habits & Productivity (Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-white/5">
        <div className="space-y-1">
          <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Coding Habits</h4>
          <p className="text-[10px] text-brand-muted leading-relaxed">
            {data.codingHabits}
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="text-[9px] font-bold text-white uppercase tracking-wider">Productivity</h4>
          <p className="text-[10px] text-brand-muted leading-relaxed">
            {data.productivityObservations}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AIInsightsPanel;
