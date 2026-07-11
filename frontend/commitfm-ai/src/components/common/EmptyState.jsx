import React from "react";

const EmptyState = ({ title = "No data found", description = "Try modifying your filters or refresh the data.", icon = "🔍" }) => {
    return (
        <div className="py-12 sm:py-16 text-center text-xs text-brand-muted flex flex-col items-center justify-center gap-2">
            <span className="text-3xl select-none mb-1">{icon}</span>
            <h4 className="font-bold text-white uppercase tracking-wider">{title}</h4>
            <p className="max-w-md leading-relaxed">{description}</p>
        </div>
    );
};

export default EmptyState;
