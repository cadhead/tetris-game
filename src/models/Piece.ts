class Piece {
  type: string;

  color: string;

  matrix: number[][];

  x!: number;

  y!: number;

  constructor(tetromino: Tetromino) {
    this.type = tetromino.type;
    this.color = tetromino.color;
    this.matrix = tetromino.matrix;
  }
}

export default Piece;
