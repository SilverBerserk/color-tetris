import { COLORS } from "./colors"
import { COLS, ROWS, SQUARE_SIZE } from "./settings"
import { Figure } from "./types";

import borderImg from "./img/border.png";
import gemImg from "./img/gem.png";
import corkImg from "./img/cork.png";

const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

const border = await loadImage(borderImg);
const gem = await loadImage(gemImg)
const cork = await loadImage(corkImg)

export const loadFonts = async () => {
    await document.fonts.load('16px "Press Start 2P"');
    await document.fonts.load('56px "Press Start 2P"');
    await document.fonts.ready;
};

export const drawCanvas = async (ctx: CanvasRenderingContext2D) => {
    const height = SQUARE_SIZE * ROWS
    const width = 600

    for (let y = 0; y < height + border.height; y += border.height) {
        ctx.drawImage(border, 0, y);
        ctx.drawImage(border, width - border.width, y);
    }

    ctx.drawImage(cork, 0, gem.height -1 )
    ctx.drawImage(cork, 0, height + cork.height +1)
    ctx.drawImage(cork, width - border.width, gem.height - 1)
    ctx.drawImage(cork, width - border.width, height + cork.height + 1)

    ctx.translate(width / 2, 800 / 2);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-800 / 2, -width / 2)
    for (let x = 0; x < width; x += border.height) {
        ctx.drawImage(border, 0, x);
        ctx.drawImage(border, height + border.height, x);
    }

    ctx.drawImage(cork, 0, border.width - 1)
    ctx.drawImage(cork, 0, width - border.width - cork.height + 1)
    ctx.drawImage(cork, width + border.width - 1, border.width - 1)
    ctx.drawImage(cork, width + border.width - 1, width - border.width - cork.height + 1)

    ctx.resetTransform(); // rotates canvas back automatically

    ctx.drawImage(gem, 0, 0)
    ctx.drawImage(gem, width - border.width, 0)
    ctx.drawImage(gem, 0, height + border.width)
    ctx.drawImage(gem, width - border.width, height + border.width)
}

export const drawField = (arr: number[][], ctx: CanvasRenderingContext2D) => {
    for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
        const row = arr[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            ctx.fillStyle = COLORS[row[colIndex]]
            ctx.fillRect(colIndex * SQUARE_SIZE + border.width, rowIndex * SQUARE_SIZE + border.width, SQUARE_SIZE, SQUARE_SIZE);
        }
    }
}

export const drawFigure = (figure: Figure, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = COLORS[figure.value];
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                ctx.fillRect((colIndex + x) * SQUARE_SIZE + border.width,
                    (rowIndex + y) * SQUARE_SIZE + border.width, SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }
}

export const drawNextFigure = (figure: Figure, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#fff"
    ctx.fillRect(x * SQUARE_SIZE + border.width, y * SQUARE_SIZE + border.width, 4 * SQUARE_SIZE, 2 * SQUARE_SIZE);
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