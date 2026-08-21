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
            return this._repositoriesCache;
        }
        console.log("[REPO] REPOSITORIES_FETCH_START");
        try {
            const response = await fetch(`${getApiUrl()}/api/github/repositories`, {
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log("[REPO] REPOSITORIES_FETCH_SUCCESS", data.length);
            this._repositoriesCache = data.map(repo => new GitHubRepository(repo));
            return this._repositoriesCache;
        } catch (err) {
            console.error("[REPO] REPOSITORIES_FETCH_FAILED", err);
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

