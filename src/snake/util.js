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
