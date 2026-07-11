import React from "react";

const SectionCard = ({ children, className = "" }) => {
    return (
        <div className={`premium-card bg-brand-surface border border-white/5 rounded-premium p-4 shadow-premium transition duration-200 hover:border-white/10 ${className}`}>
            {children}
        </div>
    );
};

export default SectionCard;
