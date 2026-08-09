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

            {/* Developer DNA Preview */}
            <section id="dna-preview" className="mb-12 sm:mb-16 lg:mb-20">
                <div className="text-center mb-8">
                    <span className="text-[10px] text-brand-primary font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-brand-primary/10 border border-brand-primary/20">DEMO PREVIEW</span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mt-2">Developer DNA Profiling</h3>
                    <p className="text-xs text-brand-muted mt-1.5">Archetype mapping and behavioral statistics metrics based on codebase footprint</p>
                </div>

                <div className="premium-card bg-brand-surface/60 backdrop-blur-md max-w-xl mx-auto p-5 sm:p-6 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🧙‍♂️</span>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Refactor Wizard</h4>
                                <p className="text-[9px] text-brand-muted">AI Archetype Signature</p>
                            </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-brand-accent/15 border border-brand-accent/25 text-brand-accent text-[9px] font-bold">
                            96% Match
                        </span>
                    </div>

                    <div className="space-y-3 text-[10px] text-brand-muted text-left">
                        <div className="p-3 rounded-premium bg-brand-bg/50 border border-white/5">
                            <span className="text-white font-bold block mb-1">Collaboration Style:</span>
                            Async Catalyst — Prefers rich pull request descriptions and async code reviews over standups.
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-1">
                            <div>
                                <span className="text-emerald-400 font-bold block mb-1">✓ Strengths</span>
                                <ul className="space-y-1 text-[9px]">
                                    <li>• Simplifies modular architectures</li>
                                    <li>• High test coverage standards</li>
                                </ul>
                            </div>
                            <div>
                                <span className="text-brand-primary font-bold block mb-1">▲ Focus Areas</span>
                                <ul className="space-y-1 text-[9px]">
                                    <li>• Reduce average commit size</li>
                                    <li>• Increase early draft PRs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FeatureGrid />

            {/* Security & Privacy Section */}
            <section className="mb-12 sm:mb-16 lg:mb-20 p-6 sm:p-8 rounded-premium bg-brand-surface/40 border border-white/5 backdrop-blur-md text-left">
                <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Trust & Security</span>
                        <h3 className="text-base sm:text-lg lg:text-xl font-black text-white">Your Source Code Remains Private</h3>
                        <p className="text-xs text-brand-muted leading-relaxed">
                            CommitFM AI runs on secure read-only permissions. We do NOT download, store, or train models on your proprietary codebase. All session analysis data is cached transiently and deleted instantly on logout.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-center shrink-0">
                        <div className="p-3 bg-white/5 rounded-premium border border-white/10">
                            <div className="text-lg">🛡️</div>
                            <div className="text-[9px] text-white font-bold mt-1">Read-Only API</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-premium border border-white/10">
                            <div className="text-lg">🔑</div>
                            <div className="text-[9px] text-white font-bold mt-1">No Code Saved</div>
                        </div>
                    </div>
                </div>
            </section>

            <WorkflowSection />
            <CTASection />
        </MainLayout>
    );
};

export default HomePage;
