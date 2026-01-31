import { differenceInDays } from 'date-fns';
import { detectSubscriptions } from './categorize';

interface Budget {
  totalIncome: number;
  discretionary: number;
  discretionarySpent: number;
  essentials: number;
  essentialsSpent: number;
  startDate: Date;
  endDate: Date;
}

interface Transaction {
  amount: number;
  category: string;
  merchant?: string | null;
  date: Date;
}

interface Insight {
  type: 'warning' | 'info' | 'success';
  category: 'spending' | 'subscription' | 'prediction';
  title: string;
  message: string;
}

export function generateInsights(
  budget: Budget,
  transactions: Transaction[]
): Insight[] {
  const insights: Insight[] = [];
  
  const daysInPeriod = differenceInDays(budget.endDate, budget.startDate);
  const daysElapsed = differenceInDays(new Date(), budget.startDate);
  const daysRemaining = differenceInDays(budget.endDate, new Date());
  
  const expectedSpent = (budget.discretionary * daysElapsed) / daysInPeriod;
  
  if (budget.discretionarySpent > expectedSpent * 1.2 && daysRemaining > 0) {
    insights.push({
      type: 'warning',
      category: 'prediction',
      title: 'Budget Alert',
      message: `At current rate, you'll exceed discretionary budget in ${daysRemaining} days`,
    });
  }
  
  if (budget.discretionarySpent < expectedSpent * 0.85) {
    const saved = Math.abs(budget.discretionarySpent - expectedSpent);
    insights.push({
      type: 'success',
      category: 'spending',
      title: 'Great Progress!',
      message: `You're ₦${(saved / 100).toFixed(0)} under budget this period`,
    });
  }
  
  const subscriptions = detectSubscriptions(transactions);
  if (subscriptions.length > 0) {
    const total = subscriptions.reduce((sum, s) => sum + s.amount, 0);
    insights.push({
      type: 'info',
      category: 'subscription',
      title: 'Subscriptions Detected',
      message: `${subscriptions.length} subscriptions totaling ₦${(total / 100).toFixed(0)}/month`,
    });
  }
  
  const foodTransactions = transactions.filter(t => t.category === 'food' && t.amount < 0);
  const foodSpent = Math.abs(foodTransactions.reduce((sum, t) => sum + t.amount, 0));
  const avgFoodPerDay = foodSpent / daysElapsed;
  const projectedFoodSpend = avgFoodPerDay * daysInPeriod;
  
  const foodBudget = budget.discretionary * 0.4;
  if (projectedFoodSpend > foodBudget) {
    insights.push({
      type: 'warning',
      category: 'spending',
      title: 'Food Spending High',
      message: `You're spending ₦${(avgFoodPerDay / 100).toFixed(0)}/day on food. Consider cooking at home to save.`,
    });
  }
  
  return insights;
}

export function predictBudgetExhaustion(
  budget: Budget,
  category: 'discretionary' | 'essentials'
): { daysRemaining: number; willExceed: boolean } {
  const spent = category === 'discretionary' ? budget.discretionarySpent : budget.essentialsSpent;
  const allocated = category === 'discretionary' ? budget.discretionary : budget.essentials;
  
  const daysElapsed = differenceInDays(new Date(), budget.startDate);
  const dailySpendRate = spent / daysElapsed;
  
  const remaining = allocated - spent;
  const daysUntilExhaustion = remaining / dailySpendRate;
  
  const daysRemaining = differenceInDays(budget.endDate, new Date());
  
  return {
    daysRemaining: Math.floor(daysUntilExhaustion),
    willExceed: daysUntilExhaustion < daysRemaining,
  };
}
