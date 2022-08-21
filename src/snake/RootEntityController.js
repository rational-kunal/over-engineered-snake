import { EntityController } from '../framework/EntityController';
import { PowersEntityController } from './PowersEntityController';
import { SnakeEntityController } from './SnakeEntityController';

export class RootEntityController extends EntityController {
  constructor() {
    super();

    this.snakeEntityController = new SnakeEntityController();
    this.childEntityControllers.push(this.snakeEntityController);
    this.entity.subEntities.push(this.snakeEntityController.entity);

    this.powerEntityController = new PowersEntityController();
    this.childEntityControllers.push(this.powerEntityController);
    this.entity.subEntities.push(this.powerEntityController.entity);
  }
}

RootEntityController.prototype.didKeyDown = function (key) {
  // Pass user kbd inputs to snake controller to change direction of snake accordingly
  this.snakeEntityController.didKeyDown(key);
};
