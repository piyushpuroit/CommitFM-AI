import { GitHubRepository } from "../models/GitHubRepository";
import { Commit } from "../models/Commit";
import { PullRequest } from "../models/PullRequest";
import { Contributor } from "../models/Contributor";

// Mock Database representing repositories, commits, PRs, and contributors
const mockRepositories = [
    {
        id: 101,
        name: "commitfm-ai",
        fullName: "piyushpuroit/commitfm-ai",
        description: "AI-powered developer intelligence cockpit and codebase diagnostic suite.",
        htmlUrl: "https://github.com/piyushpuroit/commitfm-ai",
        defaultBranch: "main",
        languages: { JavaScript: 45000, TypeScript: 120000, CSS: 15000, HTML: 5000 },
        starsCount: 342,
        forksCount: 48,
        openIssuesCount: 4,
        isPrivate: false,
        lastSyncedAt: new Date().toISOString(),
        owner: { login: "piyushpuroit", avatar_url: "https://github.com/piyushpuroit.png" }
    },
    {
        id: 102,
        name: "telemetry-engine",
        fullName: "piyushpuroit/telemetry-engine",
        description: "High-throughput ingestion daemon for parsing git histories and commit footprints.",
        htmlUrl: "https://github.com/piyushpuroit/telemetry-engine",
        defaultBranch: "develop",
        languages: { Go: 180000, ProtocolBuffers: 8000 },
        starsCount: 89,
        forksCount: 12,
        openIssuesCount: 2,
        isPrivate: true,
        lastSyncedAt: new Date(Date.now() - 86400000).toISOString(),
        owner: { login: "piyushpuroit", avatar_url: "https://github.com/piyushpuroit.png" }
    }
];

const mockCommits = {
    101: [
        {
            sha: "a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2",
            message: "refactor: consolidate dashboard grid to 3-column layout hierarchy",
            authorName: "Piyush Purohit",
            authorEmail: "piyush@commitfm.ai",
            date: "2026-06-10T12:00:00Z",
            additions: 120,
            deletions: 45,
            htmlUrl: "https://github.com/piyushpuroit/commitfm-ai/commit/a3b4c5d6",
            repositoryId: 101
        },
        {
            sha: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1",
            message: "feat: add float-animated badge widgets to landing page hero section",
            authorName: "Piyush Purohit",
            authorEmail: "piyush@commitfm.ai",
            date: "2026-06-09T15:30:00Z",
            additions: 85,
            deletions: 12,
            htmlUrl: "https://github.com/piyushpuroit/commitfm-ai/commit/b2c3d4e5",
            repositoryId: 101
        }
    ],
    102: [
        {
            sha: "9i8h7g6f5e4d3c2b1a0z9y8x7w6v5u4t3s2r1q0p",
            message: "fix: resolve memory leak in pipeline telemetry streaming loop",
            authorName: "Piyush Purohit",
            authorEmail: "piyush@commitfm.ai",
            date: "2026-06-08T09:15:00Z",
            additions: 34,
            deletions: 80,
            htmlUrl: "https://github.com/piyushpuroit/telemetry-engine/commit/9i8h7g6f",
            repositoryId: 102
        }
    ]
};

const mockPullRequests = {
    101: [
        {
            id: 201,
            number: 42,
            title: "Introduce Developer Evolution Timeline view",
            body: "Adds filtering and motion-supported list transitions to evolution timeline.",
            state: "merged",
            createdAt: "2026-06-09T10:00:00Z",
            closedAt: "2026-06-09T14:30:00Z",
            mergedAt: "2026-06-09T14:30:00Z",
            user: { login: "piyushpuroit" },
            commentsCount: 3,
            additions: 240,
            deletions: 15
        }
    ],
    102: []
};

const mockContributors = {
    101: [
        {
            id: 501,
            login: "piyushpuroit",
            avatarUrl: "https://github.com/piyushpuroit.png",
            htmlUrl: "https://github.com/piyushpuroit",
            contributionsCount: 154,
            type: "User"
        },
        {
            id: 502,
            login: "dependabot[bot]",
            avatarUrl: "https://github.com/dependabot.png",
            htmlUrl: "https://github.com/dependabot",
            contributionsCount: 12,
            type: "Bot"
        }
    ],
    102: [
        {
            id: 501,
            login: "piyushpuroit",
            avatarUrl: "https://github.com/piyushpuroit.png",
            htmlUrl: "https://github.com/piyushpuroit",
            contributionsCount: 89,
            type: "User"
        }
    ]
};

/**
 * GitHubService Abstraction Layer.
 * Interacts with domain models and resolves mock data via Promises,
 * allowing it to be seamlessly replaced with real Fetch/Axios API calls later.
 */
export const githubService = {
    /**
     * Retrieves all repositories from backend or fallback mock database.
     * @returns {Promise<GitHubRepository[]>}
     */
    async getRepositories() {
        const response = await fetch("http://localhost:8080/api/github/repositories");
        if (!response.ok) {
            throw new Error(`Failed to fetch repositories: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map(repo => new GitHubRepository(repo));
    },

    /**
     * Retrieves specific repository metadata.
     * @param {number|string} id - Repository identifier.
     * @returns {Promise<GitHubRepository|null>}
     */
    async getRepository(id) {
        try {
            const repos = await this.getRepositories();
            return repos.find(repo => repo.id === Number(id)) || null;
        } catch (err) {
            console.error("Error retrieving repository details:", err);
            throw err;
        }
    },

    /**
     * Retrieves specific repository metadata details. Alias for getRepository.
     * @param {number|string} repositoryId - Repository identifier.
     * @returns {Promise<GitHubRepository|null>}
     */
    async getRepositoryDetails(repositoryId) {
        return this.getRepository(repositoryId);
    },

    /**
     * Retrieves commits for a specific repository.
     * @param {number|string} repoId - Repository identifier.
     * @returns {Promise<Commit[]>}
     */
    async getCommits(repoId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const commits = mockCommits[Number(repoId)] || [];
                resolve(commits.map(c => new Commit(c)));
            }, 100);
        });
    },

    /**
     * Retrieves pull requests for a specific repository.
     * @param {number|string} repoId - Repository identifier.
     * @returns {Promise<PullRequest[]>}
     */
    async getPullRequests(repoId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const pulls = mockPullRequests[Number(repoId)] || [];
                resolve(pulls.map(pr => new PullRequest(pr)));
            }, 100);
        });
    },

    /**
     * Retrieves contributors for a specific repository.
     * @param {number|string} repoId - Repository identifier.
     * @returns {Promise<Contributor[]>}
     */
    async getContributors(repoId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const users = mockContributors[Number(repoId)] || [];
                resolve(users.map(u => new Contributor(u)));
            }, 100);
        });
    }
};

export default githubService;
