const Hero = ({
  addressInput,
  setAddressInput,
  onManualSubmit,
  onDemoClick,
}) => {
  return (
    <div className="text-center text-white mb-12 md:mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">AI-Powered Analytics</span>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-4">
        Your Stacks Portfolio,
        <br />
        <span className="bg-linear-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          Intelligently Tracked
        </span>
      </h1>
      <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 px-4 leading-relaxed">
        Get real-time insights, AI recommendations, and complete visibility
        across DeFi protocols
      </p>

      {/* Connection Options */}
      <div className="max-w-2xl mx-auto space-y-4 px-4">
        {/* Wallet Connect */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() =>
              document.querySelector(".wallet-connect-button button")?.click()
            }
            className="group relative w-full sm:w-auto px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-base overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20 transition"></div>
            <span className="relative flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Connect Wallet
            </span>
          </button>
          <button
            onClick={onDemoClick}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
          >
            View Demo
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-white/60 text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Manual Address Input */}
        <form onSubmit={onManualSubmit} className="w-full">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="Enter Stacks address (SP...)"
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              Track Portfolio
            </button>
          </div>
          <p className="text-white/50 text-xs mt-2 text-left">
            Read-only access - no wallet connection needed
          </p>
        </form>
      </div>
    </div>
  );
};

export default Hero;
