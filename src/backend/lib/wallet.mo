import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import WTypes "../types/wallet";

module {
  public func getBalance(
    wallets : Map.Map<Common.UserId, Nat>,
    userId : Common.UserId,
  ) : Nat {
    switch (wallets.get(userId)) {
      case (?bal) bal;
      case null 0;
    };
  };

  public func debit(
    wallets : Map.Map<Common.UserId, Nat>,
    transactions : List.List<WTypes.Transaction>,
    txCounter : Common.Counter,
    userId : Common.UserId,
    amount : Nat,
    reason : Common.TransactionReason,
    tournamentId : ?Common.TournamentId,
  ) : { #ok; #insufficientFunds; #userNotFound } {
    switch (wallets.get(userId)) {
      case null #userNotFound;
      case (?bal) {
        if (bal < amount) return #insufficientFunds;
        wallets.add(userId, bal - amount);
        let tx : WTypes.Transaction = {
          id = txCounter.value;
          userId;
          txType = #Debit;
          amount;
          reason;
          timestamp = Time.now();
          tournamentId;
        };
        transactions.add(tx);
        txCounter.value += 1;
        #ok;
      };
    };
  };

  public func credit(
    wallets : Map.Map<Common.UserId, Nat>,
    transactions : List.List<WTypes.Transaction>,
    txCounter : Common.Counter,
    userId : Common.UserId,
    amount : Nat,
    reason : Common.TransactionReason,
    tournamentId : ?Common.TournamentId,
  ) {
    let current = switch (wallets.get(userId)) {
      case (?bal) bal;
      case null 0;
    };
    wallets.add(userId, current + amount);
    let tx : WTypes.Transaction = {
      id = txCounter.value;
      userId;
      txType = #Credit;
      amount;
      reason;
      timestamp = Time.now();
      tournamentId;
    };
    transactions.add(tx);
    txCounter.value += 1;
  };

  public func getTransactions(
    transactions : List.List<WTypes.Transaction>,
    userId : Common.UserId,
  ) : [WTypes.Transaction] {
    let filtered = transactions.filter(func(tx : WTypes.Transaction) : Bool {
      Principal.equal(tx.userId, userId)
    });
    let arr = filtered.toArray();
    arr.sort(func(a : WTypes.Transaction, b : WTypes.Transaction) : { #less; #equal; #greater } {
      if (a.timestamp > b.timestamp) #less
      else if (a.timestamp < b.timestamp) #greater
      else #equal
    });
  };

  public func adminAdjust(
    wallets : Map.Map<Common.UserId, Nat>,
    transactions : List.List<WTypes.Transaction>,
    txCounter : Common.Counter,
    userId : Common.UserId,
    amount : Nat,
    txType : Common.TransactionType,
  ) : { #ok; #userNotFound } {
    switch (wallets.get(userId)) {
      case null #userNotFound;
      case (?bal) {
        let newBal = switch txType {
          case (#Credit) bal + amount;
          case (#Debit) { if (bal >= amount) bal - amount else 0 };
        };
        wallets.add(userId, newBal);
        let tx : WTypes.Transaction = {
          id = txCounter.value;
          userId;
          txType;
          amount;
          reason = #Refund;
          timestamp = Time.now();
          tournamentId = null;
        };
        transactions.add(tx);
        txCounter.value += 1;
        #ok;
      };
    };
  };
};
