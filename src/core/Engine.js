import { shared } from './shared';
import { detectCollision, Frame, makeFrame } from '../framework/Frame';

export class Engine {
  constructor(RootEntityControllerClass, canvasID, fps) {
    shared.engine = this;
    shared.renderingContext = document
      .getElementById(canvasID)
      .getContext('2d');

    this.RootEntityControllerClass = RootEntityControllerClass;
    this.fps = fps;

    this._addEventListeners();
  }
}

Engine.prototype.initialize = function () {
  this.rootEntityController = new this.RootEntityControllerClass();

  this.paused = true; // Initially engine is in paused state
  this.didGameOver = false;
  this.fpsInterval = 1000 / this.fps;
  this.then = Date.now();

  // Load the entities in respective entity controllers
  walkEntityControllerHierarchy(this.rootEntityController, (ec) => {
    ec.loadEntity();
  });

  // Initial draw, next draw will be after update
  this.rootEntityController.entity.draw();
};

Engine.prototype.pause = function () {
  console.info('[engine] paused'); // Will pause after one loop
  this.paused = true;
};

Engine.prototype.play = function () {
  if (this.didGameOver) {
    this.reset();
  } else {
    console.info('[engine] started');
    this.paused = false;

    // Trigger loop
    window.requestAnimationFrame(() => this.loop());
  }
};

Engine.prototype.gameOver = function () {
  console.info('[engine] game over');
  this.didGameOver = true;
};

Engine.prototype.reset = function () {
  console.assert(this.paused, 'Engine should be paused first to rest');
  console.info('[engine] reset');

  // Re-initialize engine
  this.initialize();

  // Start the game immediately
  this.play();
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

Engine.prototype._addEventListeners = function () {
  // Add key press event listener
  document.addEventListener('keydown', (event) => {
    this._didKeyDown(event);
  });
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
  walkEntityHierarchy(this.rootEntityController.entity, (entity) => {
    if (
      entity.collidable &&
      !entity.frame.isEmpty &&
      detectCollision(targetFrame, entity.frame)
    ) {
      collidingEntities.add(entity);
    }
  });

  return collidingEntities;
};

Engine.prototype._detectCollisionAndForward = function () {
  // TODO: Faster collision detection and forward with cached flat maps ??
  walkEntityHierarchy(this.rootEntityController.entity, (entity) => {
    if (entity.collidable && !entity.frame.isEmpty) {
      const collidingEntities = this._collidingEntitiesWithFrame(entity.frame);
      collidingEntities.delete(entity);

      collidingEntities.forEach((collidingEntity) => {
        console.info(`[collision] between ${entity} and ${collidingEntity}`);

        entity.didCollideWith(collidingEntity);
      });
    }
  });
};

function walkEntityControllerHierarchy(entityController, fn) {
  const recursivelyWalk = (currEntityController) => {
    fn(currEntityController);

    currEntityController.childEntityControllers.forEach((child) => {
      recursivelyWalk(child);
    });
  };

  return recursivelyWalk(entityController);
}

function walkEntityHierarchy(entity, fn) {
  const recursiveWalk = (currEntity) => {
    fn(currEntity);

    currEntity.subEntities.forEach((subEntity) => {
      recursiveWalk(subEntity);
    });
  };

  return recursiveWalk(entity);
}
