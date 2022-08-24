import { Entity } from './Entity';

export class EntityController {
  constructor() {
    this.entity = new Entity();
    this.childEntityControllers = [];
  }
}

/**
 * Override this to load the entity.
 * Default implementation is a no-op.
 */
EntityController.prototype.loadEntity = function () {};

EntityController.prototype.didKeyDown = function (key) {
  // Should be overridden in sub class
  // This event should be passed only to controllers that need it
};

EntityController.prototype.update = function () {
  this.childEntityControllers.forEach((ec) => ec.update());
};
