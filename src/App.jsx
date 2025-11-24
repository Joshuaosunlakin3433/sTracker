import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import WalletConnect from "./components/WalletConnect.jsx";
import BalanceCard from "./components/BalanceCard.jsx";
import HealthScore from "./components/HealthScore.jsx";
import {
  getSTXBalance,
  getSTXPrice,
  getTokenBalances,
} from "./services/stacksApi";

function App() {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [manualAddress, setManualAddress] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (addressInput.startsWith("SP") || addressInput.startsWith("SM")) {
      setManualAddress(addressInput);
      setConnectedAddress(addressInput);
    }
  };

  // Fetch portfolio data when wallet is connected
  const { data: stxBalance } = useQuery({
    queryKey: ["stx-balance", connectedAddress],
    queryFn: () => getSTXBalance(connectedAddress),
    enabled: !!connectedAddress,
  });

  const { data: stxPrice } = useQuery({
    queryKey: ["stx-price"],
    queryFn: getSTXPrice,
    enabled: !!connectedAddress,
  });

  const { data: tokens } = useQuery({
    queryKey: ["tokens", connectedAddress],
    queryFn: () => getTokenBalances(connectedAddress),
    enabled: !!connectedAddress,
  });

  // Prepare portfolio data for health score
  const portfolioData = connectedAddress
    ? {
        stxBalance,
        tokens,
        stxPrice,
        totalValue: (stxBalance?.total || 0) * (stxPrice || 0),
      }
    : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-purple-500 to-pink-500 flex flex-col">
      {/* Navbar */}
      <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              {/* Better Logo */}
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
              <WalletConnect onWalletConnected={setConnectedAddress} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {!connectedAddress ? (
          // Landing Page
          <div className="w-full py-8 md:py-12">
            {/* Hero Section */}
            <div className="text-center text-white mb-12 md:mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  AI-Powered Analytics
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-4">
                Your Stacks Portfolio,
                <br />
                <span className="bg-linear-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Intelligently Tracked
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 px-4 leading-relaxed">
                Get real-time insights, AI recommendations, and complete
                visibility across DeFi protocols
              </p>

              {/* Connection Options */}
              <div className="max-w-2xl mx-auto space-y-4 px-4">
                {/* Wallet Connect */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() =>
                      document
                        .querySelector(".wallet-connect-button button")
                        ?.click()
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
                    onClick={() =>
                      setConnectedAddress(
                        "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9"
                      )
                    }
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
                <form onSubmit={handleManualSubmit} className="w-full">
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

            {/* What You Can Track */}
            <div className="mb-12 md:mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-12 bg-linear-to-r from-transparent to-white/30"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Powered by AI
                </h2>
                <div className="h-px w-12 bg-linear-to-l from-transparent to-white/30"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* AI Health Score - MOST PROMINENT */}
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
                    AI Portfolio Health Score
                    <span className="text-yellow-300">✨</span>
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Get instant AI analysis with personalized recommendations to
                    optimize your portfolio
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💎</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    STX & Tokens
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    See all your holdings including sBTC, ALEX, and custom
                    tokens
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🌊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Liquidity Pools
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Monitor your positions on Velar and Alex DEX
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Stacking Rewards
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Track your locked STX and BTC rewards
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Total Value
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Real-time USD value across all positions
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Smart Insights
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    AI-powered recommendations to optimize your portfolio
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Visual Analytics
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Charts and breakdowns that make sense
                  </p>
                </div>
              </div>
            </div>

            {/* Why sTracker */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                  Why sTracker?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Completely Free
                      </h3>
                      <p className="text-white/70 text-sm">
                        No hidden fees, no premium tiers
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Non-Custodial
                      </h3>
                      <p className="text-white/70 text-sm">
                        Your keys, your crypto, always
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Open Source
                      </h3>
                      <p className="text-white/70 text-sm">
                        Built in public for the community
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Mobile First
                      </h3>
                      <p className="text-white/70 text-sm">
                        Works great on any device
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Dashboard
          <div className="w-full py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center text-white space-y-2">
                <h2 className="text-4xl font-bold">Portfolio Dashboard</h2>
                <p className="text-lg opacity-80">
                  Your complete Stacks portfolio with AI-powered insights
                </p>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* STX Balance */}
                <BalanceCard address={connectedAddress} />

                {/* Tokens Coming Soon */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">🪙</div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Your Tokens
                    </h3>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">🚧</div>
                    <p className="text-sm">Token list coming next...</p>
                  </div>
                </div>
              </div>

              {/* AI Health Score & Recommendations */}
              <HealthScore portfolioData={portfolioData} />

              {/* DeFi Positions Coming Soon */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🔄</div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    DeFi Positions
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Velar DEX", "Alex DEX", "StackingDAO"].map((protocol) => (
                    <div
                      key={protocol}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"
                    >
                      <div className="text-3xl mb-2">⏳</div>
                      <div className="font-semibold text-gray-700">
                        {protocol}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Coming soon
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 md:py-8 border-t border-white/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/60 text-sm">
            Built with ❤️ for the Stacks ecosystem
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
