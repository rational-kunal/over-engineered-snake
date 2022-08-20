import { EntityController } from '../framework/EntityController';
import { SnakeEntityController } from './SnakeEntityController';

export class RootEntityController extends EntityController {
  constructor() {
    super();

    this.snakeEntityController = new SnakeEntityController();
    this.addChildEntityController(this.snakeEntityController);
    this.entity.addSubEntity(this.snakeEntityController.entity);
  }
}

RootEntityController.prototype.didKeyDown = function (key) {
  // Pass user kbd inputs to snake controller to change direction of snake accordingly
  this.snakeEntityController.didKeyDown(key);
};
