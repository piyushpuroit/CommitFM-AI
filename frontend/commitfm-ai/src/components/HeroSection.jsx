import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRepository } from "../contexts/RepositoryContext";

const HeroSection = () => {
    const { user, login } = useRepository();
    const navigate = useNavigate();

    const handleConnectGitHub = (e) => {
        e.preventDefault();
        if (user) {
            navigate("/repositories");
        } else {
            login();
        }
    };

    // Generate dummy grid data for GitHub activity preview
    const contributionWeeks = Array.from({ length: 14 }, (_, i) => 
        Array.from({ length: 4 }, (_, j) => {
            const val = (i * j + i + j * 3) % 5;
            if (val === 0) return "bg-white/5 border-white/5";
            if (val === 1) return "bg-emerald-950/30 border-emerald-800/10";
            if (val === 2) return "bg-emerald-800/40 border-emerald-700/20";
            if (val === 3) return "bg-brand-primary/20 border-brand-primary/20";
            return "bg-brand-accent/30 border-brand-accent/20";
        })
    );

    const floatTransition = (delay) => ({
        y: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay
        }
    });

    return (
        <motion.section
            className="rounded-premium p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 bg-brand-surface border border-white/5 shadow-premium subtle-gradient-bg relative overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-accent/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Left Side: Headline & CTAs */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                    {/* Headline */}
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-white tracking-tight"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        Understand The <span className="gradient-text-primary">Engineer</span> Behind The <span className="text-brand-accent">Code</span>
                    </motion.h1>
                    
                    {/* Subheadline */}
                    <motion.p
                        className="text-sm sm:text-base text-brand-muted mb-6 sm:mb-8 leading-relaxed max-w-xl font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        CommitFM AI analyzes repositories, coding patterns, technical decisions and developer behavior to generate personalized engineering intelligence.
                    </motion.p>
                    
                    {/* Actions */}
                    <motion.div
                        className="flex flex-row gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        <button
                            onClick={handleConnectGitHub}
                            className="btn-premium-primary px-5 py-2.5 text-sm font-semibold rounded-lg shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all duration-300 text-center cursor-pointer select-none"
                        >
                            Connect GitHub
                        </button>
                        <Link to="/demo" className="btn-premium-secondary px-5 py-2.5 text-sm font-semibold rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                            View Demo
                        </Link>
                    </motion.div>
                </div>

                {/* Right Side: GitHub Activity Preview with Floating Badges */}
                <motion.div
                    className="lg:col-span-5 w-full relative min-h-[320px] flex items-center justify-center py-6 lg:py-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Floating Badge 1: Developer Score (Top-Left area) */}
                    <motion.div
                        className="absolute -top-4 -left-2 sm:-left-6 z-20 px-3 py-2 rounded-xl bg-[#111827]/90 backdrop-blur-md border border-[#22D3EE]/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] flex items-center gap-2 select-none"
                        animate={{ y: [0, -6, 0] }}
                        transition={floatTransition(0)}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                        <div className="flex flex-col items-start">
                            <span className="text-[9px] uppercase tracking-wider text-[#94A3B8] font-bold">Developer Score</span>
                            <span className="text-xs font-extrabold text-white">94/100</span>
                        </div>
                    </motion.div>

                    {/* Floating Badge 2: AI Confidence (Middle-Right area) */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 z-20 px-3 py-2 rounded-xl bg-[#111827]/90 backdrop-blur-md border border-[#8B5CF6]/30 shadow-[0_0_15px_rgba(139,92,246,0.15)] flex items-center gap-2 select-none"
                        animate={{ y: [0, 6, 0] }}
                        transition={floatTransition(0.7)}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] flex items-center justify-center text-[7px] text-white font-bold">✓</div>
                        <div className="flex flex-col items-start">
                            <span className="text-[9px] uppercase tracking-wider text-[#94A3B8] font-bold">AI Confidence</span>
                            <span className="text-xs font-extrabold text-white">96%</span>
                        </div>
                    </motion.div>

                    {/* Floating Badge 3: Engineering Archetype (Bottom-Left area) */}
                    <motion.div
                        className="absolute -bottom-4 left-2 sm:-left-4 z-20 px-3 py-2 rounded-xl bg-[#111827]/90 backdrop-blur-md border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center gap-2 select-none"
                        animate={{ y: [0, -5, 0] }}
                        transition={floatTransition(1.4)}
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-sm">🧙‍♂️</span>
                        <div className="flex flex-col items-start">
                            <span className="text-[9px] uppercase tracking-wider text-[#94A3B8] font-bold">Archetype</span>
                            <span className="text-xs font-extrabold text-amber-400">Refactor Wizard</span>
                        </div>
                    </motion.div>

                    {/* Central Premium Card (Base) */}
                    <div className="premium-card w-full max-w-[360px] bg-[#111827]/60 backdrop-blur-sm flex flex-col gap-4 border border-white/5 relative z-10 shadow-2xl">
                        
                        {/* GitHub Contribution Grid Preview */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] text-brand-muted uppercase tracking-wider font-semibold">GitHub Activity Feed</span>
                                <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded-sm">Active Now</span>
                            </div>
                            <div className="flex gap-1 overflow-x-auto pb-1 max-w-full">
                                {contributionWeeks.map((week, wIdx) => (
                                    <div key={wIdx} className="flex flex-col gap-1">
                                        {week.map((colorClass, dIdx) => (
                                            <motion.div
                                                key={dIdx}
                                                className={`w-2.5 h-2.5 rounded-[2px] border ${colorClass}`}
                                                whileHover={{ scale: 1.25 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Animated Activity Graph */}
                        <div className="pt-1">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] text-brand-muted uppercase tracking-wider font-semibold">Weekly Commit Volume</span>
                                <span className="text-[10px] text-brand-accent font-semibold">18 Commits/Avg</span>
                            </div>
                            <div className="h-12 w-full relative">
                                <svg viewBox="0 0 100 30" className="w-full h-full text-brand-primary overflow-visible" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0.25" />
                                            <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {/* Filled Area */}
                                    <motion.path
                                        d="M 0 30 L 0 18 Q 15 8 30 18 T 60 12 T 90 22 L 100 15 L 100 30 Z"
                                        fill="url(#chartGlow)"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                    {/* Stroke Line */}
                                    <motion.path
                                        d="M 0 18 Q 15 8 30 18 T 60 12 T 90 22 L 100 15"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Minimal Metric Panel */}
                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
                            <div className="text-left">
                                <div className="text-[9px] text-brand-muted font-medium">Code Quality</div>
                                <div className="text-xs font-bold text-white">94%</div>
                            </div>
                            <div className="text-left">
                                <div className="text-[9px] text-brand-muted font-medium">Avg Review Time</div>
                                <div className="text-xs font-bold text-white">1.2 hrs</div>
                            </div>
                            <div className="text-left">
                                <div className="text-[9px] text-brand-muted font-medium">Top Tech</div>
                                <div className="text-xs font-bold text-brand-accent">React/TS</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default HeroSection;
