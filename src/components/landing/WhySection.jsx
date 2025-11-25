const WhySection = () => {
  const benefits = [
    {
      title: "Completely Free",
      description: "No hidden fees, no premium tiers",
    },
    {
      title: "Non-Custodial",
      description: "Your keys, your crypto, always",
    },
    {
      title: "Open Source",
      description: "Built in public for the community",
    },
    {
      title: "Mobile First",
      description: "Works great on any device",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Why sTracker?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  {benefit.title}
                </h3>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhySection;
