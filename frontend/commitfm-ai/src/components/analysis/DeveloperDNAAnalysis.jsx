import { useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { useRepository } from "../../contexts/RepositoryContext";
import { buildDnaMetrics } from "./dashboardUtils";

const DeveloperDNAAnalysis = () => {
  const { analysisResults, analysisLoading, analysisError } = useRepository();

  const metrics = useMemo(() => buildDnaMetrics(analysisResults), [analysisResults]);

  if (analysisLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-[10px] text-brand-muted font-semibold gap-3 min-h-[300px]">
        <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        Generating developer behavior profile...
      </div>
    );
  }

  if (analysisError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-[11px] text-red-400 font-semibold gap-2 text-center px-4 min-h-[300px]">
        <span>⚠️ Failed to load developer DNA profile</span>
        <span className="text-zinc-500 font-medium">{analysisError}</span>
      </div>
    );
  }

  if (!analysisResults) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 text-[10px] text-brand-muted font-semibold min-h-[300px]">
        No behavioral telemetry data available for this repository.
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" }
    }
  };

  return (
    <div className="space-y-6 text-left">
      <SectionHeader
        badge="Behavioral Profiling"
        title="Developer DNA Profile"
        subtitle="Score, reason, evidence, and confidence for each repository-derived signature"
        rightElement={
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-semibold select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Metrics: {metrics.length}
          </div>
        }
      />

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:col-span-6 space-y-5">
          <motion.div variants={itemVariants} className="premium-card flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/5">
              <span className="text-2xl select-none">🧬</span>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Archetype</h3>
                <span className="text-[10px] font-semibold text-brand-primary">{analysisResults.developerDna?.engineeringArchetype || "Software Engineer"}</span>
              </div>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              This profile is derived from the repository’s commit cadence, collaboration activity, and language distribution in the live analysis response.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-6 space-y-5">
          <motion.div variants={itemVariants} className="premium-card">
            <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-3">Repository Signals</h3>
            <div className="space-y-2 text-[10px] text-brand-muted">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Commit cadence</span>
                <span className="font-semibold text-white">{analysisResults.commitSummary?.totalCommitsAnalysed || 0}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Current streak</span>
                <span className="font-semibold text-white">{analysisResults.telemetry?.currentStreak || 0} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Top active hour</span>
                <span className="font-semibold text-white">{analysisResults.commitSummary?.busiestHour || "N/A"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-5 rounded-premium bg-brand-surface border border-white/5 hover:border-white/10 transition duration-200 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{metric.label}</h4>
                <div className="text-sm font-black text-brand-primary mt-0.5">{metric.score}</div>
              </div>
              <span className="text-[10px] font-semibold text-brand-accent">{metric.confidence}</span>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                <span className="text-slate-500 uppercase tracking-widest text-[8px] font-bold block">REASON:</span>
                {metric.reason}
              </p>
              <p className="text-[10px] text-brand-muted leading-relaxed">
                <span className="text-slate-500 uppercase tracking-widest text-[8px] font-bold block">EVIDENCE:</span>
                {metric.evidence}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperDNAAnalysis;
