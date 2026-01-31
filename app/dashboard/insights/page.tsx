export default function InsightsPage() {
  const insights = [
    {
      id: 1,
      type: "warning",
      category: "prediction",
      title: "Budget Alert",
      message: "At current rate, you'll exceed your food budget in 4 days",
      impact: "high",
      action: "Consider reducing dining out expenses",
      date: "2026-01-28",
    },
    {
      id: 2,
      type: "info",
      category: "subscription",
      title: "Subscriptions Detected",
      message: "3 subscriptions found totaling ₦2,050/month",
      impact: "medium",
      action: "Review and cancel unused subscriptions",
      date: "2026-01-27",
    },
    {
      id: 3,
      type: "success",
      category: "spending",
      title: "Great Progress!",
      message: "You're 15% under budget this month",
      impact: "positive",
      action: "Keep up the great work",
      date: "2026-01-26",
    },
    {
      id: 4,
      type: "info",
      category: "prediction",
      title: "Recurring Pattern Detected",
      message: "You spend an average of ₦12,000 on food every week",
      impact: "medium",
      action: "Consider meal prepping to save ₦4,000/week",
      date: "2026-01-25",
    },
    {
      id: 5,
      type: "warning",
      category: "spending",
      title: "High Transport Costs",
      message: "Transport spending is 40% higher than similar users",
      impact: "medium",
      action: "Explore carpooling or public transport options",
      date: "2026-01-24",
    },
  ];

  const predictions = [
    {
      category: "Food",
      currentSpent: 12450,
      predicted: 18500,
      budget: 20000,
      trend: "up",
      confidence: 85,
    },
    {
      category: "Transport",
      currentSpent: 3500,
      predicted: 5200,
      budget: 8000,
      trend: "stable",
      confidence: 78,
    },
    {
      category: "Bills",
      currentSpent: 16500,
      predicted: 27000,
      budget: 30000,
      trend: "stable",
      confidence: 95,
    },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      warning: { bg: "bg-warning/5", border: "border-warning/20", icon: "text-warning" },
      info: { bg: "bg-info/5", border: "border-info/20", icon: "text-info" },
      success: { bg: "bg-success/5", border: "border-success/20", icon: "text-success" },
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Financial Insights</h1>
        <p className="text-sm text-text-secondary mt-1">AI-powered predictions and recommendations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-bg-card border border-white/5 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Active Insights</span>
            <svg className="h-5 w-5 text-green-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">{insights.length}</div>
          <p className="text-xs text-text-muted mt-1">Unread notifications</p>
        </div>

        <div className="rounded-xl bg-bg-card border border-white/5 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Potential Savings</span>
            <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">₦16,000</div>
          <p className="text-xs text-success mt-1">Per month</p>
        </div>

        <div className="rounded-xl bg-bg-card border border-white/5 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Prediction Accuracy</span>
            <svg className="h-5 w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">86%</div>
          <p className="text-xs text-text-muted mt-1">Average confidence</p>
        </div>

        <div className="rounded-xl bg-bg-card border border-white/5 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Budget Health</span>
            <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-text-primary">Good</div>
          <p className="text-xs text-success mt-1">On track</p>
        </div>
      </div>

      {/* Spending Predictions */}
      <div className="rounded-xl bg-bg-card border border-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Spending Predictions</h2>
            <p className="text-sm text-text-secondary mt-1">Forecasted spending for end of month</p>
          </div>
          <span className="rounded-full bg-green-primary/10 px-3 py-1.5 text-xs font-semibold text-green-primary">
            AI Powered
          </span>
        </div>

        <div className="space-y-6">
          {predictions.map((pred, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary">{pred.category}</h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {pred.confidence}% confidence • {pred.trend === "up" ? "📈" : "📊"} {pred.trend}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-text-primary">₦{pred.predicted.toLocaleString()}</p>
                  <p className="text-xs text-text-secondary">of ₦{pred.budget.toLocaleString()}</p>
                </div>
              </div>

              <div className="relative">
                <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
                  <div 
                    className="h-full rounded-full bg-text-muted" 
                    style={{ width: `${(pred.currentSpent / pred.budget) * 100}%` }}
                  ></div>
                </div>
                <div 
                  className="absolute top-0 h-2 w-0.5 bg-green-primary" 
                  style={{ left: `${(pred.predicted / pred.budget) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-green-primary">
                    Predicted
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Current: ₦{pred.currentSpent.toLocaleString()}</span>
                <span className={pred.predicted > pred.budget ? "text-error" : "text-success"}>
                  {pred.predicted > pred.budget ? "⚠️ May exceed" : "✓ Within budget"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Feed */}
      <div className="rounded-xl bg-bg-card border border-white/5 p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">All Insights</h2>

        <div className="space-y-4">
          {insights.map((insight) => {
            const colors = getTypeColor(insight.type);
            return (
              <div key={insight.id} className={`flex gap-4 rounded-lg border ${colors.border} ${colors.bg} p-4`}>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${colors.bg}`}>
                  {insight.type === "warning" && (
                    <svg className={`h-6 w-6 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                  {insight.type === "info" && (
                    <svg className={`h-6 w-6 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {insight.type === "success" && (
                    <svg className={`h-6 w-6 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-text-primary">{insight.title}</h3>
                      <p className="text-xs text-text-muted mt-0.5">
                        {new Date(insight.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} • {insight.category}
                      </p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      insight.impact === "high" ? "bg-error/10 text-error" :
                      insight.impact === "medium" ? "bg-warning/10 text-warning" :
                      "bg-success/10 text-success"
                    }`}>
                      {insight.impact}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary mb-3">{insight.message}</p>

                  <div className="flex items-center gap-3">
                    <button className="rounded-lg bg-bg-elevated px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-bg-elevated/80">
                      {insight.action}
                    </button>
                    <button className="text-xs font-medium text-text-muted hover:text-text-secondary">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="rounded-xl bg-gradient-to-br from-green-dark to-green-secondary p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Personalized Tip</h3>
            <p className="text-sm opacity-90 mb-4">
              Based on your spending patterns, you could save ₦16,000/month by:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-light">✓</span>
                <span>Cooking at home 3 more times per week (saves ₦12,000)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-light">✓</span>
                <span>Canceling unused Netflix subscription (saves ₦3,000)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-light">✓</span>
                <span>Using public transport twice a week (saves ₦1,000)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
