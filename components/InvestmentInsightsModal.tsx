"use client";

import { useState } from "react";

interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  targetPrice: number;
  potentialReturn: number;
  riskLevel: "low" | "medium" | "high";
  sector: string;
  recommendation: "strong-buy" | "buy" | "hold";
  reasons: string[];
  technicals: {
    pe_ratio: number;
    dividend_yield: number;
    market_cap: string;
    volume: string;
  };
  aiConfidence: number;
}

interface InvestmentInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvestmentInsightsModal({ isOpen, onClose }: InvestmentInsightsModalProps) {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const stocks: Stock[] = [
    {
      symbol: "DANGCEM",
      name: "Dangote Cement",
      currentPrice: 285.50,
      targetPrice: 340.00,
      potentialReturn: 19.1,
      riskLevel: "low",
      sector: "Materials",
      recommendation: "strong-buy",
      reasons: [
        "Strong infrastructure demand across West Africa",
        "Consistent dividend payments with 5.2% yield",
        "Market leader with 60% market share in Nigeria",
        "Expansion into new African markets showing growth",
        "Undervalued compared to regional cement producers"
      ],
      technicals: {
        pe_ratio: 8.5,
        dividend_yield: 5.2,
        market_cap: "₦4.8T",
        volume: "2.3M"
      },
      aiConfidence: 87
    },
    {
      symbol: "MTNN",
      name: "MTN Nigeria",
      currentPrice: 195.00,
      targetPrice: 245.00,
      potentialReturn: 25.6,
      riskLevel: "medium",
      sector: "Telecommunications",
      recommendation: "buy",
      reasons: [
        "5G rollout creating new revenue streams",
        "Mobile money services growing 45% YoY",
        "Largest subscriber base in Nigeria (77M users)",
        "Digital services expansion beyond voice/data",
        "Strong cash flow generation for dividends"
      ],
      technicals: {
        pe_ratio: 12.3,
        dividend_yield: 4.8,
        market_cap: "₦3.9T",
        volume: "1.8M"
      },
      aiConfidence: 82
    },
    {
      symbol: "BUACEMENT",
      name: "BUA Cement",
      currentPrice: 92.50,
      targetPrice: 115.00,
      potentialReturn: 24.3,
      riskLevel: "medium",
      sector: "Materials",
      recommendation: "buy",
      reasons: [
        "Aggressive capacity expansion underway",
        "Lower production costs than competitors",
        "Growing market share in Northern Nigeria",
        "Strong backing from BUA Group conglomerate",
        "Benefiting from infrastructure development boom"
      ],
      technicals: {
        pe_ratio: 9.2,
        dividend_yield: 3.5,
        market_cap: "₦1.5T",
        volume: "890K"
      },
      aiConfidence: 79
    },
    {
      symbol: "AIRTELAFRI",
      name: "Airtel Africa",
      currentPrice: 1850.00,
      targetPrice: 2200.00,
      potentialReturn: 18.9,
      riskLevel: "low",
      sector: "Telecommunications",
      recommendation: "strong-buy",
      reasons: [
        "Mobile money platform growing exponentially",
        "Operating in 14 high-growth African markets",
        "Data revenue up 32% year-over-year",
        "Strong balance sheet with reduced debt",
        "Potential for listing mobile money unit separately"
      ],
      technicals: {
        pe_ratio: 15.8,
        dividend_yield: 2.1,
        market_cap: "$7.2B",
        volume: "450K"
      },
      aiConfidence: 85
    },
    {
      symbol: "GTCO",
      name: "Guaranty Trust Holding",
      currentPrice: 38.50,
      targetPrice: 48.00,
      potentialReturn: 24.7,
      riskLevel: "medium",
      sector: "Financial Services",
      recommendation: "buy",
      reasons: [
        "Digital banking transformation ahead of peers",
        "Strong asset quality with low NPL ratio",
        "Expansion into fintech and payment services",
        "Consistent profitability and dividend track record",
        "Well-positioned for cashless economy growth"
      ],
      technicals: {
        pe_ratio: 6.8,
        dividend_yield: 6.5,
        market_cap: "₦1.1T",
        volume: "3.2M"
      },
      aiConfidence: 81
    }
  ];

