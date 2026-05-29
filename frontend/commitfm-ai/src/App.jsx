import { useState } from "react";

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
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-400">CommitFM AI</h1>
            <p className="text-zinc-400">Turn your git history into insightful developer audio.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchCommits} className="bg-white text-black px-4 py-2 rounded-md font-medium shadow hover:shadow-md transition">Fetch Commits</button>
          </div>
        </header>

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