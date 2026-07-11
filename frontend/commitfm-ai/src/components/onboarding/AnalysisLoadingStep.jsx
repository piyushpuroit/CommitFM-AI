import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { analysisSteps } from "../../data/dummyData";

const AnalysisLoadingStep = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % analysisSteps.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const spinnerVariants = {
        rotate: {
            rotate: 360,
            transition: {
                duration: 2.8,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.04, 1],
            opacity: [0.6, 1, 0.6],
            transition: {
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    const stepItemVariants = {
        hidden: { opacity: 0, x: -12 },
        visible: (idx) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: idx * 0.08,
                duration: 0.36,
            },
        }),
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-72 sm:min-h-80 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.36 }}
        >
            <motion.div className="mb-5 sm:mb-6">
                <div className="relative w-20 sm:w-28 h-20 sm:h-28 mx-auto">
                    <motion.div
                        className="absolute inset-0 rounded-full bg-indigo-600/10"
                        variants={pulseVariants}
                        animate="pulse"
                    />
                    <motion.div
                        className="absolute inset-3 rounded-full border-2 border-transparent border-t-indigo-500 border-r-indigo-400"
                        variants={spinnerVariants}
                        animate="rotate"
                    />
                    <motion.div
                        className="absolute inset-6 flex items-center justify-center"
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                    >
                        <svg className="w-7 sm:w-9 h-7 sm:h-9 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>

            <motion.h2
                className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-white"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: 0.12 }}
            >
                Analyzing Repository
            </motion.h2>

            <motion.p
                key={currentStep}
                className="text-xs sm:text-sm text-indigo-300 mb-3 sm:mb-4 text-center max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
            >
                {analysisSteps[currentStep]}
            </motion.p>

            <motion.div
                className="w-full max-w-md space-y-2 px-4 sm:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {analysisSteps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        custom={idx}
                        variants={stepItemVariants}
                        initial="hidden"
                        animate="visible"
                        className={`flex items-center gap-2 sm:gap-3 p-2 rounded transition-all duration-500 text-xs sm:text-sm ${idx <= currentStep ? "text-indigo-400" : "text-zinc-500"
                            }`}
                    >
                        {idx < currentStep && (
                            <motion.svg
                                className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                        )}
                        {idx === currentStep && (
                            <motion.div
                                className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-indigo-400 animate-pulse flex-shrink-0"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                            />
                        )}
                        {idx > currentStep && <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full border-2 border-zinc-600 flex-shrink-0" />}
                        <span className="truncate">{step}</span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default AnalysisLoadingStep;
