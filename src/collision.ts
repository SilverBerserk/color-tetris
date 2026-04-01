import { COLS, ROWS } from "./settings";
import { Figure } from "./types";

export const checkCollision = (figure: Figure, arr: number[][], x: number, y: number) => {
    const figureHeigth = figure.shape.length
    const figureWidth = figure.shape[0].length

    if (y + figureHeigth > ROWS || x + figureWidth > COLS || x < 0)
        return true

    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {

                if (arr[rowIndex + y]?.[colIndex + x] > 0) {
                    return true;
                }
            }
        }

    }
    return false;
}