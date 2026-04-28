import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import type { TournamentView } from "../types";
import { contestTypeLabel, teamModeLabel, timeUntil } from "../utils/format";
import { CoinBadge } from "./CoinBadge";
import { StatusBadge } from "./StatusBadge";

interface TournamentCardProps {
  tournament: TournamentView;
  onJoin?: (id: string) => void;
  index?: number;
}

const GAME_COLORS: Record<string, string> = {
  FreeFire: "text-primary bg-primary/15 border-primary/40",
  BGMI: "text-blue-400 bg-blue-400/15 border-blue-400/40",
};

export function TournamentCard({
  tournament,
  onJoin,
  index = 0,
}: TournamentCardProps) {
  const t = tournament;
  const fillPct = Math.round((t.currentParticipants / t.maxParticipants) * 100);
  const canJoin =
    !t.isJoined &&
    t.spotsLeft > 0 &&
    (t.status === "Upcoming" || t.status === "Live");
  const isFull = t.spotsLeft === 0;

  return (
    <article
      data-ocid={`tournament.item.${index + 1}`}
      className="card-gamer border-border relative flex flex-col overflow-hidden group cursor-pointer"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-smooth group-hover:opacity-100 opacity-60"
        style={{ background: "oklch(0.68 0.24 28)" }}
      />

      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span
            className={`text-xs font-bold font-display px-2 py-0.5 rounded-sm border uppercase tracking-wider ${GAME_COLORS[t.game] ?? ""}`}
          >
            {t.game === "FreeFire" ? "Free Fire" : t.game}
          </span>
          <StatusBadge status={t.status} />
        </div>

        <h3 className="font-display font-black text-sm md:text-base uppercase tracking-tight text-foreground leading-tight line-clamp-2 min-h-[2.5rem]">
          {t.title}
        </h3>
      </div>

      {/* Badges */}
      <div className="px-4 pb-3 flex flex-wrap gap-1.5">
        <span className="text-xs px-2 py-0.5 rounded-sm bg-secondary border border-border font-display font-semibold text-secondary-foreground uppercase">
          {teamModeLabel(t.teamMode)}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-sm bg-secondary border border-border font-display font-semibold text-secondary-foreground uppercase">
          {contestTypeLabel(t.contestType)}
        </span>
      </div>

      {/* Prize / Entry row */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-xs font-body mb-0.5 uppercase tracking-wider">
            Prize Pool
          </p>
          <CoinBadge amount={t.prizePool} variant="prize" size="lg" />
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-xs font-body mb-0.5 uppercase tracking-wider">
            Entry Fee
          </p>
          {t.entryFee === 0 ? (
            <span className="text-sm font-bold font-display text-accent">
              FREE
            </span>
          ) : (
            <CoinBadge amount={t.entryFee} variant="fee" size="md" />
          )}
        </div>
      </div>

      {/* Participants bar */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
            <Users size={11} />
            {t.currentParticipants}/{t.maxParticipants}
          </span>
          <span className="text-xs font-bold font-display text-accent">
            {t.spotsLeft} left
          </span>
        </div>
        <div className="h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-smooth"
            style={{
              width: `${fillPct}%`,
              background:
                fillPct >= 90 ? "oklch(0.68 0.24 28)" : "oklch(0.82 0.20 84)",
            }}
          />
        </div>
      </div>

      {/* Schedule */}
      {t.status === "Upcoming" && (
        <div className="px-4 pb-3">
          <span className="text-xs text-muted-foreground font-body">
            Starts in{" "}
            <span className="text-accent font-bold">
              {timeUntil(t.scheduledAt)}
            </span>
          </span>
        </div>
      )}

      {/* CTA */}
      <div className="px-4 pb-4 mt-auto pt-1">
        {t.isJoined ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-accent border-accent/40 bg-accent/5 font-display font-bold text-xs uppercase tracking-wider"
            disabled
          >
            ✓ Joined
          </Button>
        ) : canJoin ? (
          <Button
            data-ocid={`tournament.join_button.${index + 1}`}
            size="sm"
            className="w-full btn-glow font-display font-black text-xs uppercase tracking-widest"
            onClick={(e) => {
              e.stopPropagation();
              onJoin?.(t.id);
            }}
          >
            JOIN NOW
          </Button>
        ) : isFull ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full font-display font-bold text-xs uppercase tracking-wider"
            disabled
          >
            FULL
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full font-display font-bold text-xs uppercase tracking-wider text-muted-foreground"
            disabled
          >
            {t.status === "Completed" ? "Ended" : "Unavailable"}
          </Button>
        )}
      </div>
    </article>
  );
}
