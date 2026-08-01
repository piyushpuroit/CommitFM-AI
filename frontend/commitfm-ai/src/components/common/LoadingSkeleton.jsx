import React from "react";

const LoadingSkeleton = ({ count = 3, variant = "lists" }) => {
    const renderSkeleton = () => {
        if (variant === "cards") {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {Array.from({ length: count }).map((_, idx) => (
                        <div key={idx} className="p-4 rounded-premium bg-brand-surface border border-white/5 animate-pulse flex flex-col gap-3 min-h-[120px]">
                            <div className="h-3.5 bg-white/10 rounded w-1/2" />
                            <div className="h-6 bg-white/10 rounded w-1/3" />
                            <div className="h-3 bg-white/5 rounded w-full mt-auto" />
                        </div>
                    ))}
                </div>
            );
        }

        if (variant === "charts") {
            return (
                <div className="p-5 rounded-premium bg-brand-surface border border-white/5 animate-pulse w-full space-y-4">
                    <div className="h-4 bg-white/10 rounded w-1/4" />
                    <div className="h-40 bg-white/5 rounded-lg w-full flex items-end justify-between p-3 gap-2">
                        <div className="h-[20%] w-full bg-white/10 rounded-sm" />
                        <div className="h-[50%] w-full bg-white/10 rounded-sm" />
                        <div className="h-[80%] w-full bg-white/10 rounded-sm" />
                        <div className="h-[40%] w-full bg-white/10 rounded-sm" />
                        <div className="h-[90%] w-full bg-white/10 rounded-sm" />
                    </div>
                </div>
            );
        }

        if (variant === "tables") {
            return (
                <div className="p-4 rounded-premium bg-brand-surface border border-white/5 animate-pulse w-full space-y-3">
                    <div className="h-4 bg-white/10 rounded w-1/4 mb-4" />
                    <div className="space-y-2">
                        {Array.from({ length: count }).map((_, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-white/5">
                                <div className="h-3 bg-white/10 rounded w-1/3" />
                                <div className="h-3 bg-white/5 rounded w-1/6" />
                                <div className="h-3 bg-white/5 rounded w-1/12" />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Default: lists
        return (
            <div className="space-y-3 py-2 w-full">
                {Array.from({ length: count }).map((_, idx) => (
                    <div key={idx} className="p-4 rounded-premium bg-brand-surface border border-white/5 animate-pulse flex flex-col gap-2">
                        <div className="h-4 bg-white/10 rounded w-1/3" />
                        <div className="h-3 bg-white/5 rounded w-full" />
                        <div className="h-3 bg-white/5 rounded w-2/3" />
                    </div>
                ))}
            </div>
        );
    };

    return renderSkeleton();
};

export default LoadingSkeleton;
