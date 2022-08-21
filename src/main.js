import { Engine } from './core/Engine';
import { shared } from './core/shared';
import { RootEntityController } from './snake/RootEntityController';

const FPS = 1;

const rootEntityController = new RootEntityController();
const snakeGameEngine = new Engine(rootEntityController, FPS);

// TODO: Populate shared in the core library
// TODO: Better way than shared ??
shared.engine = snakeGameEngine;
shared.renderingContext = document.getElementById('game-root').getContext('2d');

// TODO: This should be done after body / DOM is loaded
snakeGameEngine.initialize();

rootEntityController.startGame();
