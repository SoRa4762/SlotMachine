const ROWS = 3;
const COLS = 5;
const symbolsCount = [
  ["A", 2],
  ["B", 4],
  ["C", 6],
  ["D", 8],
];

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of symbolsCount) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const newSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * newSymbols.length);
      reels[i].push(newSymbols[randomIndex]);
      newSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

console.log(spin());
