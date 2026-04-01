import { FIGURES } from "./figures";
import { COLS } from "./settings";
import { Figure } from "./types";


export const cleanUp = (arr: number[][]) => {
    for (let r = arr.length - 1; r >= 0; r--) {
        if (arr[r][0] === FIGURES.length + 1) {
            arr.splice(r, 1)
            arr.unshift(new Array(arr[0].length).fill(0))
            r++
        }
    }
}

export const checkConnection = (arr: number[][]) => {
    let conectedLines = 0;
    let replacedValues = 0;
    for (let rowIndex = arr.length - 1; rowIndex >= 0; rowIndex--) {
        if(arr[rowIndex].some(b => !b))
            continue
        
        conectedLines++
        replacedValues += COLS;

        arr[rowIndex].fill(FIGURES.length + 1)
    }

    return { replacedValues, conectedLines };
};

export const pinFigure = (arr: number[][], figure: Figure, x: number, y: number) => {
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                arr[rowIndex + y][colIndex + x] = figure.value
            }
        }
    }
}

export const spinFigure = (figure: Figure, clockwise: boolean = false) => {
    const { shape } = figure
    const rows = shape.length;
    const cols = shape[0].length;

    const rotatedShape = Array.from({ length: cols }, () => Array(rows).fill(0));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (clockwise)
                rotatedShape[c][rows - 1 - r] = shape[r][c]
            else
                rotatedShape[cols - 1 - c][r] = shape[r][c];
        }
    }

    return { shape: rotatedShape, value: figure.value };
}