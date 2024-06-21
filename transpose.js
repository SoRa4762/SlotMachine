const array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const transpose = (array) => {
  const rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push([]);
    for (let j = 0; j < 3; j++) {
      rows[i].push(array[j][i]);
    }
  }
  return rows;
};

console.log(transpose(array));
// console.log(array.splice(2,1))
// console.log(array)
