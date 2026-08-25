import { useContext, useState, useCallback } from "react";
import { RepositoryContext } from "../contexts/RepositoryContext";
import { githubService } from "../services/githubService";

/**
 * Custom React hook to fetch repositories and manage loading/error state.
 * Uses centralized RepositoryContext when mounted inside RepositoryProvider.
 */
export const useRepositories = () => {
    const context = useContext(RepositoryContext);
    const [localRepos, setLocalRepos] = useState([]);
    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState(null);

    const fallbackFetch = useCallback(async (force = false) => {
        setLocalLoading(true);
        setLocalError(null);
        try {
            const data = await githubService.getRepositories(force);
            setLocalRepos(data);
            return data;
        } catch (err) {
            setLocalError(err.message || "Failed to load repositories");
            throw err;
        } finally {
            setLocalLoading(false);
        }
    }, []);

    if (context) {
        return {
            repositories: context.repositories,
            loading: context.repositoriesLoading,
            error: context.repositoriesError,
            fetchRepositories: context.fetchRepositories
        };
    }

    return {
        repositories: localRepos,
        loading: localLoading,
        error: localError,
        fetchRepositories: fallbackFetch
    };
};

export default useRepositories;
