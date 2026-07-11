import MainLayout from "../layouts/MainLayout";
import { analysisData } from "../data/dummyData";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DeveloperDNA from "../components/DeveloperDNA";
import CareerCoach from "../components/CareerCoach";
import AIInsightsPanel from "../components/AIInsightsPanel";
import SkillRadar from "../components/SkillRadar";
import ResumeReadinessCard from "../components/ResumeReadinessCard";
import DeveloperTimeline from "../components/DeveloperTimeline";
import EngineeringStory from "../components/EngineeringStory";
import DeveloperEvolution from "../components/DeveloperEvolution";
import { githubService } from "../services/githubService";
import { useRepository } from "../contexts/RepositoryContext";
import { useCommits } from "../hooks/useCommits";

const DashboardPage = () => {
    const { selectedRepository, setSelectedRepository } = useRepository();
    const [repositories, setRepositories] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { commits, loading: commitsLoading, error: commitsError, fetchCommits } = useCommits();

    const selectedRepoId = selectedRepository ? selectedRepository.id : 101;

    useEffect(() => {
        const loadRepos = async () => {
            try {
                const data = await githubService.getRepositories();
                setRepositories(data);
                
                // If there's already a selectedRepository, sync it
                if (selectedRepository) {
                    const active = data.find(r => r.id === selectedRepository.id);
                    if (active) setSelectedRepo(active);
                } else if (data.length > 0) {
                    // Fallback to first repository if none selected
                    setSelectedRepository(data[0]);
                    setSelectedRepo(data[0]);
                }
            } catch (err) {
                console.error("Failed to load repositories on dashboard:", err);
            }
        };
        loadRepos();
    }, [selectedRepository, setSelectedRepository]);

    useEffect(() => {
        if (selectedRepoId) {
            fetchCommits(selectedRepoId);
        }
    }, [selectedRepoId, fetchCommits]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await fetchCommits(selectedRepoId);
        } catch (err) {
            console.error("Failed to refresh commits:", err);
        }
        setTimeout(() => setIsRefreshing(false), 800);
    };

    // Contribution Heatmap mock data: 24 weeks x 7 days
    const heatmapData = Array.from({ length: 24 }, (_, w) => 
        Array.from({ length: 7 }, (_, d) => {
            const index = w * 7 + d;
            const seed = (index * 3 + index % 5 * 7) % 10;
            if (seed < 4) return "bg-white/5";
            if (seed < 7) return "bg-emerald-950/40 border-emerald-900/10";
            if (seed < 9) return "bg-emerald-800/40 border-emerald-700/20";
            return "bg-brand-primary/30 border-brand-primary/20";
        })
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    };

    return (
        <MainLayout showHero={false} showAnalytics={false} showFeatures={false}>
            <div className="space-y-8 text-left">
                
                {/* SECTION A: Repository Context */}
                <motion.div
                    className="premium-card bg-brand-surface border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Selector Dropdown */}
                        <div className="flex flex-col gap-1 text-left">
                            <label className="text-[9px] text-brand-muted uppercase font-bold tracking-wider pl-0.5">Selected Codebase</label>
                            <select
                                value={selectedRepoId}
                                onChange={(e) => {
                                    const nextRepo = repositories.find(r => r.id === Number(e.target.value));
                                    if (nextRepo) {
                                        setSelectedRepository(nextRepo);
                                        setSelectedRepo(nextRepo);
                                    }
                                }}
                                className="bg-brand-bg border border-white/10 rounded-premium px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-brand-primary cursor-pointer max-w-[200px]"
                            >
                                {repositories.map((repo) => (
                                    <option key={repo.id} value={repo.id}>{repo.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Summary Block */}
                        {selectedRepo && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-left border-l border-white/5 pl-4">
                                <div>
                                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">{selectedRepo.name}</h3>
                                    <p className="text-[11px] text-brand-muted mt-1 space-x-2">
                                        <span>Language: <span className="font-semibold text-white">{Object.keys(selectedRepo.languages || {})[0] || "Unknown"}</span></span>
                                        <span className="text-white/20">|</span>
                                        <span>Stars: <span className="font-semibold text-white">{selectedRepo.starsCount}</span></span>
                                        <span className="text-white/20">|</span>
                                        <span>Forks: <span className="font-semibold text-white">{selectedRepo.forksCount}</span></span>
                                        <span className="text-white/20">|</span>
                                        <span>Updated: <span className="font-semibold text-white">{selectedRepo.lastSyncedAt ? new Date(selectedRepo.lastSyncedAt).toLocaleDateString() : "N/A"}</span></span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sync / Status Block */}
                    <div className="flex items-center gap-3 self-start md:self-auto border-t md:border-t-0 border-white/5 pt-3 md:pt-0 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Analysis Active</span>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className="btn-premium-primary flex items-center gap-2"
                            disabled={isRefreshing}
                        >
                            <svg className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.306 9H18" />
                            </svg>
                            {isRefreshing ? "Syncing..." : "Sync Repository"}
                        </button>
                    </div>
                </motion.div>

                {/* SECTION B: Developer DNA */}
                <div className="space-y-3">
                    <div className="border-b border-white/5 pb-2">
                        <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-1">Diagnostic Domain B</span>
                        <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider pl-1 mt-0.5">Developer DNA</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-6">
                            <DeveloperDNA />
                        </div>
                        <div className="lg:col-span-6">
                            <SkillRadar />
                        </div>
                    </div>
                </div>

                {/* SECTION C: Engineering Story */}
                <div className="space-y-3">
                    <div className="border-b border-white/5 pb-2">
                        <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-1">Diagnostic Domain C</span>
                        <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider pl-1 mt-0.5">Engineering Story & Insights</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-6">
                            <EngineeringStory />
                        </div>
                        <div className="lg:col-span-6">
                            <AIInsightsPanel />
                        </div>
                    </div>
                </div>

                {/* SECTION D: Career Coach */}
                <div className="space-y-3">
                    <div className="border-b border-white/5 pb-2">
                        <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-1">Diagnostic Domain D</span>
                        <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider pl-1 mt-0.5">Career Coach</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-6">
                            <CareerCoach />
                        </div>
                        <div className="lg:col-span-6">
                            <ResumeReadinessCard />
                        </div>
                    </div>
                </div>

                {/* SECTION E: Evolution Timeline */}
                <div className="space-y-3">
                    <div className="border-b border-white/5 pb-2">
                        <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-1">Diagnostic Domain E</span>
                        <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider pl-1 mt-0.5">Evolution Timeline</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-6">
                            <DeveloperTimeline />
                        </div>
                        <div className="lg:col-span-6">
                            <DeveloperEvolution />
                        </div>
                    </div>
                </div>

                {/* SECTION F: Codebase Health */}
                <div className="space-y-3">
                    <div className="border-b border-white/5 pb-2">
                        <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-1">Diagnostic Domain F</span>
                        <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider pl-1 mt-0.5">Codebase Health</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Language Distribution */}
                        <div className="lg:col-span-6 premium-card">
                            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-4 pb-1.5 border-b border-white/5">
                                Language Distribution
                            </h4>
                            <div className="space-y-2.5">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="font-semibold text-white">TypeScript</span>
                                        <span className="text-brand-muted">55%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-primary rounded-full" style={{ width: "55%" }} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="font-semibold text-white">JavaScript</span>
                                        <span className="text-brand-muted">30%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-accent rounded-full" style={{ width: "30%" }} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="font-semibold text-white">Go</span>
                                        <span className="text-brand-muted">15%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-500 rounded-full" style={{ width: "15%" }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Active Files */}
                        <div className="lg:col-span-6 premium-card">
                            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3 pb-1.5 border-b border-white/5">
                                Most Active Codebase Modules
                            </h4>
                            <div className="space-y-2">
                                {analysisData.hotFiles.map((file) => (
                                    <div key={file.name} className="flex items-center justify-between p-1.5 rounded-premium bg-brand-surface/40 border border-white/5 gap-3">
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-[11px] text-white truncate">{file.name}</p>
                                            <p className="text-[9px] text-brand-muted">{file.changes} changes</p>
                                        </div>
                                        <span className="text-[10px] font-semibold text-brand-accent">{file.health}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION G: Development Signals */}
                <div className="space-y-3">
                    <div className="border-b border-white/5 pb-2">
                        <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest pl-1">Diagnostic Domain G</span>
                        <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider pl-1 mt-0.5">Development Signals & Analytics</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Recent Commits */}
                        <div className="lg:col-span-4 premium-card flex flex-col justify-between min-h-[280px]">
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3 pb-1.5 border-b border-white/5">
                                    Recent Commits
                                </h4>
                                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                                    {commitsLoading ? (
                                        <div className="space-y-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="h-10 bg-indigo-900/10 rounded border border-indigo-700/10 animate-pulse"></div>
                                            ))}
                                        </div>
                                    ) : commitsError ? (
                                        <div className="text-[10px] text-red-400 font-semibold">{commitsError}</div>
                                    ) : commits.length === 0 ? (
                                        <div className="text-[10px] text-brand-muted">No commits found.</div>
                                    ) : (
                                        commits.map((c) => (
                                            <div key={c.sha} className="p-2 rounded bg-indigo-950/20 border border-indigo-700/10 flex flex-col gap-0.5">
                                                <div className="flex justify-between items-start gap-1">
                                                    <span className="font-semibold text-[10px] text-white truncate">{c.message}</span>
                                                    <span className="text-[9px] text-brand-accent font-mono bg-brand-primary/10 px-1 rounded-sm shrink-0">{c.shortSha}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[8px] text-brand-muted mt-0.5">
                                                    <span>{c.authorName}</span>
                                                    <span>{new Date(c.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Commit Timeline */}
                        <div className="lg:col-span-4 premium-card flex flex-col justify-between min-h-[280px]">
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3 pb-1.5 border-b border-white/5">
                                    Commit Timeline
                                </h4>
                                <div className="relative border-l border-indigo-500/20 ml-2 pl-4 space-y-4 max-h-[220px] overflow-y-auto pr-1 text-left">
                                    {commitsLoading ? (
                                        <div className="space-y-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-12 bg-indigo-900/10 rounded animate-pulse"></div>
                                            ))}
                                        </div>
                                    ) : commits.length === 0 ? (
                                        <div className="text-[10px] text-brand-muted">No timeline events.</div>
                                    ) : (
                                        commits.slice(0, 6).map((c, idx) => (
                                            <div key={c.sha} className="relative text-[10px]">
                                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-brand-accent border-2 border-slate-900" />
                                                <div className="font-semibold text-white">{c.message}</div>
                                                <div className="text-[8px] text-brand-muted mt-0.5">
                                                    {new Date(c.date).toLocaleDateString()} | {c.authorName}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Commit Frequency */}
                        <div className="lg:col-span-4 premium-card flex flex-col justify-between min-h-[280px]">
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3 pb-1.5 border-b border-white/5">
                                    Commit Frequency & Stats
                                </h4>
                                <div className="space-y-4 text-left">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-2.5 rounded bg-indigo-950/20 border border-indigo-700/10 text-center">
                                            <div className="text-[8px] text-brand-muted uppercase font-bold tracking-wider">Total Ingested</div>
                                            <div className="text-base font-black text-white mt-1">{commitsLoading ? "..." : commits.length}</div>
                                        </div>
                                        <div className="p-2.5 rounded bg-indigo-950/20 border border-indigo-700/10 text-center">
                                            <div className="text-[8px] text-brand-muted uppercase font-bold tracking-wider">Active Author</div>
                                            <div className="text-[10px] font-bold text-brand-accent truncate mt-2">{commitsLoading ? "..." : (commits[0]?.authorName || "N/A")}</div>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded bg-indigo-950/20 border border-indigo-700/10">
                                        <div className="flex justify-between items-center text-[9px] mb-1.5">
                                            <span className="font-semibold text-brand-muted">Weekly Velocity</span>
                                            <span className="text-brand-accent font-bold">100% Target</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-accent rounded-full" style={{ width: commitsLoading ? "10%" : "85%" }} />
                                        </div>
                                    </div>
                                    <div className="p-2.5 rounded bg-indigo-950/20 border border-indigo-700/10 text-center">
                                        <div className="text-[8px] text-brand-muted uppercase font-bold tracking-wider">Active Frequency</div>
                                        <div className="text-[10px] font-bold text-emerald-400 mt-1">High (Daily Syncs)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
};

export default DashboardPage;
