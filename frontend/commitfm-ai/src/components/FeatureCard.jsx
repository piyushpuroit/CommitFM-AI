const FeatureCard = ({ title, desc, accent }) => {
  return (
    <div className={`group relative p-6 rounded-2xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-sm hover:shadow-2xl transform transition duration-300 hover:-translate-y-2 hover:scale-105`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${accent} flex-shrink-0`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 opacity-95">
            <path d="M12 2l3 6 6 .5-4.5 3.8L19 20l-7-4-7 4 1.5-7.7L3 8.5 9 8 12 2z" fill="currentColor" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-zinc-300 text-sm mt-1">{desc}</p>
        </div>
      </div>
      <div className="absolute -inset-px rounded-2xl border-transparent group-hover:border-white/8 pointer-events-none" />
    </div>
  );
};

export default FeatureCard;
