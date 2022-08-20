import { Entity, makeFrame } from '../framework/Entity';
import { EntityController } from '../framework/EntityController';

const SNAKE_ENTITY_SIZE = 10;

class SnakeEntity extends Entity {
  constructor(x, y) {
    super(makeFrame(x, y, SNAKE_ENTITY_SIZE, SNAKE_ENTITY_SIZE));
  }
}

export class SnakeEntityController extends EntityController {
  constructor() {
    super();
    this.entity = new SnakeEntity(0, 0);
  }

  update() {
    this.entity.frame.x += SNAKE_ENTITY_SIZE;
  }
}
