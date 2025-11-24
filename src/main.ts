const ROWS = 100;
const COLS = 70;
const FIGURE_MULTIPLIER = 5;

let fig_x = 0;
let fig_y = 0;

let isProcessing = false;

interface figureType {
    value: number;
    shape: object;
}

let arr = Array.from({ length: ROWS }, () => Array(COLS).fill(0));


const SQUARE_SIZE = 5

const COLORS = [
    "#0B1020",
    "#FF9F1C", // orange
    "#2EC4B6", // cyan
    "#E71D36", // red/pink
    "#9D4EDD", // purple
    "#7AE582", // lime green
    "#3A86FF", // blue
    "#ffffff"
];

const FIGURES = [
    {
        value: 1,
        shape: [[0, 0, 1], [1, 1, 1]]
    },
    {
        value: 2,
        shape: [[0, 1, 1], [1, 1, 0]]
    },
    {
        value: 3,
        shape: [[1, 1, 1, 1]]
    },
    {
        value: 4,
        shape: [[1, 1], [1, 1]]
    },
    {
        value: 5,
        shape: [[1, 1, 0], [0, 1, 1]]
    },
    {
        value: 6,
        shape: [[1, 0, 0], [1, 1, 1]]
    }
]

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const drawCanvas = () => {
    for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
        const row = arr[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            ctx.fillStyle = COLORS[row[colIndex]]
            ctx.fillRect(colIndex * SQUARE_SIZE, rowIndex * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        }
    }
}

const drawFigure = (figure) => {
    ctx.fillStyle = COLORS[figure.value];
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        ctx.fillRect((colIndex * FIGURE_MULTIPLIER + fig_y + i) * SQUARE_SIZE,
                            (rowIndex * FIGURE_MULTIPLIER + fig_x + j) * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
                    }
            }
        }
    }
}

const figureLoop = (figure) => {
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1)
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++)
                        return [rowIndex * FIGURE_MULTIPLIER + fig_x + j, colIndex * FIGURE_MULTIPLIER + fig_y + i]
        }
    }
}

const checkForColision = (figure, direction?) => {
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        switch (direction) {
                            case "DOWN":
                                if (arr[rowIndex * FIGURE_MULTIPLIER + fig_x + j + 1][colIndex * FIGURE_MULTIPLIER + fig_y + i] > 0) {
                                    return true
                                }
                            default:
                                if (arr[rowIndex * FIGURE_MULTIPLIER + fig_x + j][colIndex * FIGURE_MULTIPLIER + fig_y + i] > 0) {
                                    return true
                                }
                        }
                    }
            }
        }
    }
    return false;
}

const checkBorders = (figure) => {

    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++) {
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        if ((rowIndex * FIGURE_MULTIPLIER + fig_x + j + 1) >= ROWS) {
                            return true; // ✅ now exits checkBorders
                        }
                    }
                }
            }
        }
    }

    return false;
};

const fillNeighbor = (row, col, val, grid, state) => {

    // out of bounds
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return;

    // ❗ avoid infinite recursion — if already visited (8), stop
    if (grid[row][col] === 8) return;

    // not same value → stop
    if (grid[row][col] !== val) return;

    // mark visited
    grid[row][col] = 8;

    // update minRow
    if (col === 0 && row < state.minRow) {
        state.minRow = row;
    }

    // update maxCol
    if (col > state.maxCol) {
        state.maxCol = col;
    }

    // original recursion structure (UNCHANGED):
    if (row + 1 < grid.length && grid[row + 1][col] === val)
        fillNeighbor(row + 1, col, val, grid, state);

    if (row - 1 >= 0 && grid[row - 1][col] === val)
        fillNeighbor(row - 1, col, val, grid, state);

    if (col + 1 < grid[0].length && grid[row][col + 1] === val)
        fillNeighbor(row, col + 1, val, grid, state);

    if (col - 1 >= 0 && grid[row][col - 1] === val)
        fillNeighbor(row, col - 1, val, grid, state);
};

const clearConnection = (val1, val2) => {
    for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
        const row = arr[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == val1) {
                row[colIndex] = val2
            }
        }
    }
}


const checkConnection = async () => {
    console.log('checkConnection')
    let isConnection = false;
    let state = { maxCol: 0, minRow: ROWS };

    // Continue climbing up ONLY if the next row is full
    while (arr[state.minRow-1][0] > 0 && !arr[ROWS-1].includes(0)) {
        let newArr = arr.map(row => [...row]);  // deep clone

        console.log({state})
        // Start at bottom-left (THIS WAS WRONG BEFORE)
        const startVal = arr[state.minRow-1][0];
        console.log({startVal})

        // Flood-fill the row above (same value!)
        fillNeighbor(state.minRow - 1, 0, startVal, newArr, state);

        // If we reached last column → connection exists
        if (state.maxCol === COLS - 1) {
            state.maxCol = 0
            arr = newArr.map(row =>[...row]);
            console.log({newArr})
            isConnection = true;
            clearConnection(8,7)
        }
    }
    if(isConnection)
  {
      drawCanvas()
      clearConnection(7,0)
      await breakDown();
    }
};


const pinFigure = (figure) => {
    for (let rowIndex = 0; rowIndex < figure.shape.length; rowIndex++) {
        const row = figure.shape[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            if (row[colIndex] == 1) {
                for (let i = 0; i < FIGURE_MULTIPLIER; i++)
                    for (let j = 0; j < FIGURE_MULTIPLIER; j++) {
                        arr[rowIndex * FIGURE_MULTIPLIER + fig_x + j][colIndex * FIGURE_MULTIPLIER + fig_y + i] = figure.value
                    }
            }
        }
    }
}

const spawnFigure = () => {
    fig_x = 0;
    fig_y = COLS / 2 - 8;
    const val = Math.floor(Math.random() * FIGURES.length)
    const figure = FIGURES[val];
    if (!checkForColision(figure))
        return figure
    else console.log('Game Over')
}

let currentFigure = spawnFigure()

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
                if (arr[row][col] === 0) continue;

                // try to fall straight down
                if (arr[row + 1][col] === 0) {
                    const prevValue = arr[row][col]
                    arr[row][col] = 0;
                    arr[row + 1][col] = prevValue;
                    moved = true;
                    continue;
                }

                // try down-left
                if (col > 0 && arr[row][col - 1] === 0 && arr[row + 1][col - 1] === 0) {
                    const prevValue = arr[row][col]
                    arr[row][col] = 0;
                    arr[row + 1][col - 1] = prevValue;
                    moved = true;
                    continue;
                }

                // try down-right
                if (col < COLS - 1 && arr[row][col + 1] === 0 && arr[row + 1][col + 1] === 0) {
                    const prevValue = arr[row][col]
                    arr[row][col] = 0;
                    arr[row + 1][col + 1] = prevValue;
                    moved = true;
                    continue;
                }
            }

        }
        drawCanvas();
        await sleep(50)
    }
};


const interval = setInterval(async () => {
    // ⛔ If we are processing breakdown/spawning — SKIP this tick
    if (isProcessing) return;

    drawCanvas();
    drawFigure(currentFigure);

    if (checkBorders(currentFigure) || checkForColision(currentFigure, "DOWN")) {

        isProcessing = true;  // 🔒 lock

        pinFigure(currentFigure);
        await breakDown();    // wait for sand-fall animation
        await checkConnection()
        currentFigure = spawnFigure();  // generate only ONCE

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
});