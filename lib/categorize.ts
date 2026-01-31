const CATEGORY_RULES: Record<string, string[]> = {
  food: [
    'uber eats', 'jumia food', 'restaurant', 'kfc', 'dominos', 'chicken republic',
    'shoprite', 'spar', 'food', 'lunch', 'dinner', 'breakfast', 'groceries',
  ],
  transport: [
    'uber', 'bolt', 'taxi', 'fuel', 'petrol', 'ride', 'transport', 'bus',
  ],
  bills: [
    'dstv', 'gotv', 'electricity', 'water', 'internet', 'ikedc', 'ekedc',
    'ikeja electric', 'eko electric', 'phcn', 'bill',
  ],
  subscriptions: [
    'netflix', 'spotify', 'apple', 'youtube premium', 'amazon prime',
    'subscription', 'monthly plan', 'premium',
  ],
  shopping: [
    'jumia', 'konga', 'amazon', 'shoprite', 'mall', 'store', 'shop',
  ],
  entertainment: [
    'cinema', 'movie', 'filmhouse', 'silverbird', 'game', 'club', 'bar',
  ],
  health: [
    'hospital', 'pharmacy', 'doctor', 'clinic', 'medical', 'health',
  ],
};

export function categorizeTransaction(description: string): string {
  const lower = description.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_RULES)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      return category;
    }
  }
  
  return 'other';
}

export function detectSubscriptions(transactions: Array<{
  merchant?: string | null;
  amount: number;
  date: Date;
}>) {
  const merchantCounts = new Map<string, number>();
  
  transactions.forEach(txn => {
    if (txn.merchant && txn.amount < 0) {
      const count = merchantCounts.get(txn.merchant) || 0;
      merchantCounts.set(txn.merchant, count + 1);
    }
  });
  
  const subscriptions = Array.from(merchantCounts.entries())
    .filter(([_, count]) => count >= 2)
    .map(([merchant]) => {
      const txns = transactions.filter(t => t.merchant === merchant);
      const avgAmount = Math.abs(
        txns.reduce((sum, t) => sum + t.amount, 0) / txns.length
      );
      return { merchant, amount: avgAmount };
    });
  
  return subscriptions;
}
