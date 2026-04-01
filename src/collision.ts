import { COLS, ROWS } from "./settings";
import { Figure } from "./types";

export const checkCollision = (figure: Figure, grid: number[][], x: number, y: number) => {
  const height = figure.shape.length;
  const width = figure.shape[0].length;

  // Check boundaries
  if (x < 0 || x + width > COLS || y + height > ROWS) return true;

  // Check collision
  return figure.shape.some((row, rowIndex) =>
    row.some((cell, colIndex) =>
      cell && grid[y + rowIndex]?.[x + colIndex] > 0
    )
  );
};