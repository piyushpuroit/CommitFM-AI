import { motion } from "framer-motion";

const RepoConnectStep = ({ onConnect }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
                <motion.div
                    className="inline-block p-2 sm:p-3 rounded-lg bg-indigo-600/20 border border-indigo-600/40 mb-3 sm:mb-4"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <svg className="w-8 sm:w-10 h-8 sm:h-10 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </motion.div>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-1.5 sm:mb-2 text-white">
                Connect Your GitHub
            </motion.h2>

            <motion.p variants={itemVariants} className="text-slate-400 text-xs sm:text-sm lg:text-base mb-5 sm:mb-6">
                Authenticate with GitHub to start analyzing your repositories
            </motion.p>

            <div className="max-w-md mx-auto px-4">
                <motion.button
                    variants={itemVariants}
                    onClick={onConnect}
                    className="w-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 rounded-sm font-semibold text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Connect GitHub
                </motion.button>
                <motion.p variants={itemVariants} className="text-center text-slate-500 mt-2.5 sm:mt-3 text-xs">
                    Your data is secure. We never store credentials.
                </motion.p>
            </div>
        </motion.div>
    );
};

export default RepoConnectStep;
