import React from "react";
import { motion } from "framer-motion";

const defaultSkills = {
  "Backend": 90,
  "Frontend": 70,
  "System Design": 85,
  "Testing": 60,
  "DevOps": 75,
  "Documentation": 80
};

export function SkillRadar({ skills = defaultSkills }) {
  const categories = Object.keys(defaultSkills);
  const data = { ...defaultSkills, ...skills };

  const center = 50;
  const maxRadius = 32;

  // Angles for 6 dimensions (0 to 5) offset by -90deg to start at top
  const getCoordinates = (index, value) => {
    const angle = (index * 60 - 90) * (Math.PI / 180);
    const radius = (value / 100) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  // Concentric hexagons coordinates
  const levelHexagons = [0.2, 0.4, 0.6, 0.8, 1.0].map((level) => {
    const points = categories.map((_, idx) => {
      const { x, y } = getCoordinates(idx, level * 100);
      return `${x},${y}`;
    }).join(" ");
    return points;
  });

  // User skills polygon
  const skillPoints = categories.map((cat, idx) => {
    const score = data[cat] || 0;
    const { x, y } = getCoordinates(idx, score);
    return `${x},${y}`;
  }).join(" ");

  // Text label offsets for styling
  const labelPositions = [
    { x: 50, y: 12, textAnchor: "middle", dy: "-6" }, // Top (Backend)
    { x: 84, y: 32, textAnchor: "start", dx: "6" },   // Top Right (Frontend)
    { x: 84, y: 68, textAnchor: "start", dx: "6" },   // Bottom Right (System Design)
    { x: 50, y: 88, textAnchor: "middle", dy: "12" }, // Bottom (Testing)
    { x: 16, y: 68, textAnchor: "end", dx: "-6" },    // Bottom Left (DevOps)
    { x: 16, y: 32, textAnchor: "end", dx: "-6" }     // Top Left (Documentation)
  ];

  return (
    <motion.div
      className="premium-card bg-brand-surface/80 backdrop-blur-md flex flex-col gap-3.5 relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl pointer-events-none" />

      {/* Title */}
      <div className="pb-2.5 border-b border-white/5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Skill Architecture</h3>
        <p className="text-[10px] text-brand-muted">Multi-dimensional engineering competency radar</p>
      </div>

      {/* Radar Chart Visual */}
      <div className="flex justify-center py-2 relative">
        <svg viewBox="0 0 100 100" className="w-full max-w-[200px] h-auto overflow-visible">
          {/* Level Grid Lines */}
          {levelHexagons.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="0.5"
            />
          ))}

          {/* Web Spoke Lines */}
          {categories.map((_, idx) => {
            const { x, y } = getCoordinates(idx, 100);
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="0.5"
              />
            );
          })}

          {/* User Score Area */}
          <motion.polygon
            points={skillPoints}
            fill="rgba(124, 58, 237, 0.15)"
            stroke="var(--color-brand-accent)"
            strokeWidth="1.2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* User Vertex Handles */}
          {categories.map((cat, idx) => {
            const score = data[cat] || 0;
            const { x, y } = getCoordinates(idx, score);
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="1.2"
                fill="var(--color-brand-accent)"
                stroke="#111827"
                strokeWidth="0.4"
              />
            );
          })}

          {/* Label Placements */}
          {categories.map((cat, idx) => {
            const pos = labelPositions[idx];
            return (
              <text
                key={idx}
                x={pos.x}
                y={pos.y}
                textAnchor={pos.textAnchor}
                dx={pos.dx || "0"}
                dy={pos.dy || "0"}
                className="text-[6.5px] fill-brand-muted font-semibold tracking-wide"
              >
                {cat} ({data[cat]}%)
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend / Metrics List */}
      <div className="grid grid-cols-3 gap-2.5 pt-2.5 border-t border-white/5 text-center">
        <div>
          <div className="text-[8px] text-brand-muted font-medium uppercase">Strongest</div>
          <div className="text-[10px] font-bold text-brand-accent">Backend</div>
        </div>
        <div>
          <div className="text-[8px] text-brand-muted font-medium uppercase">Total Depth</div>
          <div className="text-[10px] font-bold text-white">Advanced</div>
        </div>
        <div>
          <div className="text-[8px] text-brand-muted font-medium uppercase">Balance</div>
          <div className="text-[10px] font-bold text-brand-primary">Optimal</div>
        </div>
      </div>
    </motion.div>
  );
}

export default SkillRadar;
