interface Stroke {
  color: string
  size: number
}

interface Options {
  width?: number
  height?: number
}

class Canvas {
  readonly element: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  static readonly defaultOptions = {
    width: 200,
    height: 400
  };

  constructor(selectorID: string, options?: Options) {
    this.element = Canvas.createCanvasElement(options);
    this.context = this.getCanvasContext();

    this.appendCanvasElement(selectorID);
  }

  private static createCanvasElement(options?: Options): HTMLCanvasElement {
    const canvas = <HTMLCanvasElement> document.createElement('CANVAS'); // needs refactoring

    if (!options) options = Canvas.defaultOptions;

    canvas.width = options.width;
    canvas.height = options.height;
    canvas.tabIndex = 0;

    return canvas;
  }

  appendCanvasElement(selectorID) {
    const selector = document.getElementById(selectorID);
    selector.appendChild(this.element);
  }

  private getCanvasContext(): CanvasRenderingContext2D {
    return this.element.getContext('2d');
  }

  clear() {
    const {width, height} = this.element;

    this.context.clearRect(0, 0, width, height);
  }

  drawRectangle(size: number, x: number, y: number, color: string, stroke?: Stroke) {
    const rectangleX = size * x;
    const rectangleY = size * y;

    this.context.fillStyle = color;
    this.context.strokeStyle = stroke?.color;
    
    this.context.fillRect(rectangleX, rectangleY, size, size);

    if (stroke) this.context.strokeRect(
      rectangleX + 0.5,
      rectangleY + 0.5,
      size - 1,
      size - 1,
    );
  }
}

export default Canvas;
