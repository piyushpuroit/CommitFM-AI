import { motion } from "framer-motion";
import { analysisData } from "../../data/dummyData";

const AnalysisCompleteStep = ({ repo, onRestart }) => {
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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.28 },
        },
    };

    return (
        <motion.div
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2 text-white">{repo.name} Analysis</h2>
                <p className="text-slate-400 text-xs sm:text-sm">Repository health report</p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={cardVariants}
                    className="p-3 rounded-lg bg-indigo-900/20 border border-indigo-700/30 transition hover:shadow-md"
                >
                    <p className="text-slate-400 text-xs mb-2">Total Commits</p>
                    <motion.p
                        className="text-xl sm:text-2xl font-semibold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12, duration: 0.32 }}
                    >
                        {analysisData.totalCommits}
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={cardVariants}
                    className="p-3 rounded-lg bg-indigo-900/20 border border-indigo-700/30 transition hover:shadow-md"
                >
                    <p className="text-slate-400 text-xs mb-2">Developer Score</p>
                    <motion.p
                        className="text-xl sm:text-2xl font-semibold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12, duration: 0.32 }}
                    >
                        {analysisData.devScore}
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={cardVariants}
                    className="p-3 rounded-lg bg-indigo-900/20 border border-indigo-700/30 transition hover:shadow-md"
                >
                    <p className="text-slate-400 text-xs mb-2">Code Health</p>
                    <motion.p
                        className="text-xl sm:text-2xl font-semibold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12, duration: 0.32 }}
                    >
                        {analysisData.codeHealth}%
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={cardVariants}
                    className="p-3 rounded-lg bg-indigo-900/20 border border-indigo-700/30 transition hover:shadow-md"
                >
                    <p className="text-slate-400 text-xs mb-2">Test Coverage</p>
                    <motion.p
                        className="text-xl sm:text-2xl font-semibold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12, duration: 0.32 }}
                    >
                        {analysisData.testCoverage}%
                    </motion.p>
                </motion.div>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={cardVariants}
                    className="p-3 sm:p-4 rounded-lg bg-slate-800 border border-white/6"
                    whileHover={{ boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)" }}
                >
                    <h3 className="font-semibold text-base sm:text-lg mb-4">Commit Frequency</h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl text-indigo-400 mb-2">{analysisData.commitFrequency}</p>
                    <p className="text-zinc-400 text-xs sm:text-sm">Average across last month</p>
                </motion.div>

                <motion.div
                    variants={cardVariants}
                    className="p-3 sm:p-4 rounded-lg bg-slate-800 border border-white/6"
                    whileHover={{ boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)" }}
                >
                    <h3 className="font-semibold text-base sm:text-lg mb-4">Top Languages</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {analysisData.topLanguages.map((lang, idx) => (
                            <motion.span
                                key={lang}
                                className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs sm:text-sm"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 + 0.4 }}
                            >
                                {lang}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                variants={cardVariants}
                className="p-3 sm:p-4 rounded-lg bg-slate-800 border border-white/6"
                whileHover={{ boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)" }}
            >
                <h3 className="font-semibold text-base sm:text-lg mb-4">Most Changed Files</h3>
                <div className="space-y-2 sm:space-y-3">
                    {analysisData.hotFiles.map((file, idx) => (
                        <motion.div
                            key={file.name}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-slate-700/50 rounded gap-2 sm:gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 + 0.5 }}
                        >
                            <div className="min-w-0">
                                <p className="font-medium text-white text-sm sm:text-base truncate">{file.name}</p>
                                <p className="text-zinc-400 text-xs sm:text-sm">{file.changes} changes</p>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                <div className="w-16 sm:w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${file.health}%` }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 + 0.6 }}
                                    />
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-emerald-400 min-w-8 text-right">{file.health}%</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.button
                    onClick={onRestart}
                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-slate-800 border border-white/6 hover:border-indigo-500/50 text-white font-medium transition-all duration-300 hover:shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    Analyze Another Repo
                </motion.button>
                <motion.button
                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    Generate AI Report
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default AnalysisCompleteStep;
