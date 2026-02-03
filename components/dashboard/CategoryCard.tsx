import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  amount: number;
  percentage: number;
  trend: {
    value: string;
    isPositive: boolean;
  };
  icon: ReactNode;
  color: "blue" | "amber" | "purple" | "cyan" | "orange" | "sky";
}

export default function CategoryCard({
  title,
  amount,
  percentage,
  trend,
  icon,
  color,
}: CategoryCardProps) {
  const colorStyles = {
    blue: {
      bg: "bg-blue/10",
      border: "border-blue/20",
      iconBg: "bg-blue/20",
      iconText: "text-blue",
      text: "text-blue",
    },
    amber: {
      bg: "bg-orange/10",
      border: "border-orange/20",
      iconBg: "bg-orange/20",
      iconText: "text-orange",
      text: "text-orange",
    },
    purple: {
      bg: "bg-purple/10",
      border: "border-purple/20",
      iconBg: "bg-purple/20",
      iconText: "text-purple",
      text: "text-purple",
    },
    cyan: {
      bg: "bg-info/10",
      border: "border-info/20",
      iconBg: "bg-info/20",
      iconText: "text-info",
      text: "text-info",
    },
    orange: {
      bg: "bg-orange/10",
      border: "border-orange/20",
      iconBg: "bg-orange/20",
      iconText: "text-orange",
      text: "text-orange",
    },
    sky: {
      bg: "bg-blue/10",
      border: "border-blue/20",
      iconBg: "bg-blue/20",
      iconText: "text-blue",
      text: "text-blue",
    },
  };

  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`rounded-xl ${styles.bg} border ${styles.border} shadow-sm p-5 cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.iconBg}`}
        >
          <div className={`h-5 w-5 ${styles.iconText}`}>{icon}</div>
        </motion.div>
        <div
          className={`flex items-center gap-1 ${styles.text} text-xs font-medium`}
        >
          <svg
            className={`h-3 w-3 ${trend.isPositive ? "" : "rotate-180"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          {trend.value}
        </div>
      </div>
      <h3 className="font-semibold text-text-primary mb-1 text-sm uppercase">
        {title}
      </h3>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-2xl font-extrabold text-text-primary mb-2"
      >
        ₦{amount.toLocaleString()}
      </motion.div>
      <div className="flex items-center justify-between">
        <span className={`text-xs ${styles.text} font-medium`}>
          {percentage}%
        </span>
        <span className="text-xs text-text-muted">% of spending</span>
      </div>
    </motion.div>
  );
}
