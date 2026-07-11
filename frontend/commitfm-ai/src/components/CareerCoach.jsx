import React from "react";
import { motion } from "framer-motion";

const defaultCoachData = {
  strengths: [
    "Clean structural abstractions",
    "Optimized render patterns",
    "Comprehensive documentation"
  ],
  weaknesses: [
    "Low test suite density",
    "Frequent minor commit batches",
    "Dependency bloat in layout layers"
  ],
  recommendedSkills: [
    "Integration testing architectures",
    "CI/CD workflow automation",
    "Client-side caching strategies"
  ],
  nextTech: ["Next.js", "Docker", "GraphQL"],
  resumeReadiness: 85
};

export function CareerCoach({ coachData = defaultCoachData }) {
  const data = { ...defaultCoachData, ...coachData };

  return (
    <motion.div
      className="premium-card bg-brand-surface/80 backdrop-blur-md flex flex-col gap-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />

      {/* Header Panel */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Career Coach</h3>
          <p className="text-[10px] text-brand-muted">Resume and skill optimization suggestions</p>
        </div>
        <div className="flex items-baseline gap-1 bg-brand-primary/15 border border-brand-primary/25 px-2 py-0.5 rounded-full text-[10px] text-brand-text select-none">
          <span className="text-[11px] font-black text-brand-accent">{data.resumeReadiness}%</span>
          <span className="text-[8px] text-brand-muted">Resume Ready</span>
        </div>
      </div>

      {/* Recommended Tech & Skills Row */}
      <div className="grid grid-cols-2 gap-3.5 bg-brand-bg/50 p-3 rounded-premium border border-white/5">
        <div>
          <h4 className="text-[9px] font-bold text-white uppercase tracking-wider mb-1.5">Next Tech to Learn</h4>
          <div className="flex flex-wrap gap-1">
            {data.nextTech.map((tech, idx) => (
              <span key={idx} className="text-[9px] bg-brand-primary/10 border border-brand-primary/25 text-brand-accent px-1.5 py-0.5 rounded-sm font-semibold select-none">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[9px] font-bold text-white uppercase tracking-wider mb-1.5">Suggested Skills</h4>
          <div className="flex flex-wrap gap-1">
            {data.recommendedSkills.map((skill, idx) => (
              <span key={idx} className="text-[9px] bg-white/5 border border-white/5 text-brand-text px-1.5 py-0.5 rounded-sm font-medium select-none">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths & Focus Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {/* Strengths */}
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <span>🚀</span> Key Strengths
          </h4>
          <ul className="space-y-1">
            {data.strengths.map((str, idx) => (
              <li key={idx} className="text-[10px] text-brand-text flex items-start gap-1.5">
                <span className="text-emerald-500 font-semibold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses / Focus Areas */}
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-bold text-brand-accent uppercase tracking-wider flex items-center gap-1">
            <span>🔧</span> Growth Areas
          </h4>
          <ul className="space-y-1">
            {data.weaknesses.map((weak, idx) => (
              <li key={idx} className="text-[10px] text-brand-muted flex items-start gap-1.5">
                <span className="text-brand-accent font-semibold">•</span>
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default CareerCoach;
