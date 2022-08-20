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
