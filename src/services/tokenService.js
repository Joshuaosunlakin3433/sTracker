import axios from "axios";

const HIRO_API = "https://api.mainnet.hiro.so";

// Known token metadata with verified contract addresses
const TOKEN_METADATA = {
  // sBTC - Wrapped Bitcoin on Stacks
  "sbtc-token": {
    name: "sBTC",
    symbol: "sBTC",
    decimals: 8,
    logo: "₿",
    color: "from-orange-400 to-yellow-500",
    contractAddress: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token",
  },
  sbtc: {
    name: "sBTC",
    symbol: "sBTC",
    decimals: 8,
    logo: "₿",
    color: "from-orange-400 to-yellow-500",
    contractAddress: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token",
  },
  // ALEX - DeFi protocol token
  alex: {
    name: "ALEX",
    symbol: "ALEX",
    decimals: 8,
    logo: "🦊",
    color: "from-blue-400 to-cyan-500",
  },
  // VELAR - DEX protocol token
  "velar-token": {
    name: "VELAR",
    symbol: "VELAR",
    decimals: 6,
    logo: "🚀",
    color: "from-purple-400 to-pink-500",
    contractAddress: "SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.velar-token",
  },
  velar: {
    name: "VELAR",
    symbol: "VELAR",
    decimals: 6,
    logo: "🚀",
    color: "from-purple-400 to-pink-500",
    contractAddress: "SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.velar-token",
  },
  // WELSH - Meme token
  "welshcorgicoin-token": {
    name: "Welsh",
    symbol: "WELSH",
    decimals: 6,
    logo: "🐕",
    color: "from-red-400 to-orange-500",
    contractAddress:
      "SP3NE50GEXFG9SZGTT51P40X2CKYSZ5CC4ZTZ7A2G.welshcorgicoin-token",
  },
  welshcorgicoin: {
    name: "Welsh",
    symbol: "WELSH",
    decimals: 6,
    logo: "🐕",
    color: "from-red-400 to-orange-500",
    contractAddress:
      "SP3NE50GEXFG9SZGTT51P40X2CKYSZ5CC4ZTZ7A2G.welshcorgicoin-token",
  },
};

// Parse token metadata from contract ID
const findTokenMetadata = (contractId) => {
  const lowerContractId = contractId.toLowerCase();

  // Check known tokens
  for (const [key, metadata] of Object.entries(TOKEN_METADATA)) {
    if (lowerContractId.includes(key)) {
      return metadata;
    }
  }

  // Parse token name from contract
  const parts = contractId.split("::");
  const tokenName = parts.length > 1 ? parts[1] : "Unknown";

  return {
    name: tokenName.toUpperCase(),
    symbol: tokenName.slice(0, 6).toUpperCase(),
    decimals: 6,
    logo: "🪙",
    color: "from-gray-400 to-gray-500",
  };
};

// Get all fungible tokens for an address
export const getAllTokens = async (address) => {
  try {
    const response = await axios.get(
      `${HIRO_API}/extended/v1/address/${address}/balances`
    );

    const tokens = [];
    const fungibleTokens = response.data.fungible_tokens || {};

    for (const [contractId, tokenData] of Object.entries(fungibleTokens)) {
      const metadata = findTokenMetadata(contractId);
      const decimals = metadata.decimals || 6;
      const balance = parseInt(tokenData.balance) / Math.pow(10, decimals);

      // Only include tokens with balance > 0
      if (balance > 0) {
        tokens.push({
          contractId,
          name: metadata.name,
          symbol: metadata.symbol,
          logo: metadata.logo,
          color: metadata.color,
          balance,
          decimals,
          totalSent: parseInt(tokenData.total_sent) / Math.pow(10, decimals),
          totalReceived:
            parseInt(tokenData.total_received) / Math.pow(10, decimals),
        });
      }
    }

    return tokens;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
};

// Get token prices from CoinGecko - verified IDs from coingecko.com
export const getTokenPrices = async () => {
  try {
    // Verified CoinGecko IDs (researched Nov 25, 2025)
    const coinGeckoIds = {
      sBTC: "sbtc-2", // https://www.coingecko.com/en/coins/sbtc
      ALEX: "alexgo", // Already working
      VELAR: "velar", // https://www.coingecko.com/en/coins/velar
      WELSH: "welsh-corgi-coin", // https://www.coingecko.com/en/coins/welsh-corgi-coin
    };

    const ids = Object.values(coinGeckoIds).join(",");
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );

    const prices = {};
    for (const [symbol, id] of Object.entries(coinGeckoIds)) {
      if (response.data[id]) {
        prices[symbol] = response.data[id].usd;
      }
    }

    return prices;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return {};
  }
};
