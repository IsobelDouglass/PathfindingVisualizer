import * as elements from "./import.js";
import * as state from "./state.js";

let isMouseDown = false;
let isPanning = false;
let panStartX = 0;
let panStartY = 0;
let panOffsetX = 0;
let panOffsetY = 0;

// Draw mode: false = paint walls, true = paint weights
let isWeightMode = false;

function toggleDrawMode() {
  isWeightMode = !isWeightMode;
  return isWeightMode;
}

function cellDiv(row, col) {
  return elements.gridContainer.children[row * state.cols + col];
}

function paintCell(cell, div) {
  if (state.isAnimating) return;
  if (isWeightMode) {
    cell.isWeighted = !cell.isWeighted;
    div.classList.toggle('weighted', cell.isWeighted);
  } else {
    cell.isWall = !cell.isWall;
    div.classList.toggle('wall', cell.isWall);
  }
}

function mouseDownHandler(e) {
  if (e.target.classList.contains('cell')) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    // Don't allow clicking on endpoints to remove them, only allow wall/weight toggling
    if (!state.grid[row][col].isStart && !state.grid[row][col].isEnd) {
      paintCell(state.grid[row][col], e.target);
    }
  }
}

function buildGrid() {
  for (let row = 0; row < state.rows; row++) {
    const currentRow = [];
    for (let col = 0; col < state.cols; col++) {
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
      div.addEventListener('mouseenter', () => {
        if (isMouseDown && !isPanning) {
          const cell = state.grid[row][col];
          // Don't allow dragging over endpoints to remove them, only allow wall/weight toggling
          if (!cell.isStart && !cell.isEnd) {
            paintCell(cell, div);
          }
        }
      });
      elements.gridContainer.appendChild(div);
    }
    state.grid.push(currentRow);
  }
}

function wirePanningAndPainting() {
  elements.gridContainer.addEventListener('mousedown', (e) => {
    // Only Ctrl/Cmd + click for panning
    if (e.button === 0 && (e.ctrlKey || e.metaKey)) {
      isPanning = true;
      panStartX = e.clientX;
      panStartY = e.clientY;
      elements.gridContainer.classList.add('panning');
      e.preventDefault();
    } else if (e.button === 0 && !state.isAnimating) {
      isMouseDown = true;
      mouseDownHandler(e);
    }
  });

  elements.gridContainer.addEventListener('mousemove', (e) => {
    if (isPanning) {
      const deltaX = e.clientX - panStartX;
      const deltaY = e.clientY - panStartY;
      panOffsetX += deltaX;
      panOffsetY += deltaY;
      panStartX = e.clientX;
      panStartY = e.clientY;
      elements.gridContainer.style.transform = `translate(${panOffsetX}px, ${panOffsetY}px)`;
    }
  });

  document.addEventListener('mouseup', () => {
    isMouseDown = false;
    isPanning = false;
    elements.gridContainer.classList.remove('panning');
  });
}

function initGrid() {
  const visibleRows = Math.floor((window.innerHeight - state.UI_HEIGHT_RESERVED) / state.CELL_SIZE);
  const visibleCols = Math.floor((window.innerWidth - state.UI_WIDTH_RESERVED) / state.CELL_SIZE);
  const rows = visibleRows * state.GRID_MULTIPLIER;
  const cols = visibleCols * state.GRID_MULTIPLIER;

  state.setDimensions(rows, cols, visibleRows, visibleCols);
  document.documentElement.style.setProperty('--cols', cols);
  document.documentElement.style.setProperty('--cell-size', state.CELL_SIZE + 'px');

  buildGrid();
  wirePanningAndPainting();
}

export { initGrid, toggleDrawMode, cellDiv };
