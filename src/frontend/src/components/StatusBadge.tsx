import type { TournamentStatus } from "../types";

interface StatusBadgeProps {
  status: TournamentStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  TournamentStatus,
  { label: string; classes: string; dot?: string }
> = {
  Live: {
    label: "LIVE",
    classes:
      "text-destructive-foreground bg-destructive/20 border border-destructive/60",
    dot: "bg-destructive animate-pulse",
  },
  Upcoming: {
    label: "UPCOMING",
    classes: "text-accent bg-accent/10 border border-accent/30",
  },
  Completed: {
    label: "COMPLETED",
    classes: "text-muted-foreground bg-muted/50 border border-border",
  },
  Cancelled: {
    label: "CANCELLED",
    classes:
      "text-muted-foreground bg-muted/20 border border-border line-through",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-bold font-display tracking-wider ${config.classes} ${className}`}
    >
      {config.dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      )}
      {config.label}
    </span>
  );
}
