console.log("— Bank Account Management Program —\n");

class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      return "Deposit amount must be greater than zero.";
    }

    this.transactions.push({
      type: "deposit",
      amount,
    });
    // fragile manual addition; consider an `updateBalance` helper to make it robust
    // actually no, gippidy said it's probably the clearest implementation possible
    this.balance += amount;
    return `Successfully deposited $${amount}. New balance: $${this.balance}`;
  }

  withdraw(amount) {
    if (amount <= 0 || amount > this.balance) {
      return "Insufficient balance or invalid amount.";
    }

    this.transactions.push({
      type: "withdraw",
      amount,
    });
    // fragile manual addition/subtraction; consider an `updateBalance` helper to make it robust
    this.balance -= amount;
    return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
  }

  checkBalance() {
    return `Current balance: $${this.balance}`;
  }

  listAllDeposits() {
    const depositAmounts = [];

    this.transactions.forEach((transaction) => {
      if (transaction.type === "deposit") {
        depositAmounts.push(transaction.amount);
      }
    });

    return `Deposits: ${depositAmounts.join()}`;
  }

  listAllWithdrawals() {
    const withdrawalAmounts = [];

    this.transactions.forEach((transaction) => {
      if (transaction.type === "withdraw") {
        withdrawalAmounts.push(transaction.amount);
      }
    });

    return `Withdrawals: ${withdrawalAmounts.join()}`;
  }
}

const myAccount = new BankAccount();
myAccount.deposit(75);
myAccount.withdraw(20);
myAccount.deposit(120);
myAccount.withdraw(50);
myAccount.deposit(67);
myAccount.deposit(67);
myAccount.deposit(67);

console.log(myAccount.checkBalance());
console.log(myAccount.listAllDeposits());
console.log(myAccount.listAllWithdrawals());

// notes from gippidy and myself
//
// 1. One edge case the fCC tests ignore: values such as NaN, "100", and Infinity can pass your amount <= 0 check and corrupt the balance or produce strange results. That is not a failure for this exercise—the user stories appear to assume ordinary numeric inputs—but in real software you would also validate that the input is a finite number.
// 2. Edge case the fCC tests ignore: values such as NaN, "100", and Infinity can pass your amount <= 0 check and corrupt the balance or produce strange results. That is not a failure for this exercise—the user stories appear to assume ordinary numeric inputs—but in real software you would also validate that the input is a finite number.
//  my fix: add `!Number.isFinite(amount)` check at the conditionals in both `.deposit()` and `.withdraw()`
//  this covers all: NaN, "100", and +-Infinity, even null.
//  `Number.isInteger()` shouldn't be used for an easy example like this, as an input of `12.50` should be a valid input.
//  in actual serious financial program, then money is usually stored as an integer number of the smallest currency unit:
//    $12.50 -> 1250
//  and if so, the program probably have a robust parser before working on the numbers anyway
