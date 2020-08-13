class Piece implements Tetromino {
  type: string;

  color: string;

  blocks: number[][];

  x!: number;

  y!: number;

  constructor(tetromino: Tetromino) {
    this.type = tetromino.type;
    this.color = tetromino.color;
    this.blocks = tetromino.blocks;

    this.setInitialPosition();
  }

  private getBlockColumn(index: number): number[] {
    const column = [];

    for (const row of this.blocks) {
      if (!row[index]) continue;

      column.push(row[index]);
    }

    return column;
  }

  private getBlockSize() {
    return this.blocks.length - 1;
  }

  private calculateInitialPositionX(): number {
    const matrixSize = this.getBlockSize();

    const lastColumn = this.getBlockColumn(matrixSize);
    const isLastColumnEmpty = lastColumn.every((block) => block === 0);

    return isLastColumnEmpty ? 4 : 3;
  }

  private calculateInitialPositionY(): number {
    const matrixSize = this.getBlockSize();

    let ghostBlockIndex: number;
    let index = matrixSize;
    
    for (const row of this.blocks) {
      index -= 1;

      if (row.every((block) => block === 0)) continue;

      ghostBlockIndex = index + 1;
    }

    return ghostBlockIndex;
  }

  private getInitialPosition(): number[] {
    const x = this.calculateInitialPositionX();
    const y = this.calculateInitialPositionY();

    return [x, y];
  }

  private setInitialPosition() {
    const [x, y] = this.getInitialPosition();

    this.x = x;
    this.y = y;
  }

  private isOutOfBounds(playfield: number[][], x: number, y: number) {
    return (
      playfield[this.y + y] === undefined ||
      playfield[this.y + y][this.x + x] === undefined
    );
  }

  private hasCollision(playfield: number[][]): boolean {
    for (let y = 0; y < this.blocks.length; y++) {
      for (let x = 0; x < this.blocks[y].length; x++) {
        if (this.isOutOfBounds(playfield, x, y)) {
          return true;
        }

        if (playfield[this.y + y][this.x + x]) {
          return true;
        }
      }
    }

    return false;
  }

  rotate(playfield: number[][]): void {
    if (!playfield) return;
    if (this.hasCollision(playfield)) return;

    // ...
  }
}

export default Piece;
