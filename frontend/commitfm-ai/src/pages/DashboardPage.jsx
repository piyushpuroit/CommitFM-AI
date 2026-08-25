import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import WorkspaceLayout from "../components/workspace/WorkspaceLayout";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkspaceContent from "../components/workspace/WorkspaceContent";
import WorkspaceModule from "../components/workspace/WorkspaceModule";
import PremiumOnboarding from "../components/onboarding/PremiumOnboarding";
import { githubService } from "../services/githubService";
import { useRepository } from "../contexts/RepositoryContext";

const PremiumLoader = () => {
    const [progress, setProgress] = useState(10);
    const [statusIndex, setStatusIndex] = useState(0);

    const statuses = [
        "Connecting to GitHub API...",
        "Resolving repository tree structure...",
        "Analyzing commit history & frequencies...",
        "Evaluating open issues & pull requests...",
        "Calibrating Developer DNA profile...",
        "Finalizing interactive modules..."
    ];

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return 95;
                return prev + Math.min(5, Math.floor(Math.random() * 8) + 1);
            });
        }, 800);

        const statusInterval = setInterval(() => {
            setStatusIndex(prev => (prev + 1) % statuses.length);
        }, 2200);

        return () => {
            clearInterval(progressInterval);
            clearInterval(statusInterval);
        };
    }, []);

    return (
        <div className="flex-1 flex flex-col justify-center items-center w-full bg-slate-950 relative overflow-hidden select-none min-h-[500px]">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="z-10 flex flex-col items-center max-w-md w-full px-6 space-y-8">
                {/* Glowing Spinner Orb */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-violet-500/10 rounded-full" />
                    <div className="absolute inset-0 border-4 border-violet-500 border-t-transparent border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite]" />
                    <div className="absolute inset-2 border-4 border-indigo-400 border-r-transparent border-l-transparent rounded-full animate-[spin_1s_linear_infinite_reverse]" />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 animate-pulse flex items-center justify-center shadow-lg shadow-violet-500/50">
                        <span className="text-white text-xs font-black">FM</span>
                    </div>
                </div>

                {/* Glassmorphic Panel */}
                <div className="w-full bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 shadow-2xl text-center space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-white text-sm font-bold tracking-wide uppercase">Ingesting Workspace</h3>
                        <p className="text-xs text-slate-400 h-4 transition-all duration-300 font-semibold">
                            {statuses[statusIndex]}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden relative border border-white/[0.03]">
                            <div 
                                className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                            <span>PROGRESS</span>
                            <span>{progress}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardPage = () => {
    const { owner, repo } = useParams();
    const navigate = useNavigate();

    const { 
        selectedRepository, 
        setSelectedRepository, 
        user, 
        userLoading,
        repositories,
        analysisResult,
        loading: analysisLoading,
        error: analysisError,
        fetchAnalysis,
        switchRepository,
        login
    } = useRepository();

    const [activeModule, setActiveModule] = useState("overview");
    const [pageLoading, setPageLoading] = useState(true);

    // 2. Redirect logic and loading of repository from URL params
    useEffect(() => {
        if (userLoading) return;

        if (!user) {
            setPageLoading(false);
            return;
        }

        const loadActiveRepository = async () => {
            if (owner && repo) {
                const currentOwner = selectedRepository?.owner?.login || selectedRepository?.owner;
                const currentRepo = selectedRepository?.name || selectedRepository?.repo;
                
                // If context matches URL and analysis is already present or loading, skip loading
                if (currentOwner === owner && currentRepo === repo && (analysisResult || analysisLoading)) {
                    setPageLoading(false);
                    return;
                }

                if (!selectedRepository) {
                    setPageLoading(true);
                }
                try {
                    // Fetch repository metadata details
                    const repoDetails = await githubService.getRepositoryDetailsByPath(owner, repo);
                    setSelectedRepository(repoDetails);
                    // Fetch and store analysis Result in Context
                    await fetchAnalysis(owner, repo);
                } catch (err) {
                    console.error("Failed to load repository from URL:", err);
                    setSelectedRepository(null);
                } finally {
                    setPageLoading(false);
                }
            } else {
                // No params: check context/localStorage
                if (selectedRepository) {
                    const savedOwner = selectedRepository.owner?.login || selectedRepository.owner;
                    const savedRepo = selectedRepository.name || selectedRepository.repo;
                    navigate(`/dashboard/${savedOwner}/${savedRepo}`, { replace: true });
                } else {
                    setPageLoading(false);
                }
            }
        };

        loadActiveRepository();
    }, [owner, repo, user, userLoading]);

    const handleSelectRepo = async (repoId) => {
        const next = repositories.find(r => r.id === repoId);
        if (next) {
            const nextOwner = next.owner?.login || next.owner;
            const nextRepoName = next.name || next.repo;
            navigate(`/dashboard/${nextOwner}/${nextRepoName}`);
            await switchRepository(next);
        }
    };

    const handleConnectGithub = () => {
        login();
    };

    if (userLoading) {
        return (
            <MainLayout hideFooter={true}>
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col min-h-0 justify-center items-center w-full bg-brand-bg">
                    <div className="h-5 w-5 border-2 border-brand-primary border-t-transparent animate-spin rounded-full" />
                </div>
            </MainLayout>
        );
    }

    if (!user) {
        return (
            <MainLayout hideFooter={true}>
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col min-h-0 w-full bg-brand-bg">
                    <div className="max-w-6xl mx-auto w-full my-auto py-2">
                        <PremiumOnboarding onConnect={handleConnectGithub} />
                    </div>
                </div>
            </MainLayout>
        );
    }

    // Show the premium full-screen loading animation during any page loading or analysis fetch
    if (pageLoading || (selectedRepository && (analysisLoading || !analysisResult))) {
        if (analysisError) {
            return (
                <MainLayout hideFooter={true}>
                    <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col justify-center items-center w-full bg-brand-bg text-center">
                        <div className="max-w-md p-6 bg-brand-surface border border-white/5 rounded-premium shadow-2xl space-y-4">
                            <span className="text-2xl">⚠️</span>
                            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Failed to load repository analysis</h2>
                            <p className="text-xs text-brand-muted leading-relaxed">{analysisError}</p>
                            <button
                                onClick={() => owner && repo && fetchAnalysis(owner, repo)}
                                className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white border border-brand-primary/20 rounded-sm px-4 py-2 text-xs font-bold transition cursor-pointer select-none"
                            >
                                Retry Ingestion
                            </button>
                        </div>
                    </div>
                </MainLayout>
            );
        }

        return (
            <MainLayout hideFooter={true}>
                <PremiumLoader />
            </MainLayout>
        );
    }

    return (
        <MainLayout hideFooter={true}>
            <WorkspaceLayout activeModule={activeModule} onSelectModule={setActiveModule}>
                <WorkspaceContent activeModule={activeModule}>
                    {/* Header Workspace Selector */}
                    <WorkspaceHeader 
                        repositories={repositories}
                        selectedRepoId={selectedRepository?.id}
                        onSelectRepo={handleSelectRepo}
                        selectedRepo={selectedRepository}
                    />

                    {/* Unified Workspace Module Viewport Switcher */}
                    <WorkspaceModule 
                        activeModule={activeModule}
                        onOpenPanel={setActiveModule}
                    />
                </WorkspaceContent>
            </WorkspaceLayout>
        </MainLayout>
    );
};

export default DashboardPage;
