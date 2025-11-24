import { FIGURE_MULTIPLIER, ROWS } from "./settings";

export const checkForColision = (figure, arr, x, y, direction?) => {
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        switch (direction) {
                            case "DOWN":
                                if (arr[rowIndex * FIGURE_MULTIPLIER + x + j + 1][colIndex * FIGURE_MULTIPLIER + y + i] > 0) {
                                    return true
                                }
                            default:
                                if (arr[rowIndex * FIGURE_MULTIPLIER + x + j][colIndex * FIGURE_MULTIPLIER + y + i] > 0) {
                                    return true
                                }
                        }
                    }
            }
        }
    }
    return false;
}

export const checkBorders = (figure, x) => {

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