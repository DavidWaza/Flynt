import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function Input({
  label,
  error,
  icon,
  iconPosition = "left",
  className = "",
  ...props
}: InputProps) {
  const hasIcon = !!icon;
  const paddingClass = hasIcon
    ? iconPosition === "left"
      ? "pl-10 pr-4"
      : "pl-4 pr-10"
    : "px-4";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted">
            {icon}
          </div>
        )}
        <input
          className={`w-full ${paddingClass} py-2.5 rounded-xl border border-border-primary bg-bg-card text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary ${
            error ? "border-error" : ""
          } ${className}`}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
