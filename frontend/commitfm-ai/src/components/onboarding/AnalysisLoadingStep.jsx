import { useState, useEffect } from "react";
import { analysisSteps } from "../../data/dummyData";

const AnalysisLoadingStep = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % analysisSteps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-96">
      <div className="mb-8">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 animate-pulse-ring" />
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin-slow" />
          <div className="absolute inset-8 flex items-center justify-center">
            <svg className="w-12 h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Analyzing Repository</h2>
      <p className="text-xl text-indigo-400 mb-6 h-6 animate-pulse">{analysisSteps[currentStep]}</p>

      <div className="w-full max-w-md space-y-2">
        {analysisSteps.map((step, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 p-2 rounded transition-all duration-500 ${
              idx <= currentStep ? "text-indigo-400" : "text-zinc-500"
            }`}
          >
            {idx < currentStep && (
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {idx === currentStep && <div className="w-5 h-5 rounded-full bg-indigo-400 animate-pulse" />}
            {idx > currentStep && <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />}
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisLoadingStep;
