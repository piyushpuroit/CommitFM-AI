import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import WorkspaceLayout from "../components/workspace/WorkspaceLayout";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkspaceContent from "../components/workspace/WorkspaceContent";
import WorkspaceModule from "../components/workspace/WorkspaceModule";
import { githubService } from "../services/githubService";
import { useRepository } from "../contexts/RepositoryContext";
import { useCommits } from "../hooks/useCommits";

const DashboardPage = () => {
    const { selectedRepository, setSelectedRepository } = useRepository();
    const [repositories, setRepositories] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const { commits, loading: commitsLoading, fetchCommits } = useCommits();
    const [activeModule, setActiveModule] = useState("overview");

    const selectedRepoId = selectedRepository ? selectedRepository.id : 101;

    useEffect(() => {
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
    }, [selectedRepository, setSelectedRepository]);

    useEffect(() => {
        if (selectedRepoId) fetchCommits(selectedRepoId);
    }, [selectedRepoId, fetchCommits]);

    const handleSelectRepo = (repoId) => {
        const next = repositories.find(r => r.id === repoId);
        if (next) {
            setSelectedRepository(next);
            setSelectedRepo(next);
        }
    };

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
