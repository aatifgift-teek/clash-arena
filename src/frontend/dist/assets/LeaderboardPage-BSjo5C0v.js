import { e as createLucideIcon, f as useParams, b as useNavigate, u as useAuth, j as jsxRuntimeExports, c as contestTypeLabel, T as Trophy, k as Separator, t as teamModeLabel, i as formatDate, l as Shield } from "./index-Dpxe0gIA.js";
import { u as useTournaments, B as Badge } from "./useTournaments-BW-QnF7E.js";
import { C as CoinBadge } from "./CoinBadge-3n34PIXR.js";
import { P as PageHeader } from "./PageHeader-lNtv1sPI.js";
import { S as StatusBadge, U as Users } from "./StatusBadge-cMipIqT_.js";
import { m as motion } from "./proxy-BbBSkJkv.js";
import { F as Flame } from "./flame-DBSN5XRW.js";
import { C as Clock } from "./clock-inwRzyEY.js";
import { Z as Zap } from "./zap-D1NwTyF4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "22", x2: "18", y1: "12", y2: "12", key: "l9bcsi" }],
  ["line", { x1: "6", x2: "2", y1: "12", y2: "12", key: "13hhkx" }],
  ["line", { x1: "12", x2: "12", y1: "6", y2: "2", key: "10w3f3" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "18", key: "15g9kq" }]
];
const Crosshair = createLucideIcon("crosshair", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const LEADERBOARD_DATA = {
  t4: [
    {
      tournamentId: "t4",
      userId: "u1",
      username: "SnipeKing_99",
      kills: 15,
      position: 1,
      damage: 2400,
      score: 95,
      rank: 1,
      prize: 1200
    },
    {
      tournamentId: "t4",
      userId: "u2",
      username: "BlazeMaster",
      kills: 12,
      position: 2,
      damage: 2100,
      score: 82,
      rank: 2,
      prize: 900
    },
    {
      tournamentId: "t4",
      userId: "u3",
      username: "NightStalker",
      kills: 10,
      position: 3,
      damage: 1800,
      score: 70,
      rank: 3,
      prize: 300
    },
    {
      tournamentId: "t4",
      userId: "u4",
      username: "FirePhoenix",
      kills: 8,
      position: 4,
      damage: 1600,
      score: 60,
      rank: 4,
      prize: 0
    },
    {
      tournamentId: "t4",
      userId: "u5",
      username: "StormBreaker",
      kills: 7,
      position: 5,
      damage: 1400,
      score: 55,
      rank: 5,
      prize: 0
    },
    {
      tournamentId: "t4",
      userId: "u6",
      username: "ShadowFox_47",
      kills: 6,
      position: 6,
      damage: 1250,
      score: 50,
      rank: 6,
      prize: 0
    },
    {
      tournamentId: "t4",
      userId: "u7",
      username: "IronWolf",
      kills: 5,
      position: 8,
      damage: 1100,
      score: 42,
      rank: 7,
      prize: 0
    },
    {
      tournamentId: "t4",
      userId: "u8",
      username: "ViperStrike",
      kills: 4,
      position: 9,
      damage: 980,
      score: 38,
      rank: 8,
      prize: 0
    },
    {
      tournamentId: "t4",
      userId: "u9",
      username: "ThunderBolt_X",
      kills: 3,
      position: 11,
      damage: 850,
      score: 30,
      rank: 9,
      prize: 0
    },
    {
      tournamentId: "t4",
      userId: "u10",
      username: "GhostRaider",
      kills: 2,
      position: 14,
      damage: 700,
      score: 22,
      rank: 10,
      prize: 0
    }
  ],
  t2: [
    {
      tournamentId: "t2",
      userId: "u11",
      username: "AceForce_01",
      kills: 14,
      position: 1,
      damage: 2800,
      score: 100,
      rank: 1,
      prize: 4800
    },
    {
      tournamentId: "t2",
      userId: "u12",
      username: "DarkMatter",
      kills: 11,
      position: 2,
      damage: 2300,
      score: 85,
      rank: 2,
      prize: 3600
    },
    {
      tournamentId: "t2",
      userId: "u13",
      username: "LightningKid",
      kills: 9,
      position: 3,
      damage: 1950,
      score: 74,
      rank: 3,
      prize: 1200
    },
    {
      tournamentId: "t2",
      userId: "u14",
      username: "CrimsonEdge",
      kills: 8,
      position: 5,
      damage: 1700,
      score: 65,
      rank: 4,
      prize: 0
    },
    {
      tournamentId: "t2",
      userId: "u15",
      username: "NovaBurst",
      kills: 6,
      position: 6,
      damage: 1500,
      score: 58,
      rank: 5,
      prize: 0
    }
  ]
};
const SCORING_RULES = {
  MostKills: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crosshair, { size: 16, className: "text-destructive" }),
    title: "Kill Race",
    desc: "Rank is determined by total kills. Most kills wins. Ties broken by final position.",
    metrics: [
      { label: "Per Kill", value: "+6 pts" },
      { label: "Top 3 Position", value: "+15 pts" },
      { label: "Chicken Dinner", value: "+25 pts" }
    ]
  },
  TopPosition: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-accent" }),
    title: "Survival Race",
    desc: "Rank is determined by final placement. Best position wins. Kills are tiebreaker.",
    metrics: [
      { label: "#1 Position", value: "+100 pts" },
      { label: "Top 3", value: "+60 pts" },
      { label: "Top 10", value: "+20 pts" }
    ]
  },
  MostDamage: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16, className: "text-primary" }),
    title: "Damage Race",
    desc: "Rank is determined by total damage dealt. Deal the most damage to win.",
    metrics: [
      { label: "Per 100 Damage", value: "+5 pts" },
      { label: "Per Kill", value: "+3 pts" },
      { label: "Survive to Top 5", value: "+10 pts" }
    ]
  }
};
const MEDALS = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 20, className: "text-yellow-400" }),
    bg: "from-yellow-400/20 to-yellow-400/5 border-yellow-400/50",
    glow: "shadow-[0_0_20px_oklch(0.82_0.20_84_/_0.35)]",
    label: "text-yellow-400",
    rankLabel: "CHAMPION"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 18, className: "text-muted-foreground" }),
    bg: "from-muted/40 to-muted/10 border-border",
    glow: "shadow-[0_0_12px_oklch(0.55_0_0_/_0.3)]",
    label: "text-muted-foreground",
    rankLabel: "2ND PLACE"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, className: "text-primary" }),
    bg: "from-primary/20 to-primary/5 border-primary/40",
    glow: "shadow-[0_0_16px_oklch(0.68_0.24_28_/_0.3)]",
    label: "text-primary",
    rankLabel: "3RD PLACE"
  }
];
function RankIcon({ rank }) {
  if (rank === 1)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-400 font-display font-black text-sm", children: "👑" });
  if (rank === 2)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-display font-black text-sm", children: "🥈" });
  if (rank === 3)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-display font-black text-sm", children: "🥉" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-black text-sm text-muted-foreground w-6 text-center", children: [
    "#",
    rank
  ] });
}
function LeaderboardPage() {
  const { id } = useParams({ from: "/leaderboard/$id" });
  const navigate = useNavigate();
  const { username } = useAuth();
  const { getTournament } = useTournaments();
  const tournament = getTournament(id);
  const entries = LEADERBOARD_DATA[id] ?? [];
  const hasResults = entries.length > 0;
  const myEntry = username ? entries.find((e) => e.username.toLowerCase() === username.toLowerCase()) : null;
  if (!tournament) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "leaderboard.error_state",
        className: "flex flex-col items-center justify-center py-24 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 48, className: "text-destructive mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl uppercase", children: "Tournament not found" })
        ]
      }
    );
  }
  const t = tournament;
  const contestRule = SCORING_RULES[t.contestType];
  const top3 = entries.slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "leaderboard.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "leaderboard.back_button",
        onClick: () => navigate({ to: "/tournaments/$id", params: { id } }),
        className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-display font-bold text-xs uppercase tracking-wide transition-colors duration-200",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
          " Back to Tournament"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      PageHeader,
      {
        title: "Leaderboard",
        accent: t.title,
        subtitle: "Final match results and prize distribution",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "border-accent/40 text-accent font-display font-bold text-xs uppercase flex items-center gap-1",
              children: [
                contestRule.icon,
                contestTypeLabel(t.contestType)
              ]
            }
          )
        ]
      }
    ),
    myEntry && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": "leaderboard.my_result_banner",
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "bg-accent/10 border border-accent/50 rounded-sm p-4 flex flex-wrap items-center gap-4 glow-accent",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 18, className: "text-accent flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-sm uppercase text-accent", children: "Your Result" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: [
              "Rank #",
              myEntry.rank,
              " • ",
              myEntry.kills,
              " kills • ",
              myEntry.damage,
              " ",
              "dmg • Position #",
              myEntry.position
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: myEntry.prize > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CoinBadge, { amount: myEntry.prize, variant: "prize", size: "lg" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-display font-bold uppercase", children: "No prize" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            contestRule.icon,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-sm uppercase tracking-wider text-foreground", children: [
              contestRule.title,
              " — How Scoring Works"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body mb-3", children: contestRule.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: contestRule.metrics.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 bg-secondary border border-border rounded-sm px-3 py-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: m.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-black text-accent", children: m.value })
              ]
            },
            m.label
          )) })
        ] }),
        !hasResults ? (
          /* Empty state */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "leaderboard.empty_state",
              className: "bg-card border border-dashed border-border rounded-sm p-10 flex flex-col items-center justify-center text-center gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 40, className: "text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-lg uppercase tracking-wide text-foreground", children: "Results Not Yet Submitted" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body mt-1", children: "Match results will appear here once the admin reviews and publishes them." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground font-body", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Check back after the match ends" })
                ] })
              ]
            }
          )
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          top3.length >= 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "leaderboard.podium_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-black text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 12, className: "text-accent" }),
              " Top 3 Champions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: top3.map((entry, idx) => {
              const medal = MEDALS[idx];
              const isMe = entry.username.toLowerCase() === ((username == null ? void 0 : username.toLowerCase()) ?? "");
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  "data-ocid": `leaderboard.podium.item.${idx + 1}`,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: idx * 0.12 },
                  className: `bg-gradient-to-b ${medal.bg} ${medal.glow} border rounded-sm p-4 flex flex-col items-center gap-2 text-center relative overflow-hidden ${isMe ? "ring-2 ring-accent/60" : ""}`,
                  children: [
                    isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 text-[9px] font-display font-black uppercase text-accent bg-accent/20 px-1.5 rounded-full", children: "YOU" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `text-2xl font-display font-black ${medal.label}`,
                        children: medal.icon
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `font-display font-black text-[10px] uppercase tracking-widest ${medal.label}`,
                        children: medal.rankLabel
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground truncate w-full text-center", children: entry.username }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 w-full", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground font-body", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kills" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: entry.kills })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground font-body", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Damage" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: entry.damage })
                      ] })
                    ] }),
                    entry.prize > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CoinBadge,
                      {
                        amount: entry.prize,
                        variant: "prize",
                        size: "sm",
                        className: "mt-1"
                      }
                    )
                  ]
                },
                entry.userId
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "leaderboard.results_table",
              className: "bg-card border border-border rounded-sm overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 13, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-sm uppercase tracking-wider text-foreground", children: "Full Rankings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground font-body", children: [
                    entries.length,
                    " players"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[40px_1fr_56px_56px_72px_80px] gap-1 px-4 py-2 bg-muted/30 border-b border-border text-[10px] font-display font-black uppercase tracking-widest text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "#" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Player" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Kills" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Pos" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Dmg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Prize" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: entries.map((entry, idx) => {
                  const isMe = entry.username.toLowerCase() === ((username == null ? void 0 : username.toLowerCase()) ?? "");
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      "data-ocid": `leaderboard.results_table.item.${idx + 1}`,
                      initial: { opacity: 0, x: -8 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { delay: Math.min(idx * 0.04, 0.3) },
                      className: `grid grid-cols-[40px_1fr_56px_56px_72px_80px] gap-1 px-4 py-3 items-center transition-colors duration-150 ${isMe ? "bg-accent/10 border-l-2 border-l-accent" : entry.rank <= 3 ? "bg-muted/10 hover:bg-muted/20" : "hover:bg-muted/10"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RankIcon, { rank: entry.rank }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `font-display font-bold text-sm truncate ${isMe ? "text-accent" : "text-foreground"}`,
                            children: [
                              entry.username,
                              isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-[9px] text-accent bg-accent/20 px-1 py-0.5 rounded-full font-black uppercase", children: "YOU" })
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-display font-bold text-sm text-foreground", children: entry.kills }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-right font-display font-bold text-sm text-muted-foreground", children: [
                          "#",
                          entry.position
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-body text-xs text-muted-foreground", children: entry.damage.toLocaleString() }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: entry.prize > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CoinBadge,
                          {
                            amount: entry.prize,
                            variant: "prize",
                            size: "sm"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-body", children: "—" }) })
                      ]
                    },
                    entry.userId
                  );
                }) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-5 sticky top-20 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-sm uppercase tracking-wider text-muted-foreground", children: "Tournament Info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body text-muted-foreground uppercase tracking-wider", children: "Game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: t.game === "FreeFire" ? "Free Fire" : t.game })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body text-muted-foreground uppercase tracking-wider", children: "Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: teamModeLabel(t.teamMode) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body text-muted-foreground flex items-center gap-1 uppercase tracking-wider mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
              " Played"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xs text-right text-foreground max-w-[130px]", children: formatDate(t.scheduledAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body text-muted-foreground flex items-center gap-1 uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 11 }),
              " Players"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-sm text-foreground", children: [
              t.currentParticipants,
              "/",
              t.maxParticipants
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body text-muted-foreground uppercase tracking-wider", children: "Prize Pool" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CoinBadge, { amount: t.prizePool, variant: "prize", size: "md" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-xs uppercase tracking-widest text-muted-foreground", children: "Prize Breakdown" }),
          [
            { rank: "🥇 1st Place", pct: 0.4, color: "text-yellow-400" },
            {
              rank: "🥈 2nd Place",
              pct: 0.3,
              color: "text-muted-foreground"
            },
            { rank: "🥉 3rd Place", pct: 0.1, color: "text-primary" }
          ].map(({ rank, pct, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between items-center bg-secondary border border-border rounded-sm px-3 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display font-bold text-xs ${color}`, children: rank }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CoinBadge,
                  {
                    amount: Math.round(t.prizePool * pct),
                    variant: "prize",
                    size: "sm"
                  }
                )
              ]
            },
            rank
          ))
        ] })
      ] }) })
    ] })
  ] });
}
export {
  LeaderboardPage as default
};
