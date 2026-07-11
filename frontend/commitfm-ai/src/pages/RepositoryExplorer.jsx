import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { githubService } from "../services/githubService";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import EmptyState from "../components/common/EmptyState";

// Helper for language color dots
const getLanguageColor = (lang) => {
    const colors = { javascript: "bg-yellow-500", typescript: "bg-blue-500", go: "bg-cyan-500", python: "bg-green-500", html: "bg-orange-500", css: "bg-purple-500" };
    return colors[lang?.toLowerCase()] || "bg-slate-400";
};

const RepositoryExplorer = () => {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [sortBy, setSortBy] = useState("stars");

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const data = await githubService.getRepositories();
                setRepositories(data);
            } catch (err) {
                console.error("Failed to load repositories:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRepos();
    }, []);

    // Filter Logic
    const filteredRepositories = repositories.filter((repo) => {
        const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             repo.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Find primary language (one with the most bytes)
        const primaryLang = Object.keys(repo.languages)[0] || "";
        const matchesLang = selectedLanguage === "all" || primaryLang.toLowerCase() === selectedLanguage.toLowerCase();
        
        const matchesType = selectedType === "all" || 
                            (selectedType === "private" && repo.isPrivate) || 
                            (selectedType === "public" && !repo.isPrivate);

        return matchesSearch && matchesLang && matchesType;
    });

    // Sort Logic
    const sortedRepositories = [...filteredRepositories].sort((a, b) => {
        if (sortBy === "stars") return b.starsCount - a.starsCount;
        if (sortBy === "forks") return b.forksCount - a.forksCount;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return (b.lastSyncedAt ? new Date(b.lastSyncedAt) : 0) - (a.lastSyncedAt ? new Date(a.lastSyncedAt) : 0);
    });

    // Collect all available unique primary languages from mock data
    const availableLanguages = Array.from(
        new Set(
            repositories.map(repo => Object.keys(repo.languages)[0]).filter(Boolean)
        )
    );

    return (
        <MainLayout>
            <div className="space-y-6 text-left">
                {/* Header Controls */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-premium bg-brand-surface border border-white/5">
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">Repository Explorer</h2>
                        <p className="text-xs text-brand-muted">Search and review available repositories for analysis</p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 bg-brand-surface border border-white/5 rounded-premium">
                    {/* Search Bar */}
                    <div className="sm:col-span-5 relative">
                        <input
                            type="text"
                            placeholder="Find a repository..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-brand-bg border border-white/10 rounded-premium px-3 py-1.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary"
                        />
                    </div>

                    {/* Filters Selectors */}
                    <div className="sm:col-span-7 flex flex-wrap gap-2 justify-start sm:justify-end">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="bg-brand-bg border border-white/10 rounded-premium px-2 py-1.5 text-xs text-brand-muted focus:outline-none focus:border-brand-primary cursor-pointer"
                        >
                            <option value="all">Type: All</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>

                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="bg-brand-bg border border-white/10 rounded-premium px-2 py-1.5 text-xs text-brand-muted focus:outline-none focus:border-brand-primary cursor-pointer capitalize"
                        >
                            <option value="all">Language: All</option>
                            {availableLanguages.map((lang) => (
                                <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-brand-bg border border-white/10 rounded-premium px-2 py-1.5 text-xs text-brand-muted focus:outline-none focus:border-brand-primary cursor-pointer"
                        >
                            <option value="stars">Sort: Stars</option>
                            <option value="forks">Sort: Forks</option>
                            <option value="name">Sort: Name</option>
                            <option value="updated">Sort: Last Updated</option>
                        </select>
                    </div>
                </div>

                {/* Repository Cards List */}
                {loading ? (
                    <LoadingSkeleton count={4} />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 gap-3"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.05 }
                            }
                        }}
                    >
                        {sortedRepositories.map((repo) => {
                            const primaryLang = Object.keys(repo.languages)[0] || "Unknown";
                            const formattedDate = repo.lastSyncedAt 
                                ? new Date(repo.lastSyncedAt).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric"
                                  })
                                : "Never";

                            return (
                                <motion.div
                                    key={repo.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 5 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className="p-4 rounded-premium bg-brand-surface border border-white/5 hover:border-white/10 transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >
                                    <div className="space-y-1 max-w-2xl">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/repositories/${repo.id}`}
                                                className="text-sm font-bold text-[#8B5CF6] hover:underline hover:text-brand-accent transition"
                                            >
                                                {repo.fullName}
                                            </Link>
                                            <a
                                                href={repo.htmlUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-500 hover:text-white transition"
                                                title="View on GitHub"
                                            >
                                                <svg className="w-3.5 h-3.5 inline-block" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                            <span className="px-1.5 py-0.2 rounded-full border border-white/10 text-[8px] font-bold text-brand-muted uppercase tracking-wider">
                                                {repo.isPrivate ? "Private" : "Public"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-brand-muted leading-relaxed">
                                            {repo.description}
                                        </p>
                                    </div>

                                    {/* GitHub-Inspired Info Density Metadata */}
                                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-brand-muted">
                                        {/* Language Dot */}
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(primaryLang)}`} />
                                            <span>{primaryLang}</span>
                                        </div>

                                        {/* Stars */}
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <span>{repo.starsCount}</span>
                                        </div>

                                        {/* Forks */}
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v4a2 2 0 002 2h4M16 17v-4a2 2 0 00-2-2h-4" />
                                                <circle cx="8" cy="5" r="2" fill="currentColor" />
                                                <circle cx="16" cy="19" r="2" fill="currentColor" />
                                                <circle cx="6" cy="12" r="1" fill="currentColor" />
                                            </svg>
                                            <span>{repo.forksCount}</span>
                                        </div>

                                        {/* Updated Date */}
                                        <div>
                                            <span>Updated {formattedDate}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {sortedRepositories.length === 0 && (
                            <EmptyState 
                                title="No repositories found" 
                                description="Try modifying your search query or language filter." 
                            />
                        )}
                    </motion.div>
                )}
            </div>
        </MainLayout>
    );
};

export default RepositoryExplorer;
