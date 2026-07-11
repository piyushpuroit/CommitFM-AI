import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RepoConnectStep from "./RepoConnectStep";
import RepoSelectionStep from "./RepoSelectionStep";
import AnalysisLoadingStep from "./AnalysisLoadingStep";
import AnalysisCompleteStep from "./AnalysisCompleteStep";

const OnboardingFlow = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [selectedRepo, setSelectedRepo] = useState(null);

    const handleConnect = () => setStep(2);
    const handleSelectRepo = (repo) => {
        setSelectedRepo(repo);
        setStep(3);
        setTimeout(() => setStep(4), 3000);
    };
    const handleRestart = () => {
        setStep(1);
        setSelectedRepo(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-slate-900 rounded-2xl border border-white/6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="flex items-center">
                                        <motion.div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${num <= step
                                                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                                    : "bg-slate-700 text-zinc-400"
                                                }`}
                                            animate={num <= step ? { scale: 1 } : { scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {num <= step ? (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    {num}
                                                </motion.span>
                                            ) : (
                                                num
                                            )}
                                        </motion.div>
                                        {num < 4 && (
                                            <motion.div
                                                className={`w-8 h-1 mx-2 rounded-full ${num < step ? "bg-indigo-500" : "bg-slate-700"
                                                    }`}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: num < step ? 1 : 0 }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-800 rounded-lg transition"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </div>

                        <div className="min-h-96">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <RepoConnectStep onConnect={handleConnect} />
                                    </motion.div>
                                )}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <RepoSelectionStep onSelect={handleSelectRepo} />
                                    </motion.div>
                                )}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <AnalysisLoadingStep />
                                    </motion.div>
                                )}
                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <AnalysisCompleteStep repo={selectedRepo} onRestart={handleRestart} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OnboardingFlow;
