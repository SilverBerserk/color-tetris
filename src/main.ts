const ROWS = 50;
const COLS = 50;
const FIGURE_MULTIPLIER = 5;

let fig_x = 0;
let fig_y = 0;


const arr = Array.from({ length: ROWS }, () => Array(COLS).fill(0));


const SQUARE_SIZE = 5

const figure = [[0, 0, 1], [1, 1, 1]]

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const drawCanvas = () => {
    arr.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            ctx.fillStyle = (colIndex + rowIndex) % 2 == 1 ? "#3b82f6" : "#dd0323";

            if (arr[rowIndex][colIndex] == 1) {
                ctx.fillStyle = "#dddd43"
            }
            ctx.fillRect(colIndex * SQUARE_SIZE, rowIndex * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        })
    });
}

console.log(figure)

const drawFigure = (figure) => {
    ctx.fillStyle = "#23ddcc";
    figure.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            if (figure[rowIndex][colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        ctx.fillRect((colIndex * FIGURE_MULTIPLIER + fig_y + i) * SQUARE_SIZE,
                            (rowIndex * FIGURE_MULTIPLIER + fig_x + j) * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
                    }
            }
        }
        )
    })
}

const figureLoop = (figure) => {
    for (let rowIndex = 0; rowIndex < figure.length; rowIndex++) {
        const row = figure[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1)
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++)
                        return [rowIndex * FIGURE_MULTIPLIER + fig_x + j, colIndex * FIGURE_MULTIPLIER + fig_y + i]
        }
    }
}

const spawnFigure = (figure) => {
    fig_x = 0;
    fig_y = COLS / 2 - 8;
    if(checkForColision(figure))
        return
    else console.log('Game Over')
}

const checkForColision = (figure, direction?) => {
    for (let rowIndex = 0; rowIndex < figure.length; rowIndex++) {
        const row = figure[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        switch (direction) {
                            case "DOWN":
                                if (arr[rowIndex * FIGURE_MULTIPLIER + fig_x + j + 1][colIndex * FIGURE_MULTIPLIER + fig_y + i] == 1) {
                                    return true
                                }
                            default:
                                if (arr[rowIndex * FIGURE_MULTIPLIER + fig_x + j ][colIndex * FIGURE_MULTIPLIER + fig_y + i] == 1) {
                                    return true
                                }
                        }
                       }
            }
        }
    }

}

const checkBorders = (figure) => {

    for (let rowIndex = 0; rowIndex < figure.length; rowIndex++) {
        const row = figure[rowIndex];

        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++) {
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        if ((rowIndex * FIGURE_MULTIPLIER + fig_x + j + 1) >= ROWS) {
                            console.log("!!!border!!!!");
                            return true; // ✅ now exits checkBorders
                        }
                    }
                }
            }
        }
    }

    return false;
};

const pinFigure = () => {
    figure.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            if (figure[rowIndex][colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        arr[rowIndex * FIGURE_MULTIPLIER + fig_x + j][colIndex * FIGURE_MULTIPLIER + fig_y + i] = 1
                        // ctx.fillRect((colIndex * FIGURE_MULTIPLIER + fig_y + i) * SQUARE_SIZE,
                        //     (rowIndex * FIGURE_MULTIPLIER + fig_x + j) * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
                    }
            }
        }
        )
    })
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const breakDown = async () => {
    const ROWS = arr.length;
    const COLS = arr[0].length;

    let moved = true;

    while (moved) {
        moved = false;

        // start from second-to-last row (ROWS - 2) so row+1 is always valid
        for (let row = ROWS - 2; row >= 0; row--) {
            for (let col = 0; col < COLS; col++) {
                if (arr[row][col] !== 1) continue;

                // try to fall straight down
                if (arr[row + 1][col] === 0) {
                    arr[row][col] = 0;
                    arr[row + 1][col] = 1;
                    moved = true;
                    continue;
                }

                // try down-left
                if (col > 0 && arr[row][col - 1] === 0 && arr[row + 1][col - 1] === 0) {
                    arr[row][col] = 0;
                    arr[row + 1][col - 1] = 1;
                    moved = true;
                    continue;
                }

                // try down-right
                if (col < COLS - 1 && arr[row][col + 1] === 0 && arr[row + 1][col + 1] === 0) {
                    arr[row][col] = 0;
                    arr[row + 1][col + 1] = 1;
                    moved = true;
                    continue;
                }
            }

        }
        drawCanvas();
        await sleep(50)
    }
};


spawnFigure(figure)

const interval = setInterval(async () => {
    drawCanvas()
    drawFigure(figure)
    if (checkBorders(figure) || checkForColision(figure, "DOWN")) {
        pinFigure()
        await breakDown()
        spawnFigure(figure)
    }
    else
        fig_x++;
}, 200)

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        e.preventDefault();
        fig_y--;
    }
    if (e.key === "ArrowRight") {
        e.preventDefault();
        fig_y++;
    }
});