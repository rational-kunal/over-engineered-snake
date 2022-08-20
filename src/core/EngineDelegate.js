import { makeFrame } from '../framework/Entity';
import { shared } from './shared';

export class EngineDelegate {
  constructor(rootEntityController) {
    console.assert(rootEntityController, 'Root entity controller required');
    this.rootEntityController = rootEntityController;
  }
}

EngineDelegate.prototype.didInitialize = function () {};

EngineDelegate.prototype.didKeyDown = function (engine, keyEvent) {
  // TODO: Higher level play-pause
  if (keyEvent.key === ' ') {
    engine.paused ? engine.play() : engine.pause();
  }
};

EngineDelegate.prototype.loop = function () {
  // Clear the whole canvas first
  const canvasEl = shared.renderingContext.canvas;
  const rootFrame = makeFrame(0, 0, canvasEl.width, canvasEl.height);
  shared.renderingContext.clearRect(...rootFrame.param);

  // Update the Entity Controller
  this.rootEntityController.update();

  // Draw the root Entity
  this.rootEntityController.entity.draw();
};
