import { Entity } from './Entity';

export class EntityController {
  /** Root entity directly associated with this Entity Controller */
  entity = new Entity();

  /** Child entity controller in the hierarchy */
  childEntityControllers = [];
}

/**
 * Override this to load the entity.
 * Default implementation is a no-op.
 */
EntityController.prototype.loadEntity = function () {};

EntityController.prototype.didKeyDown = function (key) {
  console.error('Override this function in root entity controller');
};

EntityController.prototype.update = function () {
  this.childEntityControllers.forEach((ec) => ec.update());
};
