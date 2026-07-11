import React from "react";

const LoadingSkeleton = ({ count = 3 }) => {
    return (
        <div className="space-y-3 py-4 w-full">
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

export default LoadingSkeleton;
