import {
  calculateHealthScore,
  generateRecommendations,
} from "../utils/healthScore";

function HealthScore({ portfolioData }) {
  if (!portfolioData) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const health = calculateHealthScore(portfolioData);
  const recommendations = generateRecommendations(portfolioData, health);

  // Score circle percentage
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (health.score / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Health Score Card - ENHANCED WITH AI BADGE */}
      <div className="relative bg-linear-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-8 shadow-2xl text-white overflow-hidden">
        {/* AI Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>

        {/* AI Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-pink-400 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative bg-linear-to-r from-yellow-400 to-pink-400 text-purple-900 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                AI Analysis
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">AI Portfolio Health</h3>
              <p className="text-white/70 text-sm">
                Real-time intelligent analysis
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Score Circle */}
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress circle with gradient */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out drop-shadow-lg"
                />
              </svg>
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold drop-shadow-lg">
                  {health.score}
                </div>
                <div className="text-sm opacity-80 font-medium">/ 100</div>
              </div>
            </div>

            {/* Rating Info */}
            <div className="flex-1 ml-8">
              <div className="text-4xl mb-2">{health.rating.emoji}</div>
              <div className="text-3xl font-bold mb-2">
                {health.rating.text}
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                {health.score >= 75
                  ? "Your portfolio is well-balanced and optimized."
                  : health.score >= 50
                  ? "Good foundation, room for improvement."
                  : "Consider implementing recommendations below."}
              </p>
            </div>
          </div>
        </div>

        {/* Strengths & Issues Summary */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
          <div>
            <div className="text-sm opacity-75 mb-1">Strengths</div>
            <div className="text-2xl font-bold">{health.strengths.length}</div>
          </div>
          <div>
            <div className="text-sm opacity-75 mb-1">Areas to Improve</div>
            <div className="text-2xl font-bold">{health.issues.length}</div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-2xl">💡</div>
          <h3 className="text-2xl font-bold text-gray-800">
            AI Recommendations
          </h3>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border-2 ${
                rec.priority === "high"
                  ? "border-red-200 bg-red-50"
                  : rec.priority === "medium"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-800">{rec.title}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    rec.priority === "high"
                      ? "bg-red-200 text-red-800"
                      : rec.priority === "medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {rec.priority}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Action:</span>{" "}
                  <span className="text-gray-600">{rec.action}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Impact:</span>{" "}
                  <span className="text-green-600">{rec.potentialImpact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">✨</div>
            <p>Your portfolio is well-optimized!</p>
            <p className="text-sm mt-2">Keep up the great work.</p>
          </div>
        )}
      </div>

      {/* Detailed Analysis */}
      {(health.strengths.length > 0 || health.issues.length > 0) && (
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Detailed Analysis
          </h3>

          {health.strengths.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                <span>✓</span> Strengths
              </h4>
              <div className="space-y-2">
                {health.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-green-500 mt-0.5">●</span>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {strength.title}
                      </div>
                      <div className="text-gray-600">
                        {strength.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {health.issues.length > 0 && (
            <div>
              <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                <span>!</span> Areas for Improvement
              </h4>
              <div className="space-y-2">
                {health.issues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 ${
                        issue.severity === "high"
                          ? "text-red-500"
                          : issue.severity === "medium"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    >
                      ●
                    </span>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {issue.title}
                      </div>
                      <div className="text-gray-600">{issue.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HealthScore;
