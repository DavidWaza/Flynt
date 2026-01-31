# Component Library Documentation

This document provides an overview of all reusable components in the Flynt application.

## Directory Structure

```
components/
├── ui/                    # Base UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── StatCard.tsx
│   ├── Input.tsx
│   └── index.ts
├── dashboard/             # Dashboard-specific components
│   ├── CategoryCard.tsx
│   ├── TransactionItem.tsx
│   ├── CreditScoreGauge.tsx
│   ├── VirtualCard.tsx
│   ├── InsightCard.tsx
│   └── index.ts
└── budget/                # Budget-specific components
    ├── BudgetCategory.tsx
    ├── BudgetAlert.tsx
    └── index.ts
```

---

## Base UI Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: "primary" | "secondary" | "ghost" | "outline" (default: "primary")
- `size`: "sm" | "md" | "lg" (default: "md")
- `fullWidth`: boolean (default: false)
- `children`: ReactNode
- All standard HTML button attributes

**Usage:**
```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md">
  Click Me
</Button>
```

---

### Card

A container component for grouping related content.

**Props:**
- `children`: ReactNode
- `className`: string (optional)
- `padding`: "none" | "sm" | "md" | "lg" (default: "md")
- `variant`: "default" | "elevated" | "bordered" (default: "default")

**Usage:**
```tsx
import { Card } from "@/components/ui";

<Card padding="md" variant="default">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

---

### StatCard

A specialized card for displaying statistics and metrics.

**Props:**
- `title`: string
- `value`: string | number
- `subtitle`: string (optional)
- `icon`: ReactNode (optional)
- `trend`: { value: string; isPositive?: boolean } (optional)
- `variant`: "default" | "success" | "warning" | "error" | "info" (default: "default")

**Usage:**
```tsx
import { StatCard } from "@/components/ui";

<StatCard
  title="Total Income"
  value={450000}
  trend={{ value: "+5.1% vs last month", isPositive: true }}
/>
```

---

### Input

An input field component with label, icon, and error state support.

**Props:**
- `label`: string (optional)
- `error`: string (optional)
- `icon`: ReactNode (optional)
- `iconPosition`: "left" | "right" (default: "left")
- All standard HTML input attributes

**Usage:**
```tsx
import { Input } from "@/components/ui";

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  icon={<SearchIcon />}
  error="Invalid email"
/>
```

---

## Dashboard Components

### CategoryCard

Displays spending category information with color coding and trends.

**Props:**
- `title`: string
- `amount`: number
- `percentage`: number
- `trend`: { value: string; isPositive: boolean }
- `icon`: ReactNode
- `color`: "blue" | "amber" | "purple" | "cyan" | "orange" | "sky"

**Usage:**
```tsx
import { CategoryCard } from "@/components/dashboard";

<CategoryCard
  title="Fixed Obligations"
  amount={98000}
  percentage={32}
  trend={{ value: "8.2%", isPositive: true }}
  icon={<HouseIcon />}
  color="blue"
/>
```

---

### TransactionItem

Displays a single transaction in a list.

**Props:**
- `merchant`: string
- `amount`: number
- `category`: string
- `date`: string
- `icon`: string (emoji)

**Usage:**
```tsx
import { TransactionItem } from "@/components/dashboard";

<TransactionItem
  merchant="Uber Eats"
  amount={-5000}
  category="Food"
  date="Jan 28"
  icon="🍔"
/>
```

---

### CreditScoreGauge

Displays a semi-circular gauge for financial health score.

**Props:**
- `score`: number
- `label`: string (optional, default: "Your Financial Health is Average")
- `lastCheck`: string (optional, default: "Last Check on 21 Apr")

**Usage:**
```tsx
import { CreditScoreGauge } from "@/components/dashboard";

<CreditScoreGauge score={660} />
```

---

### VirtualCard

Displays virtual card information with balance and spending progress.

**Props:**
- `cardName`: string (optional, default: "Flynt Card")
- `cardType`: string (optional, default: "Discretionary Spending")
- `balance`: number
- `totalAllocated`: number
- `spentPercentage`: number
- `cardNumber`: string (optional, default: "•••• •••• •••• 4242")
- `status`: "active" | "inactive" | "blocked" (default: "active")

**Usage:**
```tsx
import { VirtualCard } from "@/components/dashboard";

