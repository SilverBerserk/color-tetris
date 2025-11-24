import { COLORS } from "./colors"
import { FIGURE_MULTIPLIER } from "./settings"

export const drawCanvas = (arr, ctx) => {
    for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
        const row = arr[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            ctx.fillStyle = COLORS[row[colIndex]]
            ctx.fillRect(colIndex * FIGURE_MULTIPLIER, rowIndex * FIGURE_MULTIPLIER, FIGURE_MULTIPLIER, FIGURE_MULTIPLIER);
        }
    }
}

export const drawFigure = (figure, x, y, ctx) => {
    ctx.fillStyle = COLORS[figure.value];
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        ctx.fillRect((colIndex * FIGURE_MULTIPLIER + y + i) * FIGURE_MULTIPLIER,
                            (rowIndex * FIGURE_MULTIPLIER + x + j) * FIGURE_MULTIPLIER, FIGURE_MULTIPLIER, FIGURE_MULTIPLIER);
                    }
            }
        }
    }
}