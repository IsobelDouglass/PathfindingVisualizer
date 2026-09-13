import * as animation from "./animation.js"
import * as helper from "./algoHelperFunctions.js";

function BFS(grid, startCell, endCell) {
    helper.resetTraversalState(grid);

    //setup
    const visitedInOrder = [];
    const queue = [startCell];
    startCell.isVisited = true;
    startCell.distance = 0;

    while (queue.length > 0) {
        const current = queue.shift();
        visitedInOrder.push(current);

        if (current === endCell) break;

        for (const neighbor of helper.getNeighbors(current, grid)) {
            if (neighbor.isVisited || neighbor.isWall) continue;
            neighbor.isVisited = true;
            neighbor.distance = current.distance + 1;
            neighbor.parent = current;
            queue.push(neighbor);
        }
    }

    const path = endCell.isVisited ? helper.buildPath(endCell) : [];
    return { visitedInOrder, path };
}

function Dijkstra(grid, startCell, endCell) {
    helper.resetTraversalState(grid);

    //setup
    const visitedInOrder = [];
    const queue = [startCell];
    startCell.isVisited = true;
    startCell.distance = 0;

    while (queue.length > 0) {
        const current = queue.shift();
        visitedInOrder.push(current);

        if (current === endCell) break;

        for (const neighbor of helper.getNeighbors(current, grid)) {
            if (neighbor.isVisited || neighbor.isWall) continue;
            neighbor.isVisited = true;
            neighbor.distance = current.distance + 1;
            neighbor.parent = current;
            queue.push(neighbor);
        }
    }
}

function A(grid, startCell, endCell) {
    helper.resetTraversalState(grid);

    //setup
    const visitedInOrder = [];
    const queue = [startCell];
    startCell.isVisited = true;
    startCell.distance = 0;
    
    while (queue.length > 0) {
        const current = queue.shift();
    }
}

export { BFS, Dijkstra, A };
