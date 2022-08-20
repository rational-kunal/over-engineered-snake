import { Engine } from './Engine';
import { EngineDelegate } from './EngineDelegate';
import { Entity, makeFrame } from './Entity';
import { EntityController } from './EntityController';
import { shared } from './shared';

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
shared.engine = snakeGameEngine;
shared.renderingContext = document.getElementById('game-root').getContext('2d');

// TODO: This should be done after body / DOM is loaded
snakeGameEngine.initialize();
