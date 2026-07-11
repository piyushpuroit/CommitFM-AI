import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/HeroSection";
import AnalyticsPreview from "../components/AnalyticsPreview";
import FeatureGrid from "../components/FeatureGrid";
import WorkflowSection from "../components/WorkflowSection";
import CTASection from "../components/CTASection";

const HomePage = () => {
    return (
        <MainLayout>
            {/* Header with branding */}
            <header className="mb-4 sm:mb-5">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5 select-none">
                        CommitFM <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold">AI</span>
                    </h1>
                    <p className="text-xs text-brand-muted font-medium">The AI Developer Intelligence Platform</p>
                </div>
            </header>

            <HeroSection />
            <AnalyticsPreview />
            <FeatureGrid />
            <WorkflowSection />
            <CTASection />
        </MainLayout>
    );
};

export default HomePage;
