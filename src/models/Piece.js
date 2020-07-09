import pieces from '../config/pieces';

class Piece {
  pos = {
    x: 3,
    y: -1
  };

  type = null;

  matrix = [];

  locked = false;

  constructor(config) {
    Object.assign(this, config);
  }

  create(type, x, y) {
    const keys = Object.keys(pieces);
    const $type = keys[
      type || keys.length * Math.random() << 0 // eslint-disable-line no-bitwise
    ];

    this.pos.x = x || this.pos.x;
    this.pos.y = y || this.pos.y;
    this.type = $type;
    this.matrix = pieces[type];
  }
}

export default Piece;
