import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Common "../types/common";
import TTypes "../types/tournament";
import WTypes "../types/wallet";
import UTypes "../types/user";
import TournamentLib "../lib/tournament";
import UserLib "../lib/user";
import WalletLib "../lib/wallet";

mixin (
  tournaments : List.List<TTypes.Tournament>,
  participants : List.List<TTypes.Participant>,
  matchResults : List.List<TTypes.MatchResult>,
  users : List.List<UTypes.User>,
  admins : List.List<Common.UserId>,
  wallets : Map.Map<Common.UserId, Nat>,
  transactions : List.List<WTypes.Transaction>,
  tournamentCounter : Common.Counter,
  txCounter : Common.Counter,
) {

  // ── Tournament queries ────────────────────────────────────────────────

  public query func listTournaments() : async [TTypes.TournamentView] {
    TournamentLib.listTournaments(tournaments);
  };

  public query func getTournament(id : Common.TournamentId) : async ?TTypes.TournamentView {
    TournamentLib.getTournament(tournaments, id);
  };

  public query func getParticipants(id : Common.TournamentId) : async [TTypes.ParticipantView] {
    TournamentLib.getParticipants(participants, id);
  };

  public query func getMatchResults(tournamentId : Common.TournamentId) : async [TTypes.MatchResult] {
    TournamentLib.getMatchResults(matchResults, tournamentId);
  };

  // ── Tournament updates ────────────────────────────────────────────────

  public shared ({ caller }) func joinTournament(
    tournamentId : Common.TournamentId,
    teamName : ?Text,
  ) : async { #ok; #alreadyJoined; #tournamentFull; #notFound; #notJoinable; #insufficientFunds; #notRegistered } {
    if (not UserLib.isRegistered(users, caller)) return #notRegistered;
    switch (TournamentLib.getTournament(tournaments, tournamentId)) {
      case null return #notFound;
      case (?tview) {
        if (tview.entryFee > 0) {
          switch (WalletLib.debit(wallets, transactions, txCounter, caller, tview.entryFee, #EntryFee, ?tournamentId)) {
            case (#insufficientFunds) return #insufficientFunds;
            case (#userNotFound) return #insufficientFunds;
            case (#ok) {};
          };
        };
        switch (TournamentLib.joinTournament(tournaments, participants, tournamentId, caller, teamName)) {
          case (#ok) #ok;
          case (#alreadyJoined) {
            if (tview.entryFee > 0) {
              WalletLib.credit(wallets, transactions, txCounter, caller, tview.entryFee, #Refund, ?tournamentId);
            };
            #alreadyJoined;
          };
          case (#tournamentFull) {
            if (tview.entryFee > 0) {
              WalletLib.credit(wallets, transactions, txCounter, caller, tview.entryFee, #Refund, ?tournamentId);
            };
            #tournamentFull;
          };
          case (#notFound) #notFound;
          case (#notJoinable) {
            if (tview.entryFee > 0) {
              WalletLib.credit(wallets, transactions, txCounter, caller, tview.entryFee, #Refund, ?tournamentId);
            };
            #notJoinable;
          };
        };
      };
    };
  };

  // ── Admin tournament operations ───────────────────────────────────────

  public shared ({ caller }) func adminCreateTournament(
    args : TTypes.CreateTournamentArgs,
  ) : async { #ok : Common.TournamentId; #notAdmin } {
    if (not UserLib.isAdmin(admins, caller)) return #notAdmin;
    let id = TournamentLib.createTournament(tournaments, tournamentCounter, args);
    #ok(id);
  };

  public shared ({ caller }) func adminUpdateTournamentStatus(
    id : Common.TournamentId,
    status : Common.TournamentStatus,
  ) : async { #ok; #notFound; #notAdmin } {
    if (not UserLib.isAdmin(admins, caller)) return #notAdmin;
    if (TournamentLib.updateTournamentStatus(tournaments, id, status)) #ok
    else #notFound;
  };

  public shared ({ caller }) func adminPostRoomCode(
    id : Common.TournamentId,
    code : Text,
    password : ?Text,
  ) : async { #ok; #notFound; #notAdmin } {
    if (not UserLib.isAdmin(admins, caller)) return #notAdmin;
    if (TournamentLib.postRoomCode(tournaments, id, code, password)) #ok
    else #notFound;
  };

  public shared ({ caller }) func adminSubmitMatchResults(
    tournamentId : Common.TournamentId,
    results : [TTypes.MatchResult],
  ) : async { #ok; #notFound; #invalidStatus; #notAdmin } {
    if (not UserLib.isAdmin(admins, caller)) return #notAdmin;
    switch (TournamentLib.submitMatchResults(tournaments, participants, matchResults, wallets, transactions, txCounter, tournamentId, results)) {
      case (#ok) {
        for (r in results.values()) {
          UserLib.updateUserStats(users, r.userId, r.earnings, r.position == 1);
        };
        #ok;
      };
      case (#notFound) #notFound;
      case (#invalidStatus) #invalidStatus;
    };
  };
};
