import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Common "../types/common";
import UTypes "../types/user";
import WTypes "../types/wallet";
import WalletLib "../lib/wallet";
import UserLib "../lib/user";

mixin (
  users : List.List<UTypes.User>,
  admins : List.List<Common.UserId>,
  wallets : Map.Map<Common.UserId, Nat>,
  transactions : List.List<WTypes.Transaction>,
  txCounter : Common.Counter,
) {

  public query ({ caller }) func getMyBalance() : async Nat {
    WalletLib.getBalance(wallets, caller);
  };

  public query ({ caller }) func getMyTransactions() : async [WTypes.Transaction] {
    WalletLib.getTransactions(transactions, caller);
  };

  // Admin-only: adjust a user's wallet balance
  public shared ({ caller }) func adminAdjustBalance(
    userId : Common.UserId,
    amount : Nat,
    txType : Common.TransactionType,
  ) : async { #ok; #userNotFound; #notAdmin } {
    if (not UserLib.isAdmin(admins, caller)) return #notAdmin;
    switch (WalletLib.adminAdjust(wallets, transactions, txCounter, userId, amount, txType)) {
      case (#ok) #ok;
      case (#userNotFound) #userNotFound;
    };
  };
};
