export const Direction = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  none: 'none',
};

export const mod = (left, right) => {
  'use strict';
  return ((left % right) + right) % right;
};

export const randomNumber = (min, max, unit = 1) => {
  min /= unit;
  max /= unit;

  return (Math.floor(Math.random() * (max - min + 1)) + min) * unit;
};
