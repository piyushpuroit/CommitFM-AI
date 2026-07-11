import { motion } from "framer-motion";

const Sidebar = ({ activeModule, onSelect, collapsed, setCollapsed }) => {
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

    return (
        <motion.div 
            className={`bg-brand-surface border-r border-white/5 flex flex-col justify-between transition-all duration-300 ${collapsed ? "w-14" : "w-56"}`}
            animate={{ width: collapsed ? 56 : 224 }}
        >
            <div className="flex-1 flex flex-col min-h-0">
                {/* Header Toggle */}
                <div className="p-3 border-b border-white/5 flex items-center justify-between">
                    {!collapsed && <span className="text-[9px] text-brand-muted uppercase font-bold tracking-widest">Modules</span>}
                    <button 
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 rounded hover:bg-white/5 text-brand-muted hover:text-white transition cursor-pointer mx-auto"
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
                </div>

                {/* Items List */}
                <nav className="flex-1 px-1.5 py-3 space-y-1 overflow-y-auto no-scrollbar">
                    {navItems.map((item) => {
                        const isActive = activeModule === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSelect(item.id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-premium text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                                    isActive 
                                        ? "bg-brand-primary/10 border border-brand-primary/20 text-brand-primary" 
                                        : "bg-transparent border border-transparent text-brand-muted hover:text-white hover:bg-white/5"
                                }`}
                                title={item.label}
                            >
                                <span className="text-sm shrink-0">{item.icon}</span>
                                {!collapsed && <span className="truncate">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </motion.div>
    );
};

export default Sidebar;
