import React from "react";
import { motion } from "framer-motion";

const defaultReadiness = {
  score: 88,
  explanation: "Strong structural design and decoupling habits visible in code patterns. Lacks cloud deployments and caching records.",
  missingSkills: ["Redis Caching", "Docker / Containerization", "Kubernetes"],
  suggestedImprovements: [
    "Introduce container specs (Dockerfile) into repository workflows.",
    "Refactor logic modules to implement transactional caching structures."
  ]
};

export function ResumeReadinessCard({ readiness = defaultReadiness }) {
  const data = { ...defaultReadiness, ...readiness };

  return (
    <motion.div
      className="premium-card bg-brand-surface/80 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden"
      whileHover={{ scale: 1.01, borderColor: "rgba(124, 58, 237, 0.2)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl pointer-events-none" />

      {/* Header / Score Display */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/5 gap-4">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Resume Readiness</h3>
          <p className="text-[10px] text-brand-muted">Market readiness based on commit patterns</p>
        </div>
        
        {/* Large Score Indicator */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="h-11 w-11 rounded-full border-[3.5px] border-white/5 flex items-center justify-center relative select-none">
            <svg className="absolute inset-0 transform -rotate-90 w-full h-full">
              <circle
                cx="22"
                cy="22"
                r="18.5"
                fill="transparent"
                stroke="var(--color-brand-primary)"
                strokeWidth="3.5"
                strokeDasharray="116.2"
                strokeDashoffset={116.2 - (116.2 * data.score) / 100}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xs font-black text-white">{data.score}</span>
          </div>
        </div>
      </div>

      {/* Qualitative Feedback Text */}
      <div className="bg-brand-bg/50 p-2.5 rounded-premium border border-white/5">
        <p className="text-xs text-brand-muted leading-relaxed">
          <span className="text-brand-accent font-semibold">AI Feedback:</span> {data.explanation}
        </p>
      </div>

      {/* Missing Skills Tags */}
      <div>
        <h4 className="text-[9px] font-bold text-white uppercase tracking-wider mb-2">Missing Market Skills</h4>
        <div className="flex flex-wrap gap-1.5">
          {data.missingSkills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[9px] bg-brand-primary/10 border border-brand-primary/20 text-brand-accent px-2 py-0.5 rounded-sm font-semibold select-none"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="pt-2 border-t border-white/5">
        <h4 className="text-[9px] font-bold text-white uppercase tracking-wider mb-2">Suggested Portfolio Adjustments</h4>
        <ul className="space-y-1.5">
          {data.suggestedImprovements.map((imp, idx) => (
            <li key={idx} className="text-[10px] text-brand-muted flex items-start gap-1.5 leading-normal">
              <span className="text-brand-primary font-bold mt-0.5">•</span>
              <span>{imp}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default ResumeReadinessCard;
