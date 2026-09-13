import * as state from "./state.js";
import * as page from "./page.js";

const MAZE_DENSITY = 0.3;

function clearOverlay() {
  for (const row of state.grid) {
    for (const cell of row) {
      cell.isVisited = false;
      cell.isPath = false;
      cell.distance = Infinity;
      cell.parent = null;
      const div = page.cellDiv(cell.row, cell.col);
      div.classList.remove('visited', 'path');
    }
  }
}

function setEndpoints() {
  if (state.startCell) {
    state.startCell.isStart = false;
    page.cellDiv(state.startCell.row, state.startCell.col).classList.remove('start');
  }
  if (state.endCell) {
    state.endCell.isEnd = false;
    page.cellDiv(state.endCell.row, state.endCell.col).classList.remove('end');
  }

  clearOverlay();

  // Generate endpoints on visible screen only
  const maxRow = state.visibleRows - 1;
  const maxCol = state.visibleCols - 1;

  let start = state.grid[Math.floor(Math.random() * maxRow)][Math.floor(Math.random() * maxCol)];
  let end = state.grid[Math.floor(Math.random() * maxRow)][Math.floor(Math.random() * maxCol)];

  while (start === end) {
    end = state.grid[Math.floor(Math.random() * maxRow)][Math.floor(Math.random() * maxCol)];
  }

  start.isStart = true;
  end.isEnd = true;
  start.isWall = false;
  start.isWeighted = false;
  end.isWall = false;
  end.isWeighted = false;

  state.setStartCell(start);
  state.setEndCell(end);

  page.cellDiv(start.row, start.col).classList.remove('wall', 'weighted');
  page.cellDiv(start.row, start.col).classList.add('start');
  page.cellDiv(end.row, end.col).classList.remove('wall', 'weighted');
  page.cellDiv(end.row, end.col).classList.add('end');
}

function resetGrid() {
  clearOverlay();
  for (const row of state.grid) {
    for (const cell of row) {
      cell.isWall = false;
      cell.isWeighted = false;
      const div = page.cellDiv(cell.row, cell.col);
      div.classList.remove('wall', 'weighted');
    }
  }
}

function generateMaze() {
  resetGrid();
  for (const row of state.grid) {
    for (const cell of row) {
      if (cell.isStart || cell.isEnd) continue;
      cell.isWall = Math.random() < MAZE_DENSITY;
      page.cellDiv(cell.row, cell.col).classList.toggle('wall', cell.isWall);
    }
  }
}

function generateWeightedMaze() {
  resetGrid();
  for (const row of state.grid) {
    for (const cell of row) {
      if (cell.isStart || cell.isEnd) continue;
      cell.isWeighted = Math.random() < MAZE_DENSITY;
      page.cellDiv(cell.row, cell.col).classList.toggle('weighted', cell.isWeighted);
    }
  }
}

export { setEndpoints, resetGrid, clearOverlay, generateMaze, generateWeightedMaze };
