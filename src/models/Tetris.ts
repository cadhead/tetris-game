import Piece from './Piece';
import { TetrisState } from '../utils/GameState';
import { createMatrix, random } from '../utils/helpers';
import tetrominoesCollection from '../utils/tetrominoes';

class Tetris {
  readonly rows = 20;
  readonly cols = 10;

  private playfield = createMatrix(this.rows, this.cols);

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
  }

  pause(): void {
    if (!this.isPlayingState()) return;

    this.state = TetrisState.Pause;
  }

  reset(): void {
    if (this.state === TetrisState.Ready) return;
    if (this.state === TetrisState.Playing) this.pause();

    Object.assign(this, new Tetris());
  }
}

export default Tetris;
