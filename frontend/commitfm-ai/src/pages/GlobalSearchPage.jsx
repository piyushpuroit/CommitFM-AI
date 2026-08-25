import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useRepository } from "../contexts/RepositoryContext";

const GlobalSearchPage = () => {
  const { analysisResults, repositories } = useRepository();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'repos' | 'commits' | 'files' | 'prs'

  const queryLower = query.toLowerCase().trim();

  // Search Results Calculations
  const matchedRepos = queryLower
    ? repositories.filter(r => r.name?.toLowerCase().includes(queryLower) || r.fullName?.toLowerCase().includes(queryLower) || r.description?.toLowerCase().includes(queryLower))
    : repositories;

  const matchedCommits = (queryLower && analysisResults?.commitSummary?.commitsPerContributor)
    ? Object.keys(analysisResults.commitSummary.commitsPerContributor).filter(c => c.toLowerCase().includes(queryLower))
    : [];

  const matchedFiles = (queryLower && analysisResults?.telemetry?.mostModifiedFiles)
    ? analysisResults.telemetry.mostModifiedFiles.filter(f => f.toLowerCase().includes(queryLower))
    : [];

  const matchedPRs = (queryLower && analysisResults?.repositoryActivity?.pullRequests)
    ? analysisResults.repositoryActivity.pullRequests.filter(pr => pr.title?.toLowerCase().includes(queryLower) || pr.author?.toLowerCase().includes(queryLower))
    : [];

  return (
    <MainLayout>
      <div className="space-y-6 text-left max-w-5xl mx-auto">
        <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
          <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Global Intelligence</span>
          <h1 className="text-lg font-bold text-white tracking-tight">Global Workspace Search</h1>
          <p className="text-xs text-brand-muted">Search across repositories, commit authors, file trees, and pull requests.</p>
        </div>

        {/* Input Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type to search repositories, commits, files, authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary shadow-2xl font-semibold"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 border-b border-white/5 pb-3 overflow-x-auto">
          {["all", "repos", "files", "commits", "prs"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                activeFilter === filter
                  ? "bg-brand-primary text-white"
                  : "bg-white/5 text-brand-muted hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {(activeFilter === "all" || activeFilter === "repos") && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Repositories ({matchedRepos.length})</h3>
              <div className="grid grid-cols-1 gap-2">
                {matchedRepos.map(repo => (
                  <Link
                    key={repo.id}
                    to={`/dashboard/${repo.owner?.login || repo.owner}/${repo.name}`}
                    className="p-3.5 rounded-xl bg-brand-surface border border-white/5 hover:border-white/15 transition flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{repo.fullName || repo.name}</h4>
                      <p className="text-[10px] text-brand-muted mt-0.5">{repo.description || "No description provided."}</p>
                    </div>
                    <span className="text-[10px] text-brand-accent font-semibold">★ {repo.starsCount || 0}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(activeFilter === "all" || activeFilter === "files") && matchedFiles.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Matching Hotspot Files ({matchedFiles.length})</h3>
              <div className="grid grid-cols-1 gap-2">
                {matchedFiles.map(file => (
                  <div key={file} className="p-3 rounded-xl bg-brand-surface border border-white/5 text-xs font-mono text-slate-300">
                    📄 {file}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeFilter === "all" || activeFilter === "commits") && matchedCommits.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Matching Authors ({matchedCommits.length})</h3>
              <div className="grid grid-cols-1 gap-2">
                {matchedCommits.map(author => (
                  <div key={author} className="p-3 rounded-xl bg-brand-surface border border-white/5 text-xs text-white">
                    👤 {author}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default GlobalSearchPage;
