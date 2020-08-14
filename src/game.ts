import Tetris from './models/Tetris';
import TetrisController from './controllers/TetrisController';
import TetrisPlayfield from './view/TetrisPlayfield';

const tetris = new TetrisController(
  new Tetris(),
  new TetrisPlayfield('app')
);

tetris.run();
