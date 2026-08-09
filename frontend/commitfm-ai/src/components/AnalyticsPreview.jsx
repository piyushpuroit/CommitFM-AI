import { useState } from "react";
import { dashboardData } from "../data/dummyData";

const AnalyticsPreview = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="analytics-preview" className="mb-8 sm:mb-10 lg:mb-12">
            <div className="rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-white/6 backdrop-blur-md">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 flex-1">
                        <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-slate-800 border border-white/6">
                            <div className="text-xs sm:text-sm text-zinc-400">Commits</div>
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2">{dashboardData.commitCount}</div>
                        </div>

                        <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-slate-800 border border-white/6">
                            <div className="text-xs sm:text-sm text-zinc-400">Coding Streak</div>
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2">{dashboardData.streakDays} <span className="text-sm text-zinc-400">days</span></div>
                        </div>

                        <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-slate-800 border border-white/6">
                            <div className="text-xs sm:text-sm text-zinc-400">Dev Score</div>
                            <div className="flex items-center gap-2 sm:gap-3 mt-2">
                                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{dashboardData.devScore}</div>
                                <div className="flex-1 h-2 bg-white/6 rounded-full overflow-hidden min-w-0">
                                    <div style={{ width: `${dashboardData.devScore}%` }} className="h-full bg-gradient-to-r from-emerald-400 to-indigo-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Summary & Waveform */}
                    <div className="w-full lg:flex-1">
                        <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-slate-800 border border-white/6">
                            <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
                                <div className="min-w-0 flex-1">
                                    <div className="text-xs sm:text-sm text-zinc-400">AI Summary</div>
                                    <div className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed line-clamp-2">{dashboardData.aiSummary}</div>
                                </div>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/6 rounded text-xs sm:text-sm hover:bg-white/10 transition whitespace-nowrap flex-shrink-0"
                                >
                                    {isPlaying ? "Pause" : "Play"}
                                </button>
                            </div>

                            <div className="mt-3 sm:mt-4">
                                <div className="w-full h-12 sm:h-16 flex items-end gap-0.5">
                                    {dashboardData.waveform.map((h, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 bg-gradient-to-t from-sky-400 to-indigo-500 rounded-sm transition-transform min-h-1 ${isPlaying ? "animate-pulse-slow" : ""
                                                }`}
                                            style={{ height: `${h * 6}%` }}
                                        />
                                    ))}
                                </div>
                                <div className="mt-2 text-xs text-zinc-400">00:00 / 02:30</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsPreview;
