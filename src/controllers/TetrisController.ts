import Tetris from '../models/Tetris';

class TetrisController {
  tetris: Tetris;

  constructor(model: Tetris) {
    this.tetris = model;
  }

  run() {
    console.log(this.tetris);
  }
}

export default TetrisController;
