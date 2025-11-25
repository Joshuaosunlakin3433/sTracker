import {
  connect,
  disconnect,
  isConnected,
  getLocalStorage,
} from "@stacks/connect";
import { useState, useEffect } from "react";

function WalletConnect({ onWalletConnected }) {
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already connected on component mount
    if (isConnected()) {
      const userData = getLocalStorage();
      if (userData?.addresses?.stx?.[0]?.address) {
        const stxAddress = userData.addresses.stx[0].address;
        setAddress(stxAddress);
        onWalletConnected(stxAddress);
      }
    }
  }, [onWalletConnected]);

  const connectWallet = async () => {
    if (isConnected()) {
      console.log("Already authenticated");
      return;
    }

    setIsLoading(true);
    try {
      const response = await connect();
      console.log("Connected:", response.addresses);

      // Get the STX address
      const stxAddress = response.addresses.stx[0].address;
      setAddress(stxAddress);
      onWalletConnected(stxAddress);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setAddress(null);
    onWalletConnected(null);
    console.log("User disconnected");
  };

  return (
    <div className="wallet-connect-button">
      {!address ? (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="group relative bg-white text-purple-600 font-bold py-2.5 px-5 md:py-3 md:px-6 rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm md:text-base overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20 transition"></div>
          <span className="relative flex items-center gap-2">
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="hidden sm:inline">Connecting...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
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
                <span className="hidden sm:inline">Connect</span>
              </>
            )}
          </span>
        </button>
      ) : (
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-2.5 md:p-3 flex items-center gap-2 md:gap-3 border border-white/20 shadow-lg">
          <div className="flex-1 min-w-0">
            <p className="text-white/60 text-[10px] leading-none mb-1">
              Connected
            </p>
            <p className="text-white font-mono text-xs md:text-sm truncate font-semibold">
              {address.slice(0, 4)}...{address.slice(-4)}
            </p>
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-red-500/80 hover:bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg active:scale-95 transition-all text-xs md:text-sm whitespace-nowrap font-medium"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
export default WalletConnect;