<VirtualCard
  balance={57000}
  totalAllocated={90000}
  spentPercentage={37}
/>
```

---

### InsightCard

Displays financial insights with different severity levels.

**Props:**
- `type`: "warning" | "info" | "success" | "error"
- `title`: string
- `description`: string
- `icon`: ReactNode (optional, uses default icon based on type)

**Usage:**
```tsx
import { InsightCard } from "@/components/dashboard";

<InsightCard
  type="warning"
  title="Budget Alert"
  description="At current rate, you'll exceed food budget in 4 days"
/>
```

---

## Budget Components

### BudgetCategory

A budget allocation component with slider and progress tracking.

**Props:**
- `title`: string
- `description`: string
- `amount`: number
- `totalIncome`: number
- `spent`: number (optional)
- `remaining`: number (optional)
- `icon`: ReactNode
- `color`: "green" | "orange" | "success"
- `onAmountChange`: (value: number) => void

**Usage:**
```tsx
import { BudgetCategory } from "@/components/budget";

<BudgetCategory
  title="Essentials"
  description="Rent, utilities, groceries"
  amount={150000}
  totalIncome={300000}
  spent={51500}
  remaining={98500}
  color="green"
  onAmountChange={setEssentials}
  icon={<HouseIcon />}
/>
```

---

### BudgetAlert

Displays budget warnings and errors.

**Props:**
- `type`: "warning" | "error"
- `message`: string

**Usage:**
```tsx
import { BudgetAlert } from "@/components/budget";

<BudgetAlert
  type="warning"
  message="You have ₦10,000 unallocated. Consider adding to savings."
/>
```

---

## Import Patterns

### Named Imports (Recommended)

```tsx
// UI Components
import { Button, Card, StatCard, Input } from "@/components/ui";

// Dashboard Components
import {
  CategoryCard,
  TransactionItem,
  CreditScoreGauge,
  VirtualCard,
  InsightCard,
} from "@/components/dashboard";

// Budget Components
import { BudgetCategory, BudgetAlert } from "@/components/budget";
```

### Individual Imports

```tsx
import Button from "@/components/ui/Button";
import CategoryCard from "@/components/dashboard/CategoryCard";
import BudgetCategory from "@/components/budget/BudgetCategory";
```

---

## Design System

### Colors

Components use the following color system defined in `globals.css`:

- **Primary**: `green-primary`, `green-secondary`, `green-light`, `green-dark`
- **Semantic**: `success`, `warning`, `error`, `info`
- **Accent**: `purple`, `blue`, `orange`
- **Text**: `text-primary`, `text-secondary`, `text-muted`
- **Background**: `bg-primary`, `bg-secondary`, `bg-card`, `bg-elevated`

### Spacing

- **Padding**: `p-4` (sm), `p-6` (md), `p-8` (lg)
- **Gap**: `gap-2`, `gap-3`, `gap-4`, `gap-6`
- **Margin**: `mb-1`, `mb-2`, `mb-3`, `mb-4`, `mb-6`

### Typography

- **Headings**: `text-xl`, `text-2xl`, `text-3xl`, `text-5xl`
- **Body**: `text-sm`, `text-base`
- **Small**: `text-xs`
- **Weight**: `font-medium`, `font-semibold`, `font-bold`

---

## Best Practices

1. **Use Semantic Components**: Choose the most appropriate component for your use case (e.g., `StatCard` for metrics, `Card` for general content).

2. **Consistent Styling**: Avoid inline styles when possible. Use Tailwind classes and component variants.

3. **Prop Types**: Always provide proper TypeScript types for component props.

4. **Accessibility**: Ensure all interactive components are keyboard accessible and have proper ARIA labels.

5. **Reusability**: Extract repeated patterns into new components when you see the same code 3+ times.

6. **Documentation**: Update this file when adding new components or modifying existing ones.

---

## Adding New Components

When creating a new component:

1. Create the component file in the appropriate directory (`ui/`, `dashboard/`, or `budget/`)
2. Export it from the directory's `index.ts` file
3. Add documentation to this file
4. Use TypeScript interfaces for props
5. Follow the existing naming conventions and patterns

---

## Testing Components

To test components in isolation:

```tsx
// Example: Testing Button component
import { Button } from "@/components/ui";

export default function TestPage() {
  return (
    <div className="p-8 space-y-4">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="outline">Outline Button</Button>
    </div>
  );
}
```
