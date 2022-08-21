import { makeFrame } from '../framework/Frame';
import { EntityController } from '../framework/EntityController';
import { Direction, mod } from './util';
import { shared } from '../core/shared';
import { POWER_ENTITY_TYPE } from './PowersEntityController';
import { CollidableEntity } from '../framework/CollidableEntity';

export const SNAKE_ENTITY_TYPE = 'SNAKE_ENTITY_TYPE';
const SNAKE_ENTITY_SIZE = 10;

class SnakeEntity extends CollidableEntity {
  constructor(x, y) {
    super(makeFrame(x, y, SNAKE_ENTITY_SIZE, SNAKE_ENTITY_SIZE));
    this.type = SNAKE_ENTITY_TYPE;
  }
}

export class SnakeEntityController extends EntityController {
  constructor() {
    super();
    this.snakeEntities = [this._createSnakeEntity(0, 0)];
    this.snakeHeadEntity = this.snakeEntities[0];
    this.entity.subEntities = this.snakeEntities;
    this.direction = Direction.none;
    this.powerUp = false;
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

  const worldFrame = shared.engine.getWorldFrame();
  const [dx, dy] = deltaInXYForDirection[this.direction];
  const newHeadX = mod(this.snakeHeadEntity.frame.x + dx, worldFrame.width);
  const newHeadY = mod(this.snakeHeadEntity.frame.y + dy, worldFrame.height);

  if (this.powerUp) {
    const newSnakeHeadEntity = this._createSnakeEntity(newHeadX, newHeadY);
    this.snakeEntities.push(newSnakeHeadEntity);
    this.snakeHeadEntity = newSnakeHeadEntity;

    this.powerUp = false;
  } else {
    const snakeHeadEntity = this.snakeEntities.shift();
    snakeHeadEntity.frame.x = newHeadX;
    snakeHeadEntity.frame.y = newHeadY;
    this.snakeEntities.push(snakeHeadEntity);
    this.snakeHeadEntity = snakeHeadEntity;
  }
};

SnakeEntityController.prototype.didKeyDown = function (key) {
  const changeDirectionForKeyCallbacks = {
    w: () =>
      (this.direction =
        this.direction === Direction.down ? Direction.down : Direction.up),
    a: () =>
      (this.direction =
        this.direction === Direction.right ? Direction.right : Direction.left),
    s: () =>
      (this.direction =
        this.direction === Direction.up ? Direction.up : Direction.down),
    d: () =>
      (this.direction =
        this.direction === Direction.left ? Direction.left : Direction.right),
  };

  if (key in changeDirectionForKeyCallbacks) {
    changeDirectionForKeyCallbacks[key]();
    console.info(`Snake direction changed to ${this.direction}`);
  }
};

SnakeEntityController.prototype._createSnakeEntity = function (x, y) {
  const snakeEntity = new SnakeEntity(x, y);
  snakeEntity.collisionCallback = (otherEntity) => {
    this._snakeEntityDidCollide(otherEntity);
  };
  return snakeEntity;
};

SnakeEntityController.prototype._snakeEntityDidCollide = function (entity) {
  if (entity.type === POWER_ENTITY_TYPE) {
    this.powerUp = true; // Power up in next update
  } else if (entity.type === SNAKE_ENTITY_TYPE) {
    shared.engine.pause();
    shared.engine.reset();
  }
};
