import { shared } from '../core/shared';
import { CollidableEntity } from '../framework/CollidableEntity';
import { EntityController } from '../framework/EntityController';
import { makeFrame } from '../framework/Frame';
import { SNAKE_ENTITY_TYPE } from './SnakeEntityController';
import { randomNumber } from './util';

export const POWER_ENTITY_TYPE = 'POWER_ENTITY_TYPE';
const POWER_ENTITY_SIZE = 10;

class PowerEntity extends CollidableEntity {
  constructor() {
    super();
    this.type = POWER_ENTITY_TYPE;
  }
}

export class PowersEntityController extends EntityController {
  constructor() {
    super();
    this.powerEntity = new PowerEntity();
    this.powerEntity.collisionCallback = (otherEntity) => {
      this._powerEntityDidCollide(otherEntity);
    };
    this.entity.subEntities = [this.powerEntity];
    this.shouldAddPower = true;
  }
}

PowersEntityController.prototype.update = function () {
  if (this.shouldAddPower) {
    this.addNewPowerEntity();
    this.shouldAddPower = false;
  }
};

PowersEntityController.prototype.addNewPowerEntity = function () {
  this.entity = this._updatePowerEntityFrame();
};

PowersEntityController.prototype._updatePowerEntityFrame = function () {
  const worldFrame = shared.engine.getWorldFrame();
  let newFrame;
  do {
    newFrame = makeFrame(
      randomNumber(0, worldFrame.width - POWER_ENTITY_SIZE, POWER_ENTITY_SIZE),
      randomNumber(0, worldFrame.height - POWER_ENTITY_SIZE, POWER_ENTITY_SIZE),
      POWER_ENTITY_SIZE,
      POWER_ENTITY_SIZE
    );
  } while (shared.engine.willAnyEntityCollideWith(newFrame));

  console.info(`New power added at ${newFrame}`);
  this.powerEntity.frame = newFrame;
};

PowersEntityController.prototype._powerEntityDidCollide = function (entity) {
  if (entity.type === SNAKE_ENTITY_TYPE) {
    this.shouldAddPower = true;
  }
};
