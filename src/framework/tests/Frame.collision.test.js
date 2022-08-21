import { Frame, detectScalableCollision } from '../Frame';

// 🚧 SCALABLE COLLISION DETECTION LOGIC IS IN PROGRESS 🚧
const detectCollision = detectScalableCollision;

test('Frames with coordinates apart do not collide', () => {
  const topLeftFrame = new Frame(0, 0, 1, 1);
  const topRightFrame = new Frame(2, 0, 1, 1);
  const bottomLeftFrame = new Frame(0, 2, 1, 1);
  const bottomRightFrame = new Frame(2, 2, 1, 1);

  expect(detectCollision(topLeftFrame, topRightFrame)).toBeFalsy();
  expect(detectCollision(topLeftFrame, bottomLeftFrame)).toBeFalsy();
  expect(detectCollision(topLeftFrame, bottomRightFrame)).toBeFalsy();
});

test('Collision with smaller frame inside bigger frame', () => {
  const biggerFrame = new Frame(0, 0, 4, 4);
  const smallerFrame = new Frame(1, 1, 1, 1);

  expect(detectCollision(biggerFrame, smallerFrame)).toBeTruthy();
});

test('No collision for touching frames', () => {
  const leftFrame = new Frame(0, 0, 1, 1);
  const rightFrame = new Frame(1, 0, 1, 1);

  expect(detectCollision(leftFrame, rightFrame)).toBeFalsy();
});
