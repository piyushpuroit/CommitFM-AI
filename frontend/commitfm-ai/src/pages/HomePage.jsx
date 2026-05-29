import MainLayout from "../layouts/MainLayout";

const HomePage = ({ onStartOnboarding, onboardingOpen, onCloseOnboarding, commits, onFetchCommits }) => {
  return (
    <MainLayout
      onStartOnboarding={onStartOnboarding}
      onboardingOpen={onboardingOpen}
      onCloseOnboarding={onCloseOnboarding}
    >
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
    </MainLayout>
  );
};

export default HomePage;
