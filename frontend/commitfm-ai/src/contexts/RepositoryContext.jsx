import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { getApiUrl } from "../services/apiClient";
import { githubService } from "../services/githubService";

export const RepositoryContext = createContext(undefined);

export function RepositoryProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [authError, setAuthError] = useState(null);

  const [repositories, setRepositories] = useState([]);
  const [repositoriesLoading, setRepositoriesLoading] = useState(false);
  const [repositoriesError, setRepositoriesError] = useState(null);

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

  const abortControllerRef = useRef(null);
  const analysisCacheRef = useRef({});
  const initRef = useRef(false);
  const reposInflightRef = useRef(null);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const login = useCallback(() => {
    window.location.assign(`${getApiUrl()}/api/auth/github/login`);
  }, []);

  const setSelectedRepository = useCallback((repo) => {
    setSelectedRepositoryState(repo);
    if (repo) {
      localStorage.setItem("selectedRepository", JSON.stringify(repo));
    } else {
      localStorage.removeItem("selectedRepository");
    }
  }, []);

  const fetchRepositories = useCallback(async (force = false) => {
    if (!force && repositories.length > 0) {
      return repositories;
    }
    if (reposInflightRef.current) {
      return reposInflightRef.current;
    }

    setRepositoriesLoading(true);
    setRepositoriesError(null);

    const promise = (async () => {
      try {
        const data = await githubService.getRepositories(force);
        setRepositories(data);
        setRepositoriesLoading(false);
        return data;
      } catch (err) {
        console.error("fetchRepositories error:", err);
        setRepositoriesError(err.message || "Failed to load repositories");
        setRepositoriesLoading(false);
        throw err;
      } finally {
        reposInflightRef.current = null;
      }
    })();

    reposInflightRef.current = promise;
    return promise;
  }, [repositories]);

  const fetchAnalysis = useCallback(async (owner, repoName) => {
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
  }, []);

  const switchRepository = useCallback(async (repo) => {
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
  }, [setSelectedRepository, fetchAnalysis]);

  // Centralized Auth & Session Initialization
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const currentQuery = window.location.search;
    const params = new URLSearchParams(currentQuery);
    const authParam = params.get("auth");

    console.log("[AUTH_INIT] Starting auth initialization. Query:", currentQuery);

    if (authParam === "failed") {
      console.warn("[AUTH_INIT] OAuth returned auth=failed");
      setAuthError("GitHub connection failed — Try again");
      setUser(null);
      setRepositories([]);
      setAuthChecking(false);

      // Clean up URL query parameter without full page reload
      params.delete("auth");
      const remainingSearch = params.toString();
      const cleanUrl = window.location.pathname + (remainingSearch ? `?${remainingSearch}` : "");
      window.history.replaceState({}, document.title, cleanUrl);
      return;
    }

    // Call /api/auth/me to check active session
    fetch(`${getApiUrl()}/api/auth/me`, { credentials: "include" })
      .then(async (res) => {
        console.log("[AUTH_INIT] /api/auth/me response status:", res.status);
        if (res.ok) {
          const userData = await res.json();
          console.log("[AUTH_INIT] Authenticated user:", userData?.login || "unknown");
          setUser(userData);
          setAuthError(null);

          // Fetch repositories immediately with confirmed session
          fetchRepositories(true).catch((err) => {
            console.error("[AUTH_INIT] Initial repository load error:", err);
          });
          return userData;
        } else {
          console.log("[AUTH_INIT] User not authenticated (status:", res.status, ")");
          setUser(null);
          setRepositories([]);
          if (authParam === "success") {
            setAuthError("GitHub connection failed — Try again");
          }
        }
      })
      .catch((err) => {
        console.error("[AUTH_INIT] /api/auth/me failed:", err);
        setUser(null);
        setRepositories([]);
        if (authParam === "success") {
          setAuthError("GitHub connection failed — Try again");
        }
      })
      .finally(() => {
        // Clean up ?auth= query parameter without reload
        if (params.has("auth")) {
          params.delete("auth");
          const remainingSearch = params.toString();
          const cleanUrl = window.location.pathname + (remainingSearch ? `?${remainingSearch}` : "");
          window.history.replaceState({}, document.title, cleanUrl);
        }
        setAuthChecking(false);
      });
  }, [fetchRepositories]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${getApiUrl()}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      setRepositories([]);
      setSelectedRepository(null);
      setAnalysisResult(null);
      setAuthError(null);
      githubService.clearCache();
      analysisCacheRef.current = {};
      sessionStorage.removeItem("commitfm_user");
      sessionStorage.removeItem("commitfm_auth_checked");
    }
  }, [setSelectedRepository]);

  const value = {
    // Auth state
    user,
    setUser,
    authChecking,
    userLoading: authChecking, // backward compatibility
    authenticated: Boolean(user),
    unauthenticated: !authChecking && !user,
    authError,
    clearAuthError,
    login,
    logout,

    // Repositories state
    repositories,
    setRepositories,
    repositoriesLoading,
    repositoriesError,
    fetchRepositories,

    // Active repository & analysis state
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

    // Commits compatibility aliases
    commits: analysisResult?.commits || [],
    commitsLoading: loading,
    commitsError: error,
    commitsStatus: loading ? "loading" : error ? "error" : "success"
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
