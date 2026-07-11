import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExpandableCard = ({ title, children, defaultExpanded = false }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <div className="premium-card bg-brand-surface/40 border border-white/5 overflow-hidden text-left w-full">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-3 cursor-pointer text-xs font-bold text-white uppercase tracking-wider focus:outline-none"
            >
                <span>{title}</span>
                <svg
                    className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        <div className="px-3 pb-3 pt-1 border-t border-white/5 text-xs text-brand-muted leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExpandableCard;
