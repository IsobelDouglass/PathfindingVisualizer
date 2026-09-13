import * as elements from "./import.js";
import * as page from "./page.js";
import * as algorithms from "./algorithms.js";
import * as btnFunctions from "./btnFunctions.js";

document.addEventListener('DOMContentLoaded', () => {
  page.initGrid();
});

elements.generateEndpointsBtn.addEventListener('click', () => {
  page.setEndpoints();
});

elements.drawModeBtn.addEventListener('click', () => {
  const isWeightMode = page.toggleDrawMode();
  elements.drawModeBtn.textContent = isWeightMode ? 'Draw with Walls' : 'Draw with Weights';
  elements.drawModeBtn.classList.toggle('mode-weight', isWeightMode);
  elements.drawModeBtn.classList.toggle('mode-wall', !isWeightMode);
});

function updateSpeedBarFill() {
  const percent = (elements.speedControl.value - elements.speedControl.min) / (elements.speedControl.max - elements.speedControl.min) * 100;
  elements.speedControl.style.background = `linear-gradient(to right, lightblue ${percent}%, #fff ${percent}%)`;
}

elements.speedControl.addEventListener('input', updateSpeedBarFill);
updateSpeedBarFill();

elements.runBFSBtn.addEventListener('click', () => {
  // Implement BFS logic here
});

elements.runDijkstraBtn.addEventListener('click', () => {
  // Implement Dijkstra logic here
});

elements.runAStarBtn.addEventListener('click', () => {
  // Implement A* logic here
});
