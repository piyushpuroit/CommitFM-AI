import React from "react";

const SectionHeader = ({ badge, title, subtitle, rightElement }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-premium bg-brand-surface border border-white/5 text-left w-full">
            <div>
                {badge && <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">{badge}</span>}
                <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mt-0.5">{title}</h2>
                {subtitle && <p className="text-xs text-brand-muted mt-1 leading-normal">{subtitle}</p>}
            </div>
            {rightElement && (
                <div className="self-start sm:self-auto flex items-center">
                    {rightElement}
                </div>
            )}
        </div>
    );
};

export default SectionHeader;
