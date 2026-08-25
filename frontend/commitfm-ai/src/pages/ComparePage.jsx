import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { useRepository } from "../contexts/RepositoryContext";
import { getApiUrl } from "../services/apiClient";

const ComparePage = () => {
  const { user, userLoading, repositories, repositoriesLoading, login } = useRepository();
  const [repoA, setRepoA] = useState(null);
  const [repoB, setRepoB] = useState(null);

  const [analysisA, setAnalysisA] = useState(null);
  const [analysisB, setAnalysisB] = useState(null);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  useEffect(() => {
    if (repositories.length >= 2) {
      if (!repoA) setRepoA(repositories[0]);
      if (!repoB) setRepoB(repositories[1]);
    } else if (repositories.length === 1) {
      if (!repoA) setRepoA(repositories[0]);
    }
  }, [repositories, repoA, repoB]);


  useEffect(() => {
    if (!repoA) return;
    const owner = repoA.owner?.login || repoA.owner;
    const name = repoA.name;
    if (!owner || !name) return;

    setLoadingA(true);
    fetch(`${getApiUrl()}/api/analysis/${owner}/${name}`, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => setAnalysisA(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingA(false));
  }, [repoA]);

  useEffect(() => {
    if (!repoB) return;
    const owner = repoB.owner?.login || repoB.owner;
    const name = repoB.name;
    if (!owner || !name) return;

    setLoadingB(true);
    fetch(`${getApiUrl()}/api/analysis/${owner}/${name}`, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => setAnalysisB(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingB(false));
  }, [repoB]);

  if (userLoading || (user && repositoriesLoading && repositories.length === 0)) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-24 text-[10px] text-brand-muted font-semibold gap-3">
          <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
          Loading comparison engine...
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto text-center py-20 space-y-4">
          <span className="text-3xl">🔐</span>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Authentication Required</h2>
          <p className="text-xs text-brand-muted">Please sign in with GitHub to compare your repositories.</p>
          <button
            onClick={login}
            className="inline-block bg-brand-primary text-white border border-brand-primary/20 px-4 py-2 rounded-sm text-xs font-bold transition hover:bg-brand-primary/95 cursor-pointer select-none"
          >
            Connect GitHub Account
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 text-left max-w-6xl mx-auto">
        <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
          <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Benchmarking</span>
          <h1 className="text-lg font-bold text-white tracking-tight">Side-by-Side Repository Comparison</h1>
          <p className="text-xs text-brand-muted">Compare development velocity, structure density, and engineering health metrics.</p>
        </div>

        {/* Repository Selectors Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Repo A Selector */}
          <div className="p-4 rounded-xl bg-brand-surface border border-white/5 space-y-3">
            <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">Repository A</span>
            <select
              value={repoA?.id || ""}
              onChange={(e) => {
                const found = repositories.find(r => r.id === Number(e.target.value));
                setRepoA(found || null);
              }}
              className="w-full bg-brand-bg border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary font-semibold"
            >
              {repositories.map(r => (
                <option key={r.id} value={r.id}>{r.fullName || r.name}</option>
              ))}
            </select>
          </div>

          {/* Repo B Selector */}
          <div className="p-4 rounded-xl bg-brand-surface border border-white/5 space-y-3">
            <span className="text-[10px] text-brand-accent font-bold uppercase tracking-wider">Repository B</span>
            <select
              value={repoB?.id || ""}
              onChange={(e) => {
                const found = repositories.find(r => r.id === Number(e.target.value));
                setRepoB(found || null);
              }}
              className="w-full bg-brand-bg border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary font-semibold"
            >
              {repositories.map(r => (
                <option key={r.id} value={r.id}>{r.fullName || r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Side-by-Side Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel A */}
          <div className="p-5 rounded-2xl bg-brand-surface border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider border-b border-white/5 pb-2.5">
              {repoA?.name || "Select Repository A"}
            </h3>

            {loadingA ? (
              <div className="py-12 flex justify-center text-xs text-brand-muted">Fetching analysis...</div>
            ) : analysisA ? (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Total Commits Analysed</span>
                  <span className="font-bold text-white">{analysisA.commitSummary?.totalCommitsAnalysed || 0}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Primary Language</span>
                  <span className="font-bold text-white">{analysisA.repositoryMetrics?.defaultLanguage || "N/A"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Codebase Files</span>
                  <span className="font-bold text-white">{analysisA.repositoryMetrics?.numberOfFiles || 0}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Directories</span>
                  <span className="font-bold text-white">{analysisA.repositoryMetrics?.numberOfDirectories || 0}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Longest Commit Streak</span>
                  <span className="font-bold text-emerald-400">{analysisA.telemetry?.longestCommitStreak || 0} days</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Engineering Archetype</span>
                  <span className="font-bold text-brand-accent">{analysisA.developerDna?.engineeringArchetype || "N/A"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Documentation Rating</span>
                  <span className="font-bold text-white">{analysisA.codebaseHealth?.documentationScore || 0}/100</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Maintenance Score</span>
                  <span className="font-bold text-white">{analysisA.codebaseHealth?.maintenanceScore || 0}/100</span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-brand-muted">No analysis loaded for Repository A</div>
            )}
          </div>

          {/* Panel B */}
          <div className="p-5 rounded-2xl bg-brand-surface border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-brand-accent uppercase tracking-wider border-b border-white/5 pb-2.5">
              {repoB?.name || "Select Repository B"}
            </h3>

            {loadingB ? (
              <div className="py-12 flex justify-center text-xs text-brand-muted">Fetching analysis...</div>
            ) : analysisB ? (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Total Commits Analysed</span>
                  <span className="font-bold text-white">{analysisB.commitSummary?.totalCommitsAnalysed || 0}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Primary Language</span>
                  <span className="font-bold text-white">{analysisB.repositoryMetrics?.defaultLanguage || "N/A"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Codebase Files</span>
                  <span className="font-bold text-white">{analysisB.repositoryMetrics?.numberOfFiles || 0}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Directories</span>
                  <span className="font-bold text-white">{analysisB.repositoryMetrics?.numberOfDirectories || 0}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Longest Commit Streak</span>
                  <span className="font-bold text-emerald-400">{analysisB.telemetry?.longestCommitStreak || 0} days</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Engineering Archetype</span>
                  <span className="font-bold text-brand-accent">{analysisB.developerDna?.engineeringArchetype || "N/A"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Documentation Rating</span>
                  <span className="font-bold text-white">{analysisB.codebaseHealth?.documentationScore || 0}/100</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-brand-muted">Maintenance Score</span>
                  <span className="font-bold text-white">{analysisB.codebaseHealth?.maintenanceScore || 0}/100</span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-brand-muted">No analysis loaded for Repository B</div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ComparePage;
