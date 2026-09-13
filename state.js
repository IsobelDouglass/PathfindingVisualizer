const CELL_SIZE = 25;
const UI_HEIGHT_RESERVED = 150;
const UI_WIDTH_RESERVED = 40;
const GRID_MULTIPLIER = 4;
const WEIGHT_COST = 5;

let rows = 0;
let cols = 0;
let visibleRows = 0;
let visibleCols = 0;
let startCell = null;
let endCell = null;
let isAnimating = false;

const grid = [];

function setDimensions(r, c, vr, vc) {
  rows = r;
  cols = c;
  visibleRows = vr;
  visibleCols = vc;
}

function setStartCell(cell) {
  startCell = cell;
}

function setEndCell(cell) {
  endCell = cell;
}

function setAnimating(value) {
  isAnimating = value;
}

export {
  CELL_SIZE,
  UI_HEIGHT_RESERVED,
  UI_WIDTH_RESERVED,
  GRID_MULTIPLIER,
  WEIGHT_COST,
  rows,
  cols,
  visibleRows,
  visibleCols,
  startCell,
  endCell,
  isAnimating,
  grid,
  setDimensions,
  setStartCell,
  setEndCell,
  setAnimating
};
