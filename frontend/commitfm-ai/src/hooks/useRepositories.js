import { useState, useCallback } from "react";
import { githubService } from "../services/githubService";

/**
 * Custom React hook to fetch repositories and manage loading/error state.
 */
export const useRepositories = () => {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRepositories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await githubService.getRepositories();
            setRepositories(data);
        } catch (err) {
            setError(err.message || "Failed to load repositories");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        repositories,
        loading,
        error,
        fetchRepositories
    };
};

export default useRepositories;
