import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRepository } from "../contexts/RepositoryContext";

const CTASection = () => {
    const { user, login } = useRepository();
    const navigate = useNavigate();

    const handleGetStarted = (e) => {
        e.preventDefault();
        if (user) {
            navigate("/repositories");
        } else {
            login();
        }
    };

    return (
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
                    <button 
                        onClick={handleGetStarted}
                        className="btn-premium-primary inline-flex items-center gap-2 cursor-pointer select-none"
                    >
                        <span>Get Started Free</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.section>
    );
};

export default CTASection;

