import Tetris from '../models/Tetris';
import TetrisPlayfield from '~/view/TetrisPlayfield';
import { TetrisEvents } from '../utils/GameEvents';

class TetrisController {
  tetris: Tetris;
  playfield: TetrisPlayfield;

  constructor(model: Tetris, playfield: TetrisPlayfield) {
    this.tetris = model;
    this.playfield = playfield;
  }

  private subscribeObservers() {
    this.tetris.subscribe(
      TetrisEvents.Started,
      () => console.log('game successfful started')
    );

    this.tetris.subscribe(
      TetrisEvents.Paused,
      () => console.log('game successfful paused')
    );

    this.tetris.subscribe(
      TetrisEvents.PieceRotated,
      () => console.log('piece successfful rotated')
    );

    this.tetris.subscribe(
      TetrisEvents.PieceMoved,
      this.playfield.updateActivePiecePosition
    );
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
    case 'Enter':
      this.tetris.togglePause();
      break;
    case 'ArrowUp':
      this.tetris.rotatePiece();
      break;
    case 'ArrowDown':
      this.tetris.movePieceDown();
      break;
    
    default:
      break;
    }
  }

  run() {
    this.subscribeObservers();
    this.playfield.bindKeyDownHandler(this.handleKeyDown.bind(this));
  }
}

export default TetrisController;
