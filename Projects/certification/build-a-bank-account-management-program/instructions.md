Build a Bank Account Management Program

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

    You should define a class named BankAccount with a constructor. The constructor should set the default balance to 0 and initialize an empty array named transactions to store transaction records as objects.

    Each transaction stored in the transactions array should be an object with two properties: type and amount. The type property should be either deposit or withdraw, and the amount property should be the amount deposited or withdrawn.

    You should define a method named deposit that takes the deposit amount as a parameter. When the deposit amount is greater than 0, it should:
        Push a new object to the transactions array with a type of deposit and the amount deposited.
        Update the balance.
        Return "Successfully deposited $[amount]. New balance: $[balance]".

    If the amount is less than or equal to 0, the deposit method should return "Deposit amount must be greater than zero.".

    You should define a method named withdraw that takes an amount as a parameter. This method should update the current balance according to withdrawals. When the amount to be withdrawn is greater than 0 and less than or equal to the current balance, it should:
        Push a new object to the transactions array with a type of withdraw and the amount withdrawn.
        Update the balance.
        Return "Successfully withdrew $[amount]. New balance: $[balance]".

    If the amount to be withdrawn is less than or equal to 0 or greater than the current balance, the withdraw method should return "Insufficient balance or invalid amount.".

    You should define a method named checkBalance that returns the current balance in the format "Current balance: $[balance]".

    You should define a method named listAllDeposits that iterates through the transactions array and returns all deposits in the format "Deposits: amount,amount,...".

    You should define a method named listAllWithdrawals that iterates through the transactions array and returns all withdrawals in the format "Withdrawals: amount,amount,...".

    You should create a new instance of BankAccount named myAccount.

    Your myAccount bank account should have at least five transactions.

    Your myAccount bank account should have at least two deposits.

    Your myAccount bank account should have at least two withdrawals.

    Your myAccount bank account should have a balance greater than $100.

Tests:

    Passed: 1. You should define a class named BankAccount.
    Passed: 2. The BankAccount object should initially have a balance of 0 and an empty array transactions to store transaction records.
    Passed: 3. You should have a deposit method that takes the deposit amount as a parameter.
    Passed: 4. You should have a withdraw method that takes the withdrawal amount as a parameter.
    Passed: 5. You should have a checkBalance method that checks the current balance.
    Passed: 6. You should have a listAllDeposits method that lists all deposits.
    Passed: 7. You should have a listAllWithdrawals method that lists all withdrawals.
    Passed: 8. BankAccount.deposit(100) should return "Successfully deposited $100. New balance: $100".
    Passed: 9. BankAccount.deposit(-50) should return "Deposit amount must be greater than zero.".
    Passed: 10. BankAccount.deposit(0) should return "Deposit amount must be greater than zero.".
    Passed: 11. When the account balance is 100, BankAccount.withdraw(150) should return "Insufficient balance or invalid amount.".
    Passed: 12. BankAccount.withdraw(-50) should return "Insufficient balance or invalid amount.".
    Passed: 13. BankAccount.withdraw(0) should return "Insufficient balance or invalid amount.".
    Passed: 14. When the account balance is 200, BankAccount.withdraw(150) should return "Successfully withdrew $150. New balance: $50".
    Passed: 15. When the account balance is 200, BankAccount.checkBalance() should return "Current balance: $200".
    Passed: 16. When you deposit 10, 35, 90, the listAllDeposits method should return "Deposits: 10,35,90".
    Passed: 17. When you withdraw 20, 50, 100, the listAllWithdrawals method should return "Withdrawals: 20,50,100".
    Passed: 18. You should have an instance of BankAccount named myAccount.
    Passed: 19. Your myAccount bank account should have at least five transactions.
    Passed: 20. Your myAccount bank account should have at least two deposits.
    Passed: 21. Your myAccount bank account should have at least two withdrawals.
    Passed: 22. Your myAccount bank account should have a balance greater than $100.
