import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      id: "ai-health",
      icon: null,
      title: "AI Portfolio Health Score",
      description:
        "Get instant AI analysis with personalized recommendations to optimize your portfolio",
      isAI: true,
    },
    {
      id: "tokens",
      icon: "💎",
      title: "STX & Tokens",
      description:
        "See all your holdings including sBTC, ALEX, and custom tokens",
    },
    {
      id: "pools",
      icon: "🌊",
      title: "Liquidity Pools",
      description: "Monitor your positions on Velar and Alex DEX",
    },
    {
      id: "stacking",
      icon: "🔒",
      title: "Stacking Rewards",
      description: "Track your locked STX and BTC rewards",
    },
    {
      id: "value",
      icon: "💰",
      title: "Total Value",
      description: "Real-time USD value across all positions",
    },
    {
      id: "insights",
      icon: "🤖",
      title: "Smart Insights",
      description: "AI-powered recommendations to optimize your portfolio",
    },
    {
      id: "analytics",
      icon: "📊",
      title: "Visual Analytics",
      description: "Charts and breakdowns that make sense",
    },
  ];

  return (
    <div className="mb-12 md:mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-px w-12 bg-linear-to-r from-transparent to-white/30"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Powered by AI
        </h2>
        <div className="h-px w-12 bg-linear-to-l from-transparent to-white/30"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
