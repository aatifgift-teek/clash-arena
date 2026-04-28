import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Check,
  CheckCheck,
  ChevronLeft,
  Clock,
  Copy,
  Flame,
  Lock,
  Shield,
  Trophy,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CoinBadge } from "../components/CoinBadge";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../hooks/useAuth";
import { useTournaments } from "../hooks/useTournaments";
import { useWallet } from "../hooks/useWallet";
import type { TournamentStatus, TournamentView } from "../types";
import {
  contestTypeLabel,
  formatCoins,
  formatDate,
  teamModeLabel,
  timeUntil,
} from "../utils/format";

// ─── Status Banner Config ─────────────────────────────────────────────────────
const STATUS_BANNER: Record<
  TournamentStatus,
  { label: string; classes: string }
> = {
  Upcoming: {
    label: "⏳ Tournament is Upcoming — Registrations Open!",
    classes: "bg-primary/10 border-primary/30 text-primary-foreground",
  },
  Live: {
    label: "🔴 Match is LIVE — Fight for Glory!",
    classes:
      "bg-destructive/20 border-destructive/50 text-destructive-foreground",
  },
  Completed: {
    label: "✅ Tournament Completed — Results Announced",
    classes: "bg-muted/60 border-border text-muted-foreground",
  },
  Cancelled: {
    label: "🚫 Tournament Cancelled — Entry Fees Refunded",
    classes: "bg-muted/40 border-border text-muted-foreground",
  },
};

function getStatusBanner(t: TournamentView): {
  label: string;
  classes: string;
} {
  if (t.status === "Live" && t.roomCode) {
    return {
      label: "🎮 Room Code Posted — Join the Match Now!",
      classes: "bg-yellow-950/60 border-yellow-500/50 text-yellow-300",
    };
  }
  if (t.status === "Live" && !t.roomCode) {
    return {
      label: "⏳ Waiting for Room Code — Stand By!",
      classes: "bg-amber-950/60 border-amber-500/40 text-amber-300",
    };
  }
  return STATUS_BANNER[t.status];
}

// ─── Prize breakdown ──────────────────────────────────────────────────────────
const PRIZE_SPLITS = [
  { rank: "1st Place", emoji: "🥇", pct: 50 },
  { rank: "2nd Place", emoji: "🥈", pct: 30 },
  { rank: "3rd Place", emoji: "🥉", pct: 20 },
];

// ─── Sample participant display names ─────────────────────────────────────────
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
  "RaidKing",
];

// ─── Leaderboard seed (completed tournaments) ─────────────────────────────────
const SEED_LEADERBOARD = [
  {
    rank: 1,
    username: "SnipeKing_99",
    kills: 15,
    position: 1,
    score: 95,
    prize: 2500,
  },
  {
    rank: 2,
    username: "BlazeMaster",
    kills: 12,
    position: 2,
    score: 82,
    prize: 1500,
  },
  {
    rank: 3,
    username: "NightStalker",
    kills: 10,
    position: 3,
    score: 70,
    prize: 1000,
  },
  {
    rank: 4,
    username: "FirePhoenix",
    kills: 8,
    position: 4,
    score: 60,
    prize: 0,
  },
  {
    rank: 5,
    username: "StormBreaker",
    kills: 7,
    position: 5,
    score: 55,
    prize: 0,
  },
];

// ─── Live countdown ───────────────────────────────────────────────────────────
function Countdown({ scheduledAt }: { scheduledAt: number }) {
  const [label, setLabel] = useState(() => timeUntil(scheduledAt));
  useEffect(() => {
    const id = setInterval(() => setLabel(timeUntil(scheduledAt)), 10_000);
    return () => clearInterval(id);
  }, [scheduledAt]);
  return <>{label}</>;
}

// ─── Copy button ──────────────────────────────────────────────────────────────
function CopyBtn({ text, ocid }: { text: string; ocid: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1.5 rounded-sm bg-muted/60 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-smooth"
      aria-label="Copy to clipboard"
      data-ocid={ocid}
    >
      {copied ? (
        <Check size={14} className="text-accent" />
      ) : (
        <Copy size={14} />
      )}
    </button>
  );
}

