import Tetris from './models/Tetris';
import TetrisController from './controllers/TetrisController';

const tetris = new TetrisController(
  new Tetris()
);

tetris.run();
