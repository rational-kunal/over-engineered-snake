import { makeZeroFrame } from './Frame';
import { shared } from '../core/shared';
import { Color } from './Color';

const UNKNOWN_ENTITY_TYPE = 'UNKNOWN_ENTITY_TYPE';

export class Entity {
  /** Whether this entity should be collidable or not. */
  collidable = false;

  /** Type of the entity */
  type = UNKNOWN_ENTITY_TYPE;

  /** Sub entities present under this entity */
  subEntities = [];

  /** Background color */
  bgColor = Color.clear;

  constructor(frame = makeZeroFrame()) {
    this.frame = frame;
  }
}

Entity.prototype.toString = function () {
  return `[${this.type} ${this.frame}]`;
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
