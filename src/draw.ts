import { COLORS } from "./colors"
import { COLS, FIGURE_MULTIPLIER, ROWS, SQUARE_SIZE } from "./settings"
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

export const drawLinesNumber = (lines,ctx) => {
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(COLS*FIGURE_MULTIPLIER+20,ROWS*FIGURE_MULTIPLIER/3,160,40)
    ctx.fillStyle = COLORS[6]; 
    ctx.fillText('Lines:'+ lines, COLS*FIGURE_MULTIPLIER+20, ROWS*FIGURE_MULTIPLIER/3+30); // Fills the text
}


export const drawPause = (ctx) => {
    ctx.font = "56px 'Press Start 2P'";
    ctx.fillStyle = 'red';
    ctx.fillText('PAUSE', 90, ROWS*FIGURE_MULTIPLIER/2+5);
    ctx.fillStyle = 'yellow';
    ctx.fillText('PAUSE', 85, ROWS*FIGURE_MULTIPLIER/2);
}

export const drawGameOver = (ctx) => {
    ctx.font = "56px 'Press Start 2P'";
    ctx.fillStyle = 'red';
    ctx.fillText('GAME', 125, ROWS*FIGURE_MULTIPLIER/2-15);
    ctx.fillText('OVER', 125, ROWS*FIGURE_MULTIPLIER/2+45);
    ctx.fillStyle = 'yellow';
    ctx.fillText('GAME', 120, ROWS*FIGURE_MULTIPLIER/2-20);
    ctx.fillText('OVER', 120, ROWS*FIGURE_MULTIPLIER/2+40);  
}