#! /usr/bin/env node
import inquirer from "inquirer";
//  bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount}successfull, Ramining balance is $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    // deposit balance
    deposite(amount) {
        if (amount > 100) {
            amount -= 1;
            // $1 fee charged if more than  $100
            this.balance += amount;
            console.log(`deposit of $${amount}successfull, Ramining balance is $${this.balance}`);
        }
    }
    // check balance
    checkBalance() {
        console.log(`Current Balance : $${this.balance}`);
    }
}
//   creat customers class
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// creat bank account
const Accounts = [
    new BankAccount(10001, 1000),
    new BankAccount(10002, 2000),
    new BankAccount(10003, 3000),
];
// creat customers
const customers = [
    new customer("nabeel", "khan", "male", 35, 3212223334, Accounts[0]),
    new customer("abdullah", "syed", "male", 25, 3212223335, Accounts[1]),
    new customer("nabeel", "khan", "male", 35, 3212223336, Accounts[2]),
];
// function  to interact with bank account 
async function service() {
    do {
        const accounNumberinput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number"
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accounNumberinput.accountNumber);
        if (customer) {
            console.log(`Welcome ${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["withdraw", "Deposit", "checkbalance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }
                    ]);
                    customer.account.deposite(depositAmount.amount);
                    break;
                case "withdraw":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        }
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "checkbalance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program....");
                    console.log("\n Thnaks for using our Bank services.Have a great day!");
                    return;
            }
            const moreActions = await inquirer.prompt([
                {
                    name: "more",
                    type: "confirm",
                    message: "Do you want to perform more actions?",
                    default: true,
                },
            ]);
            if (!moreActions.more) {
                console.log("Exiting bank program....");
                console.log("\nThanks for using our Bank services. Have a great day!");
                return;
            }
        }
        else {
            console.log("invalid Account Number, Please try again");
        }
    } while (true);
}
service();
