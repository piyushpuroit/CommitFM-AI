import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRepository } from "../contexts/RepositoryContext";
import LoadingSkeleton from "./common/LoadingSkeleton";
import { buildCoachInsights, buildResumeBullets } from "./analysis/dashboardUtils";

export function CareerCoach() {
  const { analysisResults, analysisLoading, analysisError } = useRepository();
  const [activeTab, setActiveTab] = useState("strengths");

  const insights = useMemo(() => buildCoachInsights(analysisResults), [analysisResults]);
  const resumeBullets = useMemo(() => buildResumeBullets(analysisResults), [analysisResults]);

  if (analysisLoading) {
    return <LoadingSkeleton count={4} variant="cards" />;
  }

  if (analysisError) {
    return (
      <div className="premium-card bg-brand-surface border border-white/5 h-full flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
        <span>⚠️ Unable to load career coach insights</span>
      </div>
    );
  }

  if (!analysisResults) {
    return (
      <div className="premium-card bg-brand-surface border border-white/5 h-full flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
        <span>No analysis data available for coaching.</span>
      </div>
    );
  }

  const tabs = [
    { id: "strengths", label: "Strengths", icon: "🚀" },
    { id: "weaknesses", label: "Weaknesses", icon: "⚠️" },
    { id: "resume", label: "Resume Suggestions", icon: "📄" },
    { id: "roadmap", label: "Learning Roadmap", icon: "🗺️" },
    { id: "roles", label: "Recommended Roles", icon: "💼" }
  ];

  return (
    <motion.div
      className="premium-card bg-brand-surface/80 backdrop-blur-md flex flex-col gap-4 relative overflow-hidden text-left"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Career Coach</h3>
          <p className="text-[10px] text-brand-muted">Portfolio and skill optimization insights from live GitHub metrics</p>
        </div>

        <div className="flex flex-wrap gap-1 bg-brand-bg/50 p-1 rounded-lg border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider transition cursor-pointer select-none flex items-center gap-1 ${activeTab === tab.id
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-brand-muted hover:text-white"
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[220px] pt-1">
        <AnimatePresence mode="wait">
          {activeTab === "strengths" && (
            <motion.div key="strengths" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
              <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Verified Engineering Strengths</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {insights.strengths.map((str, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-brand-bg/40 border border-white/5 text-xs text-white">✓ {str}</div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "weaknesses" && (
            <motion.div key="weaknesses" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
              <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Identified Growth Areas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {insights.weaknesses.map((weak, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-brand-bg/40 border border-white/5 text-xs text-slate-300">▲ {weak}</div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "resume" && (
            <motion.div key="resume" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
              <h4 className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">ATS Resume Bullet Suggestions</h4>
              <div className="space-y-2">
                {resumeBullets.map((bullet, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-brand-bg/40 border border-white/5 text-xs font-mono text-slate-200">• {bullet}</div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "roadmap" && (
            <motion.div key="roadmap" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
              <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Targeted Learning Priorities</h4>
              <div className="space-y-2">
                {insights.learningPriorities.map((topic, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-brand-bg/40 border border-white/5 text-xs font-semibold text-white">🎯 {topic}</div>
                ))}
              </div>
              <div className="space-y-2">
                <h5 className="text-[9px] font-bold text-white uppercase tracking-wider">Missing Skills</h5>
                {insights.missingSkills.map((skill, idx) => (
                  <div key={idx} className="text-[10px] text-brand-muted">• {skill}</div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "roles" && (
            <motion.div key="roles" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
              <h4 className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">Recommended Software Roles</h4>
              <div className="flex flex-wrap gap-2">
                {analysisResults.careerCoach?.recommendedRoles?.map((role, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/30 text-xs font-bold text-brand-accent">💼 {role}</span>
                ))}
              </div>
              <div className="space-y-2 mt-3">
                <h5 className="text-[9px] font-bold text-white uppercase tracking-wider">Interview Focus Areas</h5>
                {insights.interviewFocusAreas.map((area, idx) => (
                  <div key={idx} className="text-[10px] text-brand-muted">• {area}</div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default CareerCoach;
