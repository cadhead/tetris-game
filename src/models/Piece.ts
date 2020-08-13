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

  private getMatrixColumn(index: number): number[] {
    const column = [];

    for (const row of this.blocks) {
      if (!row[index]) continue;

      column.push(row[index]);
    }

    return column;
  }

  private getMatrixSize() {
    return this.blocks.length - 1;
  }

  private calculateInitialPositionX(): number {
    const matrixSize = this.getMatrixSize();

    const lastColumn = this.getMatrixColumn(matrixSize);
    const isLastColumnEmpty = lastColumn.every((block) => block === 0);

    return isLastColumnEmpty ? 4 : 3;
  }

  private calculateInitialPositionY(): number {
    const matrixSize = this.getMatrixSize();

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
}

export default Piece;
