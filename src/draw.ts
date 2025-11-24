import { COLORS } from "./colors"
import { FIGURE_MULTIPLIER, SQUARE_SIZE } from "./settings"
import { Figure } from "./types";

export const drawCanvas = (arr: number[][], ctx: CanvasRenderingContext2D) => {
    for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
        const row = arr[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            ctx.fillStyle = COLORS[row[colIndex]]
            ctx.fillRect(colIndex * SQUARE_SIZE, rowIndex * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        }
    }
}

export const drawFigure = (figure: Figure, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = COLORS[figure.value];
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        ctx.fillRect((colIndex * SQUARE_SIZE + y + i) * SQUARE_SIZE,
                            (rowIndex * SQUARE_SIZE + x + j) * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
                    }
            }
        }
    }
}

export const clearNextFigure = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(y * SQUARE_SIZE, x * SQUARE_SIZE, 4 * SQUARE_SIZE * SQUARE_SIZE, 2 * SQUARE_SIZE * SQUARE_SIZE);
}