import { checkCollision } from "./collision";
import { drawCanvas, drawField, drawFigure, drawGameOver, drawNextFigure, drawPause, drawStats, drawValue, loadFonts } from "./draw";
import { randomFigure } from "./figures";
import { checkConnection, cleanUp, pinFigure, spinFigure } from "./gameLogic";
import { COLS, ROWS } from "./settings";
import { Figure } from "./types";

let lines = 0;
let score = 0;

let fig_x = 0;
let fig_y = 0;

let isProcessing = false;
let isPaused = false;
let isGameOver = false;

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const spawnFigure = (newFigure: Figure) => {
    fig_y = 0;
    fig_x = Math.floor(COLS / 2 - newFigure.shape[0].length / 2);

    if (checkCollision(newFigure, arr, fig_x, fig_y)) {
        isGameOver = true;
    }
    return newFigure
}

let arr: number[][];
let currentFigure: Figure;
let nextFigure: Figure

const init = async () => {
    arr = Array.from({ length: ROWS }, () => Array(COLS).fill(0)) as number[][];
    lines = 0;
    score = 0

    await loadFonts()
    await drawCanvas(ctx)
    drawStats(ctx)
    drawValue(0, 15, 80, ctx)
    drawValue(lines, 15, 160, ctx)
    drawValue(score, 15, 240, ctx)
    
    currentFigure = spawnFigure(randomFigure());
    nextFigure = randomFigure();

    drawNextFigure(nextFigure, COLS + 3, 4, ctx)
}

await init()

let lastTime = 0;
let dropCounter = 0;


const gameLoop = async (time: number) => {
    const deltaTime = time - lastTime;
    lastTime = time;
    const speed = Math.floor(lines / 10)
    const dropInterval = 1000 - speed * 100; // piece falls every 1000ms


    if (!isGameOver && !isProcessing && !isPaused) {

        dropCounter += deltaTime;

        if (dropCounter > dropInterval) {
            dropCounter = 0;

            if (
                checkCollision(currentFigure, arr, fig_x, fig_y + 1)
            ) {
                isProcessing = true;
                pinFigure(arr, currentFigure, fig_x, fig_y);

                const { replacedValues, conectedLines } =
                    checkConnection(arr);

                if (conectedLines)
                    if (conectedLines) {
                        drawField(arr, ctx)
                        await sleep(50)
                        cleanUp(arr)
                    }
                lines += conectedLines;
                score += replacedValues;


                currentFigure = spawnFigure(nextFigure);
                nextFigure = randomFigure();

                drawNextFigure(nextFigure, COLS + 3, 4, ctx);

                drawValue(speed, 15, 80, ctx);
                drawValue(lines, 15, 160, ctx);
                drawValue(score, 15, 240, ctx);

                isProcessing = false;
            } else {
                fig_y++;
            }

            drawField(arr, ctx);
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
        if (!checkCollision(currentFigure, arr, fig_x - 1, fig_y)) {
            fig_x--;
            drawField(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowRight") {
        if (!checkCollision(currentFigure, arr, fig_x + 1, fig_y)) {
            fig_x++;
            drawField(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowUp") {
        const newFigure = spinFigure(currentFigure)
        if (!checkCollision(newFigure, arr, fig_x, fig_y)) {
            currentFigure = newFigure;
            drawField(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowDown") {
        const newFigure = spinFigure(currentFigure, true)
        if (!checkCollision(newFigure, arr, fig_x, fig_y)) {
            currentFigure = newFigure;
            drawField(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === " ") {
        while (!checkCollision(currentFigure, arr, fig_x, fig_y + 1)) {
            fig_y++
        }
        drawField(arr, ctx)
        drawFigure(currentFigure, fig_x, fig_y, ctx)
    }
    if (e.key === "r") {
        isGameOver = false;
        isPaused = false;
        init()
    }
    if (e.key === "Enter") {
        if (isGameOver) {
            init()
            isGameOver = false;
            isPaused = false
        }
        else {
            if (!isPaused)
                drawPause(ctx)
            isPaused = !isPaused
        }
    }
});
