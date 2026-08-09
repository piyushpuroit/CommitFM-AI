import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { getApiUrl } from "../services/apiClient";

export const RepositoryContext = createContext(undefined);

export function RepositoryProvider({ children }) {
  const [selectedRepository, setSelectedRepositoryState] = useState(() => {
    const saved = localStorage.getItem("selectedRepository");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const abortControllerRef = useRef(null);

  const setSelectedRepository = (repo) => {
    setSelectedRepositoryState(repo);
    if (repo) {
      localStorage.setItem("selectedRepository", JSON.stringify(repo));
    } else {
      localStorage.removeItem("selectedRepository");
    }
  };

  const fetchAnalysis = async (owner, repoName) => {
    // Cancel previous requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch(`${getApiUrl()}/api/analysis/${owner}/${repoName}`, {
        credentials: "include",
        signal
      });
      if (!response.ok) {
        throw new Error("Failed to load repository analysis");
      }
      const data = await response.json();
      if (!signal.aborted) {
        setAnalysisResult(data);
        setLoading(false);
        return data;
      }
    } catch (err) {
      if (!signal.aborted) {
        console.error("fetchAnalysis failed:", err);
        setError(err.message || "Failed to analyze repository");
        setLoading(false);
        throw err;
      }
    }
  };

  const switchRepository = async (repo) => {
    setSelectedRepository(repo);
    if (repo) {
      const owner = repo.owner?.login || repo.owner || repo.fullName?.split("/")[0];
      const repoName = repo.name || repo.repo || repo.fullName?.split("/")[1];
      if (owner && repoName) {
        return await fetchAnalysis(owner, repoName);
      }
    } else {
      setAnalysisResult(null);
      setLoading(false);
      setError(null);
    }
  };

  useEffect(() => {
    fetch(`${getApiUrl()}/api/auth/me`, { credentials: "include" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Unauthorized");
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setUserLoading(false);
      });
  }, []);

  const logout = async () => {
    try {
      await fetch(`${getApiUrl()}/api/auth/logout`, { method: "POST", credentials: "include" });
      setUser(null);
      setSelectedRepository(null);
      setAnalysisResult(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const value = {
    selectedRepository,
    setSelectedRepository,
    analysisResult,
    analysisResults: analysisResult,
    loading,
    analysisLoading: loading,
    error,
    analysisError: error,
    fetchAnalysis,
    switchRepository,
    user,
    setUser,
    userLoading,
    logout
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepository() {
  const context = useContext(RepositoryContext);
  if (context === undefined) {
    throw new Error("useRepository must be used within a RepositoryProvider");
  }
  return context;
}
