import * as elements from "./import.js";
import * as page from "./page.js";
import * as algorithms from "./algorithms.js";
import * as btnFunctions from "./btnFunctions.js";
import * as animation from "./animation.js";
import * as state from "./state.js";

document.addEventListener('DOMContentLoaded', () => {
  page.initGrid();
  btnFunctions.setEndpoints();
});

elements.generateEndpointsBtn.addEventListener('click', () => {
  if (state.isAnimating) return;
  btnFunctions.setEndpoints();
});

elements.drawModeBtn.addEventListener('click', () => {
  const isWeightMode = page.toggleDrawMode();
  elements.drawModeBtn.textContent = isWeightMode ? 'Draw with Walls' : 'Draw with Weights';
  elements.drawModeBtn.classList.toggle('mode-weight', isWeightMode);
  elements.drawModeBtn.classList.toggle('mode-wall', !isWeightMode);
});

elements.generateMazeBtn.addEventListener('click', () => {
  if (state.isAnimating) return;
  btnFunctions.generateMaze();
});

elements.generateWeightedMazeBtn.addEventListener('click', () => {
  if (state.isAnimating) return;
  btnFunctions.generateWeightedMaze();
});

elements.resetBtn.addEventListener('click', () => {
  if (state.isAnimating) return;
  btnFunctions.resetGrid();
});

function updateSpeedBarFill() {
  const percent = (elements.speedControl.value - elements.speedControl.min) / (elements.speedControl.max - elements.speedControl.min) * 100;
  elements.speedControl.style.setProperty('--percent', `${percent}%`);
}

elements.speedControl.addEventListener('input', updateSpeedBarFill);
updateSpeedBarFill();

const actionButtons = [
  elements.generateEndpointsBtn,
  elements.generateMazeBtn,
  elements.generateWeightedMazeBtn,
  elements.resetBtn,
  elements.runBFSBtn,
  elements.runDijkstraBtn,
  elements.runAStarBtn
];

function setButtonsDisabled(disabled) {
  for (const btn of actionButtons) {
    btn.disabled = disabled;
  }
}

async function runAlgorithm(algorithmFn) {
  if (state.isAnimating || !state.startCell || !state.endCell) return;

  setButtonsDisabled(true);
  try {
    btnFunctions.clearOverlay();
    const { visitedInOrder, path } = algorithmFn(state.grid, state.startCell, state.endCell);
    await animation.animateSearch(visitedInOrder, path, elements.speedControl.value);
  } finally {
    setButtonsDisabled(false);
  }
}

elements.runBFSBtn.addEventListener('click', () => {
  runAlgorithm(algorithms.BFS);
});

elements.runDijkstraBtn.addEventListener('click', () => {
  runAlgorithm(algorithms.Dijkstra);
});

elements.runAStarBtn.addEventListener('click', () => {
  runAlgorithm(algorithms.A);
});
