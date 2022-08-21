import { shared } from '../core/shared';
import { Entity } from '../framework/Entity';
import { EntityController } from '../framework/EntityController';
import { makeFrame } from '../framework/Frame';
import { randomNumber } from './util';

const POWER_ENTITY_SIZE = 10;

class PowerEntity extends Entity {}

export class PowersEntityController extends EntityController {
  constructor() {
    super();
    this.powerEntity = new PowerEntity();
    this.entity.subEntities = [this.powerEntity];
  }
}

PowersEntityController.prototype.addNewPowerEntity = function () {
  this.entity = this._createNewPowerEntity();
};

PowersEntityController.prototype._createNewPowerEntity = function () {
  const worldFrame = shared.engine.getWorldFrame();
  let newFrame;
  do {
    newFrame = makeFrame(
      randomNumber(0, worldFrame.width, POWER_ENTITY_SIZE),
      randomNumber(0, worldFrame.height, POWER_ENTITY_SIZE),
      POWER_ENTITY_SIZE,
      POWER_ENTITY_SIZE
    );
  } while (shared.engine.willAnyEntityCollideWith(newFrame));

  console.info(`New power added at ${newFrame}`);

  this.powerEntity.frame = newFrame;
};
