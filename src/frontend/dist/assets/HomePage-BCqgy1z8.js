import { j as jsxRuntimeExports, t as teamModeLabel, c as contestTypeLabel, a as timeUntil, B as Button, u as useAuth, b as useNavigate, r as reactExports, G as Gamepad2, S as Swords, R as RegistrationModal, d as Skeleton } from "./index-Dpxe0gIA.js";
import { u as useTournaments, B as Badge } from "./useTournaments-BW-QnF7E.js";
import { C as CoinBadge } from "./CoinBadge-3n34PIXR.js";
import { S as StatusBadge, U as Users } from "./StatusBadge-cMipIqT_.js";
import { F as Flame } from "./flame-DBSN5XRW.js";
const GAME_COLORS = {
  FreeFire: "text-primary bg-primary/15 border-primary/40",
  BGMI: "text-blue-400 bg-blue-400/15 border-blue-400/40"
};
function TournamentCard({
  tournament,
  onJoin,
  index = 0
}) {
  const t = tournament;
  const fillPct = Math.round(t.currentParticipants / t.maxParticipants * 100);
  const canJoin = !t.isJoined && t.spotsLeft > 0 && (t.status === "Upcoming" || t.status === "Live");
  const isFull = t.spotsLeft === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": `tournament.item.${index + 1}`,
      className: "card-gamer border-border relative flex flex-col overflow-hidden group cursor-pointer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 right-0 h-0.5 transition-smooth group-hover:opacity-100 opacity-60",
            style: { background: "oklch(0.68 0.24 28)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-bold font-display px-2 py-0.5 rounded-sm border uppercase tracking-wider ${GAME_COLORS[t.game] ?? ""}`,
                children: t.game === "FreeFire" ? "Free Fire" : t.game
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-sm md:text-base uppercase tracking-tight text-foreground leading-tight line-clamp-2 min-h-[2.5rem]", children: t.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-sm bg-secondary border border-border font-display font-semibold text-secondary-foreground uppercase", children: teamModeLabel(t.teamMode) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-sm bg-secondary border border-border font-display font-semibold text-secondary-foreground uppercase", children: contestTypeLabel(t.contestType) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body mb-0.5 uppercase tracking-wider", children: "Prize Pool" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CoinBadge, { amount: t.prizePool, variant: "prize", size: "lg" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body mb-0.5 uppercase tracking-wider", children: "Entry Fee" }),
            t.entryFee === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold font-display text-accent", children: "FREE" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CoinBadge, { amount: t.entryFee, variant: "fee", size: "md" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-body flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 11 }),
              t.currentParticipants,
              "/",
              t.maxParticipants
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold font-display text-accent", children: [
              t.spotsLeft,
              " left"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full transition-smooth",
              style: {
                width: `${fillPct}%`,
                background: fillPct >= 90 ? "oklch(0.68 0.24 28)" : "oklch(0.82 0.20 84)"
              }
            }
          ) })
        ] }),
        t.status === "Upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-body", children: [
          "Starts in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-bold", children: timeUntil(t.scheduledAt) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 mt-auto pt-1", children: t.isJoined ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "w-full text-accent border-accent/40 bg-accent/5 font-display font-bold text-xs uppercase tracking-wider",
            disabled: true,
            children: "✓ Joined"
          }
        ) : canJoin ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": `tournament.join_button.${index + 1}`,
            size: "sm",
            className: "w-full btn-glow font-display font-black text-xs uppercase tracking-widest",
            onClick: (e) => {
              e.stopPropagation();
              onJoin == null ? void 0 : onJoin(t.id);
            },
            children: "JOIN NOW"
          }
        ) : isFull ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "w-full font-display font-bold text-xs uppercase tracking-wider",
            disabled: true,
            children: "FULL"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "w-full font-display font-bold text-xs uppercase tracking-wider text-muted-foreground",
            disabled: true,
            children: t.status === "Completed" ? "Ended" : "Unavailable"
          }
        ) })
      ]
    }
  );
}
const GAME_TABS = [
  { label: "All Games", value: "All" },
  { label: "Free Fire", value: "FreeFire" },
  { label: "BGMI", value: "BGMI" }
];
const TEAM_TABS = [
  { label: "All", value: "All" },
  { label: "Solo", value: "Solo" },
  { label: "Duo", value: "Duo" },
  { label: "Squad", value: "Squad" }
];
const CONTEST_TABS = [
  { label: "All Types", value: "All" },
  { label: "Top Position", value: "TopPosition" },
  { label: "Most Kills", value: "MostKills" },
  { label: "Most Damage", value: "MostDamage" }
];
const STATUS_ORDER = {
  Live: 0,
  Upcoming: 1,
  Completed: 2,
  Cancelled: 3
};
function FilterRow({
  label,
  tabs,
  active,
  onChange,
  ocidPrefix
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-bold text-muted-foreground uppercase tracking-wider w-20 flex-shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": `${ocidPrefix}.${tab.value.toLowerCase()}`,
        onClick: () => onChange(tab.value),
        className: `px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider rounded-sm border transition-smooth ${active === tab.value ? "bg-primary text-primary-foreground border-primary/60 glow-primary" : "bg-secondary text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
        children: tab.label
      },
      tab.value
    )) })
  ] });
}
function SkeletonCards() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 bg-muted rounded-sm" }, i)) });
}
function HomePage() {
  const { tournaments, joinTournament } = useTournaments();
  const { isAuthenticated, isRegistered, setRegistered } = useAuth();
  const navigate = useNavigate();
  const [gameFilter, setGameFilter] = reactExports.useState("All");
  const [teamFilter, setTeamFilter] = reactExports.useState("All");
  const [contestFilter, setContestFilter] = reactExports.useState("All");
  const [pendingJoin, setPendingJoin] = reactExports.useState(null);
  const [isLoading] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    return tournaments.filter((t) => gameFilter === "All" || t.game === gameFilter).filter((t) => teamFilter === "All" || t.teamMode === teamFilter).filter((t) => contestFilter === "All" || t.contestType === contestFilter).sort((a, b) => {
      const sd = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      return sd !== 0 ? sd : a.scheduledAt - b.scheduledAt;
    });
  }, [tournaments, gameFilter, teamFilter, contestFilter]);
  const activeCount = reactExports.useMemo(
    () => tournaments.filter((t) => t.status === "Upcoming" || t.status === "Live").length,
    [tournaments]
  );
  function handleJoin(id) {
    if (!isAuthenticated) return;
    if (!isRegistered) {
      setPendingJoin(id);
      return;
    }
    joinTournament(id);
    navigate({ to: `/tournaments/${id}` });
  }
  function handleRegistered(username) {
    setRegistered(username);
    if (pendingJoin) {
      joinTournament(pendingJoin);
      navigate({ to: `/tournaments/${pendingJoin}` });
      setPendingJoin(null);
    }
  }
  function clearFilters() {
    setGameFilter("All");
    setTeamFilter("All");
    setContestFilter("All");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "hero.section",
        className: "relative overflow-hidden bg-card border-b border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-5 pointer-events-none",
              style: {
                backgroundImage: "linear-gradient(oklch(0.68 0.24 28 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 28 / 0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none",
              style: { background: "oklch(0.68 0.24 28)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-12 right-8 w-56 h-56 rounded-full blur-3xl opacity-15 pointer-events-none",
              style: { background: "oklch(0.82 0.2 84)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 py-12 md:py-16 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Flame,
              {
                className: "text-primary",
                size: 44,
                style: {
                  filter: "drop-shadow(0 0 14px oklch(0.68 0.24 28 / 0.9))"
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h1",
              {
                className: "font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-2",
                style: {
                  textShadow: "0 0 30px oklch(0.68 0.24 28 / 0.7), 0 0 70px oklch(0.68 0.24 28 / 0.25)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "FIRE" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "ARENA" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "font-display font-bold text-base md:text-xl uppercase tracking-widest mb-6 text-accent",
                style: { textShadow: "0 0 16px oklch(0.82 0.2 84 / 0.6)" },
                children: [
                  "Compete. ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Win." }),
                  " Dominate."
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm border font-display font-bold text-xs uppercase tracking-wider text-primary bg-primary/10 border-primary/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { size: 12 }),
                " Free Fire"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm border font-display font-bold text-xs uppercase tracking-wider text-blue-400 bg-blue-400/10 border-blue-400/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { size: 12 }),
                " BGMI"
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "tournaments.section",
        className: "max-w-7xl mx-auto px-4 py-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-foreground", children: "Tournaments" }),
              activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  "data-ocid": "tournaments.active_count",
                  className: "bg-primary/20 text-primary border border-primary/40 font-display font-bold text-xs px-2 py-0.5 rounded-sm glow-primary",
                  children: [
                    activeCount,
                    " Active"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-body", children: [
              filtered.length,
              " contest",
              filtered.length !== 1 ? "s" : "",
              " found"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "tournaments.filters",
              className: "bg-card border border-border rounded-sm p-4 mb-6 space-y-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FilterRow,
                  {
                    label: "Game",
                    tabs: GAME_TABS,
                    active: gameFilter,
                    onChange: setGameFilter,
                    ocidPrefix: "filter.game"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FilterRow,
                  {
                    label: "Mode",
                    tabs: TEAM_TABS,
                    active: teamFilter,
                    onChange: setTeamFilter,
                    ocidPrefix: "filter.team"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FilterRow,
                  {
                    label: "Type",
                    tabs: CONTEST_TABS,
                    active: contestFilter,
                    onChange: setContestFilter,
                    ocidPrefix: "filter.contest"
                  }
                )
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCards, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "tournaments.empty_state",
              className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted/50 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "text-muted-foreground", size: 36 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-lg uppercase tracking-tight text-foreground mb-1", children: "No Contests Found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body max-w-xs", children: "No tournaments match your current filters. Adjust game, mode, or contest type to see more." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "tournaments.clear_filters_button",
                    onClick: clearFilters,
                    className: "btn-glow text-sm",
                    children: "Clear Filters"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "tournaments.list",
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              children: filtered.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: `/tournaments/${t.id}` }),
                  className: "cursor-pointer text-left w-full block",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TournamentCard,
                    {
                      tournament: t,
                      onJoin: handleJoin,
                      index: idx
                    }
                  )
                },
                t.id
              ))
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RegistrationModal,
      {
        open: !isRegistered && pendingJoin !== null,
        onRegister: handleRegistered
      }
    )
  ] });
}
export {
  HomePage as default
};
