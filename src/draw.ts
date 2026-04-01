import { COLORS } from "./colors"
import { COLS, ROWS, SQUARE_SIZE } from "./settings"
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
                ctx.fillRect((colIndex + x) * SQUARE_SIZE,
                    (rowIndex + y) * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }
}

export const drawNextFigure = (figure: Figure, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#FFF"
    ctx.fillRect(x * SQUARE_SIZE, y * SQUARE_SIZE, 4 * SQUARE_SIZE * SQUARE_SIZE, 2 * SQUARE_SIZE * SQUARE_SIZE);
    drawFigure(figure, x, y, ctx)
}

export const drawStats = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = COLORS[6];
    ctx.font = "16px 'Press Start 2P'";
    ["Next:", "Speed:", "Lines:", "Score"].forEach((state, i) =>
        ctx.fillText(state, COLS * SQUARE_SIZE + 20, ROWS * SQUARE_SIZE / 4 + (i * 80)));
}

export const drawValue = (value: number, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillStyle = '#fff';
    ctx.fillRect(COLS * SQUARE_SIZE + x, ROWS * SQUARE_SIZE / 4 + y, 100, 40)
    ctx.fillStyle = COLORS[6];
    ctx.fillText(value.toString(), COLS * SQUARE_SIZE + x + 5, ROWS * SQUARE_SIZE / 4 + y + 30);
}

const drawDoubleText = (value: string, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.font = "56px 'Press Start 2P'";
    ctx.fillStyle = 'red';
    ctx.fillText(value, x, y + 5);
    ctx.fillStyle = 'yellow'
    ctx.fillText(value, x - 5, y);
}

export const drawPause = (ctx: CanvasRenderingContext2D) => {
    console.warn("Pause")
    drawDoubleText("PAUSE", 50, ROWS * SQUARE_SIZE / 2, ctx)
}

export const drawGameOver = (ctx: CanvasRenderingContext2D) => {
    console.warn("Game Over")
    drawDoubleText("GAME", 70, ROWS * SQUARE_SIZE / 2 - 20, ctx)
    drawDoubleText("OVER", 70, ROWS * SQUARE_SIZE / 2 + 40, ctx)
}