//make grid
const ROWS = 20;
const COLS = 20;

// Create a 20x20 grid, every cell starts as an object
const grid = [];
for (let row = 0; row < rows; row++) {
  const currentRow = [];
  for (let col = 0; col < cols; col++) {
    currentRow.push({
      row,
      col,
      isWall: false,
      isStart: false,
      isEnd: false,
      isVisited: false,
      distance: Infinity,
      parent: null
    });
  }
  grid.push(currentRow);
}

// Access a cell by coordinates
grid[3][5].isWall = true;   // row 3, col 5 is now a wall

function getNeighbors(grid, cell) {
  const { row, col } = cell;
  const neighbors = [];

  if (row > 0)          neighbors.push(grid[row - 1][col]); // up
  if (row < rows - 1)   neighbors.push(grid[row + 1][col]); // down
  if (col > 0)          neighbors.push(grid[row][col - 1]); // left
  if (col < cols - 1)   neighbors.push(grid[row][col + 1]); // right

  return neighbors.filter(n => !n.isWall);
}

function setGrid(grid) {
  const container = document.querySelector('#grid');
  container.innerHTML = '';

  grid.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    row.forEach(cell => {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      cellDiv.dataset.row = cell.row;   // ← store coordinates ON the element
      cellDiv.dataset.col = cell.col;

      if (cell.isStart) cellDiv.classList.add('start');
      if (cell.isEnd)   cellDiv.classList.add('end');
      if (cell.isWall)  cellDiv.classList.add('wall');

      rowDiv.appendChild(cellDiv);
    });

    container.appendChild(rowDiv);
  });
}

document.querySelector('#grid').addEventListener('click', (e) => {
  if (!e.target.classList.contains('cell')) return;

  const row = Number(e.target.dataset.row);
  const col = Number(e.target.dataset.col);

  grid[row][col].isWall = true;
  setGrid(grid); // re-render to reflect the change visually
});



while (true) {
  let i = 0;
  if (i >= rows*cols) {
    break;
  }
  i++;
}

/*
BFS
-
*/

/*
Dijkstra
-
when two paths meet each other whichever's shortest "beats" the other
if they're equal they merge and display two equal paths. 
-
to includes weights, give each move a value of 1, and each weight a value of 10 or X.
each go around, the value of progress along the path is +1, when it = weight of next square it moves. 
*/

/*
A*
-
*/