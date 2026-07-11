import React from "react";
import { motion } from "framer-motion";

const InsightCard = ({ title, icon, confidence, children, actionLabel, onAction }) => {
    return (
        <motion.div 
            className="premium-card bg-brand-surface border border-white/5 hover:border-white/10 hover:shadow-glow transition-all duration-300 flex flex-col justify-between p-4 text-left relative overflow-hidden rounded-premium shadow-premium"
            whileHover={{ y: -1 }}
        >
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />

            <div>
                <div className="flex justify-between items-center gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        {icon && <span className="text-sm select-none">{icon}</span>}
                        <span className="text-xs text-brand-muted uppercase font-bold tracking-wider">{title}</span>
                    </div>
                    {confidence !== undefined && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-sm bg-brand-primary/10 text-brand-primary select-none">
                            Confidence: {confidence}%
                        </span>
                    )}
                </div>
                <div className="text-xs text-brand-text/90 leading-relaxed font-medium">
                    {children}
                </div>
            </div>

            {actionLabel && (
                <button
                    onClick={onAction}
                    className="mt-4 text-[9px] font-bold uppercase tracking-wider text-brand-accent hover:underline flex items-center gap-1 self-start cursor-pointer transition"
                >
                    <span>{actionLabel}</span>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </motion.div>
    );
};

export default InsightCard;
