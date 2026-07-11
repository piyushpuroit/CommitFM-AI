import React, { createContext, useContext, useState } from "react";

export const RepositoryContext = createContext(undefined);

export function RepositoryProvider({ children }) {
  const [selectedRepository, setSelectedRepository] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [analysisResults, setAnalysisResults] = useState(null);

  const value = {
    selectedRepository,
    setSelectedRepository,
    analysisStatus,
    setAnalysisStatus,
    analysisResults,
    setAnalysisResults,
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
