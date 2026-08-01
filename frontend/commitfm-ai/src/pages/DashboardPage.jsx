import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import WorkspaceLayout from "../components/workspace/WorkspaceLayout";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkspaceContent from "../components/workspace/WorkspaceContent";
import WorkspaceModule from "../components/workspace/WorkspaceModule";
import PremiumOnboarding from "../components/onboarding/PremiumOnboarding";
import { githubService } from "../services/githubService";
import { useRepository } from "../contexts/RepositoryContext";
import { useCommits } from "../hooks/useCommits";

const DashboardPage = () => {
    const { selectedRepository, setSelectedRepository, user, userLoading } = useRepository();
    const [repositories, setRepositories] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const { commits, loading: commitsLoading, fetchCommits } = useCommits();
    const [activeModule, setActiveModule] = useState("overview");

    const selectedRepoId = selectedRepository ? selectedRepository.id : 101;

    useEffect(() => {
        if (!user) return;
        const loadRepos = async () => {
            try {
                const data = await githubService.getRepositories();
                setRepositories(data);
                if (selectedRepository) {
                    const active = data.find(r => r.id === selectedRepository.id);
                    if (active) setSelectedRepo(active);
                } else if (data.length > 0) {
                    setSelectedRepository(data[0]);
                    setSelectedRepo(data[0]);
                }
            } catch (err) {
                console.error("Failed to load repositories:", err);
            }
        };
        loadRepos();
    }, [selectedRepository, setSelectedRepository, user]);

    useEffect(() => {
        if (selectedRepoId && user) fetchCommits(selectedRepoId);
    }, [selectedRepoId, fetchCommits, user]);

    const handleSelectRepo = (repoId) => {
        const next = repositories.find(r => r.id === repoId);
        if (next) {
            setSelectedRepository(next);
            setSelectedRepo(next);
        }
    };

    const handleConnectGithub = () => {
        window.location.href = "http://localhost:8080/api/auth/github/login";
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

    return (
        <MainLayout hideFooter={true}>
            <WorkspaceLayout activeModule={activeModule} onSelectModule={setActiveModule}>
                <WorkspaceContent activeModule={activeModule}>
                    {/* Header Workspace Selector */}
                    <WorkspaceHeader 
                        repositories={repositories}
                        selectedRepoId={selectedRepoId}
                        onSelectRepo={handleSelectRepo}
                        selectedRepo={selectedRepo}
                    />

                    {/* Unified Workspace Module Viewport Switcher */}
                    <WorkspaceModule 
                        activeModule={activeModule}
                        commits={commits}
                        commitsLoading={commitsLoading}
                        onOpenPanel={setActiveModule}
                    />
                </WorkspaceContent>
            </WorkspaceLayout>
        </MainLayout>
    );
};

export default DashboardPage;
