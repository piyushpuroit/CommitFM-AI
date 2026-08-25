import { Routes, Route } from "react-router-dom";
import { RepositoryProvider } from "./contexts/RepositoryContext";

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

function App() {
  return (
    <RepositoryProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/:owner/:repo" element={<DashboardPage />} />
        <Route path="/connect" element={<OnboardingPage />} />
        <Route path="/dna" element={<DeveloperDNAPage />} />
        <Route path="/repositories" element={<RepositoryExplorer />} />
        <Route path="/repositories/:id" element={<RepositoryDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/search" element={<GlobalSearchPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </RepositoryProvider>
  );
}

export default App;