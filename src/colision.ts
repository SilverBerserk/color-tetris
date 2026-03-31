import { COLS, ROWS } from "./settings";
import { DIRECTION, Figure } from "./types";

export const checkForColision = (figure: Figure, arr: number[][], x: number, y: number, direction?: DIRECTION) => {
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                switch (direction) {
                    case DIRECTION.DOWN:
                        if (arr[rowIndex + y + 1][colIndex + x] > 0) {
                            return true
                        }
                        break
                    case DIRECTION.LEFT:
                        if (arr[rowIndex + y][colIndex + x - 1] > 0) {
                            return true
                        }
                        break
                    case DIRECTION.RIGHT:
                        if (arr[rowIndex + y][colIndex + x + 1] > 0) {
                            return true
                        }
                        break
                    default:
                        if (arr[rowIndex + y][colIndex + x] > 0) {
                            return true
                        }
                }
            }
        }

    }
    return false;
}

export const checkBorders = (figure: Figure, x: number, y: number) => {
    const figureHeigth = figure.shape.length
    const figureWidth = figure.shape[0].length

    if (y + figureHeigth >= ROWS || x + figureWidth > COLS || x < 0)
        return true

    return false;
};