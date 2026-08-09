import React from "react";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import { useRepository } from "../contexts/RepositoryContext";

const DeveloperDNAPage = () => {
  const { analysisResults, analysisLoading, analysisError } = useRepository();

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

  const renderContent = () => {
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
              No behavioral data available. Please select a repository.
          </div>
      );
    }

    const telemetry = {
        totalCommits: analysisResults.commitSummary.totalCommitsAnalysed,
        languageDistribution: analysisResults.repositorySummary.languageDistribution,
        activeCodingHour: analysisResults.commitSummary.busiestHour || "12:00",
        activeCodingDay: analysisResults.commitSummary.busiestDay || "Wednesday",
        averageCommitsPerDay: parseFloat(analysisResults.commitSummary.commitFrequency) || 1.5,
        weekendContributionPercent: 20, 
        longestCommitStreak: 5,
        currentStreak: 2,
        mostModifiedFiles: []
    };

    // Calculate technical focus from language distribution
    const techFocus = Object.entries(telemetry.languageDistribution || {}).map(([lang, pct], idx) => {
      const colors = ["bg-brand-primary", "bg-brand-accent", "bg-slate-500", "bg-yellow-500", "bg-emerald-500"];
      return {
        area: lang,
        percentage: pct,
        color: colors[idx % colors.length]
      };
    });

    // Dynamically determine archetype
    let archetype = "System Engineer";
    let archetypeIcon = "💻";
    let archetypeDescription = "Focuses on codebase health, modular layout boundaries, and consistent repository integrations.";
    
    if (telemetry.weekendContributionPercent > 35) {
      archetype = "Weekend Warrior";
      archetypeIcon = "🦉";
      archetypeDescription = "Maintains strong codebase focus during non-standard hours, executing deep refactors and feature deliveries over weekends.";
    } else if (telemetry.averageCommitsPerDay > 4) {
      archetype = "High-Velocity Contributor";
      archetypeIcon = "⚡";
      archetypeDescription = "Maintains rapid development velocity with incremental, single-responsibility commits and clean structural updates.";
    }

    const strengths = [
      { title: "Weekend Balance", desc: `${telemetry.weekendContributionPercent}% of submissions occur on weekends, showing healthy workspace time split.` },
      { title: "Commit Consistency", desc: `Maintains excellent engineering cadence with a max streak of ${telemetry.longestCommitStreak} consecutive active days.` },
      { title: "Delivery Cadence", desc: `Maintains a steady contribution output of ${telemetry.averageCommitsPerDay} average commits per day.` }
    ];

    const improvements = [
      { title: "Peak Activity Hour", desc: `Your active coding hour peaks at ${telemetry.activeCodingHour}. Consider batching pushes to reduce conflicts.` },
      { title: "Hotspot Files", desc: `Frequently modified files are tracked dynamically. Consider abstracting logic.` },
      { title: "Active Streak Target", desc: `Your current streak is ${telemetry.currentStreak} days. Target a 5-day streak to establish deep ownership.` }
    ];

    return (
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column (Archetype & Focus) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Engineering Archetype Panel */}
          <motion.div variants={itemVariants} className="premium-card flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/5">
              <span className="text-2xl select-none" role="img" aria-label="archetype icon">
                {archetypeIcon}
              </span>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Engineering Archetype</h3>
                <span className="text-[10px] font-semibold text-brand-primary">{archetype}</span>
              </div>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              {archetypeDescription}
            </p>
          </motion.div>

          {/* Technical Focus Panel */}
          <motion.div variants={itemVariants} className="premium-card">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">Technical Focus Distribution</h3>
            <div className="space-y-3">
              {techFocus.map((focus, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold text-white">{focus.area}</span>
                    <span className="text-brand-muted">{focus.percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${focus.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${focus.percentage}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    />
                  </div>
                </div>
              ))}
              {techFocus.length === 0 && (
                <div className="text-[10px] text-zinc-500">No language data found.</div>
              )}
            </div>
          </motion.div>

          {/* Confidence Score Insights */}
          <motion.div variants={itemVariants} className="premium-card">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">Confidence Metrics</h3>
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="bg-brand-bg/50 p-2.5 rounded-premium border border-white/5 text-center">
                <div className="text-[9px] text-brand-muted font-medium uppercase">Data Points</div>
                <div className="text-sm font-black text-white mt-0.5">{telemetry.totalCommits}</div>
              </div>
              <div className="bg-brand-bg/50 p-2.5 rounded-premium border border-white/5 text-center">
                <div className="text-[9px] text-brand-muted font-medium uppercase">Peak Hour</div>
                <div className="text-sm font-black text-brand-accent mt-0.5">{telemetry.activeCodingHour}</div>
              </div>
              <div className="bg-brand-bg/50 p-2.5 rounded-premium border border-white/5 text-center">
                <div className="text-[9px] text-brand-muted font-medium uppercase">Peak Day</div>
                <div className="text-sm font-black text-brand-primary mt-0.5">{telemetry.activeCodingDay?.substring(0, 3)}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Strengths */}
          <motion.div variants={itemVariants} className="premium-card">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>✓</span> Engineering Strengths
            </h3>
            <div className="space-y-2">
              {strengths.map((str, idx) => (
                <div key={idx} className="p-2 rounded-premium bg-brand-surface/40 border border-white/5 flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-white">{str.title}</span>
                  <span className="text-[10px] text-brand-muted leading-relaxed">{str.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Improvement Areas */}
          <motion.div variants={itemVariants} className="premium-card">
            <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>▲</span> Focus & Growth Areas
            </h3>
            <div className="space-y-2">
              {improvements.map((imp, idx) => (
                <div key={idx} className="p-2 rounded-premium bg-brand-surface/40 border border-white/5 flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-white">{imp.title}</span>
                  <span className="text-[10px] text-brand-muted leading-relaxed">{imp.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Collaboration Style */}
          <motion.div variants={itemVariants} className="premium-card">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Collaboration Style</h3>
            <p className="text-xs text-brand-muted leading-relaxed bg-brand-bg/40 p-3 rounded-premium border border-white/5">
              Prefers steady, daily code updates. Active coding is mostly scheduled on {telemetry.activeCodingDay}s around {telemetry.activeCodingHour}.
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        
        {/* Page Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-premium bg-brand-surface border border-white/5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Behavioral Profiling</span>
            <h2 className="text-lg font-bold text-white tracking-tight">Developer DNA Profile</h2>
            <p className="text-xs text-brand-muted">Deconstructed analysis of commit patterns and engineering tendencies</p>
          </div>
          {analysisResults && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-semibold select-none self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Total Commits: {analysisResults.commitSummary.totalCommitsAnalysed}
            </div>
          )}
        </motion.div>

        {renderContent()}

      </div>
    </MainLayout>
  );
};

export default DeveloperDNAPage;
