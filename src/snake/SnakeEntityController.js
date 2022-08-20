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
    this.snakeEntities = [
      new SnakeEntity(0, 0),
      new SnakeEntity(10, 0),
      new SnakeEntity(20, 0),
    ];
    this.snakeHeadEntity = this.snakeEntities[2];
    this.entity.subEntities = this.snakeEntities;
    this.direction = Direction.none;
  }
}

SnakeEntityController.prototype.update = function () {
  if (this.direction === Direction.none) {
    return;
  }

  let deltaInXYForDirection = {};
  deltaInXYForDirection[Direction.up] = [0, -SNAKE_ENTITY_SIZE];
  deltaInXYForDirection[Direction.left] = [-SNAKE_ENTITY_SIZE, 0];
  deltaInXYForDirection[Direction.down] = [0, SNAKE_ENTITY_SIZE];
  deltaInXYForDirection[Direction.right] = [SNAKE_ENTITY_SIZE, 0];

  const [deltaX, deltaY] = deltaInXYForDirection[this.direction];
  const newHeadX = this.snakeHeadEntity.frame.x + deltaX;
  const newHeadY = this.snakeHeadEntity.frame.y + deltaY;
  const newSnakeHeadEntity = new SnakeEntity(newHeadX, newHeadY);
  this.snakeEntities.shift();
  this.snakeEntities.push(newSnakeHeadEntity);
  this.snakeHeadEntity = newSnakeHeadEntity;
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
