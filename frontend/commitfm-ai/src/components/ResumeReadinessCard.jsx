import { useMemo } from "react";
import { motion } from "framer-motion";
import { useRepository } from "../contexts/RepositoryContext";
import LoadingSkeleton from "./common/LoadingSkeleton";
import { buildResumeBullets } from "./analysis/dashboardUtils";

export function ResumeReadinessCard() {
  const { analysisResults, analysisLoading, analysisError } = useRepository();

  const resumeBullets = useMemo(() => buildResumeBullets(analysisResults), [analysisResults]);

  if (analysisLoading) {
    return <LoadingSkeleton count={4} variant="cards" />;
  }

  if (analysisError) {
    return (
      <div className="premium-card bg-brand-surface border border-white/5 h-full flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
        <span>⚠️ Unable to load resume diagnostics</span>
      </div>
    );
  }

  if (!analysisResults) {
    return (
      <div className="premium-card bg-brand-surface border border-white/5 h-full flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
        <span>No analysis data available for resume generation.</span>
      </div>
    );
  }

  const missingSkills = analysisResults.careerCoach?.skillsToImprove || [
    "Docker / Containerization",
    "CI/CD Workflow Automation",
    "Automated Test Coverage"
  ];

  return (
    <motion.div
      className="premium-card bg-brand-surface/80 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden text-left"
      whileHover={{ scale: 1.01, borderColor: "rgba(124, 58, 237, 0.2)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl pointer-events-none" />

      {/* Header / Score Display */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/5 gap-4">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Resume Readiness</h3>
          <p className="text-[10px] text-brand-muted">ATS-ready bullet points derived from measurable repository metrics</p>
        </div>
      </div>

      {/* Missing Skills Tags */}
      <div>
        <h4 className="text-[9px] font-bold text-white uppercase tracking-wider mb-2">Missing Market Skills</h4>
        <div className="flex flex-wrap gap-1.5">
          {missingSkills.map((skill, idx) => (
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
        <h4 className="text-[9px] font-bold text-white uppercase tracking-wider mb-2">Generated Resume Bullets</h4>
        <ul className="space-y-1.5">
          {resumeBullets.map((imp, idx) => (
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
