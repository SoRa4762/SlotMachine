// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play Again
// 8. Check if the user has enough money to play

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_VALUES = {
  A: 10,
  B: 7,
  C: 5,
  D: 2,
};

const SYMBOL_COUNT = {
  A: 3,
  B: 6,
  C: 8,
  D: 10,
};

const getDeposit = () => {
  while (true) {
    const deposit = prompt("How much money would you like to deposit? ");
    // const deposit = 12;
    const depositAmount = parseFloat(deposit);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      console.log("Please enter a valid amount of money.");
    } else {
      return depositAmount;
    }
  }
};

const getLines = () => {
  while (true) {
    const lines = prompt("How many lines would you like to bet on? (1-3) ");
    const numberofLines = parseFloat(lines);

    if (isNaN(numberofLines) || numberofLines < 1 || numberofLines > 3) {
      console.log("Please enter a valid number of lines.");
    } else {
      return numberofLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("How much would you like to bet? ");
    const betAmount = parseFloat(bet);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance * lines) {
      console.log("Please enter a valid amount of money.");
    } else {
      return betAmount;
    }
  }
};

const spin = () => {
  const symbols = [];
  const reels = [];

  for (const symbol of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < symbol[1]; i++) {
      symbols.push(symbol[0]);
    }
  }

  for (let i = 0; i < COLS; i++) {
    const newSymbols = [...symbols];
    reels.push([]);
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * (newSymbols.length - 1));
      reels[i].push(newSymbols[randomIndex]);
      newSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const newReels = [];

  for (i = 0; i < COLS; i++) {
    newReels.push([]);
    for (j = 0; j < ROWS; j++) {
      newReels[i].push(reels[j][i]);
    }
  }
  return newReels;
};

const beautify = (transpose) => {
  for (const rows of transpose) {
    let stringify = "";
    for ([i, symbol] of rows.entries()) {
      //could have done row of rows, but that would not have given i, and that would have messed up the formatting
      stringify += symbol;

      if (i < rows.length - 1) {
        stringify += " | ";
      }
    }
    console.log(stringify);
  }
};

const checkWinning = (bet, lines, transpose) => {
  let winnings = 0;

  for (let i = 0; i < lines; i++) {
    const symbols = transpose[i];
    let isSame = true;

    for (let j = 1; j < symbols.length; j++) {
      if (symbols[j] !== symbols[0]) {
        isSame = false;
        break;
      }
    }

    if (!isSame) {
      return winnings;
    } else {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
      return winnings;
    }
  }
};

const game = () => {
  let balance = getDeposit();
  while (true) {
    console.log(`You have $${balance} in your account`);
    const lines = getLines();
    const bet = getBet(balance, lines);
    balance -= bet * lines;

    const reels = spin();
    const tranpose = transpose(reels);
    beautify(tranpose);
    const winning = checkWinning(bet, lines, tranpose);
    balance += winning;

    console.log(`You won $${winning}!`);

    if (balance <= 0) {
      console.log("You have run out of money. You lose.");
      break;
    }

    const playAgain = prompt("Would you like to play again? (y/n) ");
    if (playAgain != "y") {
      console.log("Thank you for playing! :-)");
      break;
    }
  }
};

game();
