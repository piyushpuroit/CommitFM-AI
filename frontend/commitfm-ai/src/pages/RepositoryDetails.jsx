import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { githubService } from "../services/githubService";

// Helper for language color dots
const getLanguageColor = (lang) => {
    switch (lang?.toLowerCase()) {
        case "javascript": return "bg-yellow-500";
        case "typescript": return "bg-blue-500";
        case "go": return "bg-cyan-500";
        case "python": return "bg-green-500";
        case "html": return "bg-orange-500";
        case "css": return "bg-purple-500";
        default: return "bg-slate-400";
    }
};

const RepositoryDetails = ({ repositoryId }) => {
    const { id } = useParams();
    const activeRepoId = repositoryId || (id ? parseInt(id, 10) : 101);

    const [repository, setRepository] = useState(null);
    const [commits, setCommits] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [repoData, commitData, contributorData] = await Promise.all([
                    githubService.getRepository(activeRepoId),
                    githubService.getCommits(activeRepoId),
                    githubService.getContributors(activeRepoId)
                ]);

                if (!repoData) {
                    setError("Repository not found");
                } else {
                    setRepository(repoData);
                    setCommits(commitData);
                    setContributors(contributorData);
                }
            } catch (err) {
                console.error("Failed to load repository details:", err);
                setError("An error occurred while fetching repository data");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [activeRepoId]);

    if (loading) {
        return (
            <MainLayout>
                <div className="py-20 text-center text-xs text-brand-muted">
                    <svg className="animate-spin w-5 h-5 mx-auto mb-2 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.306 9H18" />
                    </svg>
                    Loading repository details...
                </div>
            </MainLayout>
        );
    }

    if (error || !repository) {
        return (
            <MainLayout>
                <div className="py-20 text-center text-xs text-red-400">
                    <p className="font-semibold">{error || "Repository data missing"}</p>
                </div>
            </MainLayout>
        );
    }

    const langPercentages = repository.languagePercentages;
    const primaryLang = Object.keys(repository.languages)[0] || "Unknown";

    return (
        <MainLayout>
            <div className="space-y-6 text-left">
                {/* 1. Overview Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Main Details Card */}
                    <div className="lg:col-span-8 premium-card bg-brand-surface flex flex-col gap-4 border border-white/5 h-full justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                {repository.owner?.avatar_url && (
                                    <img
                                        src={repository.owner.avatar_url}
                                        alt={repository.owner.login}
                                        className="w-10 h-10 rounded-full border border-white/10"
                                    />
                                )}
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                                            {repository.fullName}
                                        </h2>
                                        <span className="px-1.5 py-0.2 rounded-full border border-white/10 text-[8px] font-bold text-brand-muted uppercase tracking-wider">
                                            {repository.isPrivate ? "Private" : "Public"}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-brand-muted mt-0.5">Default branch: <span className="font-semibold text-brand-accent">{repository.defaultBranch}</span></p>
                                </div>
                            </div>

                            <p className="text-xs text-brand-text/90 leading-relaxed font-medium">
                                {repository.description}
                            </p>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                            <a
                                href={repository.htmlUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-premium-primary text-xs flex items-center gap-1.5"
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                                </svg>
                                View on GitHub
                            </a>
                            <span className="text-[10px] text-brand-muted">
                                Last Synced: {repository.lastSyncedAt ? new Date(repository.lastSyncedAt).toLocaleDateString() : "Never"}
                            </span>
                        </div>
                    </div>

                    {/* Stats Summary Sidebar Card */}
                    <div className="lg:col-span-4 premium-card bg-brand-surface border border-white/5 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3 pb-1.5 border-b border-white/5">
                                Telemetry Totals
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-left">
                                    <div className="text-[9px] text-brand-muted font-bold uppercase tracking-wider">Stars</div>
                                    <div className="text-lg font-black text-white mt-0.5">{repository.starsCount}</div>
                                </div>
                                <div className="text-left">
                                    <div className="text-[9px] text-brand-muted font-bold uppercase tracking-wider">Forks</div>
                                    <div className="text-lg font-black text-white mt-0.5">{repository.forksCount}</div>
                                </div>
                                <div className="text-left">
                                    <div className="text-[9px] text-brand-muted font-bold uppercase tracking-wider">Open Issues</div>
                                    <div className="text-lg font-black text-white mt-0.5">{repository.openIssuesCount}</div>
                                </div>
                                <div className="text-left">
                                    <div className="text-[9px] text-brand-muted font-bold uppercase tracking-wider">Primary Language</div>
                                    <div className="text-sm font-bold text-brand-accent mt-1.5 truncate capitalize">{primaryLang}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                            <div key={lang} className="flex items-start gap-2 p-2 rounded-premium bg-brand-bg/30 border border-white/5">
                                <span className={`w-2.5 h-2.5 rounded-full mt-0.5 ${getLanguageColor(lang)}`} />
                                <div className="text-left">
                                    <div className="text-[10px] font-bold text-white">{lang}</div>
                                    <div className="text-[9px] text-brand-muted mt-0.5">{pct}% ({repository.languages[lang]?.toLocaleString()} bytes)</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Commit History & 4. Contributor Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
        </MainLayout>
    );
};

export default RepositoryDetails;
