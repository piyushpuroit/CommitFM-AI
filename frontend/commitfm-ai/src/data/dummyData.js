export const dashboardData = {
    commitCount: 128,
    streakDays: 7,
    aiSummary: "This week you focused on refactors and performance improvements. Tests increased by 12% and hotspots were reduced in core modules.",
    devScore: 87,
    waveform: [6, 10, 4, 12, 8, 14, 6, 9, 3, 7, 11, 5, 13, 8, 6]
};

export const repositoriesData = [
    { id: 1, name: "CommitFM-AI", desc: "Main AI-powered commit analyzer", stars: 2340, language: "JavaScript" },
    { id: 2, name: "neural-devtools", desc: "Neural network dev utilities", stars: 892, language: "Python" },
    { id: 3, name: "code-poetry", desc: "Lyrical code transformations", stars: 456, language: "TypeScript" },
    { id: 4, name: "gitflow-pro", desc: "Advanced git workflow tools", stars: 1205, language: "Go" },
    { id: 5, name: "devops-cli", desc: "DevOps automation platform", stars: 3245, language: "Rust" },
];

export const analysisSteps = [
    "Fetching commit history...",
    "Analyzing code patterns...",
    "Computing developer metrics...",
    "Generating insights...",
    "Processing AI analysis...",
];

export const analysisData = {
    totalCommits: 342,
    averageCommitSize: 128,
    topLanguages: ["JavaScript", "TypeScript", "Python"],
    devScore: 92,
    commitFrequency: "12 commits/week",
    codeHealth: 88,
    testCoverage: 76,
    hotFiles: [
        { name: "App.jsx", changes: 324, health: 95 },
        { name: "utils.ts", changes: 218, health: 87 },
        { name: "api.js", changes: 156, health: 92 },
    ],
};

export const features = [
    {
        title: "AI Devlogs",
        desc: "Daily/weekly narrated devlogs that summarize work and decisions.",
        accent: "bg-indigo-500"
    },
    {
        title: "Commit Analysis",
        desc: "Automated semantic analysis, hotspots, and code health metrics.",
        accent: "bg-emerald-500"
    },
    {
        title: "Developer Personality",
        desc: "Profiles that surface coding style, collaboration tendencies, and strengths.",
        accent: "bg-fuchsia-500"
    },
    {
        title: "Burnout Detection",
        desc: "Signals from commit tempo, sentiment, and issue backlog to flag risk.",
        accent: "bg-rose-500"
    },
    {
        title: "GitHub Roast Mode",
        desc: "A humorous, candid summary of your repo's quirks and sins (opt-in).",
        accent: "bg-yellow-500"
    },
    {
        title: "Spotify Wrapped for Developers",
        desc: "Yearly highlights: most touched files, peak hours, top changelogs.",
        accent: "bg-sky-500"
    },
];
