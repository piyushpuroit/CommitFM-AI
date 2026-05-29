import { useState } from "react";

// Onboarding Components

const Step1ConnectGithub = ({ onConnect }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
          <svg className="w-16 h-16 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold mb-3">Connect Your GitHub</h2>
        <p className="text-zinc-400 text-lg mb-8">Authenticate with GitHub to start analyzing your repositories</p>
      </div>

      <div className="max-w-md mx-auto">
        <button
          onClick={onConnect}
          className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Connect GitHub
        </button>
        <p className="text-center text-zinc-500 mt-4 text-sm">Your data is secure. We never store credentials.</p>
      </div>
    </div>
  );
};

const Step2RepositorySelection = ({ onSelect }) => {
  const dummyRepos = [
    { id: 1, name: "CommitFM-AI", desc: "Main AI-powered commit analyzer", stars: 2340, language: "JavaScript" },
    { id: 2, name: "neural-devtools", desc: "Neural network dev utilities", stars: 892, language: "Python" },
    { id: 3, name: "code-poetry", desc: "Lyrical code transformations", stars: 456, language: "TypeScript" },
    { id: 4, name: "gitflow-pro", desc: "Advanced git workflow tools", stars: 1205, language: "Go" },
    { id: 5, name: "devops-cli", desc: "DevOps automation platform", stars: 3245, language: "Rust" },
  ];

  return (
    <div className="animate-slide-in-right">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Select a Repository</h2>
        <p className="text-zinc-400">Choose a repository to analyze</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
        {dummyRepos.map((repo) => (
          <div
            key={repo.id}
            onClick={() => onSelect(repo)}
            className="p-4 rounded-lg bg-slate-800 border border-white/6 hover:border-indigo-500/50 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-indigo-400 transition">{repo.name}</h3>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">{repo.language}</span>
            </div>
            <p className="text-zinc-400 text-sm mb-3">{repo.desc}</p>
            <div className="flex items-center gap-2 text-yellow-500 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3 6 6 .5-4.5 3.8L19 20l-7-4-7 4 1.5-7.7L3 8.5 9 8 12 2z" />
              </svg>
              {repo.stars.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Step3AnalysisLoading = () => {
  const analysisSteps = [
    "Fetching commit history...",
    "Analyzing code patterns...",
    "Computing developer metrics...",
    "Generating insights...",
    "Processing AI analysis...",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % analysisSteps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-96">
      <div className="mb-8">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 animate-pulse-ring" />
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin-slow" />
          <div className="absolute inset-8 flex items-center justify-center">
            <svg className="w-12 h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Analyzing Repository</h2>
      <p className="text-xl text-indigo-400 mb-6 h-6 animate-pulse">{analysisSteps[currentStep]}</p>

      <div className="w-full max-w-md space-y-2">
        {analysisSteps.map((step, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 p-2 rounded transition-all duration-500 ${
              idx <= currentStep ? "text-indigo-400" : "text-zinc-500"
            }`}
          >
            {idx < currentStep && (
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {idx === currentStep && <div className="w-5 h-5 rounded-full bg-indigo-400 animate-pulse" />}
            {idx > currentStep && <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />}
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Step4AnalysisDashboard = ({ repo, onRestart }) => {
  const analysisData = {
    totalCommits: 342,
    averageCommitSize: 128,
    topLanguages: ["JavaScript", "TypeScript", "Python"],
    devScore: 92,
    commitFrequency: "12 commits/week",
    codeHealth: 88,
    testCoverage: 76,
    hotFiles: [
      { name: "App.jsx", changes: 324, health: 95 },
      { name: "utils.ts", changes: 218, health: 87 },
      { name: "api.js", changes: 156, health: 92 },
    ],
  };

  return (
    <div className="animate-scale-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{repo.name} Analysis</h2>
        <p className="text-zinc-400">Repository health report</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20 transform transition hover:scale-105 duration-300">
          <p className="text-zinc-400 text-sm mb-2">Total Commits</p>
          <p className="text-3xl font-bold text-indigo-400">{analysisData.totalCommits}</p>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 transform transition hover:scale-105 duration-300">
          <p className="text-zinc-400 text-sm mb-2">Developer Score</p>
          <p className="text-3xl font-bold text-emerald-400">{analysisData.devScore}</p>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 transform transition hover:scale-105 duration-300">
          <p className="text-zinc-400 text-sm mb-2">Code Health</p>
          <p className="text-3xl font-bold text-purple-400">{analysisData.codeHealth}%</p>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 transform transition hover:scale-105 duration-300">
          <p className="text-zinc-400 text-sm mb-2">Test Coverage</p>
          <p className="text-3xl font-bold text-pink-400">{analysisData.testCoverage}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg bg-slate-800 border border-white/6">
          <h3 className="font-semibold mb-4">Commit Frequency</h3>
          <p className="text-2xl text-indigo-400 mb-2">{analysisData.commitFrequency}</p>
          <p className="text-zinc-400 text-sm">Average across last month</p>
        </div>

        <div className="p-4 rounded-lg bg-slate-800 border border-white/6">
          <h3 className="font-semibold mb-4">Top Languages</h3>
          <div className="flex flex-wrap gap-2">
            {analysisData.topLanguages.map((lang) => (
              <span key={lang} className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-slate-800 border border-white/6">
        <h3 className="font-semibold mb-4">Most Changed Files</h3>
        <div className="space-y-3">
          {analysisData.hotFiles.map((file) => (
            <div key={file.name} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
              <div>
                <p className="font-medium text-white">{file.name}</p>
                <p className="text-zinc-400 text-sm">{file.changes} changes</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                    style={{ width: `${file.health}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-emerald-400 min-w-10">{file.health}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={onRestart}
          className="flex-1 px-6 py-3 rounded-lg bg-slate-800 border border-white/6 hover:border-indigo-500/50 text-white font-medium transition-all duration-300 hover:shadow-lg"
        >
          Analyze Another Repo
        </button>
        <button className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          Generate AI Report
        </button>
      </div>
    </div>
  );
};

const OnboardingFlow = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleConnect = () => setStep(2);
  const handleSelectRepo = (repo) => {
    setSelectedRepo(repo);
    setStep(3);
    setTimeout(() => setStep(4), 3000);
  };
  const handleRestart = () => {
    setStep(1);
    setSelectedRepo(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-white/6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    num <= step
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-slate-700 text-zinc-400"
                  }`}
                >
                  {num}
                </div>
                {num < 4 && (
                  <div
                    className={`w-8 h-1 mx-2 rounded-full transition-all duration-300 ${
                      num < step ? "bg-indigo-500" : "bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="min-h-96">
          {step === 1 && <Step1ConnectGithub onConnect={handleConnect} />}
          {step === 2 && <Step2RepositorySelection onSelect={handleSelectRepo} />}
          {step === 3 && <Step3AnalysisLoading />}
          {step === 4 && <Step4AnalysisDashboard repo={selectedRepo} onRestart={handleRestart} />}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, accent }) => {
  return (
    <div className={`group relative p-6 rounded-2xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-sm hover:shadow-2xl transform transition duration-300 hover:-translate-y-2 hover:scale-105`}> 
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${accent} flex-shrink-0`}> 
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 opacity-95">
            <path d="M12 2l3 6 6 .5-4.5 3.8L19 20l-7-4-7 4 1.5-7.7L3 8.5 9 8 12 2z" fill="currentColor" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-zinc-300 text-sm mt-1">{desc}</p>
        </div>
      </div>
      <div className="absolute -inset-px rounded-2xl border-transparent group-hover:border-white/8 pointer-events-none" />
    </div>
  );
};

const Dashboard = () => {
  const dummy = {
    commitCount: 128,
    streakDays: 7,
    aiSummary: "This week you focused on refactors and performance improvements. Tests increased by 12% and hotspots were reduced in core modules.",
    devScore: 87,
    waveform: [6, 10, 4, 12, 8, 14, 6, 9, 3, 7, 11, 5, 13, 8, 6]
  };

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="dashboard" className="mb-12">
      <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-white/6 backdrop-blur-md">
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <div className="p-4 rounded-xl bg-slate-800 border border-white/6">
              <div className="text-sm text-zinc-400">Commits</div>
              <div className="text-2xl font-bold mt-1">{dummy.commitCount}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800 border border-white/6">
              <div className="text-sm text-zinc-400">Coding Streak</div>
              <div className="text-2xl font-bold mt-1">{dummy.streakDays} days</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800 border border-white/6">
              <div className="text-sm text-zinc-400">Developer Score</div>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-2xl font-bold">{dummy.devScore}</div>
                <div className="w-40 h-2 bg-white/6 rounded-full overflow-hidden">
                  <div style={{ width: `${dummy.devScore}%` }} className="h-2 bg-gradient-to-r from-emerald-400 to-indigo-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex-1">
            <div className="p-4 rounded-xl bg-slate-800 border border-white/6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-zinc-400">AI Summary</div>
                  <div className="text-zinc-300 mt-2">{dummy.aiSummary}</div>
                </div>
                <div className="ml-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="px-3 py-2 bg-white/6 rounded-md hover:bg-white/10 transition">
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>

              {/* Waveform player (visual only) */}
              <div className="mt-4">
                <div className="w-full h-16 flex items-end gap-1">
                  {dummy.waveform.map((h, i) => (
                    <div key={i} className={`flex-1 bg-gradient-to-t from-sky-400 to-indigo-500 rounded-sm transition-transform ${isPlaying ? 'animate-pulse-slow' : ''}`} style={{ height: `${h * 6}%` }} />
                  ))}
                </div>
                <div className="mt-2 text-sm text-zinc-400">00:00 / 02:30</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  return (
    <nav className="sticky top-4 z-50 mb-6">
      <div className="max-w-7xl mx-auto px-2">
        <div className="backdrop-blur-md bg-white/6 border border-white/8 rounded-xl px-4 py-3 flex items-center justify-between shadow-md">
          <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-400">CommitFM</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-zinc-300 hover:text-white transition">Features</a>
            <a href="#dashboard" className="text-zinc-300 hover:text-white transition">Dashboard</a>
            <a href="#analytics" className="text-zinc-300 hover:text-white transition">Analytics</a>
            <a href="#login" className="ml-4 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-white shadow-sm">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-400">CommitFM AI</h1>
            <p className="text-zinc-400">Turn your git history into insightful developer audio.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setOnboardingOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-medium text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Start Onboarding
            </button>
            <button onClick={fetchCommits} className="px-4 py-2 bg-white text-black rounded-md font-medium shadow hover:shadow-md transition">Fetch Commits</button>
          </div>
        </header>

        <OnboardingFlow isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />

        {/* Hero */}
        <section className="rounded-3xl p-12 mb-12 bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-white/6 backdrop-blur-md">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Turn commits into narrative developer stories</h2>
              <p className="text-zinc-300 mb-6">AI Devlogs, commit analysis, personality insights, burnout signals, playful roasts, and yearly developer 'wrapped' summaries.</p>
              <div className="flex gap-4">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:opacity-95 transition">Get Started</button>
                <button className="border border-white/10 px-6 py-3 rounded-lg text-zinc-300 hover:border-white/20 transition">Docs</button>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <div className="w-56 h-56 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-xl flex items-center justify-center text-white font-bold">Audio Preview</div>
            </div>
          </div>
        </section>

        <Dashboard />

        {/* Features Grid */}
        <section id="features" className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Premium Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="AI Devlogs"
              desc="Daily/weekly narrated devlogs that summarize work and decisions."
              accent="bg-indigo-500"
            />

            <FeatureCard
              title="Commit Analysis"
              desc="Automated semantic analysis, hotspots, and code health metrics."
              accent="bg-emerald-500"
            />

            <FeatureCard
              title="Developer Personality"
              desc="Profiles that surface coding style, collaboration tendencies, and strengths."
              accent="bg-fuchsia-500"
            />

            <FeatureCard
              title="Burnout Detection"
              desc="Signals from commit tempo, sentiment, and issue backlog to flag risk."
              accent="bg-rose-500"
            />

            <FeatureCard
              title="GitHub Roast Mode"
              desc="A humorous, candid summary of your repo's quirks and sins (opt-in)."
              accent="bg-yellow-500"
            />

            <FeatureCard
              title="Spotify Wrapped for Developers"
              desc="Yearly highlights: most touched files, peak hours, top changelogs."
              accent="bg-sky-500"
            />
          </div>
        </section>

        {/* Analytics placeholder */}
        <section id="analytics" className="mb-12">
          <div className="rounded-xl p-6 bg-slate-800 border border-white/6">
            <h4 className="text-lg font-semibold mb-2">Analytics</h4>
            <p className="text-zinc-400">Overview metrics and charts will appear here. (Placeholder)</p>
          </div>
        </section>

        {/* Commits list (simple) */}
        <section className="mb-20">
          <h4 className="text-xl font-semibold mb-4">Recent Commits</h4>
          <div className="space-y-4">
            {commits.length === 0 ? (
              <div className="text-zinc-500">No commits loaded. Click "Fetch Commits" to load.</div>
            ) : (
              commits.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-white/6">
                  <div className="font-medium">{c.message}</div>
                  <div className="text-zinc-400 text-sm mt-1">{c.date}</div>
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="py-8 text-zinc-400 text-sm border-t border-white/6">© {new Date().getFullYear()} CommitFM AI — All rights reserved.</footer>
      </div>
    </div>
  );
}

export default App;