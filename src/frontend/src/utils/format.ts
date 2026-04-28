export function formatCoins(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M coins`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K coins`;
  return `${n} coins`;
}

export function formatCoinShort(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateShort(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function contestTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    TopPosition: "Top Position",
    MostKills: "Most Kills",
    MostDamage: "Most Damage",
  };
  return labels[type] ?? type;
}

export function teamModeLabel(mode: string): string {
  const labels: Record<string, string> = {
    Solo: "Solo",
    Duo: "Duo",
    Squad: "Squad (4v4)",
  };
  return labels[mode] ?? mode;
}

export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    Upcoming: "Upcoming",
    Live: "🔴 Live",
    Completed: "Completed",
    Cancelled: "Cancelled",
  };
  return labels[status] ?? status;
}

export function timeUntil(timestamp: number): string {
  const diff = timestamp - Date.now();
  if (diff <= 0) return "Started";
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
