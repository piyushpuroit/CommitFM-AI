import { motion } from "framer-motion";

const WorkflowSection = () => {
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
    );
};

export default WorkflowSection;
