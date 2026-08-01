import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WorkspaceNavigation = ({ activeModule, onSelect, collapsed, setCollapsed }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const navItems = [
        { id: "overview", label: "Overview", icon: "📊" },
        { id: "commits", label: "Commit Analysis", icon: "💻" },
        { id: "prs", label: "Pull Requests", icon: "🔀" },
        { id: "health", label: "Codebase Health", icon: "🏥" },
        { id: "dna", label: "Developer DNA", icon: "🧬" },
        { id: "story", label: "Engineering Story", icon: "📖" },
        { id: "coach", label: "Career Coach", icon: "🔮" },
        { id: "resume", label: "Resume Generator", icon: "📝" },
        { id: "roadmap", label: "Learning Roadmap", icon: "🗺️" }
    ];

    const handleSelect = (id) => {
        onSelect(id);
        setMobileOpen(false);
    };

    const navContent = (
        <div className="flex-1 flex flex-col min-h-0 bg-brand-surface border-r border-white/5">
            {/* Header Toggle */}
            <div className="p-3 border-b border-white/5 flex items-center justify-between">
                {(!collapsed || mobileOpen) && <span className="text-[9px] text-brand-muted uppercase font-bold tracking-widest">Workspace Modules</span>}
                {!mobileOpen && (
                    <button 
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 rounded hover:bg-white/5 text-brand-muted hover:text-white transition cursor-pointer mx-auto hidden md:block"
                        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            {collapsed ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            )}
                        </svg>
                    </button>
                )}
            </div>

            {/* Items List */}
            <nav className="flex-1 px-1.5 py-3 space-y-1 overflow-y-auto no-scrollbar">
                {navItems.map((item) => {
                    const isActive = activeModule === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-premium text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                                isActive 
                                    ? "bg-brand-primary/10 border border-brand-primary/20 text-brand-primary" 
                                    : "bg-transparent border border-transparent text-brand-muted hover:text-white hover:bg-white/5"
                            }`}
                            title={item.label}
                        >
                            <span className="text-sm shrink-0">{item.icon}</span>
                            {(!collapsed || mobileOpen) && <span className="truncate">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <>
            {/* Desktop Navigation */}
            <motion.div 
                className="hidden md:flex flex-col h-full shrink-0"
                animate={{ width: collapsed ? 56 : 224 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                {navContent}
            </motion.div>

            {/* Mobile Top Bar / Menu Toggle Button */}
            <div className="md:hidden flex items-center justify-between p-3 bg-brand-surface border-b border-white/5 w-full">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-1.5 rounded bg-white/5 border border-white/10 text-white flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <span>Modules</span>
                </button>
                <span className="text-xs font-black text-brand-accent uppercase tracking-widest">
                    {navItems.find(n => n.id === activeModule)?.label || "Overview"}
                </span>
            </div>

            {/* Mobile Slide-out Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div 
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Drawer body */}
                        <motion.div 
                            className="fixed top-0 left-0 bottom-0 w-64 bg-brand-surface z-50 md:hidden flex flex-col"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            <div className="p-3 border-b border-white/5 flex justify-between items-center bg-brand-bg/40">
                                <span className="text-xs font-black text-white uppercase tracking-wider">Navigation</span>
                                <button 
                                    onClick={() => setMobileOpen(false)}
                                    className="p-1 text-brand-muted hover:text-white"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-1 flex flex-col min-h-0">
                                {navContent}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default WorkspaceNavigation;
