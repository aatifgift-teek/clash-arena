import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Common "../types/common";
import UTypes "../types/user";
import WTypes "../types/wallet";
import UserLib "../lib/user";

mixin (
  users : List.List<UTypes.User>,
  admins : List.List<Common.UserId>,
  wallets : Map.Map<Common.UserId, Nat>,
  transactions : List.List<WTypes.Transaction>,
  txCounter : Common.Counter,
) {

  public shared ({ caller }) func register(username : Text) : async {
    #ok;
    #alreadyRegistered;
    #anonymous;
  } {
    UserLib.register(users, wallets, transactions, txCounter, caller, username);
  };

  public query ({ caller }) func getMyProfile() : async ?UTypes.UserView {
    UserLib.getProfile(users, caller);
  };

  public query func getProfile(userId : Common.UserId) : async ?UTypes.UserView {
    UserLib.getProfile(users, userId);
  };

  public query func listUsers() : async [UTypes.UserView] {
    UserLib.listUsers(users);
  };

  public query ({ caller }) func isRegistered() : async Bool {
    UserLib.isRegistered(users, caller);
  };
};
