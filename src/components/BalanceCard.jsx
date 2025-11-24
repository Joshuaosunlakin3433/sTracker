import { useQuery } from "@tanstack/react-query";
import { getSTXBalance, getSTXPrice } from "../services/stacksApi";
import { formatUSD, formatNumber } from "../utils/format";

function BalanceCard({ address }) {
  const {
    data: balance,
    isLoading: balanceLoading,
    error: balanceError,
    refetch,
  } = useQuery({
    queryKey: ["stx-balance", address],
    queryFn: () => getSTXBalance(address),
    enabled: !!address,
  });

  const { data: price, isLoading: priceLoading } = useQuery({
    queryKey: ["stx-price"],
    queryFn: getSTXPrice,
    staleTime: 60000, // Price stays fresh for 1 minute
  });

  const isLoading = balanceLoading || priceLoading;
  const totalValue = balance && price ? balance.total * price : 0;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (balanceError) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-red-200">
        <div className="text-center text-red-600">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="font-semibold">Failed to load balance</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-purple-600 to-pink-500 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
            ₿
          </div>
          <h3 className="text-2xl font-bold text-white">STX Balance</h3>
        </div>
        <button
          onClick={() => refetch()}
          className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          title="Refresh balance"
        >
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-5xl font-bold text-white mb-2">
            {formatNumber(balance.total)}{" "}
            <span className="text-2xl text-white/80">STX</span>
          </div>
          <div className="text-2xl text-white/90">{formatUSD(totalValue)}</div>
        </div>

        <div className="border-t border-white/20 pt-4 space-y-2">
          <div className="flex justify-between items-center text-white/90">
            <span className="text-sm">Available</span>
            <span className="font-semibold">
              {formatNumber(balance.available)} STX
            </span>
          </div>

          {balance.locked > 0 && (
            <div className="flex justify-between items-center text-white/90">
              <span className="text-sm flex items-center gap-1">
                Locked (Stacking)
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                  🔒
                </span>
              </span>
              <span className="font-semibold">
                {formatNumber(balance.locked)} STX
              </span>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-white/60 pt-4 border-t border-white/10">
          1 STX = {formatUSD(price || 0)}
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
