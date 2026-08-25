import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useRepository } from "../contexts/RepositoryContext";

const SettingsPage = () => {
  const { user, logout, login } = useRepository();
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleClearCache = () => {
    localStorage.clear();
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 3000);
  };

  const handleReconnect = () => {
    login();
  };

  return (
    <MainLayout>
      <div className="space-y-6 text-left max-w-4xl mx-auto">
        <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
          <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Preferences</span>
          <h1 className="text-lg font-bold text-white tracking-tight">System & Account Settings</h1>
          <p className="text-xs text-brand-muted">Manage theme preferences, active GitHub authentication, and local data cache.</p>
        </div>

        {/* Section 1: Authentication */}
        <div className="p-5 rounded-2xl bg-brand-surface border border-white/5 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2.5">
            GitHub Session & Account
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-white">Active Account</p>
              <p className="text-xs text-brand-muted mt-0.5">
                {user ? `Connected as @${user.login} (${user.name})` : "Not authenticated"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReconnect}
                className="bg-brand-primary text-white border border-brand-primary/20 px-3 py-1.5 rounded text-xs font-bold transition hover:bg-brand-primary/90 cursor-pointer select-none"
              >
                Reconnect GitHub
              </button>
              {user && (
                <button
                  onClick={logout}
                  className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded text-xs font-bold transition hover:bg-red-500/20 cursor-pointer select-none"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Cache & Storage */}
        <div className="p-5 rounded-2xl bg-brand-surface border border-white/5 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2.5">
            Local Data & Cache
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-white">Browser Storage Cache</p>
              <p className="text-xs text-brand-muted mt-0.5">
                Clear locally cached repository selections and stored tokens.
              </p>
            </div>
            <button
              onClick={handleClearCache}
              className="bg-white/5 border border-white/10 hover:border-white/20 text-white px-3 py-1.5 rounded text-xs font-bold transition cursor-pointer select-none"
            >
              {cacheCleared ? "✓ Cache Cleared" : "Clear Local Cache"}
            </button>
          </div>
        </div>

        {/* Section 3: About CommitFM AI */}
        <div className="p-5 rounded-2xl bg-brand-surface border border-white/5 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2.5">
            About CommitFM AI
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            CommitFM AI is an enterprise-grade Developer Intelligence and Portfolio SaaS application. It processes real-time GitHub REST telemetry, constructing factual narratives, engineering archetypes, and calculated health scores without LLM hallucination risks.
          </p>
          <div className="flex justify-between items-center text-[10px] text-brand-muted pt-2">
            <span>Version 1.0.0 (Production SaaS Edition)</span>
            <span>Powered by Spring Boot & React</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
