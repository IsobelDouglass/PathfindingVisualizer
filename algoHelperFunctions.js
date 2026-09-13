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

function manhattanDistance(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

// Small binary min-heap priority queue, keyed by an externally supplied priority.
class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    get size() {
        return this.heap.length;
    }

    push(item, priority) {
        this.heap.push({ item, priority });
        let i = this.heap.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (this.heap[parent].priority <= this.heap[i].priority) break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }

    pop() {
        if (this.heap.length === 0) return undefined;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            let i = 0;
            while (true) {
                const left = i * 2 + 1;
                const right = i * 2 + 2;
                let smallest = i;
                if (left < this.heap.length && this.heap[left].priority < this.heap[smallest].priority) smallest = left;
                if (right < this.heap.length && this.heap[right].priority < this.heap[smallest].priority) smallest = right;
                if (smallest === i) break;
                [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
                i = smallest;
            }
        }
        return top.item;
    }

    get isEmpty() {
        return this.heap.length === 0;
    }
}

export { getNeighbors, resetTraversalState, buildPath, manhattanDistance, PriorityQueue };
