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

Frame.prototype.toString = function () {
  return `{x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height}}`;
};

// 🚧 DO NOT USE: SCALABLE COLLISION DETECTION LOGIC IS IN PROGRESS 🚧
Frame.prototype._IN_DEVELOPMENT_canCollideWith = function (withFrame) {
  const extrapolateToPoints = (f) => [f.x, f.y, f.x + f.width, f.y + f.height];
  const [thisX1, thisY1, thisX2, thisY2] = extrapolateToPoints(this);
  const [withX1, withY1, withX2, withY2] = extrapolateToPoints(withFrame);

  const isPointInsideThis = (x, y) =>
    x >= thisX1 && x < thisX2 && y >= thisY1 && y < thisY2;

  return (
    isPointInsideThis(withX1, withY1) ||
    isPointInsideThis(withX1, withY2) ||
    isPointInsideThis(withX2, withY1) ||
    isPointInsideThis(withX2, withY2)
  );
};

export const makeFrame = (x, y, width, height) =>
  new Frame(x, y, width, height);

export const makeZeroFrame = () => makeFrame(0, 0, 0, 0);

/**
 * 🚧 DO NOT USE: SCALABLE COLLISION DETECTION LOGIC IS IN PROGRESS 🚧
 * Returns true if given frame collides with each other
 * TODO: Implement scalable collision detection
 * @param {Frame} aFrame
 * @param {Frame} bFrame
 * @returns boolean
 */
export function detectScalableCollision(aFrame, bFrame) {
  // This simple collision detection is working cause in snake game all entities have similar width and height
  const isOriginEqual = aFrame.x === bFrame.x && aFrame.y === bFrame.y;
  const isSizeEqual =
    aFrame.width === bFrame.width && aFrame.height === bFrame.height;
  return isOriginEqual && isSizeEqual;
}

/**
 * Returns true if given frame collides with each other
 * TODO: Implement scalable collision detection
 * @param {Frame} aFrame
 * @param {Frame} bFrame
 * @returns boolean
 */
export function detectCollision(aFrame, bFrame) {
  // This simple collision detection is working cause in snake game all entities have similar width and height
  const isOriginEqual = aFrame.x === bFrame.x && aFrame.y === bFrame.y;
  const isSizeEqual =
    aFrame.width === bFrame.width && aFrame.height === bFrame.height;
  return isOriginEqual && isSizeEqual;
}
