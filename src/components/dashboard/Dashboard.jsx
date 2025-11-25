import BalanceCard from "../BalanceCard";
import HealthScore from "../HealthScore";

const Dashboard = ({ connectedAddress, portfolioData }) => {
  return (
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
              <h3 className="text-2xl font-bold text-gray-800">Your Tokens</h3>
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
            <h3 className="text-2xl font-bold text-gray-800">DeFi Positions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Velar DEX", "Alex DEX", "StackingDAO"].map((protocol) => (
              <div
                key={protocol}
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"
              >
                <div className="text-3xl mb-2">⏳</div>
                <div className="font-semibold text-gray-700">{protocol}</div>
                <div className="text-sm text-gray-500 mt-1">Coming soon</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
