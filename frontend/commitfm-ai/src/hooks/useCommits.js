import { useState, useCallback } from "react";
import { commitService } from "../services/commitService";

/**
 * Custom React hook to fetch commits for a repository and manage state.
 */
export const useCommits = () => {
    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCommits = useCallback(async (repositoryId) => {
        if (!repositoryId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await commitService.getCommits(repositoryId);
            setCommits(data);
        } catch (err) {
            setError(err.message || "Failed to load commits");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        commits,
        loading,
        error,
        fetchCommits
    };
};

export default useCommits;
