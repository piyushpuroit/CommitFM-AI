import { Commit } from "../models/Commit";

export const commitService = {
    /**
     * Retrieves commits for a specific repository from the backend API.
     * @param {number|string} repositoryId - Repository identifier.
     * @returns {Promise<Commit[]>}
     */
    async getCommits(repositoryId) {
        const response = await fetch(`http://localhost:8080/api/github/repositories/${repositoryId}/commits`);
        if (!response.ok) {
            throw new Error(`Failed to fetch commits: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map(commit => new Commit(commit));
    }
};

export default commitService;
