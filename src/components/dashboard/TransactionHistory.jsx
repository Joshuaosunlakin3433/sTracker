import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/stacksApi";

const TransactionHistory = ({ address }) => {
  const {
    data: transactions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions", address],
    queryFn: () => getTransactions(address),
    enabled: !!address,
    staleTime: 30000, // 30 seconds
  });

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  // Get transaction type icon and color
  const getTransactionStyle = (type, sender, recipient, currentAddress) => {
    if (type === "token_transfer") {
      const isSending = sender === currentAddress;
      return {
        icon: isSending ? "↑" : "↓",
        label: isSending ? "Sent" : "Received",
        color: isSending
          ? "text-red-600 bg-red-50"
          : "text-green-600 bg-green-50",
        iconBg: isSending ? "bg-red-100" : "bg-green-100",
      };
    }
    if (type === "contract_call") {
      return {
        icon: "⚙️",
        label: "Contract Call",
        color: "text-blue-600 bg-blue-50",
        iconBg: "bg-blue-100",
      };
    }
    if (type === "smart_contract") {
      return {
        icon: "📄",
        label: "Deploy Contract",
        color: "text-purple-600 bg-purple-50",
        iconBg: "bg-purple-100",
      };
    }
    return {
      icon: "•",
      label: type.replace("_", " "),
      color: "text-gray-600 bg-gray-50",
      iconBg: "bg-gray-100",
    };
  };

  // Shorten address
  const shortenAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-2xl">📜</div>
          <h3 className="text-2xl font-bold text-gray-800">Recent Activity</h3>
        </div>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-500">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-2xl">📜</div>
          <h3 className="text-2xl font-bold text-gray-800">Recent Activity</h3>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-red-500">Error loading transactions</p>
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

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📜</div>
            <h3 className="text-2xl font-bold text-gray-800">
              Recent Activity
            </h3>
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
          <p className="text-sm">No transactions found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📜</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Recent Activity
            </h3>
            <p className="text-sm text-gray-500">
              Last {transactions.length} transaction
              {transactions.length !== 1 ? "s" : ""}
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

      {/* Transaction List - Scrollable */}
      <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {transactions.map((tx) => {
          const style = getTransactionStyle(
            tx.type,
            tx.sender,
            tx.recipient,
            address
          );
          const isSending = tx.sender === address;

          return (
            <div
              key={tx.txId}
              className="group p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Icon and Details */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center text-xl shrink-0`}
                  >
                    {style.icon}
                  </div>

                  {/* Transaction Details */}
                  <div className="flex-1 min-w-0">
                    {/* Type and Status */}
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${style.color}`}
                      >
                        {style.label}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          tx.status === "success"
                            ? "bg-green-100 text-green-700"
                            : tx.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>

                    {/* Amount (if transfer) */}
                    {tx.amount > 0 && (
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        {isSending ? "-" : "+"}
                        {tx.amount.toLocaleString()} STX
                      </p>
                    )}

                    {/* Address (recipient or sender) */}
                    <p className="text-sm text-gray-500 truncate">
                      {tx.type === "token_transfer" && (
                        <>
                          {isSending ? "To: " : "From: "}
                          <span className="font-mono">
                            {shortenAddress(
                              isSending ? tx.recipient : tx.sender
                            )}
                          </span>
                        </>
                      )}
                      {tx.type === "contract_call" && (
                        <span className="font-mono">
                          {shortenAddress(tx.contractCall)}
                        </span>
                      )}
                    </p>

                    {/* Timestamp */}
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(tx.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Right: Explorer Link */}
                <a
                  href={`https://explorer.hiro.so/txid/${tx.txId}?chain=mainnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition opacity-0 group-hover:opacity-100"
                  title="View on Explorer"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
