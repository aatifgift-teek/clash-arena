import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Flame, Gamepad2, Swords } from "lucide-react";
import { useMemo, useState } from "react";
import { RegistrationModal } from "../components/RegistrationModal";
import { TournamentCard } from "../components/TournamentCard";
import { useAuth } from "../hooks/useAuth";
import { useTournaments } from "../hooks/useTournaments";
import type { ContestType, Game, TeamMode, TournamentStatus } from "../types";

type GameFilter = "All" | Game;
type TeamFilter = "All" | TeamMode;
type ContestFilter = "All" | ContestType;

const GAME_TABS: { label: string; value: GameFilter }[] = [
  { label: "All Games", value: "All" },
  { label: "Free Fire", value: "FreeFire" },
  { label: "BGMI", value: "BGMI" },
];

const TEAM_TABS: { label: string; value: TeamFilter }[] = [
  { label: "All", value: "All" },
  { label: "Solo", value: "Solo" },
  { label: "Duo", value: "Duo" },
  { label: "Squad", value: "Squad" },
];

const CONTEST_TABS: { label: string; value: ContestFilter }[] = [
  { label: "All Types", value: "All" },
  { label: "Top Position", value: "TopPosition" },
  { label: "Most Kills", value: "MostKills" },
  { label: "Most Damage", value: "MostDamage" },
];

const STATUS_ORDER: Record<TournamentStatus, number> = {
  Live: 0,
  Upcoming: 1,
  Completed: 2,
  Cancelled: 3,
};

