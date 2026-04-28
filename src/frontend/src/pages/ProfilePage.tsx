import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Coins,
  Copy,
  Shield,
  Swords,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { CoinBadge } from "../components/CoinBadge";
import { useAuth } from "../hooks/useAuth";
import { useTournaments } from "../hooks/useTournaments";
import { useWallet } from "../hooks/useWallet";
import {
  contestTypeLabel,
  formatDateShort,
  teamModeLabel,
} from "../utils/format";

interface MatchEntry {
  tournamentId: string;
  tournamentTitle: string;
  game: string;
  mode: string;
  contestType: string;
  position: number;
  kills: number;
  earned: number;
  date: number;
}

const SEED_MATCHES: MatchEntry[] = [
  {
    tournamentId: "t4",
    tournamentTitle: "FREE FIRE NIGHT CLASH",
    game: "FreeFire",
    mode: "Solo",
    contestType: "TopPosition",
    position: 3,
    kills: 7,
    earned: 500,
    date: Date.now() - 24 * 3600 * 1000,
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
    date: Date.now() - 2 * 24 * 3600 * 1000,
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
    date: Date.now() - 3600 * 1000,
  },
];

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent?: boolean;
  delay?: number;
}

function StatCard({
  icon,
  label,
  value,
  accent = false,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`bg-card border rounded-sm p-4 flex flex-col gap-2 relative overflow-hidden ${
        accent
          ? "border-accent/50 glow-accent"
          : "border-border hover:border-primary/40"
      } transition-smooth`}
    >
      {accent && (
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
      )}
      <div
        className={`flex items-center gap-2 ${accent ? "text-accent" : "text-muted-foreground"}`}
      >
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider font-display">
          {label}
        </span>
      </div>
      <div
        className={`font-display font-black text-2xl md:text-3xl ${accent ? "text-accent" : "text-foreground"}`}
      >
        {value}
      </div>
    </motion.div>
  );
}

function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      data-ocid="profile.empty_state"
      className="flex flex-col items-center justify-center py-24 gap-6"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/40 glow-primary flex items-center justify-center">
        <Shield size={36} className="text-primary" />
      </div>
      <div className="text-center">
        <h2 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
          Login Required
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Sign in with Internet Identity to view your profile
        </p>
      </div>
      <Button
        data-ocid="profile.login_button"
        className="btn-glow gap-2"
        onClick={onLogin}
        type="button"
      >
        Login with Internet Identity
      </Button>
    </div>
  );
}

function GameBadge({ game }: { game: string }) {
  return (
    <Badge
      variant="outline"
      className={`text-xs font-bold font-display px-1.5 py-0 border ${
        game === "FreeFire"
          ? "border-primary/50 text-primary bg-primary/10"
          : "border-accent/50 text-accent bg-accent/10"
      }`}
    >
      {game === "FreeFire" ? "FF" : "BGMI"}
    </Badge>
  );
}

