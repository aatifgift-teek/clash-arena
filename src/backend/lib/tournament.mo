import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Common "../types/common";
import TTypes "../types/tournament";
import WTypes "../types/wallet";

module {
  func toView(t : TTypes.Tournament) : TTypes.TournamentView {
    {
      id = t.id;
      title = t.title;
      game = t.game;
      teamMode = t.teamMode;
      contestType = t.contestType;
      viewMode = t.viewMode;
      entryFee = t.entryFee;
      prizePool = t.prizePool;
      maxParticipants = t.maxParticipants;
      currentParticipants = t.currentParticipants;
      startTime = t.startTime;
      status = t.status;
      roomCode = t.roomCode;
      roomPassword = t.roomPassword;
    };
  };

  func participantToView(p : TTypes.Participant) : TTypes.ParticipantView {
    {
      tournamentId = p.tournamentId;
      userId = p.userId;
      teamName = p.teamName;
      status = p.status;
    };
  };

  public func createTournament(
    tournaments : List.List<TTypes.Tournament>,
    idCounter : Common.Counter,
    args : TTypes.CreateTournamentArgs,
  ) : Common.TournamentId {
    let t : TTypes.Tournament = {
      id = idCounter.value;
      title = args.title;
      game = args.game;
      teamMode = args.teamMode;
      contestType = args.contestType;
      viewMode = args.viewMode;
      entryFee = args.entryFee;
      prizePool = args.prizePool;
      maxParticipants = args.maxParticipants;
      var currentParticipants = 0;
      startTime = args.startTime;
      var status = #Upcoming;
      var roomCode = null;
      var roomPassword = null;
    };
    let id = idCounter.value;
    tournaments.add(t);
    idCounter.value += 1;
    id;
  };

  public func getTournament(
    tournaments : List.List<TTypes.Tournament>,
    id : Common.TournamentId,
  ) : ?TTypes.TournamentView {
    switch (tournaments.find(func(t : TTypes.Tournament) : Bool { t.id == id })) {
      case (?t) ?toView(t);
      case null null;
    };
  };

  public func listTournaments(
    tournaments : List.List<TTypes.Tournament>,
  ) : [TTypes.TournamentView] {
    let views = tournaments.map<TTypes.Tournament, TTypes.TournamentView>(func(t) { toView(t) });
    let arr = views.toArray();
    arr.sort(func(a : TTypes.TournamentView, b : TTypes.TournamentView) : { #less; #equal; #greater } {
      if (a.startTime < b.startTime) #less
      else if (a.startTime > b.startTime) #greater
      else #equal
    });
  };

  public func updateTournamentStatus(
    tournaments : List.List<TTypes.Tournament>,
    id : Common.TournamentId,
    status : Common.TournamentStatus,
  ) : Bool {
    var found = false;
    tournaments.mapInPlace(func(t : TTypes.Tournament) : TTypes.Tournament {
      if (t.id == id) {
        t.status := status;
        found := true;
        t
      } else t
    });
    found;
  };

  public func postRoomCode(
    tournaments : List.List<TTypes.Tournament>,
    id : Common.TournamentId,
    code : Text,
    password : ?Text,
  ) : Bool {
    var found = false;
    tournaments.mapInPlace(func(t : TTypes.Tournament) : TTypes.Tournament {
      if (t.id == id) {
        t.roomCode := ?code;
        t.roomPassword := password;
        t.status := #RoomCodePosted;
        found := true;
        t
      } else t
    });
    found;
  };

  public func joinTournament(
    tournaments : List.List<TTypes.Tournament>,
    participants : List.List<TTypes.Participant>,
    id : Common.TournamentId,
    userId : Common.UserId,
    teamName : ?Text,
  ) : { #ok; #alreadyJoined; #tournamentFull; #notFound; #notJoinable } {
    switch (tournaments.find(func(t : TTypes.Tournament) : Bool { t.id == id })) {
      case null #notFound;
      case (?t) {
        let joinable = switch (t.status) {
          case (#Upcoming) true;
          case (#RoomCodePosted) true;
          case _ false;
        };
        if (not joinable) return #notJoinable;
        if (t.currentParticipants >= t.maxParticipants) return #tournamentFull;
        let alreadyIn = participants.find(func(p : TTypes.Participant) : Bool {
          p.tournamentId == id and Principal.equal(p.userId, userId)
        });
        switch alreadyIn {
          case (?_) return #alreadyJoined;
          case null {};
        };
        let participant : TTypes.Participant = {
          tournamentId = id;
          userId;
          teamName;
          var status = #Joined;
        };
        participants.add(participant);
        t.currentParticipants += 1;
        #ok;
      };
    };
  };

  public func getParticipants(
    participants : List.List<TTypes.Participant>,
    id : Common.TournamentId,
  ) : [TTypes.ParticipantView] {
    participants
      .filter(func(p : TTypes.Participant) : Bool { p.tournamentId == id })
      .map<TTypes.Participant, TTypes.ParticipantView>(func(p) { participantToView(p) })
      .toArray();
  };

  func calcPrize(rank : Nat, prizePool : Nat) : Nat {
    if (rank == 1) prizePool * 50 / 100
    else if (rank == 2) prizePool * 30 / 100
    else if (rank == 3) prizePool * 20 / 100
    else 0;
  };

  public func submitMatchResults(
    tournaments : List.List<TTypes.Tournament>,
    participants : List.List<TTypes.Participant>,
    results : List.List<TTypes.MatchResult>,
    wallets : Map.Map<Common.UserId, Nat>,
    transactions : List.List<WTypes.Transaction>,
    txCounter : Common.Counter,
    tournamentId : Common.TournamentId,
    matchData : [TTypes.MatchResult],
  ) : { #ok; #notFound; #invalidStatus } {
    switch (tournaments.find(func(t : TTypes.Tournament) : Bool { t.id == tournamentId })) {
      case null return #notFound;
      case (?t) {
        let validStatus = switch (t.status) {
          case (#WaitingResults) true;
          case (#Live) true;
          case _ false;
        };
        if (not validStatus) return #invalidStatus;

        let sorted = matchData.sort(func(a : TTypes.MatchResult, b : TTypes.MatchResult) : Order.Order {
          switch (t.contestType) {
            case (#TopPosition) {
              if (a.position < b.position) #less
              else if (a.position > b.position) #greater
              else #equal
            };
            case (#MostKills) {
              if (a.kills > b.kills) #less
              else if (a.kills < b.kills) #greater
              else #equal
            };
            case (#Damage) {
              if (a.damage > b.damage) #less
              else if (a.damage < b.damage) #greater
              else #equal
            };
          }
        });

        for ((rank, result) in sorted.enumerate()) {
          let prize = calcPrize(rank + 1, t.prizePool);
          let finalResult : TTypes.MatchResult = {
            tournamentId = result.tournamentId;
            userId = result.userId;
            kills = result.kills;
            position = result.position;
            damage = result.damage;
            earnings = prize;
          };
          results.add(finalResult);

          if (prize > 0) {
            let currentBal = switch (wallets.get(result.userId)) {
              case (?b) b;
              case null 0;
            };
            wallets.add(result.userId, currentBal + prize);
            let tx : WTypes.Transaction = {
              id = txCounter.value;
              userId = result.userId;
              txType = #Credit;
              amount = prize;
              reason = #PrizeWin;
              timestamp = Time.now();
              tournamentId = ?tournamentId;
            };
            transactions.add(tx);
            txCounter.value += 1;
          };

          participants.mapInPlace(func(p : TTypes.Participant) : TTypes.Participant {
            if (p.tournamentId == tournamentId and Principal.equal(p.userId, result.userId)) {
              p.status := #Completed;
              p
            } else p
          });
        };

        t.status := #Completed;
        #ok;
      };
    };
  };

  public func getMatchResults(
    results : List.List<TTypes.MatchResult>,
    tournamentId : Common.TournamentId,
  ) : [TTypes.MatchResult] {
    results
      .filter(func(r : TTypes.MatchResult) : Bool { r.tournamentId == tournamentId })
      .toArray();
  };
};
