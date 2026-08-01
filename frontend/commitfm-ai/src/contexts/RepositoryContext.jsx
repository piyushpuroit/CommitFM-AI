import React, { createContext, useContext, useState, useEffect } from "react";
import { commitService } from "../services/commitService";

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

  const [commits, setCommits] = useState([]);
  const [commitsLoading, setCommitsLoading] = useState(false);
  const [commitsError, setCommitsError] = useState(null);
  const [commitsStatus, setCommitsStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'empty' | 'error'

  const [analysisStatus, setAnalysisStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [analysisResults, setAnalysisResults] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const setSelectedRepository = (repo) => {
    setSelectedRepositoryState(repo);
    if (repo) {
      localStorage.setItem("selectedRepository", JSON.stringify(repo));
    } else {
      localStorage.removeItem("selectedRepository");
    }
  };

  useEffect(() => {
    // Check if user is already authenticated
    fetch("http://localhost:8080/api/auth/me", { credentials: "include" })
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

  useEffect(() => {
    if (!selectedRepository) {
      setCommits([]);
      setCommitsStatus("idle");
      return;
    }

    const owner = selectedRepository.owner?.login || selectedRepository.fullName?.split("/")[0];
    const repoName = selectedRepository.name || selectedRepository.fullName?.split("/")[1];

    if (!owner || !repoName) {
      setCommits([]);
      setCommitsStatus("error");
      setCommitsError("Invalid repository metadata");
      return;
    }

    const fetchRepoCommits = async () => {
      setCommitsLoading(true);
      setCommitsError(null);
      setCommitsStatus("loading");
      try {
        const data = await commitService.getCommits(owner, repoName);
        setCommits(data);
        if (data.length === 0) {
          setCommitsStatus("empty");
        } else {
          setCommitsStatus("success");
        }
      } catch (err) {
        console.error("Auto-fetching commits failed:", err);
        setCommitsError(err.message || "Failed to load commits");
        setCommitsStatus("error");
      } finally {
        setCommitsLoading(false);
      }
    };

    fetchRepoCommits();
  }, [selectedRepository]);

  const logout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", { method: "POST", credentials: "include" });
      setUser(null);
      setSelectedRepository(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const value = {
    selectedRepository,
    setSelectedRepository,
    commits,
    commitsLoading,
    commitsError,
    commitsStatus,
    analysisStatus,
    setAnalysisStatus,
    analysisResults,
    setAnalysisResults,
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
