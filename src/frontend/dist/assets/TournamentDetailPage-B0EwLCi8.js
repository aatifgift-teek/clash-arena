import { e as createLucideIcon, f as useParams, b as useNavigate, u as useAuth, g as useWallet, r as reactExports, j as jsxRuntimeExports, B as Button, t as teamModeLabel, c as contestTypeLabel, T as Trophy, h as formatCoins, i as formatDate, k as Separator, l as Shield, a as timeUntil, D as Dialog, m as DialogContent, n as DialogHeader, o as DialogTitle, W as Wallet } from "./index-Dpxe0gIA.js";
import { u as useTournaments, B as Badge } from "./useTournaments-BW-QnF7E.js";
import { C as CoinBadge } from "./CoinBadge-3n34PIXR.js";
import { S as StatusBadge, U as Users } from "./StatusBadge-cMipIqT_.js";
import { F as Flame } from "./flame-DBSN5XRW.js";
import { C as Check } from "./check-B6VaiEep.js";
import { Z as Zap } from "./zap-D1NwTyF4.js";
import { C as Clock } from "./clock-inwRzyEY.js";
import { L as Lock } from "./lock-s0eiJMRt.js";
import { C as Copy } from "./copy-C2TUyyxO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
const STATUS_BANNER = {
  Upcoming: {
    label: "⏳ Tournament is Upcoming — Registrations Open!",
    classes: "bg-primary/10 border-primary/30 text-primary-foreground"
  },
  Live: {
    label: "🔴 Match is LIVE — Fight for Glory!",
    classes: "bg-destructive/20 border-destructive/50 text-destructive-foreground"
  },
  Completed: {
    label: "✅ Tournament Completed — Results Announced",
    classes: "bg-muted/60 border-border text-muted-foreground"
  },
  Cancelled: {
    label: "🚫 Tournament Cancelled — Entry Fees Refunded",
    classes: "bg-muted/40 border-border text-muted-foreground"
  }
};
function getStatusBanner(t) {
  if (t.status === "Live" && t.roomCode) {
    return {
      label: "🎮 Room Code Posted — Join the Match Now!",
      classes: "bg-yellow-950/60 border-yellow-500/50 text-yellow-300"
    };
  }
  if (t.status === "Live" && !t.roomCode) {
    return {
      label: "⏳ Waiting for Room Code — Stand By!",
      classes: "bg-amber-950/60 border-amber-500/40 text-amber-300"
    };
  }
  return STATUS_BANNER[t.status];
}
const PRIZE_SPLITS = [
  { rank: "1st Place", emoji: "🥇", pct: 50 },
  { rank: "2nd Place", emoji: "🥈", pct: 30 },
  { rank: "3rd Place", emoji: "🥉", pct: 20 }
];
const SAMPLE_PARTICIPANTS = [
  "GhostSniperX",
  "NightHunter99",
  "BlazeMaster",
  "CrimsonKing",
  "ProKiller007",
  "ShadowBeast",
  "FireStorm42",
  "AceCommander",
  "SwiftBullet",
  "IronPhantom",
  "DeadEye_FF",
  "RaidKing"
];
const SEED_LEADERBOARD = [
  {
    rank: 1,
    username: "SnipeKing_99",
    kills: 15,
    position: 1,
    score: 95,
    prize: 2500
  },
  {
    rank: 2,
    username: "BlazeMaster",
    kills: 12,
    position: 2,
    score: 82,
    prize: 1500
  },
  {
    rank: 3,
    username: "NightStalker",
    kills: 10,
    position: 3,
    score: 70,
    prize: 1e3
  },
  {
    rank: 4,
    username: "FirePhoenix",
    kills: 8,
    position: 4,
    score: 60,
    prize: 0
  },
  {
    rank: 5,
    username: "StormBreaker",
    kills: 7,
    position: 5,
    score: 55,
    prize: 0
  }
];
function Countdown({ scheduledAt }) {
  const [label, setLabel] = reactExports.useState(() => timeUntil(scheduledAt));
  reactExports.useEffect(() => {
    const id = setInterval(() => setLabel(timeUntil(scheduledAt)), 1e4);
    return () => clearInterval(id);
  }, [scheduledAt]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: label });
}
function CopyBtn({ text, ocid }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = reactExports.useCallback(() => {
    navigator.clipboard.writeText(text).catch(() => {
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }, [text]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: "p-1.5 rounded-sm bg-muted/60 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-smooth",
      "aria-label": "Copy to clipboard",
      "data-ocid": ocid,
      children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, className: "text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14 })
    }
  );
}
function JoinModal({
  open,
  entryFee,
  title,
  walletBalance,
  onConfirm,
  onCancel
}) {
  const canAfford = walletBalance >= entryFee;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onCancel(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border max-w-sm mx-4",
      "data-ocid": "join.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display font-bold text-lg uppercase tracking-wide text-foreground", children: "Confirm Entry" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "You are joining",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: title }),
            ". The entry fee will be deducted from your wallet."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-background p-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Entry Fee" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CoinBadge, { amount: entryFee, variant: "fee", size: "sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 13 }),
                " Wallet Balance"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CoinBadge, { amount: walletBalance, size: "sm" })
            ] }),
            !canAfford && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-xs text-destructive font-semibold",
                "data-ocid": "join.error_state",
                children: [
                  "⚠ Insufficient coins. You need ",
                  entryFee - walletBalance,
                  " more."
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1 border-border text-foreground",
                onClick: onCancel,
                "data-ocid": "join.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "flex-1 btn-glow",
                onClick: onConfirm,
                disabled: !canAfford,
                "data-ocid": "join.confirm_button",
                children: "Join Now"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function TournamentDetailPage() {
  const { id } = useParams({ from: "/tournaments/$id" });
  const navigate = useNavigate();
  const { getTournament, joinTournament } = useTournaments();
  const { isAuthenticated, isRegistered, login, coins } = useAuth();
  const { balance, deduct } = useWallet(coins);
  const [joinOpen, setJoinOpen] = reactExports.useState(false);
  const [joined, setJoined] = reactExports.useState(false);
  const [successMsg, setSuccessMsg] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState(false);
  const tournament = getTournament(id);
  if (!tournament) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4",
        "data-ocid": "tournament_detail.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 48, className: "text-primary opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-muted-foreground uppercase", children: "Tournament Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "tournament_detail.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16, className: "mr-1" }),
                " Back to Arena"
              ]
            }
          )
        ]
      }
    );
  }
  const t = tournament;
  const fillPct = Math.round(t.currentParticipants / t.maxParticipants * 100);
  const statusBanner = getStatusBanner(t);
  const roomCodeVisible = !!t.roomCode && (t.status === "Live" || t.status === "Completed") && (joined || t.isJoined);
  const canJoin = isAuthenticated && isRegistered && !joined && !t.isJoined && t.spotsLeft > 0 && (t.status === "Upcoming" || t.status === "Live");
  function handleConfirmJoin() {
    const ok = deduct(t.entryFee, `Entry: ${t.title}`, t.id);
    if (ok) {
      joinTournament(t.id);
      setJoined(true);
      setSuccessMsg("You've joined! Get ready to battle.");
    }
    setJoinOpen(false);
  }
  function handleCopyCode(text) {
    navigator.clipboard.writeText(text).catch(() => {
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 py-6 space-y-5",
      "data-ocid": "tournament_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/" }),
            className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-smooth",
            "data-ocid": "tournament_detail.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
              " Back to Arena"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-5 space-y-3 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `font-bold text-xs uppercase tracking-wider ${t.game === "FreeFire" ? "bg-primary/20 border border-primary/40 text-primary" : "bg-secondary border border-border text-foreground/80"}`,
                children: t.game === "FreeFire" ? "🔥 Free Fire" : "🎮 BGMI"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary border border-border text-foreground/80 text-xs font-semibold uppercase", children: teamModeLabel(t.teamMode) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/10 border border-accent/30 text-accent text-xs font-semibold uppercase", children: contestTypeLabel(t.contestType) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-foreground leading-tight",
              "data-ocid": "tournament_detail.title",
              children: t.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex items-center gap-2 rounded-sm border px-3 py-2 text-sm font-semibold ${statusBanner.classes}`,
              "data-ocid": "tournament_detail.status_banner",
              children: statusBanner.label
            }
          ),
          successMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 rounded-sm border border-accent/40 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent",
              "data-ocid": "tournament_detail.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 15 }),
                " ",
                successMsg
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 14, className: "text-accent" }),
                " Prize Pool"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-prize font-display font-bold text-3xl", children: formatCoins(t.prizePool) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold", children: "Total" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: PRIZE_SPLITS.map((ps) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-1 bg-background border border-border rounded-sm py-3 px-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: ps.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-semibold uppercase", children: ps.rank }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CoinBadge,
                      {
                        amount: Math.round(t.prizePool * ps.pct / 100),
                        variant: "prize",
                        size: "sm"
                      }
                    )
                  ]
                },
                ps.rank
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14, className: "text-primary" }),
                " Match Details"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Game" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: t.game === "FreeFire" ? "Free Fire" : "BGMI" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Mode" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: teamModeLabel(t.teamMode) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs uppercase tracking-wider flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                    " Start Time"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, { scheduledAt: t.scheduledAt }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Scheduled" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-xs", children: formatDate(t.scheduledAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Max Players" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: t.maxParticipants })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wider", children: "Contest" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: contestTypeLabel(t.contestType) })
                ] })
              ] })
            ] }),
            t.roomCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-yellow-500/40 rounded-sm p-5 space-y-3",
                "data-ocid": "tournament_detail.room_code_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 14 }),
                    " Room Code"
                  ] }),
                  roomCodeVisible ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-background border border-border rounded-sm px-3 py-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Room ID" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-accent text-lg font-bold tracking-widest", children: t.roomCode })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleCopyCode(t.roomCode ?? ""),
                          className: "p-1.5 rounded-sm bg-muted/60 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-smooth",
                          "aria-label": "Copy room code",
                          "data-ocid": "tournament_detail.copy_room_code_button",
                          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { size: 14, className: "text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14 })
                        }
                      )
                    ] }),
                    t.roomPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-background border border-border rounded-sm px-3 py-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Password" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-primary text-lg font-bold tracking-widest", children: t.roomPassword })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CopyBtn,
                        {
                          text: t.roomPassword,
                          ocid: "tournament_detail.copy_password_button"
                        }
                      )
                    ] })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm text-muted-foreground",
                      "data-ocid": "tournament_detail.room_code_locked",
                      children: "🔒 Join the tournament to see the room code."
                    }
                  )
                ]
              }
            ),
            t.status === "Completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-sm p-5 space-y-3",
                "data-ocid": "tournament_detail.leaderboard_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 14, className: "text-accent" }),
                    " Final Results"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: SEED_LEADERBOARD.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 p-3 rounded-sm border ${entry.rank === 1 ? "border-yellow-400/30 bg-yellow-400/5" : entry.rank === 2 ? "border-border bg-muted/20" : "border-border bg-muted/10"}`,
                      "data-ocid": `tournament_detail.leaderboard.item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `font-display font-black text-base w-6 text-center ${entry.rank === 1 ? "text-accent" : entry.rank === 2 ? "text-muted-foreground" : entry.rank === 3 ? "text-primary" : "text-muted-foreground"}`,
                            children: [
                              "#",
                              entry.rank
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm flex-1 truncate", children: entry.username }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-body", children: [
                          entry.kills,
                          " kills"
                        ] }),
                        entry.prize > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CoinBadge,
                          {
                            amount: entry.prize,
                            variant: "prize",
                            size: "sm"
                          }
                        )
                      ]
                    },
                    entry.username
                  )) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-5 space-y-4 lg:sticky lg:top-20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-muted-foreground", children: "Tournament Info" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Prize Pool" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CoinBadge, { amount: t.prizePool, variant: "prize", size: "lg" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Entry Fee" }),
                  t.entryFee === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold font-display text-accent", children: "FREE" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CoinBadge, { amount: t.entryFee, variant: "fee", size: "md" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1 uppercase tracking-wider", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 11 }),
                    " Players"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-sm", children: [
                    t.currentParticipants,
                    "/",
                    t.maxParticipants
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full transition-all duration-700 bg-primary",
                    style: { width: `${fillPct}%` }
                  }
                ) }),
                t.spotsLeft > 0 && t.status !== "Completed" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent font-semibold", children: [
                  t.spotsLeft,
                  " spots remaining"
                ] }) : t.status !== "Completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-semibold", children: "No spots left" }) : null
              ] }),
              !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  className: "w-full btn-glow font-display font-black text-sm uppercase tracking-widest",
                  onClick: login,
                  "data-ocid": "tournament_detail.login_button",
                  children: "🔑 Login to Join"
                }
              ) : joined || t.isJoined ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-full text-center py-3 rounded-sm border border-accent/40 bg-accent/10 text-accent font-display font-black text-sm uppercase tracking-wider",
                  "data-ocid": "tournament_detail.joined_state",
                  children: "✓ You're In! Get Ready."
                }
              ) : t.status === "Completed" || t.status === "Cancelled" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full text-center py-3 rounded-sm border border-border bg-muted/20 text-muted-foreground font-display font-bold text-sm uppercase tracking-wider",
                    "data-ocid": "tournament_detail.closed_state",
                    children: t.status === "Completed" ? "Tournament Ended" : "Tournament Cancelled"
                  }
                ),
                t.status === "Completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    className: "w-full font-display font-black text-xs uppercase tracking-widest border-accent/40 text-accent hover:bg-accent/10",
                    onClick: () => navigate({ to: "/leaderboard/$id", params: { id: t.id } }),
                    "data-ocid": "tournament_detail.view_leaderboard_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 13, className: "mr-1.5" }),
                      " View Leaderboard"
                    ]
                  }
                )
              ] }) : canJoin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  className: "w-full btn-glow font-display font-black text-sm uppercase tracking-widest",
                  onClick: () => setJoinOpen(true),
                  "data-ocid": "tournament_detail.join_button",
                  children: [
                    "🎯 Join — ",
                    t.entryFee === 0 ? "FREE" : `${t.entryFee} coins`
                  ]
                }
              ) : !isRegistered ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-center text-muted-foreground text-xs",
                  "data-ocid": "tournament_detail.register_prompt",
                  children: "Complete registration to join tournaments."
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-full text-center py-3 rounded-sm border border-border bg-muted/20 text-muted-foreground font-display font-bold text-sm uppercase tracking-wider",
                  "data-ocid": "tournament_detail.full_state",
                  children: "Tournament Full"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 13, className: "text-primary" }),
                " Participants"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 max-h-52 overflow-y-auto", children: [
                SAMPLE_PARTICIPANTS.slice(0, t.currentParticipants).map(
                  (name, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 bg-background border border-border rounded-sm px-2 py-1.5",
                      "data-ocid": `tournament_detail.participant.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Shield,
                          {
                            size: 11,
                            className: "text-muted-foreground flex-shrink-0"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground truncate", children: name })
                      ]
                    },
                    name
                  )
                ),
                (joined || t.isJoined) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-sm px-2 py-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 11, className: "text-accent flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-accent truncate", children: "You ✓" })
                ] }),
                t.currentParticipants === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-2", children: "No participants yet" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          JoinModal,
          {
            open: joinOpen,
            entryFee: t.entryFee,
            title: t.title,
            tournamentId: t.id,
            walletBalance: balance,
            onConfirm: handleConfirmJoin,
            onCancel: () => setJoinOpen(false)
          }
        )
      ]
    }
  );
}
export {
  TournamentDetailPage as default
};
