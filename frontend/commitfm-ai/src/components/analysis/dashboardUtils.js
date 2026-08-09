const formatNumber = (value) => {
    if (value === null || value === undefined || Number.isNaN(value)) return "N/A";
    return new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(value);
};

const formatDate = (value) => {
    if (!value) return "N/A";
    try {
        return new Date(value).toLocaleDateString("en", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    } catch {
        return value;
    }
};

const getDaysBetween = (from, to = new Date()) => {
    if (!from) return null;
    try {
        const start = new Date(from);
        const end = new Date(to);
        return Math.max(0, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    } catch {
        return null;
    }
};

const getValue = (obj, path, fallback = null) => {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? fallback;
};

export const buildOverviewMetrics = (analysisResults) => {
    const repositorySummary = analysisResults?.repositorySummary || {};
    const repositoryActivity = analysisResults?.repositoryActivity || {};
    const repositoryMetrics = analysisResults?.repositoryMetrics || {};
    const commitSummary = analysisResults?.commitSummary || {};

    const ageDays = repositoryMetrics.repositoryAge ?? getDaysBetween(repositorySummary.createdAt);
    const daysSinceLastCommit = repositorySummary.pushedAt ? getDaysBetween(repositorySummary.pushedAt) : null;
    const totalTrackedActivity = (repositoryActivity.openPRs || 0) + (repositoryActivity.closedPRs || 0) + (repositoryActivity.openIssues || 0) + (repositoryActivity.closedIssues || 0);
    const activityTrend = repositoryActivity.openPRs + repositoryActivity.openIssues > 0 ? `${repositoryActivity.openPRs + repositoryActivity.openIssues} active items` : "No open work items";

    return [
        {
            label: "Repository Age",
            value: ageDays !== null ? `${formatNumber(ageDays)} days` : "N/A",
            detail: `Created ${formatDate(repositorySummary.createdAt)}`
        },
        {
            label: "Days Since Last Commit",
            value: daysSinceLastCommit !== null ? `${formatNumber(daysSinceLastCommit)} days` : "N/A",
            detail: `Last push ${formatDate(repositorySummary.pushedAt)}`
        },
        {
            label: "Activity Trend",
            value: activityTrend,
            detail: `${repositoryActivity.openPRs || 0} open PRs · ${repositoryActivity.openIssues || 0} open issues`
        },
        {
            label: "Contributors",
            value: `${analysisResults?.contributors?.length || 0}`,
            detail: `${analysisResults?.contributors?.[0]?.login || "No contributors"} leading this history`
        },
        {
            label: "Commits",
            value: `${commitSummary.totalCommitsAnalysed || 0}`,
            detail: `Peak day ${commitSummary.busiestDay || "N/A"}`
        },
        {
            label: "Branches",
            value: `${repositoryActivity.activeBranches?.length || 0}`,
            detail: `Default branch ${repositorySummary.defaultBranch || "N/A"}`
        },
        {
            label: "Releases",
            value: `${repositoryActivity.releasesCount || 0}`,
            detail: `${repositoryActivity.tagsCount || 0} tags captured`
        },
        {
            label: "Issues",
            value: `${(repositoryActivity.openIssues || 0) + (repositoryActivity.closedIssues || 0)}`,
            detail: `${repositoryActivity.openIssues || 0} open / ${repositoryActivity.closedIssues || 0} closed`
        },
        {
            label: "Pull Requests",
            value: `${(repositoryActivity.openPRs || 0) + (repositoryActivity.closedPRs || 0)}`,
            detail: `${repositoryActivity.openPRs || 0} open / ${repositoryActivity.closedPRs || 0} closed`
        },
        {
            label: "Stars",
            value: formatNumber(repositorySummary.stars || 0),
            detail: "Repository popularity"
        },
        {
            label: "Forks",
            value: formatNumber(repositorySummary.forks || 0),
            detail: "Community reuse"
        },
        {
            label: "Watchers",
            value: formatNumber(repositorySummary.watchers || 0),
            detail: "Observed activity"
        },
        {
            label: "Repository Size",
            value: `${formatNumber(repositoryMetrics.totalSize || 0)} KB`,
            detail: `${repositoryMetrics.numberOfFiles || 0} files · ${repositoryMetrics.numberOfDirectories || 0} dirs`
        },
        {
            label: "Topics",
            value: repositorySummary.topics?.length ? repositorySummary.topics.slice(0, 3).join(", ") : "None",
            detail: `${repositorySummary.topics?.length || 0} topic tags`
        },
        {
            label: "License",
            value: repositorySummary.license || "None",
            detail: "Repository license"
        },
        {
            label: "Visibility",
            value: "Not exposed",
            detail: "Current analysis payload does not include visibility"
        },
        {
            label: "Default Branch",
            value: repositorySummary.defaultBranch || "N/A",
            detail: "Primary branch"
        },
        {
            label: "Latest Release",
            value: repositoryActivity.releasesCount ? `Release count: ${repositoryActivity.releasesCount}` : "None",
            detail: "Latest release metadata is not exposed by the current payload"
        }
    ];
};

export const buildCommitMetrics = (analysisResults) => {
    const commitSummary = analysisResults?.commitSummary || {};
    const telemetry = analysisResults?.telemetry || {};
    const repositorySummary = analysisResults?.repositorySummary || {};
    const repositoryActivity = analysisResults?.repositoryActivity || {};
    const contributors = analysisResults?.contributors || [];
    const topAuthors = Object.entries(commitSummary.commitsPerContributor || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([author, count]) => ({ author, count }));

    const latestSubject = repositoryActivity.latestCommit || "";
    const conventionalStyle = /^(feat|fix|docs|refactor|test|chore|perf|ci|build)(\([^)]+\))?:/i.test(latestSubject);

    return {
        frequency: commitSummary.commitFrequency || "N/A",
        heatmap: Object.entries(commitSummary.commitsPerDay || {}).sort(([a], [b]) => a.localeCompare(b)).slice(-7),
        hourly: commitSummary.busiestHour ? [{ hour: commitSummary.busiestHour, count: commitSummary.totalCommitsAnalysed || 0 }] : [],
        weekdays: [
            { day: "Monday", count: 0 },
            { day: "Tuesday", count: 0 },
            { day: "Wednesday", count: 0 },
            { day: "Thursday", count: 0 },
            { day: "Friday", count: 0 },
            { day: "Saturday", count: 0 },
            { day: "Sunday", count: 0 }
        ],
        longestStreak: telemetry.longestCommitStreak ?? 0,
        currentStreak: telemetry.currentStreak ?? 0,
        averageCommitSize: "Not exposed by current GitHub payload",
        topAuthors,
        topFiles: telemetry.mostModifiedFiles?.slice(0, 5) || [],
        largestCommit: "Not exposed by current GitHub payload",
        smallestCommit: "Not exposed by current GitHub payload",
        messageQuality: {
            label: conventionalStyle ? "Conventional commit style detected" : "Latest commit style is not yet conventional",
            detail: latestSubject || "No commit subject available"
        },
        contributorCount: contributors.length,
        dominantLanguage: repositorySummary.languageDistribution ? Object.entries(repositorySummary.languageDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] : "N/A"
    };
};

export const buildPrMetrics = (analysisResults) => {
    const repositoryActivity = analysisResults?.repositoryActivity || {};
    const totalPRs = (repositoryActivity.openPRs || 0) + (repositoryActivity.closedPRs || 0);
    const mergeRate = totalPRs ? Math.round((repositoryActivity.closedPRs / totalPRs) * 100) : 0;
    const contributorParticipation = (analysisResults?.contributors?.length || 0) + (repositoryActivity.pullRequests?.length || 0);

    return {
        mergeRate,
        averageMergeTime: "Not exposed by current GitHub payload",
        openVsClosed: {
            open: repositoryActivity.openPRs || 0,
            closed: repositoryActivity.closedPRs || 0
        },
        reviewerActivity: "Reviewer metadata is not exposed by the current analysis payload",
        contributorParticipation: `${contributorParticipation} contributor and PR signals tracked`,
        activeAuthors: repositoryActivity.pullRequests?.slice(0, 5).map((pr) => pr.author) || []
    };
};

export const buildHealthMetrics = (analysisResults) => {
    const codebaseHealth = analysisResults?.codebaseHealth || {};
    const repositoryMetrics = analysisResults?.repositoryMetrics || {};
    const commitSummary = analysisResults?.commitSummary || {};
    const repositoryAge = repositoryMetrics.repositoryAge || 1;
    const repoGrowth = Math.min(100, Math.round((commitSummary.totalCommitsAnalysed || 0) / Math.max(1, repositoryAge) * 2));
    const complexity = Math.min(100, Math.round(((repositoryMetrics.numberOfFiles || 0) / 150) * 40 + ((repositoryMetrics.numberOfDirectories || 0) / 25) * 20 + ((analysisResults?.repositorySummary?.languageDistribution ? Object.keys(analysisResults.repositorySummary.languageDistribution).length : 1) * 10)));
    const repositoryHealthScore = Math.round((codebaseHealth.documentationScore || 0) * 0.3 + (codebaseHealth.branchHygiene || 0) * 0.25 + (codebaseHealth.maintenanceScore || 0) * 0.25 + (codebaseHealth.repositoryActivityScore || 0) * 0.2);

    return {
        repositoryHealthScore,
        documentationScore: codebaseHealth.documentationScore ?? 0,
        branchHygiene: codebaseHealth.branchHygiene ?? 0,
        maintenanceScore: codebaseHealth.maintenanceScore ?? 0,
        repositoryRisk: codebaseHealth.dependencyRisk || "Low",
        busFactor: codebaseHealth.busFactor || 1,
        repositoryGrowth: `${repoGrowth}% growth signal`,
        largeFileDetection: repositoryMetrics.totalSize > 2000 ? "Large repository footprint detected" : "No large-file signal detected",
        repositoryComplexity: `${complexity}/100 complexity`,
        technicalDebtIndicators: codebaseHealth.technicalDebtIndicators || []
    };
};

export const buildDnaMetrics = (analysisResults) => {
    const developerDna = analysisResults?.developerDna || {};
    const evidence = developerDna.evidence || {};
    const confidence = Math.min(100, Math.round((Object.keys(evidence).length * 20) + 30));

    return [
        {
            label: "Coding Consistency",
            score: `${developerDna.codingConsistency ?? 0}/100`,
            reason: "Commit cadence and streak continuity",
            evidence: evidence.Consistency || "No streak evidence supplied",
            confidence: `${confidence}%`
        },
        {
            label: "Collaboration",
            score: `${developerDna.collaboration ?? 0}/100`,
            reason: "Pull requests and issue participation",
            evidence: evidence.Collaboration || "No collaboration evidence supplied",
            confidence: `${Math.min(100, confidence + 5)}%`
        },
        {
            label: "Ownership",
            score: `${developerDna.ownership ?? 0}/100`,
            reason: "Contribution concentration and continuity",
            evidence: "Derived from contributor and commit patterns",
            confidence: `${Math.min(100, confidence + 3)}%`
        },
        {
            label: "Language Diversity",
            score: `${developerDna.languageDiversity ?? 0}/100`,
            reason: "Range of technologies in the repository",
            evidence: evidence["Language Diversity"] || "No language evidence supplied",
            confidence: `${Math.min(100, confidence + 2)}%`
        },
        {
            label: "Focus Score",
            score: `${developerDna.focusScore ?? 0}/100`,
            reason: "Concentration of work across active periods",
            evidence: "Derived from repository activity and streaks",
            confidence: `${Math.min(100, confidence + 1)}%`
        },
        {
            label: "Discipline",
            score: `${developerDna.discipline ?? 0}/100`,
            reason: "Consistency of execution and maintenance",
            evidence: "Derived from repository cadence and documentation",
            confidence: `${Math.min(100, confidence + 4)}%`
        }
    ];
};

export const buildStoryTimeline = (analysisResults) => {
    const repositorySummary = analysisResults?.repositorySummary || {};
    const repositoryMetrics = analysisResults?.repositoryMetrics || {};
    const commitSummary = analysisResults?.commitSummary || {};
    const repositoryActivity = analysisResults?.repositoryActivity || {};

    return [
        {
            title: "Repository inception",
            date: formatDate(repositorySummary.createdAt),
            detail: `The repository ${repositorySummary.name || "this project"} was created and launched on GitHub.`
        },
        {
            title: "Growth phase",
            date: formatDate(repositorySummary.pushedAt),
            detail: `${commitSummary.totalCommitsAnalysed || 0} commits and ${repositoryActivity.activeBranches?.length || 0} active branches define the current growth phase.`
        },
        {
            title: "Current state",
            date: "Today",
            detail: `${repositoryMetrics.numberOfFiles || 0} files across ${repositoryMetrics.numberOfDirectories || 0} directories, with ${repositoryActivity.openPRs || 0} open PRs and ${repositoryActivity.openIssues || 0} open issues.`
        }
    ];
};

export const buildCoachInsights = (analysisResults) => {
    const careerCoach = analysisResults?.careerCoach || {};
    const codebaseHealth = analysisResults?.codebaseHealth || {};
    const repositoryActivity = analysisResults?.repositoryActivity || {};

    const interviewFocusAreas = [];
    if (codebaseHealth.documentationScore < 70) interviewFocusAreas.push("Explain how you would improve project documentation and onboarding.");
    if ((repositoryActivity.openPRs || 0) + (repositoryActivity.closedPRs || 0) > 0) interviewFocusAreas.push("Discuss your approach to pull request review and collaboration.");
    if ((repositoryActivity.activeBranches?.length || 0) > 3) interviewFocusAreas.push("Describe branch hygiene and release coordination practices.");
    if (!interviewFocusAreas.length) interviewFocusAreas.push("Discuss maintainability and long-term growth planning.");

    return {
        strengths: careerCoach.strengths || [],
        weaknesses: careerCoach.weaknesses || [],
        missingSkills: careerCoach.skillsToImprove || [],
        learningPriorities: careerCoach.learningPriorities || [],
        interviewFocusAreas
    };
};

export const buildResumeBullets = (analysisResults) => {
    const repositorySummary = analysisResults?.repositorySummary || {};
    const repositoryMetrics = analysisResults?.repositoryMetrics || {};
    const commitSummary = analysisResults?.commitSummary || {};
    const repositoryActivity = analysisResults?.repositoryActivity || {};

    return [
        `Maintained a repository with ${repositoryMetrics.numberOfFiles || 0} files across ${repositoryMetrics.numberOfDirectories || 0} directories in ${repositorySummary.defaultBranch || "the default branch"}.`,
        `Authored ${commitSummary.totalCommitsAnalysed || 0} commits and sustained a ${analysisResults?.telemetry?.longestCommitStreak || 0}-day activity streak.`,
        `Managed ${repositoryActivity.openPRs || 0} open and ${repositoryActivity.closedPRs || 0} closed pull requests while tracking ${repositoryActivity.openIssues || 0} open issues.`,
        `Operated on a project with ${repositorySummary.stars || 0} stars, ${repositorySummary.forks || 0} forks, and ${repositorySummary.watchers || 0} watchers.`
    ];
};

export const buildLearningRoadmap = (analysisResults) => {
    const repositorySummary = analysisResults?.repositorySummary || {};
    const languageDistribution = repositorySummary.languageDistribution || {};
    const detectedLanguages = Object.keys(languageDistribution);
    const topics = repositorySummary.topics || [];
    const architecture = (repositoryMetrics) => {
        const files = repositoryMetrics.numberOfFiles || 0;
        const dirs = repositoryMetrics.numberOfDirectories || 0;
        if (files > 120 && dirs > 12) return "modular multi-directory architecture";
        if (files > 50) return "service-oriented repository layout";
        return "straightforward repository structure";
    };

    const detectedFrameworks = topics.filter((topic) => ["react", "vue", "spring", "django", "fastapi", "express", "next", "flask", "nestjs"].includes(topic.toLowerCase()));

    return {
        languages: detectedLanguages.length ? detectedLanguages : [repositorySummary.defaultBranch ? "Repository language" : "N/A"],
        frameworks: detectedFrameworks.length ? detectedFrameworks : ["No framework topics detected"],
        libraries: topics.filter((topic) => !detectedFrameworks.includes(topic)).slice(0, 4),
        architecture: architecture(analysisResults?.repositoryMetrics || {}),
        nextTopics: [
            `Deepen fluency in ${detectedLanguages[0] || "the primary language"}`,
            detectedFrameworks.length ? `Advance the ${detectedFrameworks[0]} ecosystem usage` : "Strengthen architectural documentation and design practices",
            `Improve testability and CI workflows for the current ${architecture(analysisResults?.repositoryMetrics || {})}`
        ]
    };
};
