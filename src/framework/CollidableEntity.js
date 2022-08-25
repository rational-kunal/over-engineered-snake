import { Entity } from './Entity';

export class CollidableEntity extends Entity {
  collidable = true;

  /** callback when collision is detected for the entity. */
  collisionCallback = null;
}

CollidableEntity.prototype.didCollideWith = function (otherEntity) {
  if (this.collisionCallback) {
    this.collisionCallback(otherEntity);
  }
};
