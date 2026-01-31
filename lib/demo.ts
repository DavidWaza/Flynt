export const isDemoMode = () => {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
};

export const DEMO_USER = {
  id: 'demo-user-001',
  name: 'Sarah Okafor',
  phone: '+234 801 234 5678',
  email: 'sarah.okafor@example.com',
  monthlyIncome: 30000000,
  country: 'Nigeria',
  savingsPriority: 'medium' as const,
  riskTolerance: 'medium' as const,
};

export const DEMO_TRANSACTIONS = [
  {
    amount: -500000,
    category: 'Food',
    merchant: 'Uber Eats',
    description: 'Food delivery',
    date: new Date('2026-01-28'),
    type: 'debit' as const,
  },
  {
    amount: -350000,
    category: 'Food',
    merchant: 'Jumia Food',
    description: 'Lunch order',
    date: new Date('2026-01-27'),
    type: 'debit' as const,
  },
  {
    amount: -200000,
    category: 'Transport',
    merchant: 'Uber',
    description: 'Ride to VI',
    date: new Date('2026-01-26'),
    type: 'debit' as const,
  },
  {
    amount: -150000,
    category: 'Transport',
    merchant: 'Bolt',
    description: 'Ride home',
    date: new Date('2026-01-25'),
    type: 'debit' as const,
  },
  {
    amount: -1500000,
    category: 'Bills',
    merchant: 'DSTV',
    description: 'Monthly subscription',
    date: new Date('2026-01-23'),
    type: 'debit' as const,
    isRecurring: true,
  },
  {
    amount: -300000,
    category: 'Subscriptions',
    merchant: 'Netflix',
    description: 'Premium plan',
    date: new Date('2026-01-22'),
    type: 'debit' as const,
    isRecurring: true,
  },
  {
    amount: -250000,
    category: 'Subscriptions',
    merchant: 'Spotify',
    description: 'Family plan',
    date: new Date('2026-01-21'),
    type: 'debit' as const,
    isRecurring: true,
  },
  {
    amount: -800000,
    category: 'Shopping',
    merchant: 'Jumia',
    description: 'Electronics purchase',
    date: new Date('2026-01-20'),
    type: 'debit' as const,
  },
  {
    amount: -450000,
    category: 'Food',
    merchant: 'KFC',
    description: 'Family meal',
    date: new Date('2026-01-19'),
    type: 'debit' as const,
  },
  {
    amount: -300000,
    category: 'Transport',
    merchant: 'Uber',
    description: 'Airport ride',
    date: new Date('2026-01-18'),
    type: 'debit' as const,
  },
  {
    amount: -1200000,
    category: 'Bills',
    merchant: 'IKEDC',
    description: 'Electricity bill',
    date: new Date('2026-01-17'),
    type: 'debit' as const,
  },
  {
    amount: -600000,
    category: 'Food',
    merchant: 'Shoprite',
    description: 'Groceries',
    date: new Date('2026-01-16'),
    type: 'debit' as const,
  },
  {
    amount: -350000,
    category: 'Entertainment',
    merchant: 'Filmhouse',
    description: 'Movie tickets',
    date: new Date('2026-01-15'),
    type: 'debit' as const,
  },
  {
    amount: 30000000,
    category: 'Income',
    merchant: 'Salary',
    description: 'Monthly salary',
    date: new Date('2026-01-01'),
    type: 'credit' as const,
  },
];

export const DEMO_BUDGET = {
  period: 'monthly',
  totalIncome: 30000000,
  essentials: 15000000,
  discretionary: 9000000,
  savings: 6000000,
  essentialsSpent: 5150000,
  discretionarySpent: 3300000,
  startDate: new Date('2026-01-01'),
  endDate: new Date('2026-01-31'),
};

export const DEMO_CARD = {
  cardType: 'primary',
  category: 'discretionary',
  lastFour: '4242',
  allocatedAmount: 9000000,
  spentAmount: 3300000,
  status: 'active' as const,
};

export const DEMO_INSIGHTS = [
  {
    type: 'warning' as const,
    category: 'prediction',
    title: 'Budget Alert',
    message: 'At current rate, you\'ll exceed your food budget in 4 days',
    isRead: false,
  },
  {
    type: 'info' as const,
    category: 'subscription',
    title: 'Subscriptions Detected',
    message: '3 subscriptions found totaling ₦2,050/month',
    isRead: false,
  },
  {
    type: 'success' as const,
    category: 'spending',
    title: 'Great Progress!',
    message: 'You\'re 15% under budget this month',
    isRead: false,
  },
];
