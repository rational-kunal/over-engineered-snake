import { Frame, ZERO_FRAME } from './Frame';
import { shared } from '../core/shared';

export class Entity {
  constructor(frame = ZERO_FRAME) {
    this.frame = frame;
    this.subEntities = [];
    this.collidable = false;
  }
}

Entity.prototype.draw = function () {
  if (!this.frame.isEmpty) {
    shared.renderingContext.fillRect(...this.frame.param);
  }

  // Draw sub-entities
  this.subEntities.forEach((e) => e.draw());
};

Entity.prototype.didCollideWith = function (otherEntity) {
  console.error('Collision detection should be overridden by subclass');
};
