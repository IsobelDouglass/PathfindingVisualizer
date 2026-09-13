function getNeighbors(cell, grid) {
    const { row, col } = cell;
    const neighbors = [];
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[row].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}

function resetTraversalState(grid) {
    for (const row of grid) {
        for (const cell of row) {
            cell.isVisited = false;
            cell.isPath = false;
            cell.distance = Infinity;
            cell.parent = null;
        }
    }
}

function buildPath(endCell) {
    const path = [];
    let current = endCell;
    while (current !== null) {
        path.unshift(current);
        current.isPath = true;
        current = current.parent;
    }
    return path;
}

export { getNeighbors, resetTraversalState, buildPath };