import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import UTypes "../types/user";
import WTypes "../types/wallet";

module {
  func toView(u : UTypes.User) : UTypes.UserView {
    {
      id = u.id;
      username = u.username;
      createdAt = u.createdAt;
      totalEarnings = u.totalEarnings;
      matchesPlayed = u.matchesPlayed;
      wins = u.wins;
    };
  };

  public func register(
    users : List.List<UTypes.User>,
    wallets : Map.Map<Common.UserId, Nat>,
    transactions : List.List<WTypes.Transaction>,
    txCounter : Common.Counter,
    caller : Common.UserId,
    username : Text,
  ) : { #ok; #alreadyRegistered; #anonymous } {
    if (caller.isAnonymous()) return #anonymous;
    let exists = users.find(func(u : UTypes.User) : Bool {
      Principal.equal(u.id, caller)
    });
    switch exists {
      case (?_) return #alreadyRegistered;
      case null {};
    };
    let user : UTypes.User = {
      id = caller;
      var username;
      createdAt = Time.now();
      var totalEarnings = 0;
      var matchesPlayed = 0;
      var wins = 0;
    };
    users.add(user);
    // Grant 500 signup coins
    wallets.add(caller, 500);
    let tx : WTypes.Transaction = {
      id = txCounter.value;
      userId = caller;
      txType = #Credit;
      amount = 500;
      reason = #Signup;
      timestamp = Time.now();
      tournamentId = null;
    };
    transactions.add(tx);
    txCounter.value += 1;
    #ok;
  };

  public func getProfile(
    users : List.List<UTypes.User>,
    userId : Common.UserId,
  ) : ?UTypes.UserView {
    switch (users.find(func(u : UTypes.User) : Bool { Principal.equal(u.id, userId) })) {
      case (?u) ?toView(u);
      case null null;
    };
  };

  public func listUsers(
    users : List.List<UTypes.User>,
  ) : [UTypes.UserView] {
    users.map<UTypes.User, UTypes.UserView>(func(u) { toView(u) }).toArray();
  };

  public func isRegistered(
    users : List.List<UTypes.User>,
    userId : Common.UserId,
  ) : Bool {
    switch (users.find(func(u : UTypes.User) : Bool { Principal.equal(u.id, userId) })) {
      case (?_) true;
      case null false;
    };
  };

  public func isAdmin(
    admins : List.List<Common.UserId>,
    caller : Common.UserId,
  ) : Bool {
    switch (admins.find(func(a : Common.UserId) : Bool { Principal.equal(a, caller) })) {
      case (?_) true;
      case null false;
    };
  };

  public func updateUserStats(
    users : List.List<UTypes.User>,
    userId : Common.UserId,
    earnings : Nat,
    won : Bool,
  ) {
    users.mapInPlace(func(u : UTypes.User) : UTypes.User {
      if (Principal.equal(u.id, userId)) {
        u.totalEarnings += earnings;
        u.matchesPlayed += 1;
        if (won) u.wins += 1;
        u
      } else u
    });
  };
};
