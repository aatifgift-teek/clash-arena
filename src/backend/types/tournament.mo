import Types "../types/common";

module {
  public type Tournament = {
    id : Types.TournamentId;
    title : Text;
    game : Types.Game;
    teamMode : Types.TeamMode;
    contestType : Types.ContestType;
    viewMode : Types.ViewMode;
    entryFee : Nat;
    prizePool : Nat;
    maxParticipants : Nat;
    var currentParticipants : Nat;
    startTime : Types.Timestamp;
    var status : Types.TournamentStatus;
    var roomCode : ?Text;
    var roomPassword : ?Text;
  };

  public type TournamentView = {
    id : Types.TournamentId;
    title : Text;
    game : Types.Game;
    teamMode : Types.TeamMode;
    contestType : Types.ContestType;
    viewMode : Types.ViewMode;
    entryFee : Nat;
    prizePool : Nat;
    maxParticipants : Nat;
    currentParticipants : Nat;
    startTime : Types.Timestamp;
    status : Types.TournamentStatus;
    roomCode : ?Text;
    roomPassword : ?Text;
  };

  public type Participant = {
    tournamentId : Types.TournamentId;
    userId : Types.UserId;
    teamName : ?Text;
    var status : Types.ParticipantStatus;
  };

  public type ParticipantView = {
    tournamentId : Types.TournamentId;
    userId : Types.UserId;
    teamName : ?Text;
    status : Types.ParticipantStatus;
  };

  public type MatchResult = {
    tournamentId : Types.TournamentId;
    userId : Types.UserId;
    kills : Nat;
    position : Nat;
    damage : Nat;
    earnings : Nat;
  };

  public type CreateTournamentArgs = {
    title : Text;
    game : Types.Game;
    teamMode : Types.TeamMode;
    contestType : Types.ContestType;
    viewMode : Types.ViewMode;
    entryFee : Nat;
    prizePool : Nat;
    maxParticipants : Nat;
    startTime : Types.Timestamp;
  };
};
