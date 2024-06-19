// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play Again
// import prompt from "prompt-sync";
const prompt = require("prompt-sync")();

const deposit = () => {
  while (true) {
    const depositAmount = prompt("How much money would you like to deposit? ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount < 0) {
      console.log("Please enter a valid amount");
      // deposit(); you can do this... or you can use while loop as well like so
    } else {
      // console.log(`You have deposited $${numberDepositAmount}`);
      return numberDepositAmount;
    }
  }
};

console.log("The deposited amount is $", deposit());
