import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  Crosshair,
  Flame,
  MapPin,
  Shield,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { CoinBadge } from "../components/CoinBadge";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../hooks/useAuth";
import { useTournaments } from "../hooks/useTournaments";
import type { LeaderboardEntry } from "../types";
import type { ContestType } from "../types";
import { contestTypeLabel, formatDate, teamModeLabel } from "../utils/format";

// ─── Seed data per tournament ─────────────────────────────────────────────────
const LEADERBOARD_DATA: Record<string, LeaderboardEntry[]> = {
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
      prize: 1200,
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
      prize: 900,
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
      prize: 300,
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
      prize: 0,
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
      prize: 0,
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
      prize: 0,
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
      prize: 0,
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
      prize: 0,
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
      prize: 0,
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
      prize: 0,
    },
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
      prize: 4800,
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
      prize: 3600,
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
      prize: 1200,
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
      prize: 0,
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
      prize: 0,
    },
  ],
};

// ─── Scoring explanation per contest type ─────────────────────────────────────
const SCORING_RULES: Record<
  ContestType,
  {
    icon: React.ReactNode;
    title: string;
    desc: string;
    metrics: { label: string; value: string }[];
  }
> = {
  MostKills: {
    icon: <Crosshair size={16} className="text-destructive" />,
    title: "Kill Race",
    desc: "Rank is determined by total kills. Most kills wins. Ties broken by final position.",
    metrics: [
      { label: "Per Kill", value: "+6 pts" },
      { label: "Top 3 Position", value: "+15 pts" },
      { label: "Chicken Dinner", value: "+25 pts" },
    ],
  },
  TopPosition: {
    icon: <MapPin size={16} className="text-accent" />,
    title: "Survival Race",
    desc: "Rank is determined by final placement. Best position wins. Kills are tiebreaker.",
    metrics: [
      { label: "#1 Position", value: "+100 pts" },
      { label: "Top 3", value: "+60 pts" },
      { label: "Top 10", value: "+20 pts" },
    ],
  },
  MostDamage: {
    icon: <Shield size={16} className="text-primary" />,
    title: "Damage Race",
    desc: "Rank is determined by total damage dealt. Deal the most damage to win.",
    metrics: [
      { label: "Per 100 Damage", value: "+5 pts" },
      { label: "Per Kill", value: "+3 pts" },
      { label: "Survive to Top 5", value: "+10 pts" },
    ],
  },
};

// ─── Medal config ─────────────────────────────────────────────────────────────
const MEDALS = [
  {
    icon: <Trophy size={20} className="text-yellow-400" />,
    bg: "from-yellow-400/20 to-yellow-400/5 border-yellow-400/50",
    glow: "shadow-[0_0_20px_oklch(0.82_0.20_84_/_0.35)]",
    label: "text-yellow-400",
    rankLabel: "CHAMPION",
  },
  {
    icon: <Trophy size={18} className="text-muted-foreground" />,
    bg: "from-muted/40 to-muted/10 border-border",
    glow: "shadow-[0_0_12px_oklch(0.55_0_0_/_0.3)]",
    label: "text-muted-foreground",
    rankLabel: "2ND PLACE",
  },
  {
    icon: <Trophy size={16} className="text-primary" />,
    bg: "from-primary/20 to-primary/5 border-primary/40",
    glow: "shadow-[0_0_16px_oklch(0.68_0.24_28_/_0.3)]",
    label: "text-primary",
    rankLabel: "3RD PLACE",
  },
];

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span className="text-yellow-400 font-display font-black text-sm">
        👑
      </span>
    );
  if (rank === 2)
    return (
      <span className="text-muted-foreground font-display font-black text-sm">
        🥈
      </span>
    );
  if (rank === 3)
    return (
      <span className="text-primary font-display font-black text-sm">🥉</span>
    );
  return (
    <span className="font-display font-black text-sm text-muted-foreground w-6 text-center">
      #{rank}
    </span>
  );
}

