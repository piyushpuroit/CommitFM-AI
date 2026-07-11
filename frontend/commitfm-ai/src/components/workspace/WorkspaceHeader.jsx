import React from "react";

const WorkspaceHeader = ({ repositories = [], selectedRepoId, onSelectRepo, selectedRepo }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5 mb-4 text-left w-full">
            <div className="flex items-center gap-2">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider select-none">Workspace:</label>
                <select
                    value={selectedRepoId}
                    onChange={(e) => onSelectRepo(Number(e.target.value))}
                    className="bg-brand-surface border border-white/10 rounded px-2.5 py-1 text-xs font-semibold text-white focus:outline-none focus:border-brand-primary cursor-pointer w-[140px]"
                >
                    {repositories.map((r) => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </select>
            </div>
            
            {selectedRepo && (
                <span className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">
                    Sync active: <span className="text-emerald-400">● {selectedRepo.name}</span>
                </span>
            )}
        </div>
    );
};

export default WorkspaceHeader;
