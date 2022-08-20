import { Entity, makeFrame } from '../framework/Entity';
import { EntityController } from '../framework/EntityController';
import { Direction } from './util';

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
    this.direction = Direction.none;
  }
}

SnakeEntityController.prototype.update = function () {
  let deltaInXYForDirection = {};
  deltaInXYForDirection[Direction.none] = [0, 0];
  deltaInXYForDirection[Direction.up] = [0, -SNAKE_ENTITY_SIZE];
  deltaInXYForDirection[Direction.left] = [-SNAKE_ENTITY_SIZE, 0];
  deltaInXYForDirection[Direction.down] = [0, SNAKE_ENTITY_SIZE];
  deltaInXYForDirection[Direction.right] = [SNAKE_ENTITY_SIZE, 0];

  const [deltaX, deltaY] = deltaInXYForDirection[this.direction];
  this.entity.frame.x += deltaX;
  this.entity.frame.y += deltaY;
};

SnakeEntityController.prototype.didKeyDown = function (key) {
  const changeDirectionForKeyCallbacks = {
    w: () => (this.direction = Direction.up),
    a: () => (this.direction = Direction.left),
    s: () => (this.direction = Direction.down),
    d: () => (this.direction = Direction.right),
  };

  if (key in changeDirectionForKeyCallbacks) {
    changeDirectionForKeyCallbacks[key]();
    console.info(`Snake direction changed to ${this.direction}`);
  }
};
