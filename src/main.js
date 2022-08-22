import { Engine } from './core/Engine';
import { RootEntityController } from './snake/RootEntityController';

const FPS = 1;

const snakeGameEngine = new Engine(RootEntityController, 'game-root', FPS);

// TODO: This should be done after body / DOM is loaded
snakeGameEngine.initialize();