export default function ProfilePage() {
  const { isAuthenticated, username, principal, login } = useAuth();
  const { balance, transactions } = useWallet(1000);
  const { tournaments } = useTournaments();
  const [copied, setCopied] = useState(false);

  const totalMatches = SEED_MATCHES.length;
  const wins = SEED_MATCHES.filter((m) => m.position === 1).length;
  const winRate =
    totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;
  const totalEarnings = SEED_MATCHES.reduce((sum, m) => sum + m.earned, 0);
  const joinedCount = tournaments.filter((t) => t.isJoined).length;

  const initials = username
    ? username
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const joinedDate =
    transactions.length > 0
      ? new Date(
          Math.min(...transactions.map((t) => t.timestamp)),
        ).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
      : "Apr 2026";

  function copyPrincipal() {
    if (!principal) return;
    navigator.clipboard.writeText(principal).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function truncatePrincipal(p: string) {
    if (p.length <= 20) return p;
    return `${p.slice(0, 10)}...${p.slice(-8)}`;
  }

  if (!isAuthenticated) {
    return (
      <div className="px-4 md:px-6 max-w-5xl mx-auto">
        <LoginPrompt onLogin={login} />
      </div>
    );
  }

  return (
    <div
      data-ocid="profile.page"
      className="px-4 md:px-6 max-w-5xl mx-auto pb-12"
    >
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-card border border-border rounded-sm overflow-hidden mt-2 mb-6"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 sm:p-6">
          {/* Avatar */}
          <div data-ocid="profile.avatar" className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full border-2 border-primary glow-primary bg-primary/10 flex items-center justify-center">
              <span className="font-display font-black text-2xl text-primary">
                {initials}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-card" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1
                data-ocid="profile.username"
                className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-foreground leading-none"
              >
                {username || "Player"}
              </h1>
              <Badge
                variant="outline"
                className="border-accent/50 text-accent bg-accent/10 text-xs font-display font-bold"
              >
                <Zap size={10} className="mr-1" />
                ACTIVE
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs font-body">
              Member since {joinedDate}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <CoinBadge amount={balance} size="md" variant="prize" />
              <span className="text-muted-foreground text-xs">
                Current Balance
              </span>
            </div>
          </div>

          {/* Joined count pill */}
          <div className="hidden sm:flex flex-col items-center gap-1 px-4 py-3 bg-muted/40 border border-border rounded-sm">
            <span className="font-display font-black text-2xl text-primary">
              {joinedCount}
            </span>
            <span className="text-muted-foreground text-xs uppercase tracking-wider font-display">
              Joined
            </span>
          </div>
        </div>

        {/* Player ID Row */}
        {principal && (
          <div className="border-t border-border px-5 sm:px-6 py-3 flex items-center gap-3 bg-muted/20">
            <Shield size={13} className="text-muted-foreground flex-shrink-0" />
            <span
              data-ocid="profile.player_id"
              className="text-muted-foreground text-xs font-mono flex-1 min-w-0 truncate"
            >
              {truncatePrincipal(principal)}
            </span>
            <button
              type="button"
              data-ocid="profile.copy_id_button"
              onClick={copyPrincipal}
              className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-smooth font-display font-bold flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check size={12} />
                  COPIED
                </>
              ) : (
                <>
                  <Copy size={12} />
                  COPY ID
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>

      {/* Stats Row */}
      <div
        data-ocid="profile.stats_section"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
      >
        <StatCard
          icon={<Swords size={14} />}
          label="Matches"
          value={totalMatches}
          delay={0.05}
        />
        <StatCard
          icon={<Trophy size={14} />}
          label="Wins"
          value={wins}
          delay={0.1}
        />
        <StatCard
          icon={<TrendingUp size={14} />}
          label="Win Rate"
          value={`${winRate}%`}
          delay={0.15}
        />
        <StatCard
          icon={<Coins size={14} />}
          label="Total Earned"
          value={totalEarnings.toLocaleString()}
          accent
          delay={0.2}
        />
      </div>

      {/* Match History */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-card border border-border rounded-sm overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Target size={16} className="text-primary" />
          <h2 className="font-display font-black text-lg uppercase tracking-tight">
            Match History
          </h2>
        </div>

        {SEED_MATCHES.length === 0 ? (
          <div
            data-ocid="profile.match_history.empty_state"
            className="flex flex-col items-center gap-4 py-16 text-center px-6"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Swords size={28} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground text-sm uppercase tracking-wide">
                No matches yet
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Enter a tournament to start competing
              </p>
            </div>
            <Link to="/">
              <Button
                type="button"
                data-ocid="profile.browse_tournaments_button"
                className="btn-glow text-sm"
              >
                Browse Tournaments
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div
              data-ocid="profile.match_history.table"
              className="hidden md:block overflow-x-auto"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {[
                      "Tournament",
                      "Game",
                      "Mode",
                      "Contest",
                      "Pos / Kills",
                      "Earned",
                      "Date",
                    ].map((h) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-muted-foreground font-display font-bold text-xs uppercase tracking-wider ${h === "Pos / Kills" || h === "Earned" || h === "Date" ? "text-right" : "text-left"} first:px-5 last:px-5`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SEED_MATCHES.map((match, i) => (
                    <tr
                      key={match.tournamentId}
                      data-ocid={`profile.match_history.item.${i + 1}`}
                      className="border-b border-border/50 hover:bg-muted/20 transition-smooth"
                    >
                      <td className="px-5 py-3">
                        <Link
                          to="/tournaments/$id"
                          params={{ id: match.tournamentId }}
                          data-ocid={`profile.match_history.link.${i + 1}`}
                          className="font-display font-bold text-foreground hover:text-primary transition-smooth text-sm line-clamp-1"
                        >
                          {match.tournamentTitle}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <GameBadge game={match.game} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {teamModeLabel(match.mode)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {contestTypeLabel(match.contestType)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`font-display font-bold text-sm ${
                            match.position === 1
                              ? "text-accent"
                              : match.position <= 3
                                ? "text-primary"
                                : "text-foreground"
                          }`}
                        >
                          #{match.position}
                        </span>
                        <span className="text-muted-foreground text-xs ml-1">
                          · {match.kills}K
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {match.earned > 0 ? (
                          <CoinBadge
                            amount={match.earned}
                            size="sm"
                            variant="prize"
                          />
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right text-muted-foreground text-xs whitespace-nowrap">
                        {formatDateShort(match.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-border">
              {SEED_MATCHES.map((match, i) => (
                <div
                  key={match.tournamentId}
                  data-ocid={`profile.match_history.item.${i + 1}`}
                  className="px-4 py-3 hover:bg-muted/20 transition-smooth"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link
                      to="/tournaments/$id"
                      params={{ id: match.tournamentId }}
                      data-ocid={`profile.match_history.mobile_link.${i + 1}`}
                      className="font-display font-bold text-foreground hover:text-primary transition-smooth text-sm leading-tight flex-1 min-w-0 line-clamp-2"
                    >
                      {match.tournamentTitle}
                    </Link>
                    {match.earned > 0 ? (
                      <CoinBadge
                        amount={match.earned}
                        size="sm"
                        variant="prize"
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs flex-shrink-0">
                        No prize
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <GameBadge game={match.game} />
                    <span>{teamModeLabel(match.mode)}</span>
                    <span>·</span>
                    <span
                      className={`font-display font-bold ${
                        match.position === 1
                          ? "text-accent"
                          : match.position <= 3
                            ? "text-primary"
                            : "text-foreground"
                      }`}
                    >
                      Rank #{match.position}
                    </span>
                    <span>· {match.kills} kills</span>
                    <span>· {formatDateShort(match.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
