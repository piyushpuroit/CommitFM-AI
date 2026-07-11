import React from "react";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";

const mockDNARecords = {
  archetype: "System Architect",
  archetypeIcon: "🏗️",
  archetypeDescription: "Focuses heavily on defining core structures, design patterns, and cross-module boundaries. Writes highly decoupled, abstract code and designs reusable modules.",
  collaborationStyle: "Architectural Catalyst - Active in design proposals, API reviews, and modular PR comments. Prefers early alignment draft documents over direct synchronous standups.",
  strengths: [
    { title: "Modular System Design", desc: "Consistently designs decoupled interfaces and reusable libraries." },
    { title: "Refactoring & Cleanup", desc: "Reduces duplicate code paths and trims architectural layers." },
    { title: "Excellent Documentation", desc: "Adds clear code comments, API specs, and structural diagrams." }
  ],
  improvements: [
    { title: "Minor Fix Cycle Speed", desc: "Spend less time polishing minor refactors and focus on critical paths." },
    { title: "Incremental Commits", desc: "Break large modular updates into smaller, single-responsibility commits." },
    { title: "Unit Test Depth", desc: "Provide high coverage density for newly defined core abstractions." }
  ],
  techFocus: [
    { area: "Core Business Logic", percentage: 50, color: "bg-brand-primary" },
    { area: "API & Data Layers", percentage: 30, color: "bg-brand-accent" },
    { area: "Infrastructure & CI/CD", percentage: 20, color: "bg-slate-500" }
  ],
  confidenceScore: 94,
  confidenceBreakdown: {
    dataPoints: 248,
    patternCorrelation: "92%",
    consistencyIndex: "88%"
  }
};

const DeveloperDNAPage = () => {
  const data = mockDNARecords;

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
    <MainLayout showHero={false} showAnalytics={false} showFeatures={false}>
      <div className="space-y-6">
        
        {/* Page Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-premium bg-brand-surface border border-white/5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">AI Behavioral Profiling</span>
            <h2 className="text-lg font-bold text-white tracking-tight">Developer DNA Profile</h2>
            <p className="text-xs text-brand-muted">Deconstructed analysis of commit patterns and engineering tendencies</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-semibold select-none self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Profile Confidence: {data.confidenceScore}%
          </div>
        </motion.div>

        {/* Dashboard DNA Layout Grid */}
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
                  {data.archetypeIcon}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Engineering Archetype</h3>
                  <span className="text-[10px] font-semibold text-brand-primary">{data.archetype}</span>
                </div>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                {data.archetypeDescription}
              </p>
            </motion.div>

            {/* Technical Focus Panel */}
            <motion.div variants={itemVariants} className="premium-card">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">Technical Focus Distribution</h3>
              <div className="space-y-3">
                {data.techFocus.map((focus, idx) => (
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
              </div>
            </motion.div>

            {/* AI Confidence Score Insights */}
            <motion.div variants={itemVariants} className="premium-card">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">Confidence Metrics</h3>
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="bg-brand-bg/50 p-2.5 rounded-premium border border-white/5 text-center">
                  <div className="text-[9px] text-brand-muted font-medium uppercase">Data Points</div>
                  <div className="text-sm font-black text-white mt-0.5">{data.confidenceBreakdown.dataPoints}</div>
                </div>
                <div className="bg-brand-bg/50 p-2.5 rounded-premium border border-white/5 text-center">
                  <div className="text-[9px] text-brand-muted font-medium uppercase">Pattern Correlation</div>
                  <div className="text-sm font-black text-brand-accent mt-0.5">{data.confidenceBreakdown.patternCorrelation}</div>
                </div>
                <div className="bg-brand-bg/50 p-2.5 rounded-premium border border-white/5 text-center">
                  <div className="text-[9px] text-brand-muted font-medium uppercase">Consistency</div>
                  <div className="text-sm font-black text-brand-primary mt-0.5">{data.confidenceBreakdown.consistencyIndex}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Strengths, Improvements, Collaboration Style) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Strengths */}
            <motion.div variants={itemVariants} className="premium-card">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span>✓</span> Engineering Strengths
              </h3>
              <div className="space-y-2">
                {data.strengths.map((str, idx) => (
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
                {data.improvements.map((imp, idx) => (
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
                {data.collaborationStyle}
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </MainLayout>
  );
};

export default DeveloperDNAPage;