// ─── Join confirmation modal ──────────────────────────────────────────────────
interface JoinModalProps {
  open: boolean;
  entryFee: number;
  title: string;
  tournamentId: string;
  walletBalance: number;
  onConfirm: () => void;
  onCancel: () => void;
}
function JoinModal({
  open,
  entryFee,
  title,
  walletBalance,
  onConfirm,
  onCancel,
}: JoinModalProps) {
  const canAfford = walletBalance >= entryFee;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent
        className="bg-card border-border max-w-sm mx-4"
        data-ocid="join.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-lg uppercase tracking-wide text-foreground">
            Confirm Entry
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            You are joining{" "}
            <span className="text-foreground font-semibold">{title}</span>. The
            entry fee will be deducted from your wallet.
          </p>
          <div className="rounded-sm border border-border bg-background p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Entry Fee</span>
              <CoinBadge amount={entryFee} variant="fee" size="sm" />
            </div>
            <Separator className="bg-border" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Wallet size={13} /> Wallet Balance
              </span>
              <CoinBadge amount={walletBalance} size="sm" />
            </div>
            {!canAfford && (
              <p
                className="text-xs text-destructive font-semibold"
                data-ocid="join.error_state"
              >
                ⚠ Insufficient coins. You need {entryFee - walletBalance} more.
              </p>
            )}
          </div>
          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-border text-foreground"
              onClick={onCancel}
              data-ocid="join.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 btn-glow"
              onClick={onConfirm}
              disabled={!canAfford}
              data-ocid="join.confirm_button"
            >
              Join Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TournamentDetailPage() {
  const { id } = useParams({ from: "/tournaments/$id" });
  const navigate = useNavigate();
  const { getTournament, joinTournament } = useTournaments();
  const { isAuthenticated, isRegistered, login, coins } = useAuth();
  const { balance, deduct } = useWallet(coins);
  const [joinOpen, setJoinOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const tournament = getTournament(id);

  if (!tournament) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
        data-ocid="tournament_detail.empty_state"
      >
        <Flame size={48} className="text-primary opacity-40" />
        <p className="text-xl font-display font-bold text-muted-foreground uppercase">
          Tournament Not Found
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate({ to: "/" })}
          data-ocid="tournament_detail.back_button"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Arena
        </Button>
      </div>
    );
  }

  const t = tournament;
  const fillPct = Math.round((t.currentParticipants / t.maxParticipants) * 100);
  const statusBanner = getStatusBanner(t);

  const roomCodeVisible =
    !!t.roomCode &&
    (t.status === "Live" || t.status === "Completed") &&
    (joined || t.isJoined);

  const canJoin =
    isAuthenticated &&
    isRegistered &&
    !joined &&
    !t.isJoined &&
    t.spotsLeft > 0 &&
    (t.status === "Upcoming" || t.status === "Live");

  function handleConfirmJoin() {
    const ok = deduct(t.entryFee, `Entry: ${t.title}`, t.id);
    if (ok) {
      joinTournament(t.id);
      setJoined(true);
      setSuccessMsg("You've joined! Get ready to battle.");
    }
    setJoinOpen(false);
  }

  function handleCopyCode(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-6 space-y-5"
      data-ocid="tournament_detail.page"
    >
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate({ to: "/" })}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-smooth"
        data-ocid="tournament_detail.back_button"
      >
        <ChevronLeft size={16} /> Back to Arena
      </button>

      {/* Header */}
      <div className="bg-card border border-border rounded-sm p-5 space-y-3 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="flex flex-wrap gap-2 items-center">
          <Badge
            className={`font-bold text-xs uppercase tracking-wider ${t.game === "FreeFire" ? "bg-primary/20 border border-primary/40 text-primary" : "bg-secondary border border-border text-foreground/80"}`}
          >
            {t.game === "FreeFire" ? "🔥 Free Fire" : "🎮 BGMI"}
          </Badge>
          <Badge className="bg-secondary border border-border text-foreground/80 text-xs font-semibold uppercase">
            {teamModeLabel(t.teamMode)}
          </Badge>
          <Badge className="bg-accent/10 border border-accent/30 text-accent text-xs font-semibold uppercase">
            {contestTypeLabel(t.contestType)}
          </Badge>
          <StatusBadge status={t.status} />
        </div>

        <h1
          className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-foreground leading-tight"
          data-ocid="tournament_detail.title"
        >
          {t.title}
        </h1>

        {/* Status Banner */}
        <div
          className={`flex items-center gap-2 rounded-sm border px-3 py-2 text-sm font-semibold ${statusBanner.classes}`}
          data-ocid="tournament_detail.status_banner"
        >
          {statusBanner.label}
        </div>

        {/* Success */}
        {successMsg && (
          <div
            className="flex items-center gap-2 rounded-sm border border-accent/40 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent"
            data-ocid="tournament_detail.success_state"
          >
            <Check size={15} /> {successMsg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left column */}
        <div className="lg:col-span-3 space-y-5">
          {/* Prize Pool */}
          <div className="bg-card border border-border rounded-sm p-5 space-y-4">
            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Trophy size={14} className="text-accent" /> Prize Pool
            </h2>
            <div className="flex items-baseline gap-3">
              <span className="text-prize font-display font-bold text-3xl">
                {formatCoins(t.prizePool)}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Total
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {PRIZE_SPLITS.map((ps) => (
                <div
                  key={ps.rank}
                  className="flex flex-col items-center gap-1 bg-background border border-border rounded-sm py-3 px-2"
                >
                  <span className="text-xl">{ps.emoji}</span>
                  <span className="text-xs text-muted-foreground font-semibold uppercase">
                    {ps.rank}
                  </span>
                  <CoinBadge
                    amount={Math.round((t.prizePool * ps.pct) / 100)}
                    variant="prize"
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Match Details */}
          <div className="bg-card border border-border rounded-sm p-5 space-y-3">
            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Zap size={14} className="text-primary" /> Match Details
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  Game
                </span>
                <span className="font-semibold text-foreground">
                  {t.game === "FreeFire" ? "Free Fire" : "BGMI"}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  Mode
                </span>
                <span className="font-semibold text-foreground">
                  {teamModeLabel(t.teamMode)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs uppercase tracking-wider flex items-center gap-1">
                  <Clock size={11} /> Start Time
                </span>
                <span className="font-semibold text-foreground">
                  <Countdown scheduledAt={t.scheduledAt} />
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  Scheduled
                </span>
                <span className="font-semibold text-foreground text-xs">
                  {formatDate(t.scheduledAt)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  Max Players
                </span>
                <span className="font-semibold text-foreground">
                  {t.maxParticipants}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  Contest
                </span>
                <span className="font-semibold text-foreground">
                  {contestTypeLabel(t.contestType)}
                </span>
              </div>
            </div>
          </div>

          {/* Room Code */}
          {t.roomCode && (
            <div
              className="bg-card border border-yellow-500/40 rounded-sm p-5 space-y-3"
              data-ocid="tournament_detail.room_code_section"
            >
              <h2 className="font-display font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2">
                <Lock size={14} /> Room Code
              </h2>
              {roomCodeVisible ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-background border border-border rounded-sm px-3 py-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Room ID
                      </span>
                      <code className="font-mono text-accent text-lg font-bold tracking-widest">
                        {t.roomCode}
                      </code>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(t.roomCode ?? "")}
                      className="p-1.5 rounded-sm bg-muted/60 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label="Copy room code"
                      data-ocid="tournament_detail.copy_room_code_button"
                    >
                      {copied ? (
                        <CheckCheck size={14} className="text-accent" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                  {t.roomPassword && (
                    <div className="flex items-center justify-between bg-background border border-border rounded-sm px-3 py-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          Password
                        </span>
                        <code className="font-mono text-primary text-lg font-bold tracking-widest">
                          {t.roomPassword}
                        </code>
                      </div>
                      <CopyBtn
                        text={t.roomPassword}
                        ocid="tournament_detail.copy_password_button"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p
                  className="text-sm text-muted-foreground"
                  data-ocid="tournament_detail.room_code_locked"
                >
                  🔒 Join the tournament to see the room code.
                </p>
              )}
            </div>
          )}

          {/* Leaderboard for completed tournaments */}
          {t.status === "Completed" && (
            <div
              className="bg-card border border-border rounded-sm p-5 space-y-3"
              data-ocid="tournament_detail.leaderboard_section"
            >
              <h2 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Trophy size={14} className="text-accent" /> Final Results
              </h2>
              <div className="space-y-2">
                {SEED_LEADERBOARD.map((entry, idx) => (
                  <div
                    key={entry.username}
                    className={`flex items-center gap-3 p-3 rounded-sm border ${
                      entry.rank === 1
                        ? "border-yellow-400/30 bg-yellow-400/5"
                        : entry.rank === 2
                          ? "border-border bg-muted/20"
                          : "border-border bg-muted/10"
                    }`}
                    data-ocid={`tournament_detail.leaderboard.item.${idx + 1}`}
                  >
                    <span
                      className={`font-display font-black text-base w-6 text-center ${
                        entry.rank === 1
                          ? "text-accent"
                          : entry.rank === 2
                            ? "text-muted-foreground"
                            : entry.rank === 3
                              ? "text-primary"
                              : "text-muted-foreground"
                      }`}
                    >
                      #{entry.rank}
                    </span>
                    <span className="font-display font-bold text-sm flex-1 truncate">
                      {entry.username}
                    </span>
                    <span className="text-xs text-muted-foreground font-body">
                      {entry.kills} kills
                    </span>
                    {entry.prize > 0 && (
                      <CoinBadge
                        amount={entry.prize}
                        variant="prize"
                        size="sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Join Panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-sm p-5 space-y-4 lg:sticky lg:top-20">
            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground">
              Tournament Info
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Prize Pool
                </span>
                <CoinBadge amount={t.prizePool} variant="prize" size="lg" />
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Entry Fee
                </span>
                {t.entryFee === 0 ? (
                  <span className="text-sm font-bold font-display text-accent">
                    FREE
                  </span>
                ) : (
                  <CoinBadge amount={t.entryFee} variant="fee" size="md" />
                )}
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                  <Users size={11} /> Players
                </span>
                <span className="font-display font-bold text-sm">
                  {t.currentParticipants}/{t.maxParticipants}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden border border-border">
                <div
                  className="h-full rounded-full transition-all duration-700 bg-primary"
                  style={{ width: `${fillPct}%` }}
                />
              </div>
              {t.spotsLeft > 0 && t.status !== "Completed" ? (
                <p className="text-xs text-accent font-semibold">
                  {t.spotsLeft} spots remaining
                </p>
              ) : t.status !== "Completed" ? (
                <p className="text-xs text-destructive font-semibold">
                  No spots left
                </p>
              ) : null}
            </div>

            {/* CTA */}
            {!isAuthenticated ? (
              <Button
                type="button"
                className="w-full btn-glow font-display font-black text-sm uppercase tracking-widest"
                onClick={login}
                data-ocid="tournament_detail.login_button"
              >
                🔑 Login to Join
              </Button>
            ) : joined || t.isJoined ? (
              <div
                className="w-full text-center py-3 rounded-sm border border-accent/40 bg-accent/10 text-accent font-display font-black text-sm uppercase tracking-wider"
                data-ocid="tournament_detail.joined_state"
              >
                ✓ You're In! Get Ready.
              </div>
            ) : t.status === "Completed" || t.status === "Cancelled" ? (
              <div className="space-y-2">
                <div
                  className="w-full text-center py-3 rounded-sm border border-border bg-muted/20 text-muted-foreground font-display font-bold text-sm uppercase tracking-wider"
                  data-ocid="tournament_detail.closed_state"
                >
                  {t.status === "Completed"
                    ? "Tournament Ended"
                    : "Tournament Cancelled"}
                </div>
                {t.status === "Completed" && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full font-display font-black text-xs uppercase tracking-widest border-accent/40 text-accent hover:bg-accent/10"
                    onClick={() =>
                      navigate({ to: "/leaderboard/$id", params: { id: t.id } })
                    }
                    data-ocid="tournament_detail.view_leaderboard_button"
                  >
                    <Trophy size={13} className="mr-1.5" /> View Leaderboard
                  </Button>
                )}
              </div>
            ) : canJoin ? (
              <Button
                type="button"
                className="w-full btn-glow font-display font-black text-sm uppercase tracking-widest"
                onClick={() => setJoinOpen(true)}
                data-ocid="tournament_detail.join_button"
              >
                🎯 Join — {t.entryFee === 0 ? "FREE" : `${t.entryFee} coins`}
              </Button>
            ) : !isRegistered ? (
              <p
                className="text-center text-muted-foreground text-xs"
                data-ocid="tournament_detail.register_prompt"
              >
                Complete registration to join tournaments.
              </p>
            ) : (
              <div
                className="w-full text-center py-3 rounded-sm border border-border bg-muted/20 text-muted-foreground font-display font-bold text-sm uppercase tracking-wider"
                data-ocid="tournament_detail.full_state"
              >
                Tournament Full
              </div>
            )}
          </div>

          {/* Participants list */}
          <div className="bg-card border border-border rounded-sm p-5 space-y-3">
            <h2 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Shield size={13} className="text-primary" /> Participants
            </h2>
            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {SAMPLE_PARTICIPANTS.slice(0, t.currentParticipants).map(
                (name, i) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 bg-background border border-border rounded-sm px-2 py-1.5"
                    data-ocid={`tournament_detail.participant.item.${i + 1}`}
                  >
                    <Shield
                      size={11}
                      className="text-muted-foreground flex-shrink-0"
                    />
                    <span className="text-xs font-semibold text-foreground truncate">
                      {name}
                    </span>
                  </div>
                ),
              )}
              {(joined || t.isJoined) && (
                <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-sm px-2 py-1.5">
                  <Shield size={11} className="text-accent flex-shrink-0" />
                  <span className="text-xs font-bold text-accent truncate">
                    You ✓
                  </span>
                </div>
              )}
              {t.currentParticipants === 0 && (
                <p className="text-xs text-muted-foreground text-center py-2">
                  No participants yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <JoinModal
        open={joinOpen}
        entryFee={t.entryFee}
        title={t.title}
        tournamentId={t.id}
        walletBalance={balance}
        onConfirm={handleConfirmJoin}
        onCancel={() => setJoinOpen(false)}
      />
    </div>
  );
}
