import { Entity } from './Entity';

export class CollidableEntity extends Entity {
  constructor(...args) {
    super(...args);
    this.collidable = true;
    this.collisionCallback = null;
  }
}

CollidableEntity.prototype.didCollideWith = function (otherEntity) {
  if (this.collisionCallback) {
    this.collisionCallback(otherEntity);
  }
};
