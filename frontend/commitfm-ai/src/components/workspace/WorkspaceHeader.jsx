import React, { useState, useEffect, useRef } from "react";
import { useRepository } from "../../contexts/RepositoryContext";

const WorkspaceHeader = ({ repositories = [], selectedRepoId, onSelectRepo, selectedRepo }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { analysisResults } = useRepository();
    const listRef = useRef(null);
    const modalRef = useRef(null);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 800);
    };

    const filtered = repositories.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Keyboard navigation handlers
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if (!isSwitcherOpen) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filtered.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filtered[selectedIndex]) {
                    handleSelect(filtered[selectedIndex]);
                }
            } else if (e.key === "Escape") {
                setIsSwitcherOpen(false);
            }
        };

        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [isSwitcherOpen, filtered, selectedIndex]);

    // Keep active highlighted item in view
    useEffect(() => {
        if (listRef.current) {
            const activeEl = listRef.current.children[selectedIndex];
            if (activeEl) {
                activeEl.scrollIntoView({ block: "nearest" });
            }
        }
    }, [selectedIndex]);

    const handleSelect = (repo) => {
        onSelectRepo(repo.id);
        setIsSwitcherOpen(false);
        setSearchQuery("");
        setSelectedIndex(0);
    };

    if (!selectedRepo) {
        return (
            <div className={`sticky top-0 w-full bg-brand-bg/95 backdrop-blur-md border-b border-white/5 pb-3 mb-4 pt-1 flex flex-col gap-2.5 text-left md:flex-row md:items-center md:justify-between select-none ${isSwitcherOpen ? "z-[100]" : "z-20"}`}>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2.5">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xs font-black text-white tracking-wide truncate max-w-[200px]">
                                    No Workspace Active
                                </h1>
                            </div>
                            <p className="text-[9px] text-brand-muted font-bold truncate">
                                Please select a repository to load metrics
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-auto md:ml-0">
                    <button
                        onClick={() => {
                            setIsSwitcherOpen(true);
                            setSelectedIndex(0);
                        }}
                        className="bg-brand-primary text-white border border-brand-primary/20 hover:bg-brand-primary/95 rounded-sm px-2.5 py-1 text-xs font-bold transition cursor-pointer select-none"
                    >
                        Select Repository
                    </button>
                </div>

                {/* Searchable Repository Switcher Dropdown */}
                {isSwitcherOpen && (
                    <>
                        {/* Click Outside Overlay */}
                        <div className="fixed inset-0 z-[90]" onClick={() => setIsSwitcherOpen(false)} />

                        <div 
                            ref={modalRef}
                            className="absolute right-0 top-full mt-1.5 w-full max-w-md bg-brand-surface border border-white/10 rounded-premium shadow-2xl p-4 z-[100] flex flex-col gap-3 max-h-[60vh]"
                        >
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <div>
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Select Repository</h3>
                                    <p className="text-[10px] text-brand-muted mt-0.5">Switch workspaces quickly without leaving the page</p>
                                </div>
                                <button 
                                    onClick={() => setIsSwitcherOpen(false)}
                                    className="p-1 text-brand-muted hover:text-white transition cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className="relative">
                                <input 
                                    type="text"
                                    placeholder="Type repository name..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setSelectedIndex(0);
                                    }}
                                    className="w-full bg-brand-bg/60 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder:text-slate-500 font-semibold"
                                    autoFocus
                                />
                            </div>

                            {/* Scrollable Repositories List */}
                            <div 
                                ref={listRef}
                                className="flex-1 overflow-y-auto no-scrollbar max-h-60 border border-white/5 rounded divide-y divide-white/5 bg-brand-bg/20"
                            >
                                {filtered.map((repo, idx) => {
                                    const isSelected = selectedRepoId === repo.id;
                                    const isHighlighted = idx === selectedIndex;
                                    const primaryLang = repo.language || Object.keys(repo.languages || {})[0] || "Unknown";

                                    return (
                                        <div
                                            key={repo.id}
                                            onClick={() => handleSelect(repo)}
                                            className={`p-3 cursor-pointer flex justify-between items-center transition-all ${
                                                isHighlighted 
                                                    ? "bg-brand-primary/10 border-l-2 border-brand-primary text-white" 
                                                    : "text-brand-muted hover:bg-white/5 hover:text-white"
                                            }`}
                                        >
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs font-bold ${isHighlighted ? "text-brand-primary" : "text-white"}`}>
                                                        {repo.name}
                                                    </span>
                                                    {isSelected && (
                                                        <span className="text-[8px] bg-brand-accent/20 text-brand-accent border border-brand-accent/30 px-1 py-0.2 rounded-sm font-semibold uppercase">
                                                            Active
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[9px] text-zinc-500 truncate max-w-sm mt-0.5">
                                                    {repo.description || "No description provided."}
                                                </p>
                                            </div>
                                            <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-brand-muted self-center font-semibold uppercase shrink-0">
                                                {primaryLang}
                                            </span>
                                        </div>
                                    );
                                })}

                                {filtered.length === 0 && (
                                    <div className="p-6 text-center text-xs text-brand-muted font-bold">
                                        No repositories match your search.
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center text-[9px] text-brand-muted uppercase font-bold tracking-wider pt-2 border-t border-white/5">
                                <span>Use ↑ ↓ keys to navigate, Enter to choose</span>
                                <span>Total Repositories: {repositories.length}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    const primaryLang = selectedRepo.language || Object.keys(selectedRepo.languages || {})[0] || "TypeScript";
    const lastSyncStr = selectedRepo.lastSyncedAt 
        ? new Date(selectedRepo.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : "Just now";

    // Grab live values if analysisResults are populated
    const repoAge = analysisResults?.repositoryMetrics?.repositoryAge !== undefined 
        ? `${analysisResults.repositoryMetrics.repositoryAge} days` 
        : "N/A";
    const repoSize = analysisResults?.repositoryMetrics?.totalSize !== undefined 
        ? `${analysisResults.repositoryMetrics.totalSize} KB` 
        : `${selectedRepo.size || 0} KB`;

    return (
        <div className={`sticky top-0 w-full bg-brand-bg/95 backdrop-blur-md border-b border-white/5 pb-3 mb-4 pt-1 flex flex-col gap-2.5 text-left md:flex-row md:items-center md:justify-between select-none ${isSwitcherOpen ? "z-[100]" : "z-20"}`}>
            <div className="flex flex-wrap items-center gap-3">
                {/* Repository details */}
                <div className="flex items-center gap-2.5">
                    {selectedRepo.owner?.avatarUrl && (
                        <img 
                            src={selectedRepo.owner.avatarUrl} 
                            alt={selectedRepo.owner.login || String(selectedRepo.owner)} 
                            className="w-7 h-7 rounded-md border border-white/10" 
                        />
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xs font-black text-white tracking-wide truncate max-w-[160px]">
                                {selectedRepo.name || selectedRepo.repo}
                            </h1>
                            <span className="px-1.5 py-0.2 rounded-full border border-white/10 text-[8px] font-bold text-brand-muted uppercase tracking-wider bg-white/5">
                                {selectedRepo.visibility || (selectedRepo.isPrivate ? "Private" : "Public")}
                            </span>
                        </div>
                        <p className="text-[9px] text-brand-muted font-bold truncate max-w-[160px]">
                            by {selectedRepo.owner?.login || String(selectedRepo.owner || "piyushpuroit")}
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
                        <span>{selectedRepo.starsCount !== undefined ? selectedRepo.starsCount : (selectedRepo.stars || 0)} stars</span>
                    </div>

                    {/* Forks */}
                    <div className="flex items-center gap-0.5">
                        <svg className="w-3 h-3 text-brand-muted" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v4a2 2 0 002 2h4M16 17v-4a2 2 0 00-2-2h-4" />
                        </svg>
                        <span>{selectedRepo.forksCount !== undefined ? selectedRepo.forksCount : (selectedRepo.forks || 0)} forks</span>
                    </div>

                    {/* Last Push */}
                    {selectedRepo.lastSyncedAt && (
                        <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-sm">
                            <span className="text-zinc-500">Pushed:</span>
                            <span className="text-white">{new Date(selectedRepo.lastSyncedAt).toLocaleDateString()}</span>
                        </div>
                    )}

                    {/* Repository Age */}
                    <div className="flex items-center gap-0.5">
                        <span className="text-zinc-500">Age:</span>
                        <span className="text-white font-semibold">{repoAge}</span>
                    </div>

                    {/* Repository Size */}
                    <div className="flex items-center gap-0.5">
                        <span className="text-zinc-500">Size:</span>
                        <span className="text-white font-semibold">{repoSize}</span>
                    </div>
                </div>
            </div>

            {/* Switcher, Sync, PDF Export and Refresh controls */}
            <div className="flex items-center gap-2 ml-auto md:ml-0">
                <button
                    onClick={() => window.print()}
                    className="bg-brand-surface border border-white/10 hover:border-white/20 text-white rounded-sm px-2 py-1 text-xs font-bold transition cursor-pointer select-none flex items-center gap-1"
                    title="Export Executive Analysis PDF Report"
                >
                    <span>📄 Export PDF</span>
                </button>

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

                <button
                    onClick={() => {
                        setIsSwitcherOpen(true);
                        setSelectedIndex(0);
                    }}
                    className="bg-brand-primary text-white border border-brand-primary/20 hover:bg-brand-primary/95 rounded-sm px-2.5 py-1 text-xs font-bold transition cursor-pointer select-none"
                >
                    Change Repository
                </button>
            </div>

            {/* Searchable Repository Switcher Dropdown */}
            {isSwitcherOpen && (
                <>
                    {/* Click Outside Overlay */}
                    <div className="fixed inset-0 z-[90]" onClick={() => setIsSwitcherOpen(false)} />

                    <div 
                        ref={modalRef}
                        className="absolute right-0 top-full mt-1.5 w-full max-w-md bg-brand-surface border border-white/10 rounded-premium shadow-2xl p-4 z-[100] flex flex-col gap-3 max-h-[60vh]"
                    >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <div>
                                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Change Repository</h3>
                                <p className="text-[10px] text-brand-muted mt-0.5">Switch workspaces quickly without leaving the page</p>
                            </div>
                            <button 
                                onClick={() => setIsSwitcherOpen(false)}
                                className="p-1 text-brand-muted hover:text-white transition cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="relative">
                            <input 
                                type="text"
                                placeholder="Type repository name..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                className="w-full bg-brand-bg/60 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder:text-slate-500 font-semibold"
                                autoFocus
                            />
                        </div>

                        {/* Scrollable Repositories List */}
                        <div 
                            ref={listRef}
                            className="flex-1 overflow-y-auto no-scrollbar max-h-60 border border-white/5 rounded divide-y divide-white/5 bg-brand-bg/20"
                        >
                            {filtered.map((repo, idx) => {
                                const isSelected = selectedRepoId === repo.id;
                                const isHighlighted = idx === selectedIndex;
                                const primaryLang = repo.language || Object.keys(repo.languages || {})[0] || "Unknown";

                                return (
                                    <div
                                        key={repo.id}
                                        onClick={() => handleSelect(repo)}
                                        className={`p-3 cursor-pointer flex justify-between items-center transition-all ${
                                            isHighlighted 
                                                ? "bg-brand-primary/10 border-l-2 border-brand-primary text-white" 
                                                : "text-brand-muted hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-bold ${isHighlighted ? "text-brand-primary" : "text-white"}`}>
                                                    {repo.name}
                                                </span>
                                                {isSelected && (
                                                    <span className="text-[8px] bg-brand-accent/20 text-brand-accent border border-brand-accent/30 px-1 py-0.2 rounded-sm font-semibold uppercase">
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[9px] text-zinc-500 truncate max-w-sm mt-0.5">
                                                {repo.description || "No description provided."}
                                            </p>
                                        </div>
                                        <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-brand-muted self-center font-semibold uppercase shrink-0">
                                            {primaryLang}
                                        </span>
                                    </div>
                                );
                            })}

                            {filtered.length === 0 && (
                                <div className="p-6 text-center text-xs text-brand-muted font-bold">
                                    No repositories match your search.
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center text-[9px] text-brand-muted uppercase font-bold tracking-wider pt-2 border-t border-white/5">
                            <span>Use ↑ ↓ keys to navigate, Enter to choose</span>
                            <span>Total Repositories: {repositories.length}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkspaceHeader;
