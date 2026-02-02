// import { PrismaClient } from '@prisma/client';
// import { DEMO_USER, DEMO_TRANSACTIONS, DEMO_BUDGET, DEMO_CARD, DEMO_INSIGHTS } from '../lib/demo';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🌱 Seeding database...');

//   await prisma.user.deleteMany();

//   const user = await prisma.user.create({
//     data: {
//       phone: DEMO_USER.phone,
//       email: DEMO_USER.email,
//       name: DEMO_USER.name,
//       country: DEMO_USER.country,
//       monthlyIncome: DEMO_USER.monthlyIncome,
//       savingsPriority: DEMO_USER.savingsPriority,
//       riskTolerance: DEMO_USER.riskTolerance,
//     },
//   });

//   console.log('✅ Created demo user:', user.name);

//   const account = await prisma.bankAccount.create({
//     data: {
//       userId: user.id,
//       accountName: DEMO_USER.name,
//       accountNumber: '0123456789',
//       bankName: 'GTBank',
//       balance: 8500000,
//     },
//   });

//   console.log('✅ Created bank account');

//   for (const txn of DEMO_TRANSACTIONS) {
//     await prisma.transaction.create({
//       data: {
//         accountId: account.id,
//         amount: txn.amount,
//         type: txn.type,
//         category: txn.category,
//         merchant: txn.merchant,
//         description: txn.description,
//         date: txn.date,
//         isRecurring: txn.isRecurring || false,
//       },
//     });
//   }

//   console.log(`✅ Created ${DEMO_TRANSACTIONS.length} transactions`);

//   const budget = await prisma.budget.create({
//     data: {
//       userId: user.id,
//       period: DEMO_BUDGET.period,
//       totalIncome: DEMO_BUDGET.totalIncome,
//       essentials: DEMO_BUDGET.essentials,
//       discretionary: DEMO_BUDGET.discretionary,
//       savings: DEMO_BUDGET.savings,
//       essentialsSpent: DEMO_BUDGET.essentialsSpent,
//       discretionarySpent: DEMO_BUDGET.discretionarySpent,
//       startDate: DEMO_BUDGET.startDate,
//       endDate: DEMO_BUDGET.endDate,
//       isActive: true,
//     },
//   });

//   console.log('✅ Created budget');

//   const card = await prisma.virtualCard.create({
//     data: {
//       userId: user.id,
//       budgetId: budget.id,
//       cardType: DEMO_CARD.cardType,
//       category: DEMO_CARD.category,
//       lastFour: DEMO_CARD.lastFour,
//       allocatedAmount: DEMO_CARD.allocatedAmount,
//       spentAmount: DEMO_CARD.spentAmount,
//       status: DEMO_CARD.status,
//     },
//   });

//   console.log('✅ Created virtual card');

//   for (const insight of DEMO_INSIGHTS) {
//     await prisma.insight.create({
//       data: {
//         userId: user.id,
//         type: insight.type,
//         category: insight.category,
//         title: insight.title,
//         message: insight.message,
//         isRead: insight.isRead,
//       },
//     });
//   }

//   console.log(`✅ Created ${DEMO_INSIGHTS.length} insights`);

//   console.log('\n🎉 Database seeded successfully!');
//   console.log(`\n📧 Demo user: ${user.email}`);
//   console.log(`📱 Demo phone: ${user.phone}`);
// }

// main()
//   .catch((e) => {
//     console.error('❌ Error seeding database:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
