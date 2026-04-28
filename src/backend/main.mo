import List "mo:core/List";
import Map "mo:core/Map";
import Common "types/common";
import TTypes "types/tournament";
import UTypes "types/user";
import WTypes "types/wallet";
import UserApi "mixins/user-api";
import WalletApi "mixins/wallet-api";
import TournamentApi "mixins/tournament-api";

actor {
  // ── State ─────────────────────────────────────────────────────────────
  let tournaments = List.empty<TTypes.Tournament>();
  let participants = List.empty<TTypes.Participant>();
  let matchResults = List.empty<TTypes.MatchResult>();
  let users = List.empty<UTypes.User>();
  let admins = List.empty<Common.UserId>();
  let wallets = Map.empty<Common.UserId, Nat>();
  let transactions = List.empty<WTypes.Transaction>();
  let tournamentCounter = Common.newCounter(1);
  let txCounter = Common.newCounter(1);

  // ── One-shot admin bootstrap (callable only while admins list is empty) ─
  public shared ({ caller }) func claimAdmin() : async { #ok; #alreadyClaimed; #anonymous } {
    if (caller.isAnonymous()) return #anonymous;
    if (not admins.isEmpty()) return #alreadyClaimed;
    admins.add(caller);
    #ok;
  };

  // ── Mixins ────────────────────────────────────────────────────────────
  include UserApi(users, admins, wallets, transactions, txCounter);
  include WalletApi(users, admins, wallets, transactions, txCounter);
  include TournamentApi(tournaments, participants, matchResults, users, admins, wallets, transactions, tournamentCounter, txCounter);
};
