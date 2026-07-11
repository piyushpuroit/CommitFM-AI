import { motion } from "framer-motion";

const RepositoryDetailsCard = ({ repo }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.36 },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
    };

    return (
        <motion.div
            className="w-full rounded-lg p-3 sm:p-4 bg-indigo-900/20 border border-indigo-700/30 hover:border-indigo-700/50 transition-all shadow-sm hover:shadow-md"
            variants={itemVariants}
            whileHover={{
                boxShadow: "0 4px 12px rgba(79,70,229,0.06)",
                borderColor: "rgba(79,70,229,0.5)",
            }}
            transition={{ duration: 0.25 }}
        >
            {/* Header Section */}
            <div className="mb-3 sm:mb-4">
                <motion.h3
                    className="text-base sm:text-lg font-semibold text-white mb-0.5 break-words"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.08 }}
                >
                    {repo.name}
                </motion.h3>
                <motion.p
                    className="text-xs text-slate-400 line-clamp-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.12 }}
                >
                    {repo.description}
                </motion.p>
            </div>

            {/* Language & Primary Stats */}
            <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5">
                <motion.span
                    className="px-2 py-0.5 rounded-sm bg-indigo-600/30 text-indigo-300 text-xs font-medium"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.16 }}
                >
                    {repo.language}
                </motion.span>
                <motion.span
                    className="px-2 py-0.5 rounded-sm bg-indigo-600/20 text-indigo-300 text-xs font-medium flex items-center gap-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3 6 6 .5-4.5 3.8L19 20l-7-4-7 4 1.5-7.7L3 8.5 9 8 12 2z" />
                    </svg>
                    {repo.stars.toLocaleString()}
                </motion.span>
            </div>

            {/* Stats Grid */}
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-3 sm:mb-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="p-2 rounded-lg bg-indigo-900/30 border border-indigo-700/20">
                    <p className="text-xs text-slate-400 mb-0.5">Commits</p>
                    <p className="text-sm font-semibold text-white">{repo.totalCommits}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="p-2 rounded-lg bg-indigo-900/30 border border-indigo-700/20">
                    <p className="text-xs text-slate-400 mb-0.5">Forks</p>
                    <p className="text-sm font-semibold text-white">{repo.forks}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="p-2 rounded-lg bg-indigo-900/30 border border-indigo-700/20">
                    <p className="text-xs text-slate-400 mb-0.5">Issues</p>
                    <p className="text-sm font-semibold text-white">{repo.openIssues}</p>
                </motion.div>
            </motion.div>

            {/* Last Commit Section */}
            {repo.lastCommitMessage && (
                <motion.div variants={itemVariants} className="p-2 rounded-lg bg-indigo-900/20 border border-indigo-700/20 mb-3 sm:mb-4">
                    <p className="text-xs text-slate-400 mb-1">Last commit</p>
                    <p className="text-xs text-white font-medium line-clamp-1 mb-0.5">{repo.lastCommitMessage}</p>
                    <p className="text-xs text-slate-500">by {repo.lastCommitAuthor} • {repo.daysAgo}d ago</p>
                </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
                className="flex flex-col sm:flex-row gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.button
                    variants={itemVariants}
                    className="flex-1 px-3 py-1.5 text-xs font-medium rounded-sm bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-600/30 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    View Repo
                </motion.button>
                <motion.button
                    variants={itemVariants}
                    className="flex-1 px-3 py-1.5 text-xs font-medium rounded-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Analyze
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default RepositoryDetailsCard;
