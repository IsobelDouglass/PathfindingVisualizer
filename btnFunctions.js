function setEndpoints() {
  if (startCell) {
    startCell.isStart = false;
    cellDiv(startCell.row, startCell.col).classList.remove('start');
  }
  if (endCell) {
    endCell.isEnd = false;
    cellDiv(endCell.row, endCell.col).classList.remove('end');
  }

  // Generate endpoints on visible screen only
  const maxRow = visibleRows - 1;
  const maxCol = visibleCols - 1;
  
  startCell = grid[Math.floor(Math.random() * maxRow)][Math.floor(Math.random() * maxCol)];
  endCell = grid[Math.floor(Math.random() * maxRow)][Math.floor(Math.random() * maxCol)];

  while (startCell === endCell) {
    endCell = grid[Math.floor(Math.random() * maxRow)][Math.floor(Math.random() * maxCol)];
  }

  startCell.isStart = true;
  endCell.isEnd = true;

  cellDiv(startCell.row, startCell.col).classList.add('start');
  cellDiv(endCell.row, endCell.col).classList.add('end');
}