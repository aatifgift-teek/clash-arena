import { e as createLucideIcon, u as useAuth, g as useWallet, r as reactExports, j as jsxRuntimeExports, l as Shield, S as Swords, T as Trophy, C as Coins, L as Link, B as Button, t as teamModeLabel, c as contestTypeLabel, p as formatDateShort } from "./index-Dpxe0gIA.js";
import { u as useTournaments, B as Badge } from "./useTournaments-BW-QnF7E.js";
import { C as CoinBadge } from "./CoinBadge-3n34PIXR.js";
import { m as motion } from "./proxy-BbBSkJkv.js";
import { Z as Zap } from "./zap-D1NwTyF4.js";
import { C as Check } from "./check-B6VaiEep.js";
import { C as Copy } from "./copy-C2TUyyxO.js";
import { T as TrendingUp } from "./trending-up-CelCbecd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
const SEED_MATCHES = [
  {
    tournamentId: "t4",
    tournamentTitle: "FREE FIRE NIGHT CLASH",
    game: "FreeFire",
    mode: "Solo",
    contestType: "TopPosition",
    position: 3,
    kills: 7,
    earned: 500,
    date: Date.now() - 24 * 3600 * 1e3
  },
  {
    tournamentId: "t1",
    tournamentTitle: "INFERNO BLAZE — SOLO CUP",
    game: "FreeFire",
    mode: "Solo",
    contestType: "MostKills",
    position: 12,
    kills: 4,
    earned: 0,
    date: Date.now() - 2 * 24 * 3600 * 1e3
  },
  {
    tournamentId: "t2",
    tournamentTitle: "THUNDERSTRIKE DUO WARS",
    game: "FreeFire",
    mode: "Duo",
    contestType: "TopPosition",
    position: 1,
    kills: 11,
    earned: 2400,
    date: Date.now() - 3600 * 1e3
  }
];
function StatCard({
  icon,
  label,
  value,
  accent = false,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay },
      className: `bg-card border rounded-sm p-4 flex flex-col gap-2 relative overflow-hidden ${accent ? "border-accent/50 glow-accent" : "border-border hover:border-primary/40"} transition-smooth`,
      children: [
        accent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-accent/5 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-2 ${accent ? "text-accent" : "text-muted-foreground"}`,
            children: [
              icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider font-display", children: label })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `font-display font-black text-2xl md:text-3xl ${accent ? "text-accent" : "text-foreground"}`,
            children: value
          }
        )
      ]
    }
  );
}
function LoginPrompt({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "profile.empty_state",
      className: "flex flex-col items-center justify-center py-24 gap-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/40 glow-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 36, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl uppercase tracking-tight text-foreground", children: "Login Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Sign in with Internet Identity to view your profile" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "profile.login_button",
            className: "btn-glow gap-2",
            onClick: onLogin,
            type: "button",
            children: "Login with Internet Identity"
          }
        )
      ]
    }
  );
}
function GameBadge({ game }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `text-xs font-bold font-display px-1.5 py-0 border ${game === "FreeFire" ? "border-primary/50 text-primary bg-primary/10" : "border-accent/50 text-accent bg-accent/10"}`,
      children: game === "FreeFire" ? "FF" : "BGMI"
    }
  );
}
function ProfilePage() {
  const { isAuthenticated, username, principal, login } = useAuth();
  const { balance, transactions } = useWallet(1e3);
  const { tournaments } = useTournaments();
  const [copied, setCopied] = reactExports.useState(false);
  const totalMatches = SEED_MATCHES.length;
  const wins = SEED_MATCHES.filter((m) => m.position === 1).length;
  const winRate = totalMatches > 0 ? Math.round(wins / totalMatches * 100) : 0;
  const totalEarnings = SEED_MATCHES.reduce((sum, m) => sum + m.earned, 0);
  const joinedCount = tournaments.filter((t) => t.isJoined).length;
  const initials = username ? username.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "?";
  const joinedDate = transactions.length > 0 ? new Date(
    Math.min(...transactions.map((t) => t.timestamp))
  ).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "Apr 2026";
  function copyPrincipal() {
    if (!principal) return;
    navigator.clipboard.writeText(principal).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  function truncatePrincipal(p) {
    if (p.length <= 20) return p;
    return `${p.slice(0, 10)}...${p.slice(-8)}`;
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 md:px-6 max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, { onLogin: login }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "profile.page",
      className: "px-4 md:px-6 max-w-5xl mx-auto pb-12",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "relative bg-card border border-border rounded-sm overflow-hidden mt-2 mb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 sm:p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.avatar", className: "relative flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full border-2 border-primary glow-primary bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-2xl text-primary", children: initials }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-card" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h1",
                      {
                        "data-ocid": "profile.username",
                        className: "font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-foreground leading-none",
                        children: username || "Player"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "border-accent/50 text-accent bg-accent/10 text-xs font-display font-bold",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 10, className: "mr-1" }),
                          "ACTIVE"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs font-body", children: [
                    "Member since ",
                    joinedDate
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CoinBadge, { amount: balance, size: "md", variant: "prize" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Current Balance" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col items-center gap-1 px-4 py-3 bg-muted/40 border border-border rounded-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-2xl text-primary", children: joinedCount }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wider font-display", children: "Joined" })
                ] })
              ] }),
              principal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-5 sm:px-6 py-3 flex items-center gap-3 bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 13, className: "text-muted-foreground flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    "data-ocid": "profile.player_id",
                    className: "text-muted-foreground text-xs font-mono flex-1 min-w-0 truncate",
                    children: truncatePrincipal(principal)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "profile.copy_id_button",
                    onClick: copyPrincipal,
                    className: "flex items-center gap-1 text-xs text-primary hover:text-accent transition-smooth font-display font-bold flex-shrink-0",
                    children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                      "COPIED"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 }),
                      "COPY ID"
                    ] })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "profile.stats_section",
            className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { size: 14 }),
                  label: "Matches",
                  value: totalMatches,
                  delay: 0.05
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 14 }),
                  label: "Wins",
                  value: wins,
                  delay: 0.1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14 }),
                  label: "Win Rate",
                  value: `${winRate}%`,
                  delay: 0.15
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { size: 14 }),
                  label: "Total Earned",
                  value: totalEarnings.toLocaleString(),
                  accent: true,
                  delay: 0.2
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.25 },
            className: "bg-card border border-border rounded-sm overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 16, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-lg uppercase tracking-tight", children: "Match History" })
              ] }),
              SEED_MATCHES.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "profile.match_history.empty_state",
                  className: "flex flex-col items-center gap-4 py-16 text-center px-6",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { size: 28, className: "text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm uppercase tracking-wide", children: "No matches yet" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "Enter a tournament to start competing" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "profile.browse_tournaments_button",
                        className: "btn-glow text-sm",
                        children: "Browse Tournaments"
                      }
                    ) })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "data-ocid": "profile.match_history.table",
                    className: "hidden md:block overflow-x-auto",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
                        "Tournament",
                        "Game",
                        "Mode",
                        "Contest",
                        "Pos / Kills",
                        "Earned",
                        "Date"
                      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          className: `px-4 py-3 text-muted-foreground font-display font-bold text-xs uppercase tracking-wider ${h === "Pos / Kills" || h === "Earned" || h === "Date" ? "text-right" : "text-left"} first:px-5 last:px-5`,
                          children: h
                        },
                        h
                      )) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: SEED_MATCHES.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          "data-ocid": `profile.match_history.item.${i + 1}`,
                          className: "border-b border-border/50 hover:bg-muted/20 transition-smooth",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Link,
                              {
                                to: "/tournaments/$id",
                                params: { id: match.tournamentId },
                                "data-ocid": `profile.match_history.link.${i + 1}`,
                                className: "font-display font-bold text-foreground hover:text-primary transition-smooth text-sm line-clamp-1",
                                children: match.tournamentTitle
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameBadge, { game: match.game }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: teamModeLabel(match.mode) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: contestTypeLabel(match.contestType) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  className: `font-display font-bold text-sm ${match.position === 1 ? "text-accent" : match.position <= 3 ? "text-primary" : "text-foreground"}`,
                                  children: [
                                    "#",
                                    match.position
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs ml-1", children: [
                                "· ",
                                match.kills,
                                "K"
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: match.earned > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                              CoinBadge,
                              {
                                amount: match.earned,
                                size: "sm",
                                variant: "prize"
                              }
                            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right text-muted-foreground text-xs whitespace-nowrap", children: formatDateShort(match.date) })
                          ]
                        },
                        match.tournamentId
                      )) })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border", children: SEED_MATCHES.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `profile.match_history.item.${i + 1}`,
                    className: "px-4 py-3 hover:bg-muted/20 transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/tournaments/$id",
                            params: { id: match.tournamentId },
                            "data-ocid": `profile.match_history.mobile_link.${i + 1}`,
                            className: "font-display font-bold text-foreground hover:text-primary transition-smooth text-sm leading-tight flex-1 min-w-0 line-clamp-2",
                            children: match.tournamentTitle
                          }
                        ),
                        match.earned > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CoinBadge,
                          {
                            amount: match.earned,
                            size: "sm",
                            variant: "prize"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs flex-shrink-0", children: "No prize" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(GameBadge, { game: match.game }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: teamModeLabel(match.mode) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `font-display font-bold ${match.position === 1 ? "text-accent" : match.position <= 3 ? "text-primary" : "text-foreground"}`,
                            children: [
                              "Rank #",
                              match.position
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "· ",
                          match.kills,
                          " kills"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "· ",
                          formatDateShort(match.date)
                        ] })
                      ] })
                    ]
                  },
                  match.tournamentId
                )) })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  ProfilePage as default
};
