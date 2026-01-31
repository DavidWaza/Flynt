interface BudgetAlertProps {
  type: "warning" | "error";
  message: string;
}

export default function BudgetAlert({ type, message }: BudgetAlertProps) {
  const styles = {
    warning: {
      bg: "bg-warning/5",
      border: "border-warning/20",
      icon: "text-warning",
    },
    error: {
      bg: "bg-error/5",
      border: "border-error/20",
      icon: "text-error",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`flex items-center gap-2 p-4 rounded-lg border ${style.border} ${style.bg}`}
    >
      <svg
        className={`h-5 w-5 shrink-0 ${style.icon}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p className="text-sm text-text-primary">{message}</p>
    </div>
  );
}
