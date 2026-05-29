const HeroSection = ({ onStartOnboarding }) => {
  return (
    <section className="rounded-3xl p-12 mb-12 bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-white/6 backdrop-blur-md">
      <div className="md:flex md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Turn commits into narrative developer stories</h2>
          <p className="text-zinc-300 mb-6">AI Devlogs, commit analysis, personality insights, burnout signals, playful roasts, and yearly developer 'wrapped' summaries.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStartOnboarding}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:opacity-95 transition"
            >
              Get Started
            </button>
            <button className="border border-white/10 px-6 py-3 rounded-lg text-zinc-300 hover:border-white/20 transition">Docs</button>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <div className="w-56 h-56 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-xl flex items-center justify-center text-white font-bold">Audio Preview</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
