import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
    const steps = [
        {
            num: "01",
            title: "Connect Repository",
            desc: "Grant secure read-only access to your public or private GitHub repository."
        },
        {
            num: "02",
            title: "Behavior Analysis",
            desc: "CommitFM AI analyzes your commit history, PR documentation, and code reviews."
        },
        {
            num: "03",
            title: "Unlock Intelligence",
            desc: "Generate developer DNA profiles, radar skills competency maps, and career recommendations."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <MainLayout showHero={true} showAnalytics={false} showFeatures={true}>
            
            {/* How It Works Section */}
            <motion.section 
                className="mb-12 sm:mb-16 lg:mb-20 pt-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="text-center mb-8">
                    <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Workflow</span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mt-1">How CommitFM Works</h3>
                    <p className="text-xs text-brand-muted mt-1.5">Three simple steps to unlock deep developer insights</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, idx) => (
                        <motion.div 
                            key={idx} 
                            variants={itemVariants}
                            className="premium-card bg-brand-surface/40 backdrop-blur-sm border border-white/5 relative flex flex-col gap-3"
                        >
                            <span className="text-2xl font-black text-brand-primary/20 select-none leading-none">
                                {step.num}
                            </span>
                            <div>
                                <h4 className="text-xs font-bold text-white mb-1">{step.title}</h4>
                                <p className="text-[11px] text-brand-muted leading-relaxed">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
                <div className="premium-card bg-gradient-to-br from-brand-surface to-brand-bg/50 border border-white/5 relative overflow-hidden p-6 sm:p-8 text-center flex flex-col items-center gap-4">
                    {/* Glowing background aura */}
                    <div className="absolute inset-0 bg-brand-primary/5 blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-lg space-y-2">
                        <h3 className="text-base sm:text-lg lg:text-xl font-black text-white">
                            Ready to Decode Your <span className="gradient-text-primary">Developer DNA</span>?
                        </h3>
                        <p className="text-xs text-brand-muted leading-relaxed font-medium">
                            Analyze commit behaviors, calculate competency indices, and gain AI-style career suggestions in seconds.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <Link to="/connect" className="btn-premium-primary inline-flex items-center gap-2">
                            <span>Get Started Free</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </motion.section>

        </MainLayout>
    );
};

export default LandingPage;
