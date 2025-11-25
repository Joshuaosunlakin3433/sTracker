import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTokens, getTokenPrices } from "../../services/tokenService";

const TokenList = ({ address }) => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY = 5; // Show 5 tokens initially

  // Fetch tokens
  const {
    data: tokens,
    isLoading: tokensLoading,
    error: tokensError,
    refetch,
  } = useQuery({
    queryKey: ["tokens", address],
    queryFn: () => getAllTokens(address),
    enabled: !!address,
    staleTime: 30000, // 30 seconds
  });

  // Fetch token prices
  const { data: prices } = useQuery({
    queryKey: ["token-prices"],
    queryFn: getTokenPrices,
    staleTime: 60000, // 1 minute
  });

  if (tokensLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-2xl">🪙</div>
          <h3 className="text-2xl font-bold text-gray-800">Your Tokens</h3>
        </div>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-500">Loading tokens...</p>
        </div>
      </div>
    );
  }

  if (tokensError) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-2xl">🪙</div>
          <h3 className="text-2xl font-bold text-gray-800">Your Tokens</h3>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-red-500">Error loading tokens</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!tokens || tokens.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🪙</div>
            <h3 className="text-2xl font-bold text-gray-800">Your Tokens</h3>
          </div>
          <button
            onClick={() => refetch()}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Refresh"
          >
            <svg
              className="w-5 h-5 text-gray-600"
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
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-sm">No tokens found in this wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🪙</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Your Tokens</h3>
            <p className="text-sm text-gray-500">
              {tokens.length} token{tokens.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button
          onClick={() => refetch()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
          title="Refresh"
        >
          <svg
            className="w-5 h-5 text-gray-600"
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

      {/* Token List - Scrollable Container */}
      <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
        {(showAll ? tokens : tokens.slice(0, INITIAL_DISPLAY)).map((token) => {
          const price = prices?.[token.symbol];
          const usdValue = price ? token.balance * price : null;

          return (
            <div
              key={token.contractId}
              className="group p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                {/* Token Info */}
                <div className="flex items-center gap-4">
                  {/* Logo with gradient background */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${token.color} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {token.logo}
                  </div>

                  {/* Token Details */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-gray-800">
                        {token.name}
                      </h4>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {token.symbol}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-mono">
                      {token.balance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      })}{" "}
                      {token.symbol}
                    </p>
                  </div>
                </div>

                {/* USD Value */}
                <div className="text-right">
                  {usdValue ? (
                    <>
                      <p className="text-lg font-bold text-gray-800">
                        $
                        {usdValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${price.toFixed(4)} per token
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400">Price N/A</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {tokens.length > INITIAL_DISPLAY && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            {showAll ? (
              <>
                Show Less <span className="inline-block ml-1">↑</span>
              </>
            ) : (
              <>
                Load More ({tokens.length - INITIAL_DISPLAY} more){" "}
                <span className="inline-block ml-1">↓</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenList;
