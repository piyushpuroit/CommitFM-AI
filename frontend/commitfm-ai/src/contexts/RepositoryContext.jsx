import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { getApiUrl } from "../services/apiClient";

import { githubService } from "../services/githubService";

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
  const analysisCacheRef = useRef({});
  const fetchedRef = useRef(false);

  const setSelectedRepository = (repo) => {
    setSelectedRepositoryState(repo);
    if (repo) {
      localStorage.setItem("selectedRepository", JSON.stringify(repo));
    } else {
      localStorage.removeItem("selectedRepository");
    }
  };

  const fetchAnalysis = async (owner, repoName) => {
    const cacheKey = `${owner}/${repoName}`.toLowerCase();
    
    // Check cache
    if (analysisCacheRef.current[cacheKey]) {
      setAnalysisResult(analysisCacheRef.current[cacheKey]);
      setLoading(false);
      setError(null);
      return analysisCacheRef.current[cacheKey];
    }

    // Cancel previous requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError(null);

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
        analysisCacheRef.current[cacheKey] = data;
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
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const currentPath = window.location.pathname;
    const currentQuery = window.location.search;
    const params = new URLSearchParams(currentQuery);

    console.log("[DIAGNOSTIC] CURRENT_PATH:", currentPath);
    console.log("[DIAGNOSTIC] CURRENT_QUERY:", currentQuery);

    if (params.get("auth") === "success") {
      console.log("[DIAGNOSTIC] OAUTH_SUCCESS_DETECTED", { path: currentPath, query: currentQuery });
    }

    console.log("[DIAGNOSTIC] AUTH_ME_START", { path: currentPath, query: currentQuery });
    fetch(`${getApiUrl()}/api/auth/me`, { credentials: "include" })
      .then(async (res) => {
        console.log("[DIAGNOSTIC] AUTH_ME_RESULT", { status: res.status, ok: res.ok });
        if (res.ok) {
          const data = await res.json();
          console.log("[DIAGNOSTIC] AUTH_USER_STATE", { authenticated: true, username: data?.login || "unknown" });
          setUser(data);
          return data;
        } else {
          console.log("[DIAGNOSTIC] AUTH_USER_STATE", { authenticated: false, username: null });
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("[DIAGNOSTIC] AUTH_ME_FAILED", { message: err.message });
        console.log("[DIAGNOSTIC] AUTH_USER_STATE", { authenticated: false, username: null });
        setUser(null);
      })
      .finally(() => {
        // Clean up query parameters from the address bar without reload
        if (params.has("auth")) {
          params.delete("auth");
          const newSearch = params.toString();
          const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : "");
          window.history.replaceState({}, document.title, newUrl);
        }
        setUserLoading(false);
      });
  }, []);



  const logout = async () => {
    try {
      await fetch(`${getApiUrl()}/api/auth/logout`, { method: "POST", credentials: "include" });
      setUser(null);
      setSelectedRepository(null);
      setAnalysisResult(null);
      githubService._repositoriesCache = null;
      analysisCacheRef.current = {};
      sessionStorage.removeItem("commitfm_user");
      sessionStorage.removeItem("commitfm_auth_checked");
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
