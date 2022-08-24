import { makeZeroFrame } from './Frame';
import { shared } from '../core/shared';
import { Color } from './Color';

export class Entity {
  constructor(frame = makeZeroFrame()) {
    this.frame = frame;
    this.subEntities = [];
    this.collidable = false;
    this.type = undefined;
    this.bgColor = Color.clear;
  }
}

Entity.prototype.toString = function () {
  if (this.type) return `[Entity ${this.type} ${this.frame}]`;
  return `[Entity ${this.frame}]`;
};

Entity.prototype.draw = function () {
  if (!this.frame.isEmpty && this.bgColor !== Color.clear) {
    shared.renderingContext.fillStyle = this.bgColor;
    shared.renderingContext.fillRect(...this.frame.param);
  }

  // Draw sub-entities
  this.subEntities.forEach((e) => e.draw());
};

Entity.prototype.didCollideWith = function (otherEntity) {
  console.error('Collision detection should be overridden by subclass');
};
