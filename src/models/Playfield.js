class Playfield {
  constructor(sizeX, sizeY) {
    this.size = {
      x: sizeX,
      y: sizeY
    };
  }

  create() {
    return new Array(this.size.x)
      .fill(0)
      .map(() => new Array(this.size.y).fill(0));
  }
}

export default Playfield;
