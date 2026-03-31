export type Figure = {
    value: number,
    shape: number[][]
}

export type State = {
    minRow: number;
    maxCol: number;
}

export enum DIRECTION {
    DOWN="down",
    LEFT="left",
    RIGHT="right",
}