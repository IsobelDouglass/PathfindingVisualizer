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

// Draw mode: false = paint walls, true = paint weights
let isWeightMode = false;

function toggleDrawMode() {
  isWeightMode = !isWeightMode;
  return isWeightMode;
}

function paintCell(cell, div) {
  if (isWeightMode) {
    cell.isWeighted = !cell.isWeighted;
    div.classList.toggle('weighted', cell.isWeighted);
  } else {
    cell.isWall = !cell.isWall;
    div.classList.toggle('wall', cell.isWall);
  }
}

const mouseDownHandler = (e) => {
  if (e.target.classList.contains('cell')) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    // Don't allow clicking on endpoints to remove them, only allow wall/weight toggling
    if (!grid[row][col].isStart && !grid[row][col].isEnd) {
      paintCell(grid[row][col], e.target);
    }
  }
}

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
        cost: null,
        parent: null
      });

      const div = document.createElement('div');
      div.className = 'cell';
      div.dataset.row = row;
      div.dataset.col = col;
      div.addEventListener('mouseenter', (e) => {
        if (isMouseDown && !isPanning) {
          // Don't allow dragging over endpoints to remove them, only allow wall/weight toggling
          if (!grid[row][col].isStart && !grid[row][col].isEnd) {
            paintCell(grid[row][col], div);
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

document.addEventListener('DOMContentLoaded', () => {
  setGrid();
  buildGrid();
  setEndpoints();
});

export { toggleDrawMode };
