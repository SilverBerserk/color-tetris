import { COLORS } from "./colors"
import { CANVAS_HEIGHT, CANVAS_WIDTH, COLS, ROWS, SQUARE_SIZE } from "./settings"
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

    ctx.fillStyle = COLORS[8]
    ctx.fillRect(border.width, border.width, height, CANVAS_WIDTH)

    for (let y = 0; y < height + border.height; y += border.height) {
        ctx.drawImage(border, 0, y);
        ctx.drawImage(border, CANVAS_WIDTH - border.width, y);
    }

    ctx.drawImage(cork, 0, gem.height - 1)
    ctx.drawImage(cork, 0, height + cork.height + 1)
    ctx.drawImage(cork, CANVAS_WIDTH - border.width, gem.height - 1)
    ctx.drawImage(cork, CANVAS_WIDTH - border.width, height + cork.height + 1)

    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-CANVAS_HEIGHT / 2, -CANVAS_WIDTH / 2)
    for (let x = 0; x < CANVAS_WIDTH; x += border.height) {
        ctx.drawImage(border, 0, x);
        ctx.drawImage(border, height + border.height, x);
    }

    ctx.drawImage(cork, 0, border.width - 1)
    ctx.drawImage(cork, 0, CANVAS_WIDTH - border.width - cork.height + 1)
    ctx.drawImage(cork, CANVAS_WIDTH + border.width - 1, border.width - 1)
    ctx.drawImage(cork, CANVAS_WIDTH + border.width - 1, CANVAS_WIDTH - border.width - cork.height + 1)

    ctx.resetTransform(); // rotates canvas back automatically

    ctx.drawImage(gem, 0, 0)
    ctx.drawImage(gem, CANVAS_WIDTH - border.width, 0)
    ctx.drawImage(gem, 0, height + border.width)
    ctx.drawImage(gem, CANVAS_WIDTH - border.width, height + border.width)
}

export const drawField = (arr: number[][], ctx: CanvasRenderingContext2D) => {
    arr.forEach((row, rowIndex) =>
        row.forEach((cell, colIndex) => {
            ctx.fillStyle = COLORS[cell]
            ctx.fillRect(colIndex * SQUARE_SIZE + border.width, rowIndex * SQUARE_SIZE + border.width, SQUARE_SIZE, SQUARE_SIZE);
        }
        ));
};

export const drawFigure = (figure: Figure, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = COLORS[figure.value]
    figure.shape.forEach((row, rowIndex) =>
        row.forEach((cell, colIndex) => {
            if (cell) {
                ctx.fillRect((colIndex + x) * SQUARE_SIZE + border.width,
                    (rowIndex + y) * SQUARE_SIZE + border.width, SQUARE_SIZE, SQUARE_SIZE);
            }
        })
    );
};

export const drawNextFigure = (figure: Figure, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = COLORS[8]
    ctx.fillRect(x * SQUARE_SIZE + border.width, y * SQUARE_SIZE + border.width, 4 * SQUARE_SIZE, 2 * SQUARE_SIZE);
    drawFigure(figure, x, y, ctx)
}

export const drawStats = (ctx: CanvasRenderingContext2D) => {
    ["Next:", "Speed:", "Lines:", "Score"].forEach((state, i) =>
        drawDoubleValue(state, COLS * SQUARE_SIZE + 20,
            i * 80 + 110, ctx))
}

export const drawValue = (value: number, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillStyle = COLORS[8];
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

export const drawDoubleValue = (value: string | number, x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillStyle = COLORS[8];
    ctx.fillRect(x, y, 100, 20)
    ctx.fillStyle = COLORS[9];
    ctx.fillText(value.toString(), x + 6, y + 18);
    ctx.fillStyle = COLORS[10];
    ctx.fillText(value.toString(), x + 8, y + 20);
    ctx.fillStyle = COLORS[11];
    ctx.fillText(value.toString(), x + 7, y + 19);
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