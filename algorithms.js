import * as helper from "./algoHelperFunctions.js";
import * as state from "./state.js";

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

function edgeCost(cell) {
    return cell.isWeighted ? state.WEIGHT_COST : 1;
}

function Dijkstra(grid, startCell, endCell) {
    helper.resetTraversalState(grid);

    const visitedInOrder = [];
    const finalized = new Set();
    const queue = new helper.PriorityQueue();

    startCell.distance = 0;
    queue.push(startCell, 0);

    while (!queue.isEmpty) {
        const current = queue.pop();
        if (finalized.has(current)) continue;
        finalized.add(current);
        current.isVisited = true;
        visitedInOrder.push(current);

        if (current === endCell) break;

        for (const neighbor of helper.getNeighbors(current, grid)) {
            if (finalized.has(neighbor) || neighbor.isWall) continue;
            const tentativeDistance = current.distance + edgeCost(neighbor);
            if (tentativeDistance < neighbor.distance) {
                neighbor.distance = tentativeDistance;
                neighbor.parent = current;
                queue.push(neighbor, tentativeDistance);
            }
        }
    }

    const path = endCell.isVisited ? helper.buildPath(endCell) : [];
    return { visitedInOrder, path };
}

function A(grid, startCell, endCell) {
    helper.resetTraversalState(grid);

    const visitedInOrder = [];
    const finalized = new Set();
    const queue = new helper.PriorityQueue();

    startCell.distance = 0;
    queue.push(startCell, helper.manhattanDistance(startCell, endCell));

    while (!queue.isEmpty) {
        const current = queue.pop();
        if (finalized.has(current)) continue;
        finalized.add(current);
        current.isVisited = true;
        visitedInOrder.push(current);

        if (current === endCell) break;

        for (const neighbor of helper.getNeighbors(current, grid)) {
            if (finalized.has(neighbor) || neighbor.isWall) continue;
            const tentativeDistance = current.distance + edgeCost(neighbor);
            if (tentativeDistance < neighbor.distance) {
                neighbor.distance = tentativeDistance;
                neighbor.parent = current;
                const fScore = tentativeDistance + helper.manhattanDistance(neighbor, endCell);
                queue.push(neighbor, fScore);
            }
        }
    }

    const path = endCell.isVisited ? helper.buildPath(endCell) : [];
    return { visitedInOrder, path };
}

export { BFS, Dijkstra, A };
