export class Frame {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get param() {
    return [this.x, this.y, this.width, this.height];
  }

  get isEmpty() {
    return this.width === 0 || this.height === 0;
  }
}

export const makeFrame = (x, y, width, height) =>
  new Frame(x, y, width, height);

export const ZERO_FRAME = new Frame();
