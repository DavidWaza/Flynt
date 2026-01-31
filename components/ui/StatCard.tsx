import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: "bg-bg-card border-border-primary",
    success: "bg-green-primary/10 border-green-primary/20",
    warning: "bg-warning/10 border-warning/20",
    error: "bg-error/10 border-error/20",
    info: "bg-info/10 border-info/20",
  };

  const textColorStyles = {
    default: "text-text-primary",
    success: "text-green-dark",
    warning: "text-warning",
    error: "text-error",
    info: "text-info",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`rounded-3xl border shadow-sm p-6 ${variantStyles[variant]}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-text-secondary uppercase font-bold">
          {title}
        </span>
        {icon && <div className="h-5 w-5">{icon}</div>}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className={`text-2xl font-extrabold ${textColorStyles[variant]} mb-1`}
      >
        {typeof value === "number" ? `₦${value.toLocaleString()}` : value}
      </motion.div>
      {(subtitle || trend) && (
        <p
          className={`text-xs font-medium ${trend?.isPositive !== false ? "text-success" : "text-error"}`}
        >
          {trend?.value || subtitle}
        </p>
      )}
    </motion.div>
  );
}
