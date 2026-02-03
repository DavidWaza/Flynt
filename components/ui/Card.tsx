import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "default" | "elevated" | "bordered";
}

export default function Card({
  children,
  className = "",
  padding = "md",
  variant = "default",
}: CardProps) {
  const baseStyles = "rounded-xl";

  const variantStyles = {
    default: "bg-bg-card border-border-primary shadow-sm",
    elevated: "bg-bg-card shadow-lg",
    bordered: "bg-bg-card border-2 border-border-primary",
  };

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
