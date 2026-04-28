import Types "../types/common";

module {
  public type User = {
    id : Types.UserId;
    var username : Text;
    createdAt : Types.Timestamp;
    var totalEarnings : Nat;
    var matchesPlayed : Nat;
    var wins : Nat;
  };

  public type UserView = {
    id : Types.UserId;
    username : Text;
    createdAt : Types.Timestamp;
    totalEarnings : Nat;
    matchesPlayed : Nat;
    wins : Nat;
  };
};
