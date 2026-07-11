const FeatureCard = ({ title, desc, accent }) => {
    return (
        <div className={`group relative p-3 rounded-lg bg-indigo-900/20 border border-indigo-700/30 shadow-sm hover:border-indigo-700/50 hover:shadow-md transform transition duration-300 hover:-translate-y-0.5`}>
            <div className="flex items-start gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0 ${accent} opacity-80 group-hover:opacity-100 transition`}>
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M12 2l3 6 6 .5-4.5 3.8L19 20l-7-4-7 4 1.5-7.7L3 8.5 9 8 12 2z" fill="currentColor" />
                    </svg>
                </div>
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition">{title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">{desc}</p>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;
