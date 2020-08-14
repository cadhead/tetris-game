import Observer from './Observer';
import Piece from './Piece';
import { TetrisState } from '../utils/GameState';
import { TetrisEvents } from '../utils/GameEvents';
import { createMatrix, random } from '../utils/helpers';
import tetrominoesCollection from '../utils/tetrominoes';

class Tetris extends Observer {
  readonly rows = 20;
  readonly cols = 10;

  private playfield = createMatrix(this.rows, this.cols);

  private activePiece!: Piece;
  private nextPiece!: Piece;

  private state: TetrisState;

  constructor() {
    super();

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

  private updateActiveAndNextPieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.generatePiece();
  }

  private setup() {
    this.setActiveAndNextPieces();
  }

  private lockPiece() {
    const {x: pieceX, y: pieceY, blocks} = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }

    this.updateActiveAndNextPieces();
  }

  togglePause() {
    this.isPlayingState() ? this.pause() : this.start();
  }

  start(): void {
    if (this.isPlayingState()) return;

    if (this.isOverState()) this.reset();

    this.state = TetrisState.Playing;
    this.notifySubscribers(TetrisEvents.Started, this.nextPiece);
  }

  pause(): void {
    if (!this.isPlayingState()) return;

    this.state = TetrisState.Pause;
    this.notifySubscribers(TetrisEvents.Paused);
  }

  reset(): void {
    if (this.state === TetrisState.Ready) return;
    if (this.state === TetrisState.Playing) this.pause();

    Object.assign(this, new Tetris());
  }

  rotatePiece(): void {
    if (this.state !== TetrisState.Playing) return;

    const rotated = this.activePiece.rotate(this.playfield);

    if (rotated) this.notifySubscribers(TetrisEvents.PieceRotated, this.activePiece);
  }

  movePieceDown(): void {
    if (this.state !== TetrisState.Playing) return;

    this.activePiece.moveDown(this.playfield)
      ? this.notifySubscribers(TetrisEvents.PieceMoved, this.activePiece)
      : this.lockPiece();
  }
}

export default Tetris;
