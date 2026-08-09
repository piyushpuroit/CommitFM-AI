import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { githubService } from "../services/githubService";
import { commitService } from "../services/commitService";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import ErrorState from "../components/common/ErrorState";
import RepositoryStatsPanel from "../components/RepositoryStatsPanel";
import { useRepository } from "../contexts/RepositoryContext";

const RepositoryDetails = ({ repositoryId }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const activeRepoId = repositoryId || (id ? parseInt(id, 10) : 101);
    const { selectedRepository, setSelectedRepository } = useRepository();

    const [repository, setRepository] = useState(null);
    const [commits, setCommits] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                let owner, repoName;
                if (selectedRepository && selectedRepository.id === activeRepoId) {
                    owner = selectedRepository.owner?.login || selectedRepository.owner;
                    repoName = selectedRepository.name || selectedRepository.repo;
                } else {
                    const repos = await githubService.getRepositories();
                    const found = repos.find(r => r.id === activeRepoId);
                    if (found) {
                        owner = found.owner?.login || found.owner;
                        repoName = found.name || found.repo;
                    }
                }

                if (!owner || !repoName) {
                    setError("Repository not found");
                    setLoading(false);
                    return;
                }

                const [repoDetails, commitData, contributorData] = await Promise.all([
                    githubService.getRepositoryDetailsByPath(owner, repoName),
                    commitService.getCommits(owner, repoName),
                    githubService.getContributors(activeRepoId)
                ]);

                if (!repoDetails) {
                    setError("Repository details not found");
                } else {
                    setRepository(repoDetails);
                    setSelectedRepository(repoDetails);
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
    }, [activeRepoId, selectedRepository, setSelectedRepository]);

    if (loading) {
        return (
            <MainLayout>
                <LoadingSkeleton count={3} />
            </MainLayout>
        );
    }

    if (error || !repository) {
        return (
            <MainLayout>
                <ErrorState message={error || "Repository data missing"} />
            </MainLayout>
        );
    }

    const primaryLang = repository.language || Object.keys(repository.languages || {})[0] || "Unknown";

    return (
        <MainLayout>
            <div className="space-y-6 text-left">
                {/* 1. Overview Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Main Details Card */}
                    <div className="lg:col-span-8 premium-card bg-brand-surface flex flex-col gap-4 border border-white/5 h-full justify-between p-4 rounded-premium">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                {repository.owner?.avatar_url && (
                                    <img
                                        src={repository.owner.avatar_url}
                                        alt={repository.owner.login || String(repository.owner)}
                                        className="w-10 h-10 rounded-full border border-white/10"
                                    />
                                )}
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                                            {repository.fullName || repository.name}
                                        </h2>
                                        <span className="px-1.5 py-0.2 rounded-full border border-white/10 text-[8px] font-bold text-brand-muted uppercase tracking-wider bg-white/5">
                                            {repository.visibility || (repository.isPrivate ? "Private" : "Public")}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-brand-muted mt-0.5">Default branch: <span className="font-semibold text-brand-accent">{repository.defaultBranch || "main"}</span></p>
                                </div>
                            </div>

                            <p className="text-xs text-brand-text/90 leading-relaxed font-medium">
                                {repository.description}
                            </p>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2.5">
                                <a
                                    href={repository.htmlUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-premium-primary text-xs flex items-center gap-1.5"
                                >
                                    View on GitHub
                                </a>
                                <button
                                    onClick={() => navigate(`/dashboard/${repository.owner?.login || repository.owner}/${repository.name || repository.repo}`)}
                                    className="px-3 py-1.5 bg-brand-primary text-white text-xs font-bold rounded-sm hover:opacity-90 transition cursor-pointer"
                                >
                                    Open Workspace
                                </button>
                            </div>
                            <span className="text-[10px] text-brand-muted">
                                Last Push: {repository.pushedAt ? new Date(repository.pushedAt).toLocaleDateString() : "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Stats Summary Sidebar Card */}
                    <div className="lg:col-span-4 premium-card bg-brand-surface border border-white/5 h-full flex flex-col justify-between p-4 rounded-premium">
                        <div>
                            <h3 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3 pb-1.5 border-b border-white/5">
                                Telemetry Totals
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-left">
                                    <div className="text-[9px] text-brand-muted font-bold uppercase tracking-wider">Stars</div>
                                    <div className="text-lg font-black text-white mt-0.5">{repository.stars || repository.starsCount || 0}</div>
                                </div>
                                <div className="text-left">
                                    <div className="text-[9px] text-brand-muted font-bold uppercase tracking-wider">Forks</div>
                                    <div className="text-lg font-black text-white mt-0.5">{repository.forks || repository.forksCount || 0}</div>
                                </div>
                                <div className="text-left">
                                    <div className="text-[9px] text-brand-muted font-bold uppercase tracking-wider">Open Issues</div>
                                    <div className="text-lg font-black text-white mt-0.5">{repository.openIssues || repository.openIssuesCount || 0}</div>
                                </div>
                                <div className="text-left">
                                    <div className="text-[9px] text-brand-muted font-bold uppercase tracking-wider">Primary Language</div>
                                    <div className="text-sm font-bold text-brand-accent mt-1.5 truncate capitalize">{primaryLang}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Repository Stats Panel Subcomponent */}
                <RepositoryStatsPanel 
                    repository={repository} 
                    commits={commits} 
                    contributors={contributors} 
                />

            </div>
        </MainLayout>
    );
};

export default RepositoryDetails;