function FilterRow<T extends string>({
  label,
  tabs,
  active,
  onChange,
  ocidPrefix,
}: {
  label: string;
  tabs: { label: string; value: T }[];
  active: T;
  onChange: (v: T) => void;
  ocidPrefix: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className="text-xs font-display font-bold text-muted-foreground uppercase tracking-wider w-20 flex-shrink-0">
        {label}
      </span>
      <div className="flex gap-1 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            data-ocid={`${ocidPrefix}.${tab.value.toLowerCase()}`}
            onClick={() => onChange(tab.value)}
            className={`px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider rounded-sm border transition-smooth ${
              active === tab.value
                ? "bg-primary text-primary-foreground border-primary/60 glow-primary"
                : "bg-secondary text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-72 bg-muted rounded-sm" />
      ))}
    </div>
  );
}

export default function HomePage() {
  const { tournaments, joinTournament } = useTournaments();
  const { isAuthenticated, isRegistered, setRegistered } = useAuth();
  const navigate = useNavigate();
  const [gameFilter, setGameFilter] = useState<GameFilter>("All");
  const [teamFilter, setTeamFilter] = useState<TeamFilter>("All");
  const [contestFilter, setContestFilter] = useState<ContestFilter>("All");
  const [pendingJoin, setPendingJoin] = useState<string | null>(null);
  const [isLoading] = useState(false);

  const filtered = useMemo(() => {
    return tournaments
      .filter((t) => gameFilter === "All" || t.game === gameFilter)
      .filter((t) => teamFilter === "All" || t.teamMode === teamFilter)
      .filter((t) => contestFilter === "All" || t.contestType === contestFilter)
      .sort((a, b) => {
        const sd = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
        return sd !== 0 ? sd : a.scheduledAt - b.scheduledAt;
      });
  }, [tournaments, gameFilter, teamFilter, contestFilter]);

  const activeCount = useMemo(
    () =>
      tournaments.filter((t) => t.status === "Upcoming" || t.status === "Live")
        .length,
    [tournaments],
  );

  function handleJoin(id: string) {
    if (!isAuthenticated) return;
    if (!isRegistered) {
      setPendingJoin(id);
      return;
    }
    joinTournament(id);
    navigate({ to: `/tournaments/${id}` });
  }

  function handleRegistered(username: string) {
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

  return (
    <div data-ocid="home.page" className="min-h-screen">
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative overflow-hidden bg-card border-b border-border"
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.68 0.24 28 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 28 / 0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "oklch(0.68 0.24 28)" }}
        />
        <div
          className="absolute -bottom-12 right-8 w-56 h-56 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "oklch(0.82 0.2 84)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 text-center">
          {/* Flame icon */}
          <div className="inline-flex items-center justify-center mb-4">
            <Flame
              className="text-primary"
              size={44}
              style={{
                filter: "drop-shadow(0 0 14px oklch(0.68 0.24 28 / 0.9))",
              }}
            />
          </div>

          {/* Main title */}
          <h1
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-2"
            style={{
              textShadow:
                "0 0 30px oklch(0.68 0.24 28 / 0.7), 0 0 70px oklch(0.68 0.24 28 / 0.25)",
            }}
          >
            <span className="text-primary">FIRE</span>{" "}
            <span className="text-foreground">ARENA</span>
          </h1>

          {/* Tagline */}
          <p
            className="font-display font-bold text-base md:text-xl uppercase tracking-widest mb-6 text-accent"
            style={{ textShadow: "0 0 16px oklch(0.82 0.2 84 / 0.6)" }}
          >
            Compete. <span className="text-primary">Win.</span> Dominate.
          </p>

          {/* Game badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm border font-display font-bold text-xs uppercase tracking-wider text-primary bg-primary/10 border-primary/30">
              <Gamepad2 size={12} /> Free Fire
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm border font-display font-bold text-xs uppercase tracking-wider text-blue-400 bg-blue-400/10 border-blue-400/30">
              <Swords size={12} /> BGMI
            </span>
          </div>
        </div>
      </section>

      {/* ── Tournament Lobby ────────────────────────────────── */}
      <section
        data-ocid="tournaments.section"
        className="max-w-7xl mx-auto px-4 py-8"
      >
        {/* Section heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-foreground">
              Tournaments
            </h2>
            {activeCount > 0 && (
              <Badge
                data-ocid="tournaments.active_count"
                className="bg-primary/20 text-primary border border-primary/40 font-display font-bold text-xs px-2 py-0.5 rounded-sm glow-primary"
              >
                {activeCount} Active
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm font-body">
            {filtered.length} contest{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Filter bar */}
        <div
          data-ocid="tournaments.filters"
          className="bg-card border border-border rounded-sm p-4 mb-6 space-y-3"
        >
          <FilterRow
            label="Game"
            tabs={GAME_TABS}
            active={gameFilter}
            onChange={setGameFilter}
            ocidPrefix="filter.game"
          />
          <FilterRow
            label="Mode"
            tabs={TEAM_TABS}
            active={teamFilter}
            onChange={setTeamFilter}
            ocidPrefix="filter.team"
          />
          <FilterRow
            label="Type"
            tabs={CONTEST_TABS}
            active={contestFilter}
            onChange={setContestFilter}
            ocidPrefix="filter.contest"
          />
        </div>

        {/* Content area */}
        {isLoading ? (
          <SkeletonCards />
        ) : filtered.length === 0 ? (
          <div
            data-ocid="tournaments.empty_state"
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted/50 border border-border flex items-center justify-center">
              <Gamepad2 className="text-muted-foreground" size={36} />
            </div>
            <div>
              <h3 className="font-display font-black text-lg uppercase tracking-tight text-foreground mb-1">
                No Contests Found
              </h3>
              <p className="text-muted-foreground text-sm font-body max-w-xs">
                No tournaments match your current filters. Adjust game, mode, or
                contest type to see more.
              </p>
            </div>
            <button
              type="button"
              data-ocid="tournaments.clear_filters_button"
              onClick={clearFilters}
              className="btn-glow text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            data-ocid="tournaments.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => navigate({ to: `/tournaments/${t.id}` })}
                className="cursor-pointer text-left w-full block"
              >
                <TournamentCard
                  tournament={t}
                  onJoin={handleJoin}
                  index={idx}
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Registration modal triggered from join flow */}
      <RegistrationModal
        open={!isRegistered && pendingJoin !== null}
        onRegister={handleRegistered}
      />
    </div>
  );
}
