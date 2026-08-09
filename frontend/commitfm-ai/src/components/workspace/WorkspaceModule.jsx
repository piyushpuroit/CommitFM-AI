import React, { lazy, Suspense } from "react";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { useRepository } from "../../contexts/RepositoryContext";

// Dynamic lazy loads for workspace analysis modules
const OverviewAnalysis = lazy(() => import("../analysis/OverviewAnalysis"));
const CommitAnalysis = lazy(() => import("../analysis/CommitAnalysis"));
const PRAnalysis = lazy(() => import("../analysis/PRAnalysis"));
const CodebaseHealth = lazy(() => import("../analysis/CodebaseHealth"));
const DeveloperDNAAnalysis = lazy(() => import("../analysis/DeveloperDNAAnalysis"));
const EngineeringStoryAnalysis = lazy(() => import("../analysis/EngineeringStoryAnalysis"));
const CareerCoachAnalysis = lazy(() => import("../analysis/CareerCoachAnalysis"));
const ResumeGeneratorAnalysis = lazy(() => import("../analysis/ResumeGeneratorAnalysis"));
const LearningRoadmapAnalysis = lazy(() => import("../analysis/LearningRoadmapAnalysis"));

const WorkspaceModule = ({ activeModule, onOpenPanel }) => {
    const { commits, commitsLoading } = useRepository();

    const renderContent = () => {
        switch (activeModule) {
            case "overview":
                return <OverviewAnalysis commits={commits} commitsLoading={commitsLoading} onOpenPanel={onOpenPanel} />;
            case "commits":
                return <CommitAnalysis commits={commits} loading={commitsLoading} />;
            case "prs":
                return <PRAnalysis />;
            case "health":
                return <CodebaseHealth />;
            case "dna":
                return <DeveloperDNAAnalysis />;
            case "story":
                return <EngineeringStoryAnalysis />;
            case "coach":
                return <CareerCoachAnalysis />;
            case "resume":
                return <ResumeGeneratorAnalysis />;
            case "roadmap":
                return <LearningRoadmapAnalysis />;
            default:
                return <OverviewAnalysis commits={commits} commitsLoading={commitsLoading} onOpenPanel={onOpenPanel} />;
        }
    };

    return (
        <Suspense fallback={<LoadingSkeleton count={3} />}>
            {renderContent()}
        </Suspense>
    );
};

export default WorkspaceModule;
