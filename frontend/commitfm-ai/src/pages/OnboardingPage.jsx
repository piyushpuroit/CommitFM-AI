import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RepoConnectStep from "../components/onboarding/RepoConnectStep";
import RepoSelectionStep from "../components/onboarding/RepoSelectionStep";
import AnalysisLoadingStep from "../components/onboarding/AnalysisLoadingStep";
import AnalysisCompleteStep from "../components/onboarding/AnalysisCompleteStep";
import { useRepository } from "../contexts/RepositoryContext";
import { getApiUrl } from "../services/apiClient";

const OnboardingPage = () => {
    const [step, setStep] = useState(1);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const navigate = useNavigate();
    const { user, setSelectedRepository } = useRepository();

    useEffect(() => {
        if (user && step === 1) {
            setStep(2);
        }
    }, [user, step]);

    const handleConnect = () => {
        window.location.href = `${getApiUrl()}/api/auth/github/login`;
    };

    const handleSelectRepo = (repo) => {
        setSelectedRepo(repo);
        setSelectedRepository(repo);
        navigate("/dashboard");
    };

    const handleRestart = () => {
        setStep(1);
        setSelectedRepo(null);
    };

    const handleComplete = () => {
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-brand-bg text-brand-text flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-2xl bg-brand-surface rounded-lg border border-white/5 shadow-2xl p-6 sm:p-8 relative overflow-hidden"
                initial={{ scale: 0.97, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            >
                {/* Ambient background glows */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />

                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-8 relative z-10 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto w-full">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="flex items-center flex-shrink-0">
                                <motion.div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${num <= step
                                            ? "bg-brand-primary text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                                            : "bg-white/5 border border-white/5 text-brand-muted"
                                        }`}
                                    animate={num <= step ? { scale: 1 } : { scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {num}
                                </motion.div>
                                {num < 4 && (
                                    <motion.div
                                        className={`w-8 sm:w-12 h-0.5 mx-1.5 rounded-full ${num < step ? "bg-brand-primary" : "bg-white/5"
                                            }`}
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: num < step ? 1 : 0 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="min-h-80 sm:min-h-96 relative z-10 flex flex-col justify-between">
                    {step === 1 && <RepoConnectStep onConnect={handleConnect} />}
                    {step === 2 && <RepoSelectionStep onSelect={handleSelectRepo} />}
                    {step === 3 && <AnalysisLoadingStep />}
                    {step === 4 && (
                        <div className="flex-1 flex flex-col justify-between">
                            <AnalysisCompleteStep repo={selectedRepo} onRestart={handleRestart} />
                            <div className="mt-6">
                                <motion.button
                                    onClick={handleComplete}
                                    className="w-full btn-premium-primary py-3 text-sm font-semibold rounded-lg shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 transition-all duration-300 cursor-pointer select-none"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    Go to Dashboard
                                </motion.button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingPage;
