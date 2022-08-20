import { shared } from './shared';
import { makeFrame } from '../framework/Frame';

export class Engine {
  constructor(rootEntityController, { fps }) {
    this.rootEntityController = rootEntityController;
    this.fps = fps;
  }
}

Engine.prototype.initialize = function () {
  this.paused = true; // Initially engine is in paused state
  this.fpsInterval = 1000 / this.fps;
  this.then = Date.now();

  // Add key press event listener
  document.addEventListener('keydown', (event) => {
    this._didKeyDown(event);
  });
};

Engine.prototype.pause = function () {
  console.info('Engine paused'); // Will pause after one loop
  this.paused = true;
};

Engine.prototype.play = function () {
  console.info('Engine started');
  this.paused = false;

  // Trigger loop
  window.requestAnimationFrame(() => this.loop());
};

Engine.prototype.loop = function () {
  if (!this.paused) {
    window.requestAnimationFrame(() => this.loop());
  }

  const now = Date.now();
  const elapsed = now - this.then;
  if (elapsed > this.fpsInterval) {
    this.then = now - (elapsed % this.fpsInterval);

    // Game Tick
    this._tick();
  }
};

Engine.prototype._tick = function () {
  // Clear the whole canvas first
  const canvasEl = shared.renderingContext.canvas;
  const rootFrame = makeFrame(0, 0, canvasEl.width, canvasEl.height);
  shared.renderingContext.clearRect(...rootFrame.param);

  // Update the Entity Controller
  this.rootEntityController.update();

  // Draw the root Entity
  this.rootEntityController.entity.draw();
};

Engine.prototype._didKeyDown = function ({ key }) {
  // TODO: Higher level play-pause
  if (key === ' ') {
    this.paused ? this.play() : this.pause();
  }

  if (!this.paused) {
    this.rootEntityController.didKeyDown(key);
  }
};
