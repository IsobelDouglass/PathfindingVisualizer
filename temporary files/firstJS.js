const CELL_SIZE = 25;
const UI_HEIGHT_RESERVED = 150;  //placeholder for UI
const UI_WIDTH_RESERVED = 40;    //placeholder for UI
const GRID_MULTIPLIER = 4;  // Make grid 4x larger than screen

let rows, cols;
let visibleRows, visibleCols;

function setGrid() {
  visibleRows = Math.floor((window.innerHeight - UI_HEIGHT_RESERVED) / CELL_SIZE);
  visibleCols = Math.floor((window.innerWidth - UI_WIDTH_RESERVED) / CELL_SIZE);
  rows = visibleRows * GRID_MULTIPLIER;
  cols = visibleCols * GRID_MULTIPLIER;
  document.documentElement.style.setProperty('--cols', cols);
}

let startCell = null;
let endCell = null;
let isMouseDown = false;
let isPanning = false;
let panStartX = 0;
let panStartY = 0;
let panOffsetX = 0;
let panOffsetY = 0;

const gridContainer = document.getElementById('grid-container');

document.documentElement.style.setProperty('--cell-size', CELL_SIZE + 'px');

gridContainer.addEventListener('mousedown', (e) => {
  // Only Ctrl/Cmd + click for panning
  if (e.button === 0 && (e.ctrlKey || e.metaKey)) {
    isPanning = true;
    panStartX = e.clientX;
    panStartY = e.clientY;
    gridContainer.classList.add('panning');
    e.preventDefault();
  } else if (e.button === 0) {
    isMouseDown = true;
    mouseDownHandler(e);
  }
});

gridContainer.addEventListener('mousemove', (e) => {
  if (isPanning) {
    const deltaX = e.clientX - panStartX;
    const deltaY = e.clientY - panStartY;
    panOffsetX += deltaX;
    panOffsetY += deltaY;
    panStartX = e.clientX;
    panStartY = e.clientY;
    gridContainer.style.transform = `translate(${panOffsetX}px, ${panOffsetY}px)`;
  }
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
  isPanning = false;
  gridContainer.classList.remove('panning');
});

const mouseDownHandler = (e) => {
  if (e.target.classList.contains('cell')) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    // Don't allow clicking on endpoints to remove them, only allow wall toggling
    if (!grid[row][col].isStart && !grid[row][col].isEnd) {
      grid[row][col].isWall = !grid[row][col].isWall;
      e.target.classList.toggle('wall', grid[row][col].isWall);
    }
  }
}

// Create grid of objects
const grid = [];
function buildGrid() {
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isWall: false,
        isWeighted: false,
        isStart: false,
        isEnd: false,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        parent: null
      });

      const div = document.createElement('div');
      div.className = 'cell';
      div.dataset.row = row;
      div.dataset.col = col;
      div.addEventListener('mouseenter', (e) => {
        if (isMouseDown && !isPanning) {
          // Don't allow dragging over endpoints to remove them, only allow wall toggling
          if (!grid[row][col].isStart && !grid[row][col].isEnd) {
            grid[row][col].isWall = !grid[row][col].isWall;
            div.classList.toggle('wall', grid[row][col].isWall);
          }
        }
      });
      gridContainer.appendChild(div);
    }
    grid.push(currentRow);
  }
}

function cellDiv(row, col) {
  return gridContainer.children[row * cols + col];
}

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

function renderPath() {}

document.addEventListener('DOMContentLoaded', () => {
  setGrid();
  buildGrid();
  setEndpoints();
});

const generateEndpointsButton = document.getElementById('generate-endpoints');

generateEndpointsButton.addEventListener('click', () => {
  setEndpoints();
});

/*
BFS
*/
const runBFSButton = document.getElementById('run-bfs');

runBFSButton.addEventListener('click', () => {
  // Implement BFS logic here
});

/*
Dijkstra
*/
const runDijkstraButton = document.getElementById('run-dijkstra');

runDijkstraButton.addEventListener('click', () => {
  // Implement Dijkstra logic here
});

/*
A*
*/
const runAStarButton = document.getElementById('run-astar');

runAStarButton.addEventListener('click', () => {
  // Implement A* logic here
});