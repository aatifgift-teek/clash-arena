export type Game = "FreeFire" | "BGMI";
export type TeamMode = "Solo" | "Duo" | "Squad";
export type ContestType = "TopPosition" | "MostKills" | "MostDamage";
export type TournamentStatus = "Upcoming" | "Live" | "Completed" | "Cancelled";
export type TransactionType =
  | "EntryFee"
  | "PrizeWin"
  | "Refund"
  | "AdminCredit";
export type ViewMode = "Grid" | "List";

export interface Tournament {
  id: string;
  title: string;
  game: Game;
  teamMode: TeamMode;
  contestType: ContestType;
  entryFee: number;
  prizePool: number;
  maxParticipants: number;
  currentParticipants: number;
  status: TournamentStatus;
  scheduledAt: number;
  roomCode?: string;
  roomPassword?: string;
  createdBy: string;
}

export interface TournamentView extends Tournament {
  isJoined: boolean;
  spotsLeft: number;
}

export interface User {
  principal: string;
  username: string;
  coins: number;
  totalWins: number;
  totalMatches: number;
  createdAt: number;
}

export interface UserView extends User {
  winRate: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  timestamp: number;
  tournamentId?: string;
}

export interface MatchResult {
  tournamentId: string;
  userId: string;
  username: string;
  kills: number;
  position: number;
  damage: number;
  score: number;
}

export interface ParticipantView {
  userId: string;
  username: string;
  joinedAt: number;
  teamMode: TeamMode;
}

export interface LeaderboardEntry extends MatchResult {
  rank: number;
  prize: number;
}
