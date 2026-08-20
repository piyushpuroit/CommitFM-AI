import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import WorkspaceLayout from "../components/workspace/WorkspaceLayout";
import WorkspaceContent from "../components/workspace/WorkspaceContent";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import WorkspaceModule from "../components/workspace/WorkspaceModule";
import { RepositoryContext } from "../contexts/RepositoryContext";

const DemoDashboardPage = () => {
  const [activeModule, setActiveModule] = useState("overview");

  const demoData = {
    selectedRepository: {
      id: 9999,
      name: "demo-project",
      owner: { login: "demo-owner" },
      fullName: "demo-owner/demo-project",
      description: "Interactive Demo Repository for CommitFM AI",
      language: "TypeScript"
    },
    setSelectedRepository: () => {},
    analysisResult: {
      repositorySummary: {
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2026-08-20T00:00:00Z",
        pushedAt: "2026-08-20T00:00:00Z",
        defaultBranch: "main",
        stars: 150,
        forks: 25,
        watchers: 12,
        languageDistribution: { "TypeScript": 65.4, "JavaScript": 22.1, "CSS": 12.5 },
        topics: ["react", "typescript", "tailwindcss", "vite", "frontend"]
      },
      repositoryActivity: {
        openPRs: 2,
        closedPRs: 24,
        openIssues: 5,
        closedIssues: 42,
        pullRequests: []
      },
      repositoryMetrics: {
        repositoryAge: 962,
        numberOfFiles: 145,
        numberOfDirectories: 22
      },
      commitSummary: {
        totalCommitsAnalysed: 350,
        busiestHour: "10:00 AM",
        busiestDay: "Tuesday"
      },
      developerDna: {
        engineeringArchetype: "Refactor Wizard",
        traits: ["Async Catalyst", "Modular Architect"]
      },
      telemetry: {
        currentStreak: 12,
        longestCommitStreak: 25
      },
      contributors: [
        { login: "refactor-wizard", contributions: 350 }
      ],
      codebaseHealth: {
        score: 94,
        filesCount: 145,
        directoriesCount: 22,
        issuesCount: 5
      },
      careerCoach: {
        insights: [
          "Focus on reducing average PR review response times.",
          "Introduce automated regression testing to improve stability."
        ]
      }
    },
    analysisResults: {
      repositorySummary: {
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2026-08-20T00:00:00Z",
        pushedAt: "2026-08-20T00:00:00Z",
        defaultBranch: "main",
        stars: 150,
        forks: 25,
        watchers: 12,
        languageDistribution: { "TypeScript": 65.4, "JavaScript": 22.1, "CSS": 12.5 },
        topics: ["react", "typescript", "tailwindcss", "vite", "frontend"]
      },
      repositoryActivity: {
        openPRs: 2,
        closedPRs: 24,
        openIssues: 5,
        closedIssues: 42,
        pullRequests: []
      },
      repositoryMetrics: {
        repositoryAge: 962,
        numberOfFiles: 145,
        numberOfDirectories: 22
      },
      commitSummary: {
        totalCommitsAnalysed: 350,
        busiestHour: "10:00 AM",
        busiestDay: "Tuesday"
      },
      developerDna: {
        engineeringArchetype: "Refactor Wizard",
        traits: ["Async Catalyst", "Modular Architect"]
      },
      telemetry: {
        currentStreak: 12,
        longestCommitStreak: 25
      },
      contributors: [
        { login: "refactor-wizard", contributions: 350 }
      ],
      codebaseHealth: {
        score: 94,
        filesCount: 145,
        directoriesCount: 22,
        issuesCount: 5
      },
      careerCoach: {
        insights: [
          "Focus on reducing average PR review response times.",
          "Introduce automated regression testing to improve stability."
        ]
      }
    },
    loading: false,
    analysisLoading: false,
    error: null,
    analysisError: null,
    user: {
      login: "demo-user",
      name: "Demo User (Static Preview)",
      avatarUrl: "🧙‍♂️",
      publicRepos: 1
    },
    userLoading: false,
    logout: () => {
      window.location.href = "/";
    },
    switchRepository: () => {},
    fetchAnalysis: async () => {}
  };

  const repositories = [demoData.selectedRepository];

  return (
    <RepositoryContext.Provider value={demoData}>
      <MainLayout hideFooter={true}>
        <div className="bg-brand-primary/10 border-b border-brand-primary/20 text-brand-primary text-center py-1.5 text-[10px] font-bold tracking-wider uppercase select-none relative z-50">
          ⚡ Interactive Demo Workspace (Static Preview mode)
        </div>
        <WorkspaceLayout activeModule={activeModule} onSelectModule={setActiveModule}>
          <WorkspaceContent activeModule={activeModule}>
            <WorkspaceHeader 
              repositories={repositories}
              selectedRepoId={demoData.selectedRepository.id}
              onSelectRepo={() => {}}
              selectedRepo={demoData.selectedRepository}
            />
            <WorkspaceModule 
              activeModule={activeModule}
              onOpenPanel={setActiveModule}
            />
          </WorkspaceContent>
        </WorkspaceLayout>
      </MainLayout>
    </RepositoryContext.Provider>
  );
};

export default DemoDashboardPage;
