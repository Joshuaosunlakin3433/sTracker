import WalletConnect from "../WalletConnect";

const Navbar = ({ onWalletConnected }) => {
  return (
    <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-pink-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition"></div>
              <div className="relative w-10 h-10 bg-linear-to-br from-purple-900 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-white leading-none">
                sTracker
              </h1>
              <span className="text-[10px] md:text-xs text-white/60 font-medium leading-none mt-0.5">
                AI-Powered Portfolio
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <WalletConnect onWalletConnected={onWalletConnected} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
