import { useState } from "react";
import type { Transaction } from "../types";

const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: "tx1",
    userId: "me",
    type: "AdminCredit",
    amount: 1000,
    description: "Welcome bonus coins",
    timestamp: Date.now() - 7 * 24 * 3600 * 1000,
  },
  {
    id: "tx2",
    userId: "me",
    type: "EntryFee",
    amount: -50,
    description: "Entry: INFERNO BLAZE — SOLO CUP",
    timestamp: Date.now() - 2 * 24 * 3600 * 1000,
    tournamentId: "t1",
  },
  {
    id: "tx3",
    userId: "me",
    type: "PrizeWin",
    amount: 500,
    description: "Prize: FREE FIRE NIGHT CLASH (Rank #3)",
    timestamp: Date.now() - 24 * 3600 * 1000,
    tournamentId: "t4",
  },
  {
    id: "tx4",
    userId: "me",
    type: "EntryFee",
    amount: -100,
    description: "Entry: THUNDERSTRIKE DUO WARS",
    timestamp: Date.now() - 3600 * 1000,
    tournamentId: "t2",
  },
];

export function useWallet(initialCoins: number) {
  const [balance, setBalance] = useState(initialCoins);
  const [transactions, setTransactions] =
    useState<Transaction[]>(SEED_TRANSACTIONS);

  function deduct(
    amount: number,
    description: string,
    tournamentId?: string,
  ): boolean {
    if (balance < amount) return false;
    setBalance((b) => b - amount);
    setTransactions((prev) => [
      {
        id: `tx${Date.now()}`,
        userId: "me",
        type: "EntryFee",
        amount: -amount,
        description,
        timestamp: Date.now(),
        tournamentId,
      },
      ...prev,
    ]);
    return true;
  }

  function credit(
    amount: number,
    description: string,
    tournamentId?: string,
  ): void {
    setBalance((b) => b + amount);
    setTransactions((prev) => [
      {
        id: `tx${Date.now()}`,
        userId: "me",
        type: "PrizeWin",
        amount,
        description,
        timestamp: Date.now(),
        tournamentId,
      },
      ...prev,
    ]);
  }

  return { balance, transactions, deduct, credit };
}
