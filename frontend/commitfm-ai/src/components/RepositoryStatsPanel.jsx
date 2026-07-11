import React from "react";

// Helper for language color dots
const getLanguageColor = (lang) => {
    const colors = { javascript: "bg-yellow-500", typescript: "bg-blue-500", go: "bg-cyan-500", python: "bg-green-500", html: "bg-orange-500", css: "bg-purple-500" };
    return colors[lang?.toLowerCase()] || "bg-slate-400";
};

const RepositoryStatsPanel = ({ repository, commits, contributors }) => {
    const langPercentages = repository.languagePercentages || {};

    return (
        <div className="space-y-6">
            {/* 2. Language Breakdown & Progress Bars */}
            <div className="premium-card bg-brand-surface border border-white/5">
                <h3 className="text-[10px] font-bold text-white uppercase tracking-wider mb-4">Codebase Language Breakdown</h3>
                
                {/* Visual bar graph representation */}
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex mb-4">
                    {Object.entries(langPercentages).map(([lang, pct]) => (
                        <div
                            key={lang}
                            className={`h-full ${getLanguageColor(lang)}`}
                            style={{ width: `${pct}%` }}
                            title={`${lang}: ${pct}%`}
                        />
                    ))}
                </div>

                {/* Statistics list representation */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Object.entries(langPercentages).map(([lang, pct]) => (
                        <div key={lang} className="flex items-start gap-2 p-2 rounded-premium bg-brand-bg/30 border border-white/5 text-left">
                            <span className={`w-2.5 h-2.5 rounded-full mt-0.5 ${getLanguageColor(lang)}`} />
                            <div>
                                <div className="text-[10px] font-bold text-white">{lang}</div>
                                <div className="text-[9px] text-brand-muted mt-0.5">{pct}% ({repository.languages[lang]?.toLocaleString()} bytes)</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Commit History & 4. Contributor Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Commit History */}
                <div className="lg:col-span-7 space-y-2.5">
                    <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider pl-1">Recent Ingestion Commit Logs</h3>
                    
                    <div className="premium-card bg-brand-surface border border-white/5 space-y-3 max-h-[350px] overflow-y-auto pr-1.5">
                        {commits.map((c) => (
                            <div key={c.sha} className="p-2.5 rounded-premium bg-brand-bg/40 border border-white/5 flex items-start justify-between gap-4 hover:border-white/10 transition">
                                <div className="space-y-1 min-w-0 flex-1">
                                    <p className="text-[11px] font-bold text-white truncate hover:underline cursor-pointer">
                                        {c.message}
                                    </p>
                                    <p className="text-[9px] text-brand-muted">
                                        Authored by <span className="font-semibold text-white">{c.authorName}</span> on {new Date(c.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                    <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.2 rounded-sm text-brand-accent">
                                        {c.shortSha}
                                    </span>
                                    <span className="text-[8px] font-semibold text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded-sm">
                                        +{c.additions} / -{c.deletions}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {commits.length === 0 && (
                            <div className="text-center py-10 text-[10px] text-brand-muted">
                                No commit logs ingested.
                            </div>
                        )}
                    </div>
                </div>

                {/* Contributor Activity */}
                <div className="lg:col-span-5 space-y-2.5">
                    <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider pl-1">Ingested Contributor Profiles</h3>
                    
                    <div className="premium-card bg-brand-surface border border-white/5 space-y-3 max-h-[350px] overflow-y-auto pr-1.5">
                        {contributors.map((user) => (
                            <div key={user.id} className="p-2.5 rounded-premium bg-brand-bg/40 border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition">
                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    {user.avatarUrl && (
                                        <img
                                            src={user.avatarUrl}
                                            alt={user.login}
                                            className="w-8 h-8 rounded-full border border-white/10"
                                        />
                                    )}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-[11px] font-bold text-white hover:underline cursor-pointer truncate">
                                                {user.login}
                                            </span>
                                            {user.isBot && (
                                                <span className="text-[7px] font-bold bg-white/10 border border-white/10 text-brand-muted px-1 rounded-sm uppercase tracking-wider">
                                                    Bot
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[9px] text-brand-muted capitalize mt-0.5">{user.type}</p>
                                    </div>
                                </div>
                                
                                <span className="text-[9px] font-bold text-brand-accent bg-brand-primary/10 px-2 py-0.5 rounded-sm flex-shrink-0">
                                    {user.contributionsCount} Commits
                                </span>
                            </div>
                        ))}

                        {contributors.length === 0 && (
                            <div className="text-center py-10 text-[10px] text-brand-muted">
                                No contributors indexed.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepositoryStatsPanel;
