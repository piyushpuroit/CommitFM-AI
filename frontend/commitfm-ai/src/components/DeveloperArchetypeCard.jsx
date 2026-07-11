import React from "react";
import { motion } from "framer-motion";

const ARCHETYPE_PROFILES = {
  "Backend Architect": {
    icon: "🏗️",
    description: "Designs robust database relationships, defines core system configurations, and handles decoupling module boundaries.",
    traits: ["Schema design", "Decoupled architecture", "API design patterns"]
  },
  "Refactor Wizard": {
    icon: "🧙‍♂️",
    description: "Trims legacy technical debt, simplifies bloated logic layers, and maintains extreme code cleanliness.",
    traits: ["Logic simplification", "DRY enforcement", "Code readability"]
  },
  "System Thinker": {
    icon: "🌐",
    description: "Analyzes applications as a series of pipelines, optimizing data flows, stability, and end-to-end integration.",
    traits: ["Pipeline efficiency", "E2E optimization", "System flows"]
  },
  "Product Engineer": {
    icon: "🎨",
    description: "Bridges the gap between backend capabilities and user interfaces. Focuses on details, layout styling, and UX.",
    traits: ["UX empathy", "Layout aesthetics", "Interactive states"]
  },
  "Performance Optimizer": {
    icon: "⚡",
    description: "Identifies memory leaks, minimizes bundle sizes, and streamlines rendering loops and request latency.",
    traits: ["Asset tuning", "Latency reduction", "Memory profiling"]
  },
  "Bug Hunter": {
    icon: "🐞",
    description: "Excels at tracking obscure logs, replicating edge cases, and building highly resilient error validation safeguards.",
    traits: ["Root-cause tracing", "Defensive checking", "Boundary protection"]
  }
};

export function DeveloperArchetypeCard({ archetype = "Refactor Wizard", confidence = 92, customTraits, customDescription }) {
  // Safe lookup with fallback profile
  const profile = ARCHETYPE_PROFILES[archetype] || ARCHETYPE_PROFILES["Refactor Wizard"];

  const description = customDescription || profile.description;
  const traits = customTraits || profile.traits;

  return (
    <motion.div
      className="premium-card bg-brand-surface/80 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden"
      whileHover={{ scale: 1.01, borderColor: "rgba(124, 58, 237, 0.2)" }}
      transition={{ duration: 0.2 }}
    >
      {/* Decorative light ray glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl select-none" role="img" aria-label={`${archetype} icon`}>
            {profile.icon}
          </span>
          <div>
            <h3 className="text-xs font-bold text-white leading-tight">{archetype}</h3>
            <span className="text-[9px] text-brand-muted uppercase tracking-wider font-semibold">Primary Archetype</span>
          </div>
        </div>
        
        {/* Confidence Percentage Badge */}
        <div className="flex flex-col items-end">
          <span className="text-xs font-black text-brand-accent">{confidence}%</span>
          <span className="text-[8px] text-brand-muted">Confidence</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-brand-muted leading-relaxed">
        {description}
      </p>

      {/* Key Traits List */}
      <div className="pt-1.5 border-t border-white/5">
        <h4 className="text-[9px] font-bold text-white uppercase tracking-wider mb-2">Key Core Traits</h4>
        <div className="flex flex-wrap gap-1.5">
          {traits.map((trait, idx) => (
            <span
              key={idx}
              className="text-[9px] bg-brand-primary/10 border border-brand-primary/20 text-brand-text px-2 py-0.5 rounded-sm font-semibold select-none"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default DeveloperArchetypeCard;
