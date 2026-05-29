import { useState } from "react";
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-white/6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    num <= step
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-slate-700 text-zinc-400"
                  }`}
                >
                  {num}
                </div>
                {num < 4 && (
                  <div
                    className={`w-8 h-1 mx-2 rounded-full transition-all duration-300 ${
                      num < step ? "bg-indigo-500" : "bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="min-h-96">
          {step === 1 && <RepoConnectStep onConnect={handleConnect} />}
          {step === 2 && <RepoSelectionStep onSelect={handleSelectRepo} />}
          {step === 3 && <AnalysisLoadingStep />}
          {step === 4 && <AnalysisCompleteStep repo={selectedRepo} onRestart={handleRestart} />}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
