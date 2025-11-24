import { FIGURE_MULTIPLIER, ROWS, SQUARE_SIZE } from "./settings";
import { Figure } from "./types";

export const checkForColision = (figure : Figure, arr: number[][], x: number, y: number, direction?: "DOWN") => {
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        switch (direction) {
                            case "DOWN":
                                if (arr[rowIndex * SQUARE_SIZE + x + j + 1][colIndex * SQUARE_SIZE + y + i] > 0) {
                                    return true
                                }
                            default:
                                if (arr[rowIndex * SQUARE_SIZE + x + j][colIndex * SQUARE_SIZE + y + i] > 0) {
                                    return true
                                }
                        }
                    }
            }
        }
    }
    return false;
}

export const checkBorders = (figure: Figure, x: number) => {

    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++) {
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        if ((rowIndex * FIGURE_MULTIPLIER + x + j + 1) >= ROWS) {
                            return true; // ✅ now exits checkBorders
                        }
                    }
                }
            }
        }
    }

    return false;
};