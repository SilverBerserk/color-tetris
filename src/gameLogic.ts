import { FIGURES } from "./figures";
import { COLS, ROWS } from "./settings";

export const checkCollision = (figure: number[][], grid: number[][], x: number, y: number) => {
    const height = figure.length;
    const width = figure[0].length;

    // Check boundaries
    if (x < 0 || x + width > COLS || y + height > ROWS) return true;

    // Check collision
    return figure.some((row, rowIndex) =>
        row.some((cell, colIndex) =>
            cell && grid[y + rowIndex]?.[x + colIndex] > 0
        )
    );
};

export const cleanUp = (grid: number[][]) => {
    for (let r = grid.length - 1; r >= 0; r--) {
        if (grid[r][0] === FIGURES.length + 1) {
            grid.splice(r, 1)
            grid.unshift(new Array(grid[0].length).fill(0))
            r++
        }
    }
}

export const checkConnection = (grid: number[][]) => {
    let conectedLines = 0;
    let replacedValues = 0;

    grid.forEach(row => {
        if (!row.some(cell => !cell)) {
            conectedLines++
            replacedValues += COLS;
            row.fill(FIGURES.length + 1)
        }
    })


    return { replacedValues, conectedLines };
};

export const pinFigure = (grid: number[][], figure: number[][], x: number, y: number) => {
    figure.forEach((row, rowIndex) =>
        row.forEach((cell, colIndex) => {
            if (cell > 0) {
                grid[rowIndex + y][colIndex + x] = cell
            }
        })
    );
}

export const spinFigure = (figure: number[][], clockwise: boolean = false) => {
    const rotatedShape = Array.from({ length: figure[0].length }, () => Array(figure.length).fill(0));

    figure.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (clockwise)
                rotatedShape[colIndex][figure.length - 1 - rowIndex] = cell;
            else
                rotatedShape[row.length - 1 - colIndex][rowIndex] = cell;
        })
    })

    return rotatedShape
}