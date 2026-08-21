import { GitHubRepository } from "../models/GitHubRepository";
import { getApiUrl } from "./apiClient";

export const githubService = {
    _repositoriesCache: null,

    /**
     * Retrieves all repositories from backend.
     * @returns {Promise<GitHubRepository[]>}
     */
    async getRepositories() {
        if (this._repositoriesCache) {
            console.log("[DIAGNOSTIC] REPOSITORIES_CACHE_HIT", { count: this._repositoriesCache.length });
            return this._repositoriesCache;
        }
        const currentPath = window.location.pathname;
        const currentQuery = window.location.search;
        console.log("[DIAGNOSTIC] REPOSITORIES_FETCH_START", { path: currentPath, query: currentQuery });
        try {
            const response = await fetch(`${getApiUrl()}/api/github/repositories`, {
                credentials: "include"
            });
            console.log("[DIAGNOSTIC] REPOSITORIES_FETCH_RESULT", { status: response.status, ok: response.ok });
            if (!response.ok) {
                const err = new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
                err.status = response.status;
                throw err;
            }
            const data = await response.json();
            console.log("[DIAGNOSTIC] REPOSITORIES_COUNT", { count: data.length });
            this._repositoriesCache = data.map(repo => new GitHubRepository(repo));
            return this._repositoriesCache;
        } catch (err) {
            console.error("[DIAGNOSTIC] REPOSITORIES_FETCH_ERROR", { message: err.message, status: err.status || "network_error" });
            throw err;
        }
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
     * Retrieves detailed repository statistics by owner and name path.
     * @param {string} owner - Repository owner login.
     * @param {string} repo - Repository name.
     * @returns {Promise<GitHubRepository>}
     */
    async getRepositoryDetailsByPath(owner, repo) {
        const response = await fetch(`${getApiUrl()}/api/github/repositories/${owner}/${repo}`, {
            credentials: "include"
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch repository details: ${response.statusText}`);
        }
        const data = await response.json();
        return new GitHubRepository(data);
    }
};

export default githubService;

