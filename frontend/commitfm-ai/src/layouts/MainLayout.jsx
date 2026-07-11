import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AnalyticsPreview from "../components/AnalyticsPreview";
import FeatureGrid from "../components/FeatureGrid";
import Footer from "../components/Footer";

const MainLayout = ({ children, showHero = true, showAnalytics = true, showFeatures = true }) => {
    return (
    <div className="min-h-screen bg-indigo-950 text-slate-100">
      <div className="w-full">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-7">
          {/* Header with branding */}
          <header className="mb-4 sm:mb-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5 select-none">
                CommitFM <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold">AI</span>
              </h1>
              <p className="text-xs text-brand-muted font-medium">The AI Developer Intelligence Platform</p>
            </div>
          </header>

          {/* Conditional Sections */}
          {showHero && <HeroSection />}
          {showAnalytics && <AnalyticsPreview />}
          {showFeatures && <FeatureGrid />}

          {/* Main Content */}
          {children}



          <Footer />
        </div>
      </div>
    </div>
    );
};

export default MainLayout;
