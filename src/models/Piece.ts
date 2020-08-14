import { createFilledArray } from '../utils/helpers';

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

  private getBlocksSize() {
    return this.blocks.length;
  }

  private calculateInitialPositionX(): number {
    const matrixSize = this.getBlocksSize();

    const lastColumn = this.getBlockColumn(matrixSize - 1);
    const isLastColumnEmpty = lastColumn.every((block) => block === 0);

    return isLastColumnEmpty ? 3 : 4;
  }

  private calculateInitialPositionY(): number {
    return 0;
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

  private getBlocksRotated(): number[][] {
    const rotatedBlocks = [];
    const blocksSize = this.getBlocksSize();

    for (let index = 0; index < blocksSize; index++) {
      rotatedBlocks[index] = createFilledArray(blocksSize, 0);
    }

    for (let y = 0; y < blocksSize; y++) {
      for (let x = 0; x < blocksSize; x++) {
        rotatedBlocks[x][y] = this.blocks[blocksSize - 1 - y][x];
      }
    }

    return rotatedBlocks;
  }

  private changeBlocksState(playfield: number[][], callback: Function): boolean {
    if (!playfield || this.hasCollision(playfield)) { 
      return false;
    }

    callback();
    return true;
  }

  rotate(playfield: number[][]): boolean {
    return this.changeBlocksState(playfield, () => {
      this.blocks = this.getBlocksRotated();
    });
  }

  moveDown(playfield: number[][]): boolean {
    return this.changeBlocksState(playfield, () => {
      this.y += 1;
    });
  }

  moveLeft(playfield: number[][]): boolean {
    return this.changeBlocksState(playfield, () => {
      this.x -= 1;
    });
  }

  moveRight(playfield: number[][]): boolean {
    return this.changeBlocksState(playfield, () => {
      this.x += 1;
    });
  }
}

export default Piece;
