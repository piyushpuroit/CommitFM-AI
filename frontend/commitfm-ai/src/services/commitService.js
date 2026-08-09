import { Commit } from "../models/Commit";

export const commitService = {
    /**
     * Retrieves commits for a specific repository from the backend API.
     * @param {number|string} repositoryId - Repository identifier.
     * @returns {Promise<Commit[]>}
     */
    async getCommits(owner, repo, options = {}) {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/github/repositories/${owner}/${repo}/commits`, {
            credentials: "include",
            ...options
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch commits: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map(commit => new Commit(commit));
    }
};

export default commitService;