  if (!isOpen) return null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-error";
      default: return "text-text-muted";
    }
  };

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case "strong-buy": return { bg: "bg-success/10", text: "text-success", label: "Strong Buy" };
      case "buy": return { bg: "bg-green-primary/10", text: "text-green-primary", label: "Buy" };
      case "hold": return { bg: "bg-warning/10", text: "text-warning", label: "Hold" };
      default: return { bg: "bg-bg-elevated", text: "text-text-muted", label: "N/A" };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-bg-secondary border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-bg-secondary/95 backdrop-blur-xl p-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Investment Insights</h2>
            <p className="text-sm text-text-secondary mt-1">AI-powered stock recommendations for your portfolio</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-88px)]">
          <div className="p-6">
            {/* AI Summary Banner */}
            <div className="mb-6 rounded-xl bg-gradient-to-br from-green-dark to-green-secondary p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Portfolio Recommendation</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Based on your savings of ₦60,000 and risk profile, we recommend diversifying across these 5 stocks. 
                    Start with ₦12,000 per stock for balanced exposure.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="opacity-80">Expected Return:</span>
                      <span className="font-semibold">22.5%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="opacity-80">Time Horizon:</span>
                      <span className="font-semibold">6-12 months</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="opacity-80">Risk Level:</span>
                      <span className="font-semibold">Low-Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Grid */}
            <div className="grid gap-4 lg:grid-cols-2">
              {stocks.map((stock) => {
                const recBadge = getRecommendationBadge(stock.recommendation);
                return (
                  <div
                    key={stock.symbol}
                    className="rounded-xl bg-bg-card border border-white/5 p-5 transition-all hover:border-green-primary/30 hover:shadow-lg cursor-pointer"
                    onClick={() => setSelectedStock(stock)}
                  >
                    {/* Stock Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-text-primary">{stock.symbol}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${recBadge.bg} ${recBadge.text}`}>
                            {recBadge.label}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">{stock.name}</p>
                        <p className="text-xs text-text-muted mt-0.5">{stock.sector}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-text-primary">₦{stock.currentPrice.toFixed(2)}</p>
                        <p className="text-xs text-text-muted">Current Price</p>
                      </div>
                    </div>

                    {/* Potential Return */}
                    <div className="mb-4 rounded-lg bg-success/10 border border-success/20 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Potential Return</span>
                        <span className="text-lg font-bold text-success">+{stock.potentialReturn}%</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-text-muted">Target: ₦{stock.targetPrice.toFixed(2)}</span>
                        <span className="text-text-muted">AI Confidence: {stock.aiConfidence}%</span>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-text-muted mb-1">P/E</p>
                        <p className="text-sm font-semibold text-text-primary">{stock.technicals.pe_ratio}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-muted mb-1">Yield</p>
                        <p className="text-sm font-semibold text-text-primary">{stock.technicals.dividend_yield}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-muted mb-1">Risk</p>
                        <p className={`text-sm font-semibold capitalize ${getRiskColor(stock.riskLevel)}`}>
                          {stock.riskLevel}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-muted mb-1">Volume</p>
                        <p className="text-sm font-semibold text-text-primary">{stock.technicals.volume}</p>
                      </div>
                    </div>

                    {/* Top Reasons Preview */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-text-secondary">Why Buy:</p>
                      <ul className="space-y-1">
                        {stock.reasons.slice(0, 2).map((reason, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                            <span className="text-green-primary mt-0.5">✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStock(stock);
                        }}
                        className="text-xs font-medium text-green-primary hover:text-green-light"
                      >
                        View full analysis →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-lg bg-warning/5 border border-warning/20 p-4">
              <div className="flex gap-3">
                <svg className="h-5 w-5 text-warning shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">Investment Disclaimer</p>
                  <p className="text-xs text-text-secondary">
                    These recommendations are AI-generated based on market data and should not be considered financial advice. 
                    Past performance does not guarantee future results. Please consult with a licensed financial advisor before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stock Modal */}
        {selectedStock && (
          <div className="absolute inset-0 z-20 bg-bg-secondary">
            <div className="flex h-full flex-col">
              {/* Detail Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-bold text-text-primary">{selectedStock.symbol}</h3>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getRecommendationBadge(selectedStock.recommendation).bg} ${getRecommendationBadge(selectedStock.recommendation).text}`}>
                      {getRecommendationBadge(selectedStock.recommendation).label}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{selectedStock.name} • {selectedStock.sector}</p>
                </div>
                <button
                  onClick={() => setSelectedStock(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Detail Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Price & Return */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl bg-bg-elevated p-4">
                      <p className="text-sm text-text-secondary mb-2">Current Price</p>
                      <p className="text-3xl font-bold text-text-primary">₦{selectedStock.currentPrice.toFixed(2)}</p>
                    </div>
                    <div className="rounded-xl bg-bg-elevated p-4">
                      <p className="text-sm text-text-secondary mb-2">Target Price</p>
                      <p className="text-3xl font-bold text-green-primary">₦{selectedStock.targetPrice.toFixed(2)}</p>
                    </div>
                    <div className="rounded-xl bg-success/10 border border-success/20 p-4">
                      <p className="text-sm text-text-secondary mb-2">Potential Return</p>
                      <p className="text-3xl font-bold text-success">+{selectedStock.potentialReturn}%</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-4">Key Metrics</h4>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="rounded-lg bg-bg-elevated p-4">
                        <p className="text-xs text-text-muted mb-1">P/E Ratio</p>
                        <p className="text-xl font-bold text-text-primary">{selectedStock.technicals.pe_ratio}</p>
                      </div>
                      <div className="rounded-lg bg-bg-elevated p-4">
                        <p className="text-xs text-text-muted mb-1">Dividend Yield</p>
                        <p className="text-xl font-bold text-text-primary">{selectedStock.technicals.dividend_yield}%</p>
                      </div>
                      <div className="rounded-lg bg-bg-elevated p-4">
                        <p className="text-xs text-text-muted mb-1">Market Cap</p>
                        <p className="text-xl font-bold text-text-primary">{selectedStock.technicals.market_cap}</p>
                      </div>
                      <div className="rounded-lg bg-bg-elevated p-4">
                        <p className="text-xs text-text-muted mb-1">Risk Level</p>
                        <p className={`text-xl font-bold capitalize ${getRiskColor(selectedStock.riskLevel)}`}>
                          {selectedStock.riskLevel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Investment Thesis */}
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-4">Why You Should Invest</h4>
                    <div className="space-y-3">
                      {selectedStock.reasons.map((reason, i) => (
                        <div key={i} className="flex gap-3 rounded-lg bg-bg-elevated p-4">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-primary/10 text-sm font-bold text-green-primary">
                            {i + 1}
                          </div>
                          <p className="text-sm text-text-secondary">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Confidence */}
                  <div className="rounded-xl bg-info/5 border border-info/20 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-text-primary">AI Confidence Score</h4>
                      <span className="text-2xl font-bold text-info">{selectedStock.aiConfidence}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
                      <div 
                        className="h-full rounded-full bg-info" 
                        style={{ width: `${selectedStock.aiConfidence}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-text-muted mt-2">
                      Based on technical analysis, market trends, and fundamental data
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 rounded-lg bg-green-primary px-6 py-3 font-semibold text-bg-primary transition-colors hover:bg-green-light">
                      Add to Watchlist
                    </button>
                    <button className="flex-1 rounded-lg bg-bg-elevated px-6 py-3 font-semibold text-text-primary transition-colors hover:bg-bg-elevated/80">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
