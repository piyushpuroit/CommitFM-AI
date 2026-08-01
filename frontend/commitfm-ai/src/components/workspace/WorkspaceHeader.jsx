import React, { useState } from "react";

const WorkspaceHeader = ({ repositories = [], selectedRepoId, onSelectRepo, selectedRepo }) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 800);
    };

    if (!selectedRepo) return null;

    const primaryLang = Object.keys(selectedRepo.languages || {})[0] || "TypeScript";
    const lastSyncStr = selectedRepo.lastSyncedAt 
        ? new Date(selectedRepo.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : "Just now";

    return (
        <div className="sticky top-0 z-20 w-full bg-brand-bg/95 backdrop-blur-md border-b border-white/5 pb-3 mb-4 pt-1 flex flex-col gap-2.5 text-left md:flex-row md:items-center md:justify-between select-none">
            <div className="flex flex-wrap items-center gap-3">
                {/* Repository details */}
                <div className="flex items-center gap-2.5">
                    {selectedRepo.owner?.avatar_url && (
                        <img 
                            src={selectedRepo.owner.avatar_url} 
                            alt={selectedRepo.owner.login} 
                            className="w-7 h-7 rounded-md border border-white/10" 
                        />
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xs font-black text-white tracking-wide truncate max-w-[160px]">
                                {selectedRepo.name}
                            </h1>
                            <span className="px-1.5 py-0.2 rounded-full border border-white/10 text-[8px] font-bold text-brand-muted uppercase tracking-wider bg-white/5">
                                {selectedRepo.isPrivate ? "Private" : "Public"}
                            </span>
                        </div>
                        <p className="text-[9px] text-brand-muted font-bold truncate max-w-[160px]">
                            by {selectedRepo.owner?.login || "piyushpuroit"}
                        </p>
                    </div>
                </div>

                {/* Vertical Divider */}
                <span className="hidden sm:inline w-px h-5 bg-white/5" />

                {/* Telemetry info */}
                <div className="flex flex-wrap items-center gap-3.5 text-[9px] font-semibold text-brand-muted">
                    {/* Branch */}
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-sm">
                        <svg className="w-3 h-3 text-brand-muted" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-6M16 13v-4a2 2 0 00-2-2h-4" />
                        </svg>
                        <span>{selectedRepo.defaultBranch || "main"}</span>
                    </div>

                    {/* Language */}
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{primaryLang}</span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                        <svg className="w-3 h-3 text-amber-400 fill-amber-400/20" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span>{selectedRepo.starsCount || 0} stars</span>
                    </div>

                    {/* Forks */}
                    <div className="flex items-center gap-0.5">
                        <svg className="w-3 h-3 text-brand-muted" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v4a2 2 0 002 2h4M16 17v-4a2 2 0 00-2-2h-4" />
                        </svg>
                        <span>{selectedRepo.forksCount || 0} forks</span>
                    </div>
                </div>
            </div>

            {/* Switcher, Sync and Refresh controls */}
            <div className="flex items-center gap-2 ml-auto md:ml-0">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-brand-muted uppercase bg-white/5 border border-white/10 px-2 py-1 rounded-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${refreshing ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
                    <span>Sync: {refreshing ? "Refreshing..." : lastSyncStr}</span>
                </div>

                <button 
                    onClick={handleRefresh}
                    className={`p-1.5 rounded bg-white/5 border border-white/10 text-brand-muted hover:text-white hover:bg-white/10 transition cursor-pointer flex items-center justify-center ${refreshing ? "animate-spin text-brand-accent" : ""}`}
                    title="Force Ingestion Refresh"
                    aria-label="Force Ingestion Refresh"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.306 9H18" />
                    </svg>
                </button>

                <select
                    value={selectedRepoId}
                    onChange={(e) => onSelectRepo(Number(e.target.value))}
                    className="bg-brand-surface border border-white/10 rounded-sm px-2 py-1 text-xs font-bold text-white focus:outline-none focus:border-brand-primary cursor-pointer w-[130px] hover:border-white/20 transition focus:ring-1 focus:ring-brand-primary"
                    aria-label="Select Repository Workspace"
                >
                    {repositories.map((r) => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default WorkspaceHeader;
