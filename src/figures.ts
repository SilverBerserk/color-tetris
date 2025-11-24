
export const FIGURES = [
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


export const randomFigure = () => FIGURES[Math.floor(Math.random() * FIGURES.length)]