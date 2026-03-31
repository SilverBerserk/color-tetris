
export const FIGURES = [
    [[0, 0, 1], [1, 1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[1, 0, 0], [1, 1, 1]]
]


export const randomFigure = () => {
    const val = Math.floor(Math.random() * FIGURES.length)
    return {shape: FIGURES[val], value: val + 1}
}