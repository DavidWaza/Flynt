import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-green-primary/20";

  const variantStyles = {
    primary: "bg-green-primary text-white hover:bg-green-hover",
    secondary:
      "bg-bg-elevated text-text-primary hover:bg-bg-card border border-border-primary",
    ghost: "bg-transparent text-green-primary hover:bg-green-primary/5",
    outline:
      "bg-transparent border border-green-primary text-green-primary hover:bg-green-primary hover:text-white hover:border-green-hover",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
