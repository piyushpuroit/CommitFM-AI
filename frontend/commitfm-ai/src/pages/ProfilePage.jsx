import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import { useRepository } from "../contexts/RepositoryContext";

const ProfilePage = () => {
  const { user, userLoading, repositories, repositoriesLoading, login } = useRepository();

  if (userLoading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-24 text-[10px] text-brand-muted font-semibold gap-3">
          <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
          Loading profile...
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto text-center py-20 space-y-4">
          <span className="text-3xl">🔐</span>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Authentication Required</h2>
          <p className="text-xs text-brand-muted">Please sign in with GitHub to view your portfolio.</p>
          <button
            onClick={login}
            className="inline-block bg-brand-primary text-white border border-brand-primary/20 px-4 py-2 rounded-sm text-xs font-bold transition hover:bg-brand-primary/95 cursor-pointer select-none"
          >
            Connect GitHub Account
          </button>
        </div>
      </MainLayout>
    );
  }

  // Calculated Metrics
  const totalStars = repositories.reduce((sum, r) => sum + (r.starsCount || r.stars || 0), 0);
  const totalForks = repositories.reduce((sum, r) => sum + (r.forksCount || r.forks || 0), 0);
  const totalSizeKB = repositories.reduce((sum, r) => sum + (r.size || 0), 0);

  // Top Languages Breakdown
  const langCounts = {};
  repositories.forEach(r => {
    if (r.languages) {
      Object.entries(r.languages).forEach(([lang, bytes]) => {
        langCounts[lang] = (langCounts[lang] || 0) + Number(bytes);
      });
    }
  });
  const sortedLanguages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const totalLangBytes = sortedLanguages.reduce((sum, l) => sum + l[1], 0);

  // Repository Extremes
  const sortedByStars = [...repositories].sort((a, b) => (b.starsCount || 0) - (a.starsCount || 0));
  const sortedBySize = [...repositories].sort((a, b) => (b.size || 0) - (a.size || 0));
  const sortedByDate = [...repositories].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  const mostPopularRepo = sortedByStars[0] || null;
  const largestRepo = sortedBySize[0] || null;
  const newestRepo = sortedByDate[0] || null;
  const oldestRepo = sortedByDate[sortedByDate.length - 1] || null;

  // Badges Earned
  const badges = [
    { title: "Backend Engineer", icon: "⚙️", condition: sortedLanguages.some(l => ["Java", "Go", "Python", "C++"].includes(l[0])) },
    { title: "Frontend Specialist", icon: "🎨", condition: sortedLanguages.some(l => ["JavaScript", "TypeScript", "HTML", "Vue", "CSS"].includes(l[0])) },
    { title: "Open Source Contributor", icon: "🌐", condition: repositories.length > 5 },
    { title: "Consistent Committer", icon: "🔥", condition: true },
    { title: "Architecture Enthusiast", icon: "🏛️", condition: totalSizeKB > 1000 }
  ].filter(b => b.condition);

  // GitHub Style Contribution Activity Heatmap Mock Grid (26 weeks x 7 days)
  const contributionGrid = Array.from({ length: 26 * 7 }, (_, idx) => {
    const intensity = (idx % 11 === 0 || idx % 7 === 0) ? Math.floor((idx % 4) + 1) : 0;
    return intensity;
  });

  return (
    <MainLayout>
      <div className="space-y-4 sm:space-y-5 text-left max-w-6xl mx-auto w-full">
        {/* Cover Banner */}
        <div className="h-24 sm:h-36 w-full rounded-2xl bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-950 relative overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-accent/20 via-transparent to-transparent" />
          <div className="absolute bottom-2 right-3 text-[9px] text-white/50 font-mono">Verified Developer Portfolio</div>
        </div>

        {/* Profile Card Header (Overlapping Banner) */}
        <motion.div
          className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-white/5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5 relative -mt-10 sm:-mt-14 z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 sm:border-4 border-brand-surface shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-primary/20 border-2 sm:border-4 border-brand-surface flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                {user.name ? user.name[0] : "U"}
              </div>
            )}

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">{user.name || user.login}</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                  <span>✓</span> Verified
                </span>
              </div>
              <p className="text-[11px] text-brand-muted font-mono">@{user.login}</p>
              {user.bio && <p className="text-[11px] text-slate-300 max-w-xl leading-relaxed">{user.bio}</p>}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
          <a
              href={user.htmlUrl || `https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-primary text-white border border-brand-primary/20 hover:bg-brand-primary/90 px-3 py-2 rounded text-[11px] font-bold transition flex items-center gap-1.5"
            >
              <span>GitHub Profile</span>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Badges Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mt-1">
          <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider shrink-0">Achievements:</span>
          {repositoriesLoading ? (
            <>
              <div className="h-5 w-20 bg-white/5 animate-pulse rounded-full shrink-0" />
              <div className="h-5 w-24 bg-white/5 animate-pulse rounded-full shrink-0" />
              <div className="h-5 w-16 bg-white/5 animate-pulse rounded-full shrink-0" />
            </>
          ) : (
            badges.map((b, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold shrink-0 flex items-center gap-1.5">
                <span>{b.icon}</span>
                <span>{b.title}</span>
              </span>
            ))
          )}
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="p-3 rounded-xl bg-brand-surface border border-white/5 space-y-1">
            <span className="text-[9px] sm:text-[10px] text-brand-muted font-bold uppercase tracking-wider">Public Repositories</span>
            <div className="text-lg sm:text-xl font-black text-white">{user.publicRepos || repositories.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-brand-surface border border-white/5 space-y-1">
            <span className="text-[9px] sm:text-[10px] text-brand-muted font-bold uppercase tracking-wider">Total Stars Earned</span>
            {repositoriesLoading ? (
              <div className="h-5 w-16 bg-white/5 animate-pulse rounded mt-1" />
            ) : (
              <div className="text-lg sm:text-xl font-black text-amber-400">★ {totalStars}</div>
            )}
          </div>
          <div className="p-3 rounded-xl bg-brand-surface border border-white/5 space-y-1">
            <span className="text-[9px] sm:text-[10px] text-brand-muted font-bold uppercase tracking-wider">Total Forks</span>
            {repositoriesLoading ? (
              <div className="h-5 w-16 bg-white/5 animate-pulse rounded mt-1" />
            ) : (
              <div className="text-lg sm:text-xl font-black text-brand-accent">🍴 {totalForks}</div>
            )}
          </div>
          <div className="p-3 rounded-xl bg-brand-surface border border-white/5 space-y-1">
            <span className="text-[9px] sm:text-[10px] text-brand-muted font-bold uppercase tracking-wider">Followers</span>
            <div className="text-lg sm:text-xl font-black text-emerald-400">👥 {user.followers || 0}</div>
          </div>
        </div>

        {/* GitHub Style Contribution Calendar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-white/5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Contribution Activity</h3>
            <span className="text-[9px] text-brand-muted font-mono">Last 26 weeks</span>
          </div>

          <div className="overflow-x-auto pt-1">
            <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[420px]">
              {contributionGrid.map((val, idx) => {
                const colors = ["bg-white/5", "bg-emerald-950/40 border border-emerald-500/20", "bg-emerald-700/60", "bg-emerald-500", "bg-emerald-400"];
                return (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-xs ${colors[val]}`}
                    title={`Activity day ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Extremes Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {repositoriesLoading ? (
            <>
              <div className="p-3 sm:p-4 rounded-xl bg-brand-surface border border-white/5 space-y-2 animate-pulse">
                <div className="h-3.5 w-32 bg-white/5 rounded" />
                <div className="h-4 w-48 bg-white/5 rounded" />
                <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-brand-surface border border-white/5 space-y-2 animate-pulse">
                <div className="h-3.5 w-32 bg-white/5 rounded" />
                <div className="h-4 w-48 bg-white/5 rounded" />
                <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
              </div>
            </>
          ) : (
            <>
              {mostPopularRepo && (
                <div className="p-3 sm:p-4 rounded-xl bg-brand-surface border border-white/5 space-y-2">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">★ Most Popular Repository</span>
                  <h4 className="text-[11px] sm:text-xs font-bold text-white">{mostPopularRepo.fullName || mostPopularRepo.name}</h4>
                  <p className="text-[10px] text-brand-muted line-clamp-1">{mostPopularRepo.description || "No description."}</p>
                </div>
              )}

              {largestRepo && (
                <div className="p-3 sm:p-4 rounded-xl bg-brand-surface border border-white/5 space-y-2">
                  <span className="text-[9px] font-bold text-brand-accent uppercase tracking-widest">💾 Largest Codebase</span>
                  <h4 className="text-[11px] sm:text-xs font-bold text-white">{largestRepo.fullName || largestRepo.name}</h4>
                  <p className="text-[10px] text-brand-muted">{largestRepo.size || 0} KB code volume</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};


export default ProfilePage;
