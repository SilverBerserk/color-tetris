import { drawCanvas } from "./draw";
import { Figure } from "./types";

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export const cleanUp = (arr: number[][], rows: number) => {
    for (let i = 0; i < rows; i++) {
        for (let r = arr.length - 1; r > 0; r--) {
            for (let c = 0; c < arr[r].length; c++) {
                if (arr[r][c] === 7) {
                    arr[r][c] = arr[r - 1][c];
                    arr[r - 1][c] = r == 1 ? 0 : 7;
                }
            }
        }
    }
};

export const checkConnection = async (arr: number[][], ctx: CanvasRenderingContext2D) => {
    // let isConnection = false;
    let conectedLines = 0;
    let replacedValues = 0;
    for (let r = arr.length - 1; r >= 0; r--) {
        let rowBlocks = 0;

        for (let c = 0; c < arr[r].length; c++) {
            if (arr[r][c] !== 0) {
                rowBlocks++;
            }
        }

        if (rowBlocks === arr[r].length) {
            for (let c = 0; c < arr[r].length; c++) {
                arr[r][c] = 7
                replacedValues += rowBlocks;
                conectedLines++;
            }
        }
    }

    if (replacedValues) {
        drawCanvas(arr, ctx)
        await sleep(50)
        cleanUp(arr, conectedLines)
        drawCanvas(arr, ctx)
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