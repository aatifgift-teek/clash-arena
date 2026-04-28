import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type TournamentId = Nat;
  public type TransactionId = Nat;
  public type Timestamp = Time.Time;

  public type Game = { #FreeFire; #BGMI };
  public type TeamMode = { #Solo; #Duo; #Squad };
  public type ContestType = { #TopPosition; #MostKills; #Damage };
  public type ViewMode = { #FPP; #TPP };

  public type TournamentStatus = {
    #Upcoming;
    #RoomCodePosted;
    #Live;
    #WaitingResults;
    #Completed;
    #Cancelled;
  };

  public type ParticipantStatus = { #Joined; #Eliminated; #Completed };
  public type TransactionType = { #Debit; #Credit };
  public type TransactionReason = { #EntryFee; #PrizeWin; #Refund; #Signup };

  // Mutable counter wrapper for passing by reference into mixins
  public type Counter = { var value : Nat };
  public func newCounter(start : Nat) : Counter = { var value = start };
};
