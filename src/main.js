import { Engine } from './core/Engine';
import { EngineDelegate } from './core/EngineDelegate';
import { Entity, makeFrame } from './framework/Entity';
import { EntityController } from './framework/EntityController';
import { shared } from './core/shared';

// HACK: Dummy Entity Controller ===========
class DummyEntityController extends EntityController {
  constructor() {
    super();
    this.entity = new Entity(makeFrame(0, 0, 10, 10));
  }

  update() {
    this.entity.frame.x += 1;
  }
}
// END HACK: Dummy Entity Controller =======

const FPS = 1;

const rootEntityController = new DummyEntityController();
const engineDelegate = new EngineDelegate(rootEntityController);
const snakeGameEngine = new Engine(engineDelegate, FPS);

// TODO: Populate shared in the core library
// TODO: Better way than shared ??
shared.engine = snakeGameEngine;
shared.renderingContext = document.getElementById('game-root').getContext('2d');

// TODO: This should be done after body / DOM is loaded
snakeGameEngine.initialize();
