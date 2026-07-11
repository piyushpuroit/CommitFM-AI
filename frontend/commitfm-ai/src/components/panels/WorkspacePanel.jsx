import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const WorkspacePanel = ({ isOpen, onClose, title, subtitle, icon, tabs = [], activeTab, onTabChange, onRefresh, children }) => {
    const [copied, setCopied] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`CommitFM AI Workspace Insights - ${title}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ title, date: new Date().toISOString() }));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, '_')}_workspace.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    };

    const handleRefresh = async () => {
        if (!onRefresh) return;
        setIsRefreshing(true);
        await onRefresh();
        setTimeout(() => setIsRefreshing(false), 600);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-40 bg-brand-bg/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Slide-over Panel */}
                    <motion.div
                        className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-2xl bg-brand-surface border-l border-white/5 shadow-2xl flex flex-col justify-between"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                    >
                        {/* Header */}
                        <div className="p-4 sm:p-6 border-b border-white/5 relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />

                            <div className="flex items-center justify-between mb-4 gap-2">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="text-xl sm:text-2xl select-none shrink-0">{icon}</span>
                                    <div className="min-w-0">
                                        <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate">{title}</h2>
                                        <p className="text-[10px] sm:text-xs text-brand-muted mt-0.5 truncate">{subtitle}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-1.5 shrink-0">
                                    {onRefresh && (
                                        <button 
                                            onClick={handleRefresh}
                                            disabled={isRefreshing}
                                            className="p-1.5 rounded-premium hover:bg-white/5 text-brand-muted hover:text-white transition cursor-pointer disabled:opacity-40"
                                            title="Refresh Data"
                                        >
                                            <svg className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.306 9H18" />
                                            </svg>
                                        </button>
                                    )}
                                    <button 
                                        onClick={onClose}
                                        className="p-1.5 rounded-premium hover:bg-white/5 text-brand-muted hover:text-white transition cursor-pointer"
                                        title="Close Panel"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Tab Bar */}
                            {tabs.length > 0 && (
                                <div className="flex gap-1.5 border-t border-white/5 pt-3 overflow-x-auto no-scrollbar scrollbar-none">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => onTabChange(tab.id)}
                                            className={`px-2.5 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded transition cursor-pointer shrink-0 ${
                                                activeTab === tab.id
                                                    ? "bg-brand-primary/10 border border-brand-primary/20 text-brand-primary"
                                                    : "bg-white/5 border border-transparent text-brand-muted hover:text-white"
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-left">
                            {children}
                        </div>

                        {/* Footer */}
                        <div className="p-3 sm:p-4 border-t border-white/5 bg-brand-bg/50 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                                <button
                                    onClick={handleCopy}
                                    className="px-2.5 py-1.5 rounded-premium border border-white/10 hover:bg-white/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-muted hover:text-white transition cursor-pointer flex items-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-7 8H8" />
                                    </svg>
                                    <span>{copied ? "Copied!" : "Copy"}</span>
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="px-2.5 py-1.5 rounded-premium border border-white/10 hover:bg-white/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-muted hover:text-white transition cursor-pointer flex items-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Export</span>
                                </button>
                            </div>
                            <button
                                onClick={onClose}
                                className="btn-premium-primary px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-premium shadow-md"
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WorkspacePanel;
