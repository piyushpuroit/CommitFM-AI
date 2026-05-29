import { useState } from "react";
import { dashboardData } from "../data/dummyData";

const AnalyticsPreview = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="dashboard" className="mb-12">
      <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-white/6 backdrop-blur-md">
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <div className="p-4 rounded-xl bg-slate-800 border border-white/6">
              <div className="text-sm text-zinc-400">Commits</div>
              <div className="text-2xl font-bold mt-1">{dashboardData.commitCount}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800 border border-white/6">
              <div className="text-sm text-zinc-400">Coding Streak</div>
              <div className="text-2xl font-bold mt-1">{dashboardData.streakDays} days</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800 border border-white/6">
              <div className="text-sm text-zinc-400">Developer Score</div>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-2xl font-bold">{dashboardData.devScore}</div>
                <div className="w-40 h-2 bg-white/6 rounded-full overflow-hidden">
                  <div style={{ width: `${dashboardData.devScore}%` }} className="h-2 bg-gradient-to-r from-emerald-400 to-indigo-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex-1">
            <div className="p-4 rounded-xl bg-slate-800 border border-white/6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-zinc-400">AI Summary</div>
                  <div className="text-zinc-300 mt-2">{dashboardData.aiSummary}</div>
                </div>
                <div className="ml-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="px-3 py-2 bg-white/6 rounded-md hover:bg-white/10 transition">
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full h-16 flex items-end gap-1">
                  {dashboardData.waveform.map((h, i) => (
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

export default AnalyticsPreview;
