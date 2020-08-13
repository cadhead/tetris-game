export function createFilledArray(len: number, value: unknown) {
  return new Array(len).fill(value);
}

export function createMatrix(rows: number, cols: number) {
  const matrix = createFilledArray(rows, 0)
    .map(() => createFilledArray(cols, 0));

  return matrix;
}

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
