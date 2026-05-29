import { analysisData } from "../../data/dummyData";

const AnalysisCompleteStep = ({ repo, onRestart }) => {
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

export default AnalysisCompleteStep;
