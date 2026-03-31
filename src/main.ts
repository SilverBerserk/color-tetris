import { checkBorders, checkForColision } from "./colision";
import { drawCanvas, drawFigure, drawGameOver, drawLinesNumber, drawNextFigure, drawPause, drawScore, drawStats } from "./draw";
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
        drawLinesNumber(lines, ctx)
        drawScore(score, ctx)
    })

const spawnFigure = (newFigure: Figure) => {
    fig_y = 0;
    fig_x = Math.floor(COLS / 2 - newFigure.shape[0].length / 2);

    if (!checkForColision(newFigure, arr, fig_x, fig_y))
        return newFigure
    else {
        isProcessing = false;
        isGameOver = true;
        drawGameOver(ctx)
        console.log('Game Over')
    }
}

let arr: number[][];
let currentFigure: Figure | undefined;
let nextFigure: Figure

const init = () => {
    arr = Array.from({ length: ROWS }, () => Array(COLS).fill(0)) as number[][];
    currentFigure = spawnFigure(randomFigure());
    nextFigure = randomFigure();
    lines = 0;
    score = 0
    drawNextFigure(nextFigure, COLS + 10, ROWS / 2, ctx)
}

init()


const interval = setInterval(async () => {
    // ⛔ If we are processing breakdown/spawning — SKIP this tick
    if (isGameOver || isProcessing || isPaused || !currentFigure) return;

    console.log({ arr })

    if (checkBorders(currentFigure, fig_x, fig_y) || checkForColision(currentFigure, arr, fig_x, fig_y, DIRECTION.DOWN)) {

        isProcessing = true;  // 🔒 lock

        pinFigure(arr, currentFigure, fig_x, fig_y);
        const { replacedValues, conectedLines } = await checkConnection(arr, ctx)
        lines += conectedLines;
        score += replacedValues;
        drawLinesNumber(lines, ctx)
        drawScore(score, ctx)
        // currentFigure = spawnFigure();  // generate only ONCE
        currentFigure = spawnFigure(nextFigure)
        nextFigure = randomFigure()
        drawNextFigure(nextFigure, COLS + 10, ROWS / 2, ctx)

        isProcessing = false; // 🔓 unlock
    }
    else {
        fig_y++;
    }
    
    drawCanvas(arr, ctx);
    currentFigure && drawFigure(currentFigure, fig_x, fig_y, ctx);

}, 2000);


window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "ArrowLeft") {
        if (fig_x > 0 && currentFigure && !checkForColision(currentFigure, arr, fig_x, fig_y, DIRECTION.LEFT)) {
            fig_x--;
            drawCanvas(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowRight") {
        if (fig_x + (currentFigure?.shape[0].length ?? 0) < COLS && currentFigure && !checkForColision(currentFigure, arr, fig_x, fig_y, DIRECTION.RIGHT)) {
            fig_x++;
            drawCanvas(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
    }
    if (e.key === "ArrowUp") {
        if (currentFigure) {
            const newFigure = spinFigure(currentFigure)
            if (!checkForColision(newFigure, arr, fig_x, fig_y) && !checkBorders(newFigure, fig_x, fig_y)) {
                currentFigure = newFigure;
                drawCanvas(arr, ctx)
                drawFigure(currentFigure, fig_x, fig_y, ctx)
            }
        }
    }
    if (e.key === "ArrowDown") {
        if (currentFigure) {
            const newFigure = spinFigure(currentFigure, true)
            if (!checkForColision(newFigure, arr, fig_x, fig_y) && !checkBorders(newFigure, fig_x, fig_y)) {
                currentFigure = newFigure;
                drawCanvas(arr, ctx)
                drawFigure(currentFigure, fig_x, fig_y, ctx)
            }
        }
    }
    if (e.key === " ") {
        if (currentFigure) {
            while (!checkBorders(currentFigure, fig_x, fig_y) && !checkForColision(currentFigure, arr, fig_x, fig_y, DIRECTION.DOWN)) {
                fig_y++
            }
            drawCanvas(arr, ctx)
            drawFigure(currentFigure, fig_x, fig_y, ctx)
        }
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
