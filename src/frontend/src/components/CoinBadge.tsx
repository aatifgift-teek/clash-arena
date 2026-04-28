import { Coins } from "lucide-react";
import { formatCoinShort } from "../utils/format";

interface CoinBadgeProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "prize" | "fee";
  className?: string;
}

export function CoinBadge({
  amount,
  size = "md",
  variant = "default",
  className = "",
}: CoinBadgeProps) {
  const sizeClasses = {
    sm: "text-xs gap-0.5 px-1.5 py-0.5",
    md: "text-sm gap-1 px-2 py-1",
    lg: "text-base gap-1.5 px-3 py-1.5",
  };

  const iconSize = { sm: 10, md: 13, lg: 16 };

  const variantClasses = {
    default: "text-accent bg-accent/10 border border-accent/30",
    prize: "text-accent bg-accent/15 border border-accent/50 glow-accent",
    fee: "text-primary bg-primary/10 border border-primary/30",
  };

  return (
    <span
      className={`inline-flex items-center rounded-sm font-bold font-display ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <Coins size={iconSize[size]} className="flex-shrink-0" />
      <span>{formatCoinShort(amount)}</span>
    </span>
  );
}
