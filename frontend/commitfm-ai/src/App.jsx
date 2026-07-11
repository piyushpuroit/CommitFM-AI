import { Routes, Route } from "react-router-dom";
import { RepositoryProvider } from "./contexts/RepositoryContext";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import OnboardingPage from "./pages/OnboardingPage";
import DeveloperDNAPage from "./pages/DeveloperDNAPage";
import RepositoryExplorer from "./pages/RepositoryExplorer";
import RepositoryDetails from "./pages/RepositoryDetails";

function App() {
  return (
    <RepositoryProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/connect" element={<OnboardingPage />} />
        <Route path="/dna" element={<DeveloperDNAPage />} />
        <Route path="/repositories" element={<RepositoryExplorer />} />
        <Route path="/repositories/:id" element={<RepositoryDetails />} />
      </Routes>
    </RepositoryProvider>
  );
}

export default App;