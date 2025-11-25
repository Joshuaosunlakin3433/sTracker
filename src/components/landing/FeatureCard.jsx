const FeatureCard = ({ icon, title, description, isAI = false }) => {
  if (isAI) {
    return (
      <div className="relative bg-linear-to-br from-yellow-400/30 to-pink-500/30 backdrop-blur-md border-2 border-yellow-400/50 rounded-xl p-6 hover:border-yellow-400/70 transition-all group sm:col-span-2 lg:col-span-1 shadow-xl shadow-yellow-400/20">
        <div className="absolute top-3 right-3">
          <span className="bg-linear-to-r from-yellow-400 to-pink-400 text-purple-900 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            AI Powered
          </span>
        </div>
        <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-pink-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
          <svg
            className="w-6 h-6 text-purple-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          {title}
          <span className="text-yellow-300">✨</span>
        </h3>
        <p className="text-white/80 text-sm leading-relaxed">{description}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group">
      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
