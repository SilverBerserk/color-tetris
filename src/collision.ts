import { COLS, ROWS } from "./settings";
import { DIRECTION, Figure } from "./types";

export const checkForCollision = (figure: Figure, arr: number[][], x: number, y: number, direction?: DIRECTION) => {
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {

                let dx = 0;
                let dy = 0;

                if (direction === DIRECTION.DOWN) dy = 1;
                if (direction === DIRECTION.LEFT) dx = -1;
                if (direction === DIRECTION.RIGHT) dx = 1;

                if (arr[rowIndex + y + dy]?.[colIndex + x + dx] > 0) {
                    return true;
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