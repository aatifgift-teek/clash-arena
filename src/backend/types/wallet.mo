import Types "../types/common";

module {
  public type Transaction = {
    id : Types.TransactionId;
    userId : Types.UserId;
    txType : Types.TransactionType;
    amount : Nat;
    reason : Types.TransactionReason;
    timestamp : Types.Timestamp;
    tournamentId : ?Types.TournamentId;
  };
};
