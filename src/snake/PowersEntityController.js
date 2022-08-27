import { shared } from '../core/shared';
import { CollidableEntity } from '../framework/CollidableEntity';
import { Color } from '../framework/Color';
import { EntityController } from '../framework/EntityController';
import { makeFrame } from '../framework/Frame';
import { SNAKE_ENTITY_TYPE } from './SnakeEntityController';
import { randomNumber } from './util';

export const POWER_ENTITY_TYPE = 'POWER_ENTITY_TYPE';
const POWER_ENTITY_SIZE = 10;

class PowerEntity extends CollidableEntity {
  type = POWER_ENTITY_TYPE;
  bgColor = Color.powerUpColor;
}

export class PowersEntityController extends EntityController {
  shouldAddPower = true;
}

PowersEntityController.prototype.loadEntity = function () {
  this.powerEntity = new PowerEntity();
  this.powerEntity.collisionCallback = (otherEntity) => {
    this._powerEntityDidCollide(otherEntity);
  };
  this.entity.subEntities = [this.powerEntity];
};

PowersEntityController.prototype.update = function () {
  if (this.shouldAddPower) {
    // Update frame of existing power entity
    this._updatePowerEntityFrame();
    this.shouldAddPower = false;
  }
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

  this.powerEntity.frame = newFrame;
  console.info(`[power] added at ${newFrame}`);
};

PowersEntityController.prototype._powerEntityDidCollide = function (entity) {
  // If snake ate the power then add power in next update
  if (entity.type === SNAKE_ENTITY_TYPE) {
    this.shouldAddPower = true;
  }
};
