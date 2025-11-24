// Calculate portfolio health score (0-100)
export const calculateHealthScore = (portfolioData) => {
  let score = 100;
  const issues = [];
  const strengths = [];

  if (!portfolioData) return { score: 0, issues, strengths };

  const { stxBalance, tokens = [], totalValue = 0 } = portfolioData;

  // 1. Diversification Check (max -25 points)
  const tokenCount = tokens.filter((t) => t.balance > 0).length;
  if (tokenCount === 0 && stxBalance?.total > 0) {
    score -= 20;
    issues.push({
      severity: "medium",
      title: "Low Diversification",
      description: "Consider diversifying into other tokens beyond STX",
    });
  } else if (tokenCount >= 5) {
    strengths.push({
      title: "Well Diversified",
      description: `Portfolio includes ${tokenCount} different tokens`,
    });
  }

  // 2. Concentration Risk (max -30 points)
  if (tokens.length > 0) {
    const tokenValues = tokens.map((t) => t.valueUSD || 0);
    const maxTokenValue = Math.max(...tokenValues);
    const concentrationRatio = maxTokenValue / totalValue;

    if (concentrationRatio > 0.7) {
      score -= 30;
      issues.push({
        severity: "high",
        title: "High Concentration Risk",
        description: "Over 70% of portfolio in single token",
      });
    } else if (concentrationRatio < 0.3) {
      strengths.push({
        title: "Balanced Distribution",
        description: "No single token dominates your portfolio",
      });
    }
  }

  // 3. Stacking Participation (max +15 points bonus)
  if (stxBalance?.locked > 0) {
    const stackingRatio = stxBalance.locked / stxBalance.total;
    if (stackingRatio > 0.5) {
      score += 10;
      strengths.push({
        title: "Active Stacker",
        description: "Earning BTC rewards through stacking",
      });
    }
  } else if (stxBalance?.total > 100) {
    score -= 15;
    issues.push({
      severity: "low",
      title: "Not Stacking",
      description: "Consider stacking STX to earn BTC rewards",
    });
  }

  // 4. Portfolio Size & Activity
  if (totalValue < 100) {
    issues.push({
      severity: "low",
      title: "Small Portfolio",
      description: "Growing your holdings could improve returns",
    });
  } else if (totalValue > 10000) {
    strengths.push({
      title: "Substantial Holdings",
      description: "Consider advanced DeFi strategies",
    });
  }

  // 5. sBTC Exposure (ecosystem participation)
  const hasSBTC = tokens.some(
    (t) =>
      t.contractId?.toLowerCase().includes("sbtc") ||
      t.symbol?.toLowerCase() === "sbtc"
  );

  if (hasSBTC) {
    strengths.push({
      title: "sBTC Holder",
      description: "Participating in Bitcoin on Stacks",
    });
  }

  // Ensure score stays within bounds
  score = Math.max(0, Math.min(100, score));

  return {
    score: Math.round(score),
    issues,
    strengths,
    rating: getScoreRating(score),
  };
};

// Get text rating based on score
const getScoreRating = (score) => {
  if (score >= 90)
    return { text: "Excellent", color: "text-green-600", emoji: "🌟" };
  if (score >= 75)
    return { text: "Great", color: "text-green-500", emoji: "✨" };
  if (score >= 60) return { text: "Good", color: "text-blue-500", emoji: "👍" };
  if (score >= 40)
    return { text: "Fair", color: "text-yellow-500", emoji: "⚠️" };
  return { text: "Needs Attention", color: "text-red-500", emoji: "🔧" };
};

// Generate AI-style recommendations based on portfolio
export const generateRecommendations = (portfolioData, healthScore) => {
  const recommendations = [];

  if (!portfolioData) return recommendations;

  const { stxBalance, tokens = [], totalValue = 0 } = portfolioData;

  // Recommendation 1: Stacking
  if (stxBalance?.available > 100 && stxBalance?.locked === 0) {
    recommendations.push({
      priority: "high",
      title: "Start Stacking Your STX",
      description: `You have ${stxBalance.available.toFixed(
        0
      )} STX available. Stack it to earn passive BTC rewards while supporting network security.`,
      action: "Lock STX in StackingDAO or delegate to a pool",
      potentialImpact: "+15 health score",
    });
  }

  // Recommendation 2: Diversification
  if (tokens.length < 3 && totalValue > 500) {
    recommendations.push({
      priority: "medium",
      title: "Diversify Your Holdings",
      description:
        "Your portfolio is concentrated in few assets. Consider spreading risk across more tokens.",
      action: "Explore tokens like ALEX, sBTC, or LP tokens on Velar",
      potentialImpact: "+20 health score",
    });
  }

  // Recommendation 3: DeFi Participation
  if (
    tokens.length > 0 &&
    !tokens.some((t) => t.contractId?.includes("pool"))
  ) {
    recommendations.push({
      priority: "low",
      title: "Consider DeFi Yield Opportunities",
      description:
        "Your tokens could be earning yield in liquidity pools or lending protocols.",
      action: "Explore Velar or Alex DEX for liquidity provision",
      potentialImpact: "Earn APY on idle assets",
    });
  }

  // Recommendation 4: sBTC if not holding
  const hasSBTC = tokens.some((t) => t.symbol?.toLowerCase() === "sbtc");
  if (!hasSBTC && totalValue > 1000) {
    recommendations.push({
      priority: "medium",
      title: "Get sBTC Exposure",
      description:
        "sBTC brings Bitcoin to Stacks DeFi. Consider adding it to your portfolio.",
      action: "Swap some STX for sBTC on Alex or Velar",
      potentialImpact: "Bitcoin exposure + DeFi utility",
    });
  }

  // Always add a generic positive one
  if (healthScore.score >= 70) {
    recommendations.push({
      priority: "low",
      title: "Portfolio Looks Healthy",
      description: `Your ${healthScore.score}/100 score indicates good portfolio management. Keep monitoring and rebalancing.`,
      action: "Continue current strategy and review quarterly",
      potentialImpact: "Maintain strong performance",
    });
  }

  return recommendations.slice(0, 3); // Return top 3
};
