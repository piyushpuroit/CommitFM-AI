import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RepositoryProvider, useRepository } from "./contexts/RepositoryContext";

import HomePage from "./pages/HomePage";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const DeveloperDNAPage = lazy(() => import("./pages/DeveloperDNAPage"));
const RepositoryExplorer = lazy(() => import("./pages/RepositoryExplorer"));
const RepositoryDetails = lazy(() => import("./pages/RepositoryDetails"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const GlobalSearchPage = lazy(() => import("./pages/GlobalSearchPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const DemoDashboardPage = lazy(() => import("./pages/DemoDashboardPage"));

function AppRoutes() {
  const { user, userLoading } = useRepository();

  const params = new URLSearchParams(window.location.search);
  const isAuthCallback = params.get("auth") === "success";
  const isPublicRoute = (window.location.pathname === "/" || window.location.pathname === "/demo") && !isAuthCallback;

  if (userLoading && !isPublicRoute) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-xs text-brand-muted font-bold gap-3">
        <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        <span>Authenticating session...</span>
      </div>
    );
  }


  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-xs text-brand-muted font-bold gap-3">
        <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        <span>Loading...</span>
      </div>
    }>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={user ? <Navigate to="/repositories" /> : <HomePage />} />
        <Route path="/connect" element={user ? <Navigate to="/repositories" /> : <Navigate to="/" />} />
        <Route path="/demo" element={<DemoDashboardPage />} />

        {/* Authenticated Routes */}
        <Route path="/repositories" element={user ? <RepositoryExplorer /> : <Navigate to="/" />} />
        <Route path="/repositories/:id" element={user ? <RepositoryDetails /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/dashboard/:owner/:repo" element={user ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/dna" element={user ? <DeveloperDNAPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/compare" element={user ? <ComparePage /> : <Navigate to="/" />} />
        <Route path="/search" element={user ? <GlobalSearchPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/" />} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <RepositoryProvider>
      <AppRoutes />
    </RepositoryProvider>
  );
}

export default App;