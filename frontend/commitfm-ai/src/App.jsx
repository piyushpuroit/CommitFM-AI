import { useState } from "react";
import HomePage from "./pages/HomePage";

function App() {
  const [commits, setCommits] = useState([]);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const fetchCommits = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/commits");
      const data = await response.json();
      setCommits(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HomePage
      commits={commits}
      onFetchCommits={fetchCommits}
      onStartOnboarding={() => setOnboardingOpen(true)}
      onboardingOpen={onboardingOpen}
      onCloseOnboarding={() => setOnboardingOpen(false)}
    />
  );
}

export default App;
