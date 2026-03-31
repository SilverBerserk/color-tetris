import { checkBorders, checkForCollision } from "./collision";
import { drawCanvas, drawFigure, drawGameOver, drawLinesNumber, drawNextFigure, drawPause, drawScore, drawSpeed, drawStats } from "./draw";
import { randomFigure } from "./figures";
import { checkConnection, pinFigure, spinFigure } from "./gameLogic";
import { COLS, ROWS } from "./settings";
import { Figure, DIRECTION } from "./types";

let lines = 0;
let score = 0;

let fig_x = 0;
let fig_y = 0;

let isProcessing = false;
let isPaused = false;
let isGameOver = false;


const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

document.fonts.ready.then(
    () => {
        drawStats(ctx)
        drawSpeed(0, ctx)
        drawLinesNumber(lines, ctx)
        drawScore(score, ctx)

    })

const spawnFigure = (newFigure: Figure) => {
    fig_y = 0;
    fig_x = Math.floor(COLS / 2 - newFigure.shape[0].length / 2);

    if (checkForCollision(newFigure, arr, fig_x, fig_y)) {
        isGameOver = true;
    }
    return newFigure
}

let arr: number[][];
let currentFigure: Figure;
let nextFigure: Figure

const init = () => {
    arr = Array.from({ length: ROWS }, () => Array(COLS).fill(0)) as number[][];
    lines = 0;
    score = 0

    currentFigure = spawnFigure(randomFigure());
    nextFigure = randomFigure();

    drawNextFigure(nextFigure, COLS + 4, 4, ctx)
}

init()

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
                checkBorders(currentFigure, fig_x, fig_y) ||
                checkForCollision(currentFigure, arr, fig_x, fig_y, DIRECTION.DOWN)
            ) {
                isProcessing = true;
                pinFigure(arr, currentFigure, fig_x, fig_y);

                const { replacedValues, conectedLines } =
                    await checkConnection(arr, ctx);

                lines += conectedLines;
                score += replacedValues;


                currentFigure = spawnFigure(nextFigure);
                nextFigure = randomFigure();

                drawNextFigure(nextFigure, COLS + 4, 4, ctx);

                drawSpeed(speed, ctx);
                drawLinesNumber(lines, ctx);
                drawScore(score, ctx);
              
                isProcessing = false;
            } else {
                fig_y++;
            }

            drawCanvas(arr, ctx);
            currentFigure && drawFigure(currentFigure, fig_x, fig_y, ctx);

              if(isGameOver)
                    drawGameOver(ctx)
        }
    }

    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);

window.addEventListener("keydown", (e) => {
    e.preventDefault();

    if (e.key === "ArrowLeft") {
        if (!checkBorders(currentFigure, fig_x - 1, fig_y) && !checkForCollision(currentFigure, arr, fig_x, fig_y, DIRECTION.LEFT)) {
            fig_x--;
            drawCanvas(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowRight") {
        if (!checkBorders(currentFigure, fig_x + 1, fig_y) && !checkForCollision(currentFigure, arr, fig_x, fig_y, DIRECTION.RIGHT)) {
            fig_x++;
            drawCanvas(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowUp") {
        const newFigure = spinFigure(currentFigure)
        if (!checkBorders(newFigure, fig_x, fig_y) && !checkForCollision(newFigure, arr, fig_x, fig_y)) {
            currentFigure = newFigure;
            drawCanvas(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowDown") {
        const newFigure = spinFigure(currentFigure, true)
        if (!checkBorders(newFigure, fig_x, fig_y) && !checkForCollision(newFigure, arr, fig_x, fig_y)) {
            currentFigure = newFigure;
            drawCanvas(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === " ") {
        while (!checkBorders(currentFigure, fig_x, fig_y) && !checkForCollision(currentFigure, arr, fig_x, fig_y, DIRECTION.DOWN)) {
            fig_y++
        }
        drawCanvas(arr, ctx)
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
