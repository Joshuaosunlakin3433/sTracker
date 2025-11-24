import axios from "axios";

const HIRO_API = "https://api.mainnet.hiro.so";
const COINGECKO_API = "https://api.coingecko.com/api/v3";

// Get STX balance and basic info
export const getSTXBalance = async (address) => {
  try {
    const response = await axios.get(
      `${HIRO_API}/extended/v1/address/${address}/balances`
    );

    // Convert microSTX to STX (divide by 1,000,000)
    const stxBalance = parseInt(response.data.stx.balance) / 1_000_000;
    const stxLocked = parseInt(response.data.stx.locked) / 1_000_000;

    return {
      available: stxBalance,
      locked: stxLocked,
      total: stxBalance + stxLocked,
    };
  } catch (error) {
    console.error("Error fetching STX balance:", error);
    throw error;
  }
};

// Get current STX price from CoinGecko
export const getSTXPrice = async () => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/simple/price?ids=blockstack&vs_currencies=usd`
    );
    return response.data.blockstack.usd;
  } catch (error) {
    console.error("Error fetching STX price:", error);
    return 0;
  }
};

// Get all fungible tokens (SIP-10 tokens like sBTC, ALEX, VELAR, etc.)
export const getTokenBalances = async (address) => {
  try {
    const response = await axios.get(
      `${HIRO_API}/extended/v1/address/${address}/balances`
    );

    const tokens = [];
    const fungibleTokens = response.data.fungible_tokens || {};

    for (const [contractId, tokenData] of Object.entries(fungibleTokens)) {
      tokens.push({
        contractId,
        balance: parseInt(tokenData.balance),
        totalSent: parseInt(tokenData.total_sent),
        totalReceived: parseInt(tokenData.total_received),
      });
    }

    return tokens;
  } catch (error) {
    console.error("Error fetching token balances:", error);
    throw error;
  }
};

// Get transaction history
export const getTransactions = async (address, limit = 50) => {
  try {
    const response = await axios.get(
      `${HIRO_API}/extended/v1/address/${address}/transactions?limit=${limit}`
    );

    return response.data.results.map((tx) => ({
      id: tx.tx_id,
      type: tx.tx_type,
      status: tx.tx_status,
      timestamp: tx.block_time_iso,
      blockHeight: tx.block_height,
      fee: parseInt(tx.fee_rate) / 1_000_000,
      sender: tx.sender_address,
      amount: tx.token_transfer
        ? parseInt(tx.token_transfer.amount) / 1_000_000
        : 0,
      recipient: tx.token_transfer?.recipient_address,
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
