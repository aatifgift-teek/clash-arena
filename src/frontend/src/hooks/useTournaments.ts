import { useState } from "react";
import type { TournamentView } from "../types";

// Seeded tournament data (backend integration ready)
const SEED_TOURNAMENTS: TournamentView[] = [
  {
    id: "t1",
    title: "INFERNO BLAZE — SOLO CUP",
    game: "FreeFire",
    teamMode: "Solo",
    contestType: "MostKills",
    entryFee: 50,
    prizePool: 5000,
    maxParticipants: 100,
    currentParticipants: 72,
    status: "Upcoming",
    scheduledAt: Date.now() + 2 * 3600 * 1000,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 28,
  },
  {
    id: "t2",
    title: "THUNDERSTRIKE DUO WARS",
    game: "FreeFire",
    teamMode: "Duo",
    contestType: "TopPosition",
    entryFee: 100,
    prizePool: 12000,
    maxParticipants: 50,
    currentParticipants: 48,
    status: "Live",
    scheduledAt: Date.now() - 3600 * 1000,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 2,
  },
  {
    id: "t3",
    title: "BGMI SQUAD MASSACRE",
    game: "BGMI",
    teamMode: "Squad",
    contestType: "MostDamage",
    entryFee: 200,
    prizePool: 25000,
    maxParticipants: 25,
    currentParticipants: 20,
    status: "Upcoming",
    scheduledAt: Date.now() + 5 * 3600 * 1000,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 5,
  },
  {
    id: "t4",
    title: "FREE FIRE NIGHT CLASH",
    game: "FreeFire",
    teamMode: "Solo",
    contestType: "TopPosition",
    entryFee: 30,
    prizePool: 3000,
    maxParticipants: 100,
    currentParticipants: 100,
    status: "Completed",
    scheduledAt: Date.now() - 24 * 3600 * 1000,
    createdBy: "admin",
    isJoined: true,
    spotsLeft: 0,
  },
  {
    id: "t5",
    title: "BGMI KING OF KILLS",
    game: "BGMI",
    teamMode: "Solo",
    contestType: "MostKills",
    entryFee: 75,
    prizePool: 8000,
    maxParticipants: 100,
    currentParticipants: 40,
    status: "Upcoming",
    scheduledAt: Date.now() + 12 * 3600 * 1000,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 60,
  },
  {
    id: "t6",
    title: "FIRE ARENA GRAND PRIX",
    game: "FreeFire",
    teamMode: "Squad",
    contestType: "TopPosition",
    entryFee: 500,
    prizePool: 100000,
    maxParticipants: 25,
    currentParticipants: 10,
    status: "Upcoming",
    scheduledAt: Date.now() + 48 * 3600 * 1000,
    createdBy: "admin",
    isJoined: false,
    spotsLeft: 15,
  },
];

export function useTournaments() {
  const [tournaments, setTournaments] =
    useState<TournamentView[]>(SEED_TOURNAMENTS);

  function joinTournament(id: string): boolean {
    setTournaments((prev) =>
      prev.map((t) =>
        t.id === id &&
        t.spotsLeft > 0 &&
        t.status !== "Completed" &&
        t.status !== "Cancelled"
          ? {
              ...t,
              isJoined: true,
              currentParticipants: t.currentParticipants + 1,
              spotsLeft: t.spotsLeft - 1,
            }
          : t,
      ),
    );
    return true;
  }

  function getTournament(id: string): TournamentView | undefined {
    return tournaments.find((t) => t.id === id);
  }

  return { tournaments, joinTournament, getTournament };
}
