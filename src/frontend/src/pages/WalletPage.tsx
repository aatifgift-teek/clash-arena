import { Separator } from "@/components/ui/separator";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Coins,
  Gift,
  Info,
  Lock,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { CoinBadge } from "../components/CoinBadge";
import { PageHeader } from "../components/PageHeader";
import { useAuth } from "../hooks/useAuth";
import { useWallet } from "../hooks/useWallet";
import type { TransactionType } from "../types";
import { formatDate } from "../utils/format";

// Maps TransactionType → display config
const TX_CONFIG: Record<
  TransactionType,
  {
    icon: typeof Coins;
    colorText: string;
    colorBg: string;
    label: string;
    sign: "+" | "-";
  }
> = {
  EntryFee: {
    icon: ArrowUpRight,
    colorText: "text-primary",
    colorBg: "bg-primary/10",
    label: "Tournament Entry",
    sign: "-",
  },
  PrizeWin: {
    icon: ArrowDownLeft,
    colorText: "text-accent",
    colorBg: "bg-accent/10",
    label: "Prize Won",
    sign: "+",
  },
  Refund: {
    icon: RotateCcw,
    colorText: "text-primary",
    colorBg: "bg-primary/10",
    label: "Refund",
    sign: "+",
  },
  AdminCredit: {
    icon: Gift,
    colorText: "text-accent",
    colorBg: "bg-accent/10",
    label: "Welcome Bonus",
    sign: "+",
  },
};

function formatCoinShort(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export default function WalletPage() {
  const { isAuthenticated, login, coins } = useAuth();
  const { balance, transactions } = useWallet(coins);

  if (!isAuthenticated) {
    return (
      <motion.div
        data-ocid="wallet.auth_gate"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-24 text-center gap-5"
      >
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
          <Lock size={36} className="text-muted-foreground opacity-50" />
        </div>
        <div>
          <p className="font-display font-black text-2xl uppercase tracking-wider text-foreground">
            Login Required
          </p>
          <p className="text-muted-foreground text-sm font-body mt-2 max-w-xs mx-auto">
            Sign in with Internet Identity to access your wallet, check your
            balance, and track tournament transactions.
          </p>
        </div>
        <button
          type="button"
          data-ocid="wallet.login_button"
          onClick={login}
          className="btn-glow font-display font-black text-sm uppercase tracking-widest px-8 py-3 rounded-sm mt-2"
        >
          Login to Continue
        </button>
      </motion.div>
    );
  }

  // Compute stats
  const totalWon = transactions
    .filter((t) => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);
  const totalSpent = transactions
    .filter((t) => t.amount < 0)
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const netProfit = totalWon - totalSpent;

  const sortedTx = [...transactions].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div data-ocid="wallet.page" className="space-y-5">
      <PageHeader
        accent="MY"
        title="WALLET"
        subtitle="Your coin balance and tournament transaction history."
      />

      {/* ── Balance Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-card border border-accent/40 rounded-sm p-6"
      >
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 90% 10%, oklch(0.82 0.20 84 / 0.08), transparent 70%)",
          }}
        />
        <p className="text-xs font-display font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Available Balance
        </p>
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="text-accent"
          >
            <Coins size={52} strokeWidth={1.5} />
          </motion.div>
          <div>
            <div className="flex items-end gap-2 leading-none">
              <span
                data-ocid="wallet.balance"
                className="font-display font-black text-5xl md:text-6xl text-accent"
              >
                {formatCoinShort(balance)}
              </span>
              <span className="text-muted-foreground font-body text-base mb-1 lowercase">
                coins
              </span>
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2 mt-4 bg-secondary/60 border border-border rounded-sm px-3 py-2">
          <Info
            size={13}
            className="text-muted-foreground flex-shrink-0 mt-0.5"
          />
          <p className="text-muted-foreground text-xs font-body leading-relaxed">
            This is your internal gaming wallet. Earn coins by winning
            tournaments, spend them on entry fees. No real money involved.
          </p>
        </div>
      </motion.div>

      {/* ── Stats Bar ── */}
      <motion.div
        data-ocid="wallet.stats"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-3 gap-2"
      >
        <div className="bg-card border border-border rounded-sm p-3 text-center">
          <p className="font-display font-black text-lg md:text-xl text-accent">
            {formatCoinShort(totalWon)}
          </p>
          <p className="text-muted-foreground text-[10px] md:text-xs font-body uppercase tracking-wider mt-0.5">
            Total Won
          </p>
        </div>
        <div className="bg-card border border-border rounded-sm p-3 text-center">
          <p className="font-display font-black text-lg md:text-xl text-primary">
            {formatCoinShort(totalSpent)}
          </p>
          <p className="text-muted-foreground text-[10px] md:text-xs font-body uppercase tracking-wider mt-0.5">
            Total Spent
          </p>
        </div>
        <div className="bg-card border border-border rounded-sm p-3 text-center">
          <p
            className={`font-display font-black text-lg md:text-xl ${netProfit >= 0 ? "text-accent" : "text-primary"}`}
          >
            {netProfit >= 0 ? "+" : ""}
            {formatCoinShort(netProfit)}
          </p>
          <p className="text-muted-foreground text-[10px] md:text-xs font-body uppercase tracking-wider mt-0.5 flex items-center justify-center gap-0.5">
            <TrendingUp size={9} />
            Net Profit
          </p>
        </div>
      </motion.div>

      {/* ── Transaction History ── */}
      <motion.div
        data-ocid="wallet.transaction_panel"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card border border-border rounded-sm overflow-hidden"
      >
        <div className="px-5 py-4 flex items-center justify-between">
          <h2 className="font-display font-black text-sm uppercase tracking-wider text-muted-foreground">
            Transaction History
          </h2>
          <span className="text-xs font-body text-muted-foreground">
            {sortedTx.length} total
          </span>
        </div>
        <Separator />

        {sortedTx.length === 0 ? (
          <div data-ocid="wallet.empty_state" className="py-14 text-center">
            <Coins
              size={36}
              className="mx-auto text-muted-foreground opacity-25 mb-3"
            />
            <p className="font-display font-bold text-sm uppercase text-muted-foreground">
              No transactions yet
            </p>
            <p className="text-muted-foreground text-xs font-body mt-1 opacity-70">
              Join a tournament to get started
            </p>
          </div>
        ) : (
          <div
            data-ocid="wallet.transaction_list"
            className="divide-y divide-border"
          >
            {sortedTx.map((tx, idx) => {
              const cfg = TX_CONFIG[tx.type];
              const Icon = cfg.icon;
              const isCredit = tx.amount > 0;
              const absAmount = Math.abs(tx.amount);
              return (
                <motion.div
                  key={tx.id}
                  data-ocid={`wallet.transaction.item.${idx + 1}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/30 transition-smooth"
                >
                  {/* Icon chip */}
                  <div
                    className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-sm ${cfg.colorBg} ${cfg.colorText}`}
                  >
                    <Icon size={15} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-foreground truncate">
                      {cfg.label}
                    </p>
                    <p className="text-muted-foreground text-xs font-body truncate">
                      {tx.description}
                    </p>
                    <p className="text-muted-foreground text-[10px] font-body opacity-60 mt-0.5">
                      {formatDate(tx.timestamp)}
                    </p>
                  </div>

                  {/* Amount */}
                  <CoinBadge
                    amount={absAmount}
                    size="sm"
                    variant={isCredit ? "prize" : "fee"}
                    className="flex-shrink-0"
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
