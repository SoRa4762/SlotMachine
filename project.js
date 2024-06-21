// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play Again
// import prompt from "prompt-sync";
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  //SYMBOLS_COUNT["A"] -> 2
  A: 3,
  B: 5,
  C: 7,
  D: 9,
};

const SYMBOL_VALUES = {
  A: 8,
  B: 6,
  C: 4,
  D: 2,
};

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

const numberOfLines = () => {
  while (true) {
    const lines = prompt("How many lines would you like to bet on? (1-3) ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Please enter valid number of lines");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, linesNumber) => {
  while (true) {
    const bet = prompt("Enter your bet per line: ");
    const betAmount = parseFloat(bet);

    if (
      isNaN(betAmount) ||
      betAmount <= 0 ||
      betAmount > parseInt(balance / linesNumber) //betAmount < balance * linesNumber, cuz total bet = balance * linesNumber
    ) {
      console.log("Please enter a valid bet amount");
    } else {
      return betAmount;
    }
  }
};

const spin = () => {
  const symbols = []; //in array though, if you append stuff in array, it wont violate the const keyword
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    //turns object to arrays of array -> cuz object is not iterable
    console.log(symbol, count);
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  // console.log("symbols:", symbols);
  const reels = [];
  for (i = 0; i < COLS; i++) {
    reels.push([]);
    const newSymbols = [...symbols];
    for (j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * newSymbols.length);
      reels[i].push(newSymbols[randomIndex]);
      newSymbols.splice(newSymbols[randomIndex], 1);
    }
  }

  console.log("Reels: ", reels);
  return reels;
};

const transpose = (reels) => {
  const newReels = [];
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      newReels.push(reels[j][i]);
    }
  }
  console.log(newReels);
  return newReels;
};

let balance = deposit();
const linesNumber = numberOfLines();
const betAmount = getBet(balance, linesNumber);
const reels = spin();
const tranpose = transpose(reels);
