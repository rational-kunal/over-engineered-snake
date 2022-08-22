import { shared } from './shared';
import { detectCollision, Frame, makeFrame } from '../framework/Frame';

export class Engine {
  constructor(RootEntityControllerClass, canvasID, fps) {
    shared.engine = this;
    shared.renderingContext = document
      .getElementById(canvasID)
      .getContext('2d');

    this.RootEntityControllerClass = RootEntityControllerClass;
    this.rootEntityController = new this.RootEntityControllerClass();
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

Engine.prototype.reset = function () {
  console.assert(this.paused, 'Engine should be paused first to rest');
  this.rootEntityController = new this.RootEntityControllerClass();
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

Engine.prototype.getWorldFrame = function () {
  // We are not storing this values since they can be changed at runtime
  const canvasEl = shared.renderingContext.canvas;
  return makeFrame(0, 0, canvasEl.width, canvasEl.height);
};

Engine.prototype._tick = function () {
  // Clear the whole canvas first
  shared.renderingContext.clearRect(...this.getWorldFrame().param);

  // Update the Entity Controller
  this.rootEntityController.update();

  // Draw the root Entity
  this.rootEntityController.entity.draw();

  // Detect collision and forward if any
  // This is a costly operation which involves risky recursive code
  this._detectCollisionAndForward();
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

/**
 * Returns true if target frame will collide with any of the entities in hierarchy
 * @param {Frame} targetFrame
 * @returns boolean
 */
Engine.prototype.willAnyEntityCollideWith = function (targetFrame) {
  // TODO: Can be improved by returning early if we found any collisions
  return this._collidingEntitiesWithFrame(targetFrame).size > 0;
};

Engine.prototype._collidingEntitiesWithFrame = function (targetFrame) {
  const collidingEntities = new Set();
  const recursivelyDetectCollision = (withEntity) => {
    if (
      withEntity.collidable &&
      !withEntity.frame.isEmpty &&
      detectCollision(targetFrame, withEntity.frame)
    ) {
      collidingEntities.add(withEntity);
    }

    withEntity.subEntities.forEach((subEntity) =>
      recursivelyDetectCollision(subEntity)
    );

    return collidingEntities;
  };

  return recursivelyDetectCollision(this.rootEntityController.entity);
};

Engine.prototype._detectCollisionAndForward = function () {
  // TODO: Faster collision detection and forward with cached flat maps ??
  const recursivelyDetectCollision = (forEntity) => {
    if (forEntity.collidable && !forEntity.frame.isEmpty) {
      const collidingEntities = this._collidingEntitiesWithFrame(
        forEntity.frame
      );
      collidingEntities.delete(forEntity);

      collidingEntities.forEach((collidingEntity) => {
        console.info(`[collision] between ${forEntity} and ${collidingEntity}`);

        forEntity.didCollideWith(collidingEntity);
      });
    }

    forEntity.subEntities.forEach((subEntity) => {
      recursivelyDetectCollision(subEntity);
    });
  };

  recursivelyDetectCollision(this.rootEntityController.entity);
};
