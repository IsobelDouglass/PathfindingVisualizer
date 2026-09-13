import * as page from "./page.js";
import * as state from "./state.js";

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Maps the 1-10 speed slider to a per-step delay in ms (higher = faster).
function stepDelay(speedValue, base) {
    const clamped = Math.min(10, Math.max(1, Number(speedValue) || 5));
    return base - (clamped - 1) * ((base - 10) / 9);
}

async function animateCells(cells, className, speedValue, base) {
    const ms = stepDelay(speedValue, base);
    for (const cell of cells) {
        if (!cell.isStart && !cell.isEnd) {
            page.cellDiv(cell.row, cell.col).classList.add(className);
        }
        if (ms > 0) await delay(ms);
    }
}

async function animateSearch(visitedInOrder, path, speedValue) {
    state.setAnimating(true);
    try {
        await animateCells(visitedInOrder, 'visited', speedValue, 190);
        await animateCells(path, 'path', speedValue, 260);
    } finally {
        state.setAnimating(false);
    }
}

export { animateSearch };