export default function LeaderboardPage() {
  const { id } = useParams({ from: "/leaderboard/$id" });
  const navigate = useNavigate();
  const { username } = useAuth();
  const { getTournament } = useTournaments();

  const tournament = getTournament(id);
  const entries = LEADERBOARD_DATA[id] ?? [];
  const hasResults = entries.length > 0;

  // Current user's own result (simulated match by username)
  const myEntry = username
    ? entries.find((e) => e.username.toLowerCase() === username.toLowerCase())
    : null;

  if (!tournament) {
    return (
      <div
        data-ocid="leaderboard.error_state"
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <AlertTriangle size={48} className="text-destructive mb-4" />
        <p className="font-display font-bold text-xl uppercase">
          Tournament not found
        </p>
      </div>
    );
  }

  const t = tournament;
  const contestRule = SCORING_RULES[t.contestType];
  const top3 = entries.slice(0, 3);

  return (
    <div data-ocid="leaderboard.page" className="space-y-6">
      {/* Back */}
      <button
        type="button"
        data-ocid="leaderboard.back_button"
        onClick={() => navigate({ to: "/tournaments/$id", params: { id } })}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-display font-bold text-xs uppercase tracking-wide transition-colors duration-200"
      >
        <ArrowLeft size={14} /> Back to Tournament
      </button>

      {/* Header */}
      <PageHeader
        title="Leaderboard"
        accent={t.title}
        subtitle="Final match results and prize distribution"
      >
        <StatusBadge status={t.status} />
        <Badge
          variant="outline"
          className="border-accent/40 text-accent font-display font-bold text-xs uppercase flex items-center gap-1"
        >
          {contestRule.icon}
          {contestTypeLabel(t.contestType)}
        </Badge>
      </PageHeader>

      {/* My Result Banner (if current user has result) */}
      {myEntry && (
        <motion.div
          data-ocid="leaderboard.my_result_banner"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent/10 border border-accent/50 rounded-sm p-4 flex flex-wrap items-center gap-4 glow-accent"
        >
          <Flame size={18} className="text-accent flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-display font-black text-sm uppercase text-accent">
              Your Result
            </p>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              Rank #{myEntry.rank} • {myEntry.kills} kills • {myEntry.damage}{" "}
              dmg • Position #{myEntry.position}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {myEntry.prize > 0 ? (
              <CoinBadge amount={myEntry.prize} variant="prize" size="lg" />
            ) : (
              <span className="text-xs text-muted-foreground font-display font-bold uppercase">
                No prize
              </span>
            )}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main results column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Scoring explanation */}
          <div className="bg-card border border-border rounded-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              {contestRule.icon}
              <h2 className="font-display font-black text-sm uppercase tracking-wider text-foreground">
                {contestRule.title} — How Scoring Works
              </h2>
            </div>
            <p className="text-muted-foreground text-xs font-body mb-3">
              {contestRule.desc}
            </p>
            <div className="flex flex-wrap gap-3">
              {contestRule.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-2 bg-secondary border border-border rounded-sm px-3 py-1.5"
                >
                  <span className="text-xs text-muted-foreground font-body">
                    {m.label}
                  </span>
                  <span className="text-xs font-display font-black text-accent">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {!hasResults ? (
            /* Empty state */
            <div
              data-ocid="leaderboard.empty_state"
              className="bg-card border border-dashed border-border rounded-sm p-10 flex flex-col items-center justify-center text-center gap-4"
            >
              <Clock size={40} className="text-muted-foreground" />
              <div>
                <p className="font-display font-black text-lg uppercase tracking-wide text-foreground">
                  Results Not Yet Submitted
                </p>
                <p className="text-muted-foreground text-sm font-body mt-1">
                  Match results will appear here once the admin reviews and
                  publishes them.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                <StatusBadge status={t.status} />
                <span>Check back after the match ends</span>
              </div>
            </div>
          ) : (
            <>
              {/* Top 3 Podium */}
              {top3.length >= 3 && (
                <div data-ocid="leaderboard.podium_section">
                  <p className="font-display font-black text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <Trophy size={12} className="text-accent" /> Top 3 Champions
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {top3.map((entry, idx) => {
                      const medal = MEDALS[idx];
                      const isMe =
                        entry.username.toLowerCase() ===
                        (username?.toLowerCase() ?? "");
                      return (
                        <motion.div
                          key={entry.userId}
                          data-ocid={`leaderboard.podium.item.${idx + 1}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.12 }}
                          className={`bg-gradient-to-b ${medal.bg} ${medal.glow} border rounded-sm p-4 flex flex-col items-center gap-2 text-center relative overflow-hidden ${isMe ? "ring-2 ring-accent/60" : ""}`}
                        >
                          {isMe && (
                            <span className="absolute top-1.5 right-1.5 text-[9px] font-display font-black uppercase text-accent bg-accent/20 px-1.5 rounded-full">
                              YOU
                            </span>
                          )}
                          <div
                            className={`text-2xl font-display font-black ${medal.label}`}
                          >
                            {medal.icon}
                          </div>
                          <p
                            className={`font-display font-black text-[10px] uppercase tracking-widest ${medal.label}`}
                          >
                            {medal.rankLabel}
                          </p>
                          <p className="font-display font-bold text-sm text-foreground truncate w-full text-center">
                            {entry.username}
                          </p>
                          <div className="space-y-1 w-full">
                            <div className="flex justify-between text-[10px] text-muted-foreground font-body">
                              <span>Kills</span>
                              <span className="font-bold text-foreground">
                                {entry.kills}
                              </span>
                            </div>
                            <div className="flex justify-between text-[10px] text-muted-foreground font-body">
                              <span>Damage</span>
                              <span className="font-bold text-foreground">
                                {entry.damage}
                              </span>
                            </div>
                          </div>
                          {entry.prize > 0 && (
                            <CoinBadge
                              amount={entry.prize}
                              variant="prize"
                              size="sm"
                              className="mt-1"
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Full Results Table */}
              <div
                data-ocid="leaderboard.results_table"
                className="bg-card border border-border rounded-sm overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                  <Zap size={13} className="text-primary" />
                  <h3 className="font-display font-black text-sm uppercase tracking-wider text-foreground">
                    Full Rankings
                  </h3>
                  <span className="ml-auto text-xs text-muted-foreground font-body">
                    {entries.length} players
                  </span>
                </div>

                {/* Table header */}
                <div className="grid grid-cols-[40px_1fr_56px_56px_72px_80px] gap-1 px-4 py-2 bg-muted/30 border-b border-border text-[10px] font-display font-black uppercase tracking-widest text-muted-foreground">
                  <span>#</span>
                  <span>Player</span>
                  <span className="text-right">Kills</span>
                  <span className="text-right">Pos</span>
                  <span className="text-right">Dmg</span>
                  <span className="text-right">Prize</span>
                </div>

                {/* Rows */}
                <div className="divide-y divide-border">
                  {entries.map((entry, idx) => {
                    const isMe =
                      entry.username.toLowerCase() ===
                      (username?.toLowerCase() ?? "");
                    return (
                      <motion.div
                        key={entry.userId}
                        data-ocid={`leaderboard.results_table.item.${idx + 1}`}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: Math.min(idx * 0.04, 0.3) }}
                        className={`grid grid-cols-[40px_1fr_56px_56px_72px_80px] gap-1 px-4 py-3 items-center transition-colors duration-150 ${
                          isMe
                            ? "bg-accent/10 border-l-2 border-l-accent"
                            : entry.rank <= 3
                              ? "bg-muted/10 hover:bg-muted/20"
                              : "hover:bg-muted/10"
                        }`}
                      >
                        <div className="flex items-center justify-start">
                          <RankIcon rank={entry.rank} />
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`font-display font-bold text-sm truncate ${isMe ? "text-accent" : "text-foreground"}`}
                          >
                            {entry.username}
                            {isMe && (
                              <span className="ml-1.5 text-[9px] text-accent bg-accent/20 px-1 py-0.5 rounded-full font-black uppercase">
                                YOU
                              </span>
                            )}
                          </span>
                        </div>
                        <span className="text-right font-display font-bold text-sm text-foreground">
                          {entry.kills}
                        </span>
                        <span className="text-right font-display font-bold text-sm text-muted-foreground">
                          #{entry.position}
                        </span>
                        <span className="text-right font-body text-xs text-muted-foreground">
                          {entry.damage.toLocaleString()}
                        </span>
                        <div className="flex justify-end">
                          {entry.prize > 0 ? (
                            <CoinBadge
                              amount={entry.prize}
                              variant="prize"
                              size="sm"
                            />
                          ) : (
                            <span className="text-[10px] text-muted-foreground font-body">
                              —
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right: Tournament Info Panel */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-sm p-5 sticky top-20 space-y-4">
            <h2 className="font-display font-black text-sm uppercase tracking-wider text-muted-foreground">
              Tournament Info
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">
                  Game
                </span>
                <span className="font-display font-bold text-sm text-foreground">
                  {t.game === "FreeFire" ? "Free Fire" : t.game}
                </span>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">
                  Mode
                </span>
                <span className="font-display font-bold text-sm text-foreground">
                  {teamModeLabel(t.teamMode)}
                </span>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between items-start">
                <span className="text-xs font-body text-muted-foreground flex items-center gap-1 uppercase tracking-wider mt-0.5">
                  <Clock size={11} /> Played
                </span>
                <span className="font-display font-bold text-xs text-right text-foreground max-w-[130px]">
                  {formatDate(t.scheduledAt)}
                </span>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-body text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                  <Users size={11} /> Players
                </span>
                <span className="font-display font-bold text-sm text-foreground">
                  {t.currentParticipants}/{t.maxParticipants}
                </span>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">
                  Prize Pool
                </span>
                <CoinBadge amount={t.prizePool} variant="prize" size="md" />
              </div>
            </div>

            {/* Prize breakdown */}
            <div className="space-y-2">
              <p className="font-display font-black text-xs uppercase tracking-widest text-muted-foreground">
                Prize Breakdown
              </p>
              {[
                { rank: "🥇 1st Place", pct: 0.4, color: "text-yellow-400" },
                {
                  rank: "🥈 2nd Place",
                  pct: 0.3,
                  color: "text-muted-foreground",
                },
                { rank: "🥉 3rd Place", pct: 0.1, color: "text-primary" },
              ].map(({ rank, pct, color }) => (
                <div
                  key={rank}
                  className="flex justify-between items-center bg-secondary border border-border rounded-sm px-3 py-2"
                >
                  <span className={`font-display font-bold text-xs ${color}`}>
                    {rank}
                  </span>
                  <CoinBadge
                    amount={Math.round(t.prizePool * pct)}
                    variant="prize"
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
