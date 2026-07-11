import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RepositoryContext } from "../../contexts/RepositoryContext";
import { useRepositories } from "../../hooks/useRepositories";

const RepoSelectionStep = ({ onSelect, selectedRepo: propSelectedRepo }) => {
    const context = useContext(RepositoryContext);
    const [localSelectedRepo, setLocalSelectedRepo] = useState(null);

    const { repositories, loading, error, fetchRepositories } = useRepositories();

    useEffect(() => {
        fetchRepositories();
    }, [fetchRepositories]);

    const selectedRepo = propSelectedRepo !== undefined
        ? propSelectedRepo
        : (context ? context.selectedRepository : localSelectedRepo);

    const handleSelect = (repo) => {
        if (context) {
            context.setSelectedRepository(repo);
        } else {
            setLocalSelectedRepo(repo);
        }
        if (onSelect) {
            onSelect(repo);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.12,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.36, ease: "easeOut" },
        },
    };

    const repoVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.28 },
        },
    };

    return (
        <motion.div
            className="animate-slide-in-right text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1 text-white">Select a Repository</h2>
                <p className="text-slate-400 text-xs sm:text-sm">Choose a codebase to analyze and sync</p>
            </motion.div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3 rounded-lg border border-indigo-700/20 bg-indigo-900/10 animate-pulse space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="h-4 bg-indigo-700/40 rounded w-2/3"></div>
                                <div className="h-4 bg-indigo-700/40 rounded w-1/4"></div>
                            </div>
                            <div className="h-3 bg-indigo-700/20 rounded w-full"></div>
                            <div className="h-3 bg-indigo-700/20 rounded w-5/6"></div>
                            <div className="flex justify-between items-center pt-2">
                                <div className="h-3 bg-indigo-700/30 rounded w-1/4"></div>
                                <div className="h-3 bg-indigo-700/30 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="p-4 rounded-premium bg-red-500/10 border border-red-500/20 text-center space-y-3">
                    <p className="text-xs text-red-400 font-semibold">{error}</p>
                    <button
                        onClick={fetchRepositories}
                        className="btn-premium-primary text-[10px] uppercase font-bold tracking-wider px-3 py-1 cursor-pointer select-none"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 max-h-96 overflow-y-auto pr-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {repositories.map((repo) => {
                        const isSelected = selectedRepo?.id === repo.id;
                        const primaryLang = Object.keys(repo.languages || {})[0] || "Unknown";
                        const stars = repo.starsCount !== undefined ? repo.starsCount : (repo.stars || 0);
                        const updatedDate = repo.lastSyncedAt 
                            ? new Date(repo.lastSyncedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                            : "Recently";

                        return (
                            <motion.div
                                key={repo.id}
                                onClick={() => handleSelect(repo)}
                                className={`p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-all duration-220 shadow-sm hover:shadow-md group flex flex-col justify-between min-h-[120px] ${
                                    isSelected
                                        ? "bg-indigo-600/30 border-indigo-500 shadow-indigo-500/10"
                                        : "bg-indigo-900/20 border-indigo-700/30 hover:border-indigo-700/50"
                                }`}
                                variants={repoVariants}
                                whileHover={{
                                    borderColor: isSelected ? "rgba(99, 102, 241, 1)" : "rgba(79, 70, 229, 0.5)",
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div>
                                    <div className="flex items-start justify-between mb-2 gap-2">
                                        <h3 className={`font-semibold text-xs sm:text-sm transition truncate ${
                                            isSelected ? "text-indigo-300" : "text-white group-hover:text-indigo-300"
                                        }`}>
                                            {repo.name}
                                        </h3>
                                        <span className="text-xs bg-indigo-600/30 text-indigo-300 px-1.5 py-0.5 rounded-sm whitespace-nowrap flex-shrink-0 font-medium capitalize">
                                            {primaryLang}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-xs mb-2 line-clamp-2">{repo.description || repo.desc}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-indigo-500/10 text-indigo-300 text-xs">
                                    <div className="flex items-center gap-1 font-semibold">
                                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3 6 6 .5-4.5 3.8L19 20l-7-4-7 4 1.5-7.7L3 8.5 9 8 12 2z" />
                                        </svg>
                                        {stars.toLocaleString()}
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-medium">
                                        Updated: {updatedDate}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {repositories.length === 0 && (
                        <div className="col-span-full py-10 text-center text-xs text-brand-muted">
                            No repositories detected.
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default RepoSelectionStep;
