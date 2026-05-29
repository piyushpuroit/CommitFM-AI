import { repositoriesData } from "../../data/dummyData";

const RepoSelectionStep = ({ onSelect }) => {
  return (
    <div className="animate-slide-in-right">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Select a Repository</h2>
        <p className="text-zinc-400">Choose a repository to analyze</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
        {repositoriesData.map((repo) => (
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

export default RepoSelectionStep;
