import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AnalyticsPreview from "../components/AnalyticsPreview";
import FeatureGrid from "../components/FeatureGrid";
import Footer from "../components/Footer";
import OnboardingFlow from "../components/onboarding/OnboardingFlow";

const MainLayout = ({ children, onStartOnboarding, onboardingOpen, onCloseOnboarding }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-400">CommitFM AI</h1>
            <p className="text-zinc-400">Turn your git history into insightful developer audio.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={onStartOnboarding}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-medium text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Start Onboarding
            </button>
          </div>
        </header>

        <HeroSection onStartOnboarding={onStartOnboarding} />
        <AnalyticsPreview />
        <FeatureGrid />

        {children}

        <section id="analytics" className="mb-12">
          <div className="rounded-xl p-6 bg-slate-800 border border-white/6">
            <h4 className="text-lg font-semibold mb-2">Analytics</h4>
            <p className="text-zinc-400">Overview metrics and charts will appear here. (Placeholder)</p>
          </div>
        </section>

        <Footer />

        <OnboardingFlow isOpen={onboardingOpen} onClose={onCloseOnboarding} />
      </div>
    </div>
  );
};

export default MainLayout;
