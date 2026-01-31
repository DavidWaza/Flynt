import { ReactNode } from "react";

interface InsightCardProps {
  type: "warning" | "info" | "success" | "error";
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function InsightCard({
  type,
  title,
  description,
  icon,
}: InsightCardProps) {
  const typeStyles = {
    warning: {
      border: "border-warning/20",
      bg: "bg-warning/5",
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
    info: {
      border: "border-info/20",
      bg: "bg-info/5",
      iconBg: "bg-info/10",
      iconColor: "text-info",
    },
    success: {
      border: "border-success/20",
      bg: "bg-success/5",
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    error: {
      border: "border-error/20",
      bg: "bg-error/5",
      iconBg: "bg-error/10",
      iconColor: "text-error",
    },
  };

  const styles = typeStyles[type];

  const defaultIcons = {
    warning: (
      <svg
        className="h-5 w-5"
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
    ),
    info: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    success: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    <div
      className={`flex gap-3 rounded-lg border ${styles.border} ${styles.bg} p-4`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${styles.iconBg}`}
      >
        <div className={styles.iconColor}>{icon || defaultIcons[type]}</div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-text-primary text-sm">{title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>
    </div>
  );
}
