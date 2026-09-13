//buttons
const generateEndpointsBtn = document.getElementById('generate-endpoints');
const generateMazeBtn = document.getElementById('generate-maze');
const generateWeightedMazeBtn = document.getElementById('generate-weighted-maze');
const drawModeBtn = document.getElementById('add-weights-add-walls');

const resetBtn = document.getElementById('reset-btn')
const speedControl = document.getElementById('speed-control');

const runBFSBtn = document.getElementById('run-bfs');
const runDijkstraBtn = document.getElementById('run-dijkstra');
const runAStarBtn = document.getElementById('run-astar');

//other
const gridContainer = document.getElementById('grid-container')

export { generateEndpointsBtn, generateMazeBtn, generateWeightedMazeBtn, drawModeBtn, runBFSBtn, runDijkstraBtn, runAStarBtn, resetBtn, speedControl, gridContainer };
