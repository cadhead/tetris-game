import Canvas from './Canvas';
import Piece from '../models/Piece';

class TetrisPlayfield {
  canvas: Canvas;

  constructor(rootElementID: string) {
    this.canvas = new Canvas(rootElementID);
  }

  bindKeyDownHandler(handler: Function): void {
    this.canvas.element
      .addEventListener('keydown', (event) => handler(event));
  }

  drawPiece(piece: Piece): void {
    const {blocks, x, y, color} = piece;

    for (let row = 0; row < blocks.length; row++) {
      for (let col = 0; col < blocks.length; col++) {
        if (blocks[row][col] !== 0) {
          const blockX = x + col; 
          const blockY = y + row;

          this.canvas.drawRectangle(20, blockX, blockY, color, {
            color: '#222222',
            size: 0.5
          });
        }
      }
    }
  }

  updateActivePiecePosition(piece: Piece) {
    this.canvas.clear();
    this.drawPiece(piece);
  }
}

export default TetrisPlayfield;
