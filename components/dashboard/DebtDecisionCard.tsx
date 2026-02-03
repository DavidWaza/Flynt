"use client";

import { Card, Button } from "@/components/ui";
import { Debt } from "@/contexts/DebtContext";

interface DebtDecisionCardProps {
  debt: Debt;
  onPay: (id: string) => void;
}

export default function DebtDecisionCard({
  debt,
  onPay,
}: DebtDecisionCardProps) {
  const getBadgeStyles = (recommendation: string) => {
    switch (recommendation) {
      case "Pay now":
        return "bg-green-primary/10 text-green-primary border-green-primary/20";
      case "Escalate priority":
        return "bg-error/10 text-error border-error/20";
      case "Delay strategically":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Partial payment":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-bg-elevated text-text-secondary border-border-primary";
    }
  };

  return (
    <Card className="relative overflow-hidden p-6 border-l-4 border-l-green-primary shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-xs font-black text-text-secondary uppercase tracking-widest mb-1">
            Debt Note
          </h4>
          <h3 className="text-xl font-black text-text-primary tracking-tight">
            {debt.name}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-text-primary">
            ₦{debt.amount.toLocaleString()}
          </p>
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-tighter italic">
            Due: {new Date(debt.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-bg-elevated border border-border-primary">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${getBadgeStyles(debt.recommendation)}`}
          >
            {debt.recommendation}
          </div>
          <span className="text-[10px] font-bold text-text-secondary">
            AI REASONING
          </span>
        </div>
        <p className="text-sm font-medium text-text-primary leading-relaxed italic opacity-90">
          &quot;{debt.rationale}&quot;
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => onPay(debt.id)}
          className="flex-1 py-3 text-xs font-black uppercase tracking-wider shadow-md shadow-green-primary/10"
        >
          {debt.recommendation === "Partial payment"
            ? "Pay Half Now"
            : "Pay Now"}
        </Button>
        <Button
          variant="secondary"
          className="px-4 py-3 text-xs font-black uppercase tracking-wider bg-transparent border-border-primary text-text-secondary"
        >
          Review
        </Button>
      </div>
    </Card>
  );
}
