import { Entity } from './Entity';

export class EntityController {
  constructor() {
    this.entity = new Entity();
    this.childEntityControllers = [];
  }
}

EntityController.prototype.addChildEntityController = function (
  childEntityController
) {
  this.childEntityControllers.push(childEntityController);
};

EntityController.prototype.update = function () {
  this.childEntityControllers.forEach((ec) => ec.update());
};
