import Piece from './Piece';
import { TetrisState } from '../utils/GameState';
import { createMatrix, random } from '../utils/helpers';
import tetrominoesCollection from '../utils/tetrominoes';

class Tetris {
  private playfield!: number[][];

  private activePiece!: Piece;
  private nextPiece!: Piece;

  private state: TetrisState;

  constructor() {
    this.setup();

    this.state = TetrisState.Ready;
  }

  private isReadyState(): boolean {
    return this.state === TetrisState.Ready;
  }

  private isPlayingState(): boolean {
    return this.state === TetrisState.Playing;
  }

  private isPauseState(): boolean {
    return this.state === TetrisState.Pause;
  }

  private isOverState(): boolean {
    return this.state === TetrisState.Over;
  }

  private generatePiece(): Piece {
    const index = random(0, tetrominoesCollection.length - 1);

    return new Piece(tetrominoesCollection[index]);
  }

  private setActiveAndNextPieces() {
    this.activePiece = this.generatePiece();
    this.nextPiece = this.generatePiece();
  }

  private setup() {
    this.playfield = createMatrix(20, 10);
    this.setActiveAndNextPieces();
  }

  togglePause() {
    this.isPlayingState() ? this.pause() : this.start();
  }

  start() {
    if (this.isPlayingState()) return;

    if (this.isOverState()) this.reset();

    this.state = TetrisState.Playing;
  }

  pause() {
    if (!this.isPlayingState()) return;

    this.state = TetrisState.Pause;
  }

  reset() {
    Object.assign(this, new Tetris());
  }
}

export default Tetris;
