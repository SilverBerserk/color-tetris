import { checkBorders, checkForColision } from "./colision";
import { clearNextFigure, drawCanvas, drawFigure } from "./draw";
import { randomFigure } from "./figures";
import { breakDown, checkConnection, pinFigure, spingFigure } from "./game_logic";
import { COLS, FIGURE_MULTIPLIER, ROWS } from "./settings";
import { Figure } from "./types";

let fig_x = 0;
let fig_y = 0;

let isProcessing = false;

let arr = Array.from({ length: ROWS }, () => Array(COLS).fill(0)) as number[][];

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let nextFigure = randomFigure()

const spawnFigure = (figA: Figure, figB: Figure) => {
    fig_x = 0;
    fig_y = COLS / 2 - 8;

    if (!checkForColision(figB, arr, fig_x, fig_y))
        figA = figB
    else {
        isProcessing = false;
        console.log('Game Over')
    }
}

let currentFigure = randomFigure()
spawnFigure(currentFigure, nextFigure)
nextFigure = randomFigure()

drawFigure(nextFigure, ROWS / 2, COLS + 10, ctx)

const interval = setInterval(async () => {
    // ⛔ If we are processing breakdown/spawning — SKIP this tick
    if (isProcessing) return;

    drawCanvas(arr, ctx);
    drawFigure(currentFigure, fig_x, fig_y, ctx);

    if (checkBorders(currentFigure, fig_x) || checkForColision(currentFigure, arr, fig_x, fig_y, "DOWN")) {

        isProcessing = true;  // 🔒 lock

        pinFigure(arr, currentFigure, fig_x, fig_y);
        await breakDown(arr, ctx);    // wait for sand-fall animation
        await checkConnection(arr, ctx)
        // currentFigure = spawnFigure();  // generate only ONCE
        spawnFigure(currentFigure, nextFigure)
        nextFigure = randomFigure()
        clearNextFigure(ROWS / 2, COLS + 10, ctx)
        drawFigure(nextFigure, ROWS / 2, COLS + 10, ctx)

        isProcessing = false; // 🔓 unlock
    }
    else {
        fig_x++;
    }
}, 50);


window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (fig_y > 0)
            fig_y--;
    }
    if (e.key === "ArrowRight") {
        e.preventDefault();
        if (fig_y + (currentFigure?.shape[0].length ?? 0) * FIGURE_MULTIPLIER < COLS)
            fig_y++;
    }
    if (e.key === "ArrowUp") {
        e.preventDefault()
        const newFigure = spingFigure(currentFigure)
        if (!checkForColision(newFigure, arr, fig_x, fig_y) && !checkBorders(newFigure, fig_x))
            currentFigure = newFigure;
    }
    if (e.key === "ArrowDown") {
        e.preventDefault
        while (!checkBorders(currentFigure, fig_x) && !checkForColision(currentFigure, arr, fig_x, fig_y, "DOWN")) {
            fig_x++
        }
    }
});