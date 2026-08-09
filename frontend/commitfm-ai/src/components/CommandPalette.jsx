import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { githubService } from "../services/githubService";

const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      githubService.getRepositories()
        .then(setRepositories)
        .catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const queryLower = query.toLowerCase().trim();

  const filteredRepos = queryLower
    ? repositories.filter(r => r.name.toLowerCase().includes(queryLower) || r.fullName?.toLowerCase().includes(queryLower))
    : repositories.slice(0, 5);

  const actions = [
    { label: "Go to Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Explore Repositories", path: "/repositories", icon: "📁" },
    { label: "Compare Repositories", path: "/compare", icon: "⚖️" },
    { label: "View Developer DNA", path: "/dna", icon: "🧬" },
    { label: "Developer Profile", path: "/profile", icon: "👤" },
    { label: "Settings & Preferences", path: "/settings", icon: "⚙️" },
  ].filter(a => !queryLower || a.label.toLowerCase().includes(queryLower));

  const handleNavigate = (path) => {
    navigate(path);
    onClose(false);
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={() => onClose(false)} />

      <div className="relative w-full max-w-xl bg-brand-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 space-y-2">
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3 border-b border-white/5 gap-3">
          <span className="text-sm">🔍</span>
          <input
            type="text"
            placeholder="Type a command or search repository... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-brand-muted focus:outline-none font-semibold"
          />
          <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto px-2 py-2 space-y-2 text-left">
          {/* System Actions */}
          {actions.length > 0 && (
            <div className="space-y-1">
              <span className="px-3 text-[9px] font-bold text-brand-muted uppercase tracking-wider block">Quick Actions</span>
              {actions.map((act, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigate(act.path)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-brand-primary/10 hover:text-brand-accent transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span>{act.icon}</span>
                    <span>{act.label}</span>
                  </div>
                  <span className="text-[10px] text-brand-muted font-mono">{act.path}</span>
                </button>
              ))}
            </div>
          )}

          {/* Repositories List */}
          {filteredRepos.length > 0 && (
            <div className="space-y-1 pt-2">
              <span className="px-3 text-[9px] font-bold text-brand-muted uppercase tracking-wider block">Repositories</span>
              {filteredRepos.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => handleNavigate(`/dashboard/${repo.owner?.login || repo.owner}/${repo.name}`)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-white/5 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>📦</span>
                    <span className="truncate">{repo.fullName || repo.name}</span>
                  </div>
                  <span className="text-[10px] text-brand-accent font-semibold shrink-0">★ {repo.starsCount || 0}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
