import { Routes, Route, Navigate } from "react-router-dom";
import { RepositoryProvider, useRepository } from "./contexts/RepositoryContext";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import OnboardingPage from "./pages/OnboardingPage";
import DeveloperDNAPage from "./pages/DeveloperDNAPage";
import RepositoryExplorer from "./pages/RepositoryExplorer";
import RepositoryDetails from "./pages/RepositoryDetails";

import ProfilePage from "./pages/ProfilePage";
import ComparePage from "./pages/ComparePage";
import GlobalSearchPage from "./pages/GlobalSearchPage";
import SettingsPage from "./pages/SettingsPage";

function AppRoutes() {
  const { user, userLoading } = useRepository();

  if (userLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-xs text-brand-muted font-bold gap-3">
        <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        <span>Authenticating session...</span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={user ? <Navigate to="/repositories" /> : <HomePage />} />
      <Route path="/connect" element={user ? <Navigate to="/repositories" /> : <Navigate to="/" />} />

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