import { shared } from '../core/shared';
import { Color } from '../framework/Color';
import { EntityController } from '../framework/EntityController';
import { htmlManager } from './htmlManager';
import { PowersEntityController } from './PowersEntityController';
import { SnakeEntityController } from './SnakeEntityController';

export class RootEntityController extends EntityController {}

RootEntityController.prototype.loadEntity = function () {
  const worldFrame = shared.engine.getWorldFrame();
  this.entity.frame.width = worldFrame.width;
  this.entity.frame.height = worldFrame.height;
  this.entity.bgColor = Color.bgColor;

  this.powerEntityController = new PowersEntityController();
  this.childEntityControllers.push(this.powerEntityController);
  this.entity.subEntities.push(this.powerEntityController.entity);

  this.snakeEntityController = new SnakeEntityController();
  this.childEntityControllers.push(this.snakeEntityController);
  this.entity.subEntities.push(this.snakeEntityController.entity);
};

RootEntityController.prototype.didKeyDown = function (key) {
  // Pass user kbd inputs to snake controller to change direction of snake accordingly
  this.snakeEntityController.didKeyDown(key);
};

RootEntityController.prototype.update = function () {
  if (!shared.engine.paused) {
    this.snakeEntityController.update();
    this.powerEntityController.update();
  }

  htmlManager.update();
};
