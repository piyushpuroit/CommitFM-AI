import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuickActionsFAB = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { label: "Compare Repositories", icon: "⚖️", action: () => navigate("/compare") },
    { label: "Developer DNA", icon: "🧬", action: () => navigate("/dna") },
    { label: "Profile", icon: "👤", action: () => navigate("/profile") },
    { label: "Search", icon: "🔍", action: () => navigate("/search") },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 select-none">
      {/* Expanded Quick Action Items */}
      {open && (
        <div className="flex flex-col items-end gap-2 mb-1 animate-fadeIn">
          {actions.map((act, idx) => (
            <button
              key={idx}
              onClick={() => {
                act.action();
                setOpen(false);
              }}
              className="flex items-center gap-2 bg-brand-surface border border-white/10 hover:border-brand-primary/40 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-xl transition hover:scale-105 cursor-pointer"
            >
              <span>{act.label}</span>
              <span>{act.icon}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-primary to-brand-accent text-white shadow-2xl flex items-center justify-center text-xl transition hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
        title="Quick Actions"
      >
        {open ? "✕" : "⚡"}
      </button>
    </div>
  );
};

export default QuickActionsFAB;
