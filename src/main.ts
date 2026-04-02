import { drawCanvas, drawDoubleValue, drawField, drawFigure, drawGameOver, drawNextFigure, drawPause, drawStats, loadFonts } from "./draw";
import { randomFigure } from "./figures";
import { checkCollision, checkConnection, cleanUp, pinFigure, spinFigure } from "./gameLogic";
import { CANVAS_HEIGHT, CANVAS_WIDTH, COLS, ROWS, SQUARE_SIZE } from "./settings";
import { Figure } from "./types";

let lines = 0;
let score = 0;

let fig_x = 0;
let fig_y = 0;

let isProcessing = false;
let isPaused = false;
let isGameOver = false;

let lastTime = 0;
let dropCounter = 0;

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const canvas = document.getElementById("game") as HTMLCanvasElement;

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
canvas.style.marginTop = "60px"

const ctx = canvas.getContext("2d")!;

const spawnFigure = (newFigure: Figure) => {
    fig_y = 0;
    fig_x = Math.floor(COLS / 2 - newFigure.shape[0].length / 2);

    if (checkCollision(newFigure, grid, fig_x, fig_y)) {
        isGameOver = true;
    }
    return newFigure
}

let grid: number[][];
let currentFigure: Figure;
let nextFigure: Figure

const init = async () => {
    grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0)) as number[][];
    lines = 0;
    score = 0

    await loadFonts()
    await drawCanvas(ctx)
    drawStats(ctx);

    [0, lines, score].forEach((value, index) =>
        drawDoubleValue(value, COLS * SQUARE_SIZE + 20, ROWS * SQUARE_SIZE / 4 + (index + 1) * 80, ctx)
    )

    currentFigure = spawnFigure(randomFigure());
    nextFigure = randomFigure();

    drawNextFigure(nextFigure, COLS + 3, 3, ctx)
}

await init()

const gameLoop = async (time: number) => {
    const deltaTime = time - lastTime;
    lastTime = time;
    const speed = Math.floor(lines / 20)
    const dropInterval = 1000 - speed > 900 ? 900 : speed * 50; // piece falls every 1000ms

    if (!isGameOver && !isProcessing && !isPaused) {
        dropCounter += deltaTime;

        if (dropCounter > dropInterval) {
            dropCounter = 0;

            if (checkCollision(currentFigure, grid, fig_x, fig_y + 1)) {
                isProcessing = true;
                pinFigure(grid, currentFigure, fig_x, fig_y);

                const { replacedValues, conectedLines } =
                    checkConnection(grid);

                if (conectedLines) {
                    drawField(grid, ctx)
                    await sleep(50)
                    cleanUp(grid)
                }
                lines += conectedLines;
                score += replacedValues;


                currentFigure = spawnFigure(nextFigure);
                nextFigure = randomFigure();

                drawNextFigure(nextFigure, COLS + 3, 3, ctx);

                [speed, lines, score].forEach((value, index) =>
                    drawDoubleValue(value, COLS * SQUARE_SIZE + 20, ROWS * SQUARE_SIZE / 4 + (index + 1) * 80, ctx)
                )

                isProcessing = false;
            } else {
                fig_y++;
            }

            drawField(grid, ctx);
            currentFigure && drawFigure(currentFigure, fig_x, fig_y, ctx);

            if (isGameOver)
                drawGameOver(ctx)
        }
    }

    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);

window.addEventListener("keydown", (e) => {
    e.preventDefault();

    if (e.key === "ArrowLeft") {
        if (!checkCollision(currentFigure, grid, fig_x - 1, fig_y)) {
            fig_x--;
            drawField(grid, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowRight") {
        if (!checkCollision(currentFigure, grid, fig_x + 1, fig_y)) {
            fig_x++;
            drawField(grid, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowUp") {
        const newFigure = spinFigure(currentFigure)
        if (!checkCollision(newFigure, grid, fig_x, fig_y)) {
            currentFigure = newFigure;
            drawField(grid, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowDown") {
        const newFigure = spinFigure(currentFigure, true)
        if (!checkCollision(newFigure, grid, fig_x, fig_y)) {
            currentFigure = newFigure;
            drawField(grid, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === " ") {
        while (!checkCollision(currentFigure, grid, fig_x, fig_y + 1)) {
            fig_y++
        }
        dropCounter = 0;
        drawField(grid, ctx)
        drawFigure(currentFigure, fig_x, fig_y, ctx)
    }
    if (e.key === "r") {
        isGameOver = false;
        isPaused = false;
        init()
    }
    if (e.key === "Enter") {
        if (isGameOver) {
            isGameOver = false;
            isPaused = false
            init()
        }
        else {
            if (!isPaused)
                drawPause(ctx)
            else {
                drawField(grid, ctx)
                drawFigure(currentFigure, fig_x, fig_y, ctx)
            }
            isPaused = !isPaused
        }
    }
});