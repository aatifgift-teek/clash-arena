import { e as createLucideIcon, u as useAuth, g as useWallet, j as jsxRuntimeExports, C as Coins, k as Separator, i as formatDate } from "./index-Dpxe0gIA.js";
import { C as CoinBadge } from "./CoinBadge-3n34PIXR.js";
import { P as PageHeader } from "./PageHeader-lNtv1sPI.js";
import { m as motion } from "./proxy-BbBSkJkv.js";
import { L as Lock } from "./lock-s0eiJMRt.js";
import { T as TrendingUp } from "./trending-up-CelCbecd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M17 7 7 17", key: "15tmo1" }],
  ["path", { d: "M17 17H7V7", key: "1org7z" }]
];
const ArrowDownLeft = createLucideIcon("arrow-down-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
const TX_CONFIG = {
  EntryFee: {
    icon: ArrowUpRight,
    colorText: "text-primary",
    colorBg: "bg-primary/10",
    label: "Tournament Entry",
    sign: "-"
  },
  PrizeWin: {
    icon: ArrowDownLeft,
    colorText: "text-accent",
    colorBg: "bg-accent/10",
    label: "Prize Won",
    sign: "+"
  },
  Refund: {
    icon: RotateCcw,
    colorText: "text-primary",
    colorBg: "bg-primary/10",
    label: "Refund",
    sign: "+"
  },
  AdminCredit: {
    icon: Gift,
    colorText: "text-accent",
    colorBg: "bg-accent/10",
    label: "Welcome Bonus",
    sign: "+"
  }
};
function formatCoinShort(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return `${n}`;
}
function WalletPage() {
  const { isAuthenticated, login, coins } = useAuth();
  const { balance, transactions } = useWallet(coins);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": "wallet.auth_gate",
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex flex-col items-center justify-center py-24 text-center gap-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 36, className: "text-muted-foreground opacity-50" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-2xl uppercase tracking-wider text-foreground", children: "Login Required" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body mt-2 max-w-xs mx-auto", children: "Sign in with Internet Identity to access your wallet, check your balance, and track tournament transactions." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "wallet.login_button",
              onClick: login,
              className: "btn-glow font-display font-black text-sm uppercase tracking-widest px-8 py-3 rounded-sm mt-2",
              children: "Login to Continue"
            }
          )
        ]
      }
    );
  }
  const totalWon = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalSpent = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const netProfit = totalWon - totalSpent;
  const sortedTx = [...transactions].sort((a, b) => b.timestamp - a.timestamp);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "wallet.page", className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        accent: "MY",
        title: "WALLET",
        subtitle: "Your coin balance and tournament transaction history."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "relative overflow-hidden bg-card border border-accent/40 rounded-sm p-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 60% 80% at 90% 10%, oklch(0.82 0.20 84 / 0.08), transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-bold uppercase tracking-widest text-muted-foreground mb-4", children: "Available Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { y: [0, -6, 0] },
                transition: {
                  duration: 2.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                },
                className: "text-accent",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { size: 52, strokeWidth: 1.5 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 leading-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "data-ocid": "wallet.balance",
                  className: "font-display font-black text-5xl md:text-6xl text-accent",
                  children: formatCoinShort(balance)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-body text-base mb-1 lowercase", children: "coins" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mt-4 bg-secondary/60 border border-border rounded-sm px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Info,
              {
                size: 13,
                className: "text-muted-foreground flex-shrink-0 mt-0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body leading-relaxed", children: "This is your internal gaming wallet. Earn coins by winning tournaments, spend them on entry fees. No real money involved." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": "wallet.stats",
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
        className: "grid grid-cols-3 gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-lg md:text-xl text-accent", children: formatCoinShort(totalWon) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px] md:text-xs font-body uppercase tracking-wider mt-0.5", children: "Total Won" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-lg md:text-xl text-primary", children: formatCoinShort(totalSpent) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px] md:text-xs font-body uppercase tracking-wider mt-0.5", children: "Total Spent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `font-display font-black text-lg md:text-xl ${netProfit >= 0 ? "text-accent" : "text-primary"}`,
                children: [
                  netProfit >= 0 ? "+" : "",
                  formatCoinShort(netProfit)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-[10px] md:text-xs font-body uppercase tracking-wider mt-0.5 flex items-center justify-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 9 }),
              "Net Profit"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": "wallet.transaction_panel",
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.2 },
        className: "bg-card border border-border rounded-sm overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-sm uppercase tracking-wider text-muted-foreground", children: "Transaction History" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body text-muted-foreground", children: [
              sortedTx.length,
              " total"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          sortedTx.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "wallet.empty_state", className: "py-14 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Coins,
              {
                size: 36,
                className: "mx-auto text-muted-foreground opacity-25 mb-3"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm uppercase text-muted-foreground", children: "No transactions yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body mt-1 opacity-70", children: "Join a tournament to get started" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "wallet.transaction_list",
              className: "divide-y divide-border",
              children: sortedTx.map((tx, idx) => {
                const cfg = TX_CONFIG[tx.type];
                const Icon = cfg.icon;
                const isCredit = tx.amount > 0;
                const absAmount = Math.abs(tx.amount);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    "data-ocid": `wallet.transaction.item.${idx + 1}`,
                    initial: { opacity: 0, x: -10 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.3, delay: idx * 0.04 },
                    className: "flex items-center gap-3 px-5 py-3 hover:bg-secondary/30 transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-sm ${cfg.colorBg} ${cfg.colorText}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: cfg.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body truncate", children: tx.description }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px] font-body opacity-60 mt-0.5", children: formatDate(tx.timestamp) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CoinBadge,
                        {
                          amount: absAmount,
                          size: "sm",
                          variant: isCredit ? "prize" : "fee",
                          className: "flex-shrink-0"
                        }
                      )
                    ]
                  },
                  tx.id
                );
              })
            }
          )
        ]
      }
    )
  ] });
}
export {
  WalletPage as default
};
