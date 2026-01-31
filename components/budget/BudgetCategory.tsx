import { ReactNode } from "react";

interface BudgetCategoryProps {
  title: string;
  description: string;
  amount: number;
  totalIncome: number;
  spent?: number;
  remaining?: number;
  icon: ReactNode;
  color: "green" | "orange" | "success";
  onAmountChange: (value: number) => void;
}

export default function BudgetCategory({
  title,
  description,
  amount,
  totalIncome,
  spent,
  remaining,
  icon,
  color,
  onAmountChange,
}: BudgetCategoryProps) {
  const colorStyles = {
    green: {
      bg: "bg-green-primary/10",
      slider: "[&::-webkit-slider-thumb]:bg-green-primary",
      progress: "bg-green-primary",
    },
    orange: {
      bg: "bg-orange/10",
      slider: "[&::-webkit-slider-thumb]:bg-orange",
      progress: "bg-orange",
    },
    success: {
      bg: "bg-success/10",
      slider: "[&::-webkit-slider-thumb]:bg-success",
      progress: "bg-success",
    },
  };

  const styles = colorStyles[color];
  const percentage = Math.round((amount / totalIncome) * 100);
  const spentPercentage = spent ? (spent / amount) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${styles.bg}`}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{title}</h3>
            <p className="text-xs text-text-muted">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-text-primary">
            ₦{amount.toLocaleString()}
          </p>
          <p className="text-xs text-text-secondary">{percentage}% of income</p>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max={totalIncome}
        step="10000"
        value={amount}
        onChange={(e) => onAmountChange(Number(e.target.value))}
        className={`w-full h-2 rounded-full bg-bg-elevated appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full ${styles.slider}`}
      />
      {spent !== undefined && remaining !== undefined && (
        <>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              Spent: ₦{spent.toLocaleString()}
            </span>
            <span className="text-text-secondary">
              Remaining: ₦{remaining.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg-elevated">
            <div
              className={`h-full rounded-full ${styles.progress}`}
              style={{ width: `${spentPercentage}%` }}
            ></div>
          </div>
        </>
      )}
      {spent === undefined && (
        <>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              Target: ₦{amount.toLocaleString()}
            </span>
            <span className="text-success">On track ✓</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg-elevated">
            <div
              className={`h-full rounded-full ${styles.progress}`}
              style={{ width: "100%" }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}
