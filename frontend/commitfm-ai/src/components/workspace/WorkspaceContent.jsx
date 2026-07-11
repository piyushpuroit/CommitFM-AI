import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const WorkspaceContent = ({ activeModule, children }) => {
    return (
        <div className="flex-1 min-w-0 flex flex-col h-full bg-brand-surface/10 relative overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeModule}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col min-h-0"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default WorkspaceContent;
