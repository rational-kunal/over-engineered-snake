import { Engine } from './Engine';

const canvasEl = document.getElementById('game-root');
const GAME_SIZE = 500;
const FPS = 1;
const snakeGameEngine = new Engine(canvasEl, GAME_SIZE, GAME_SIZE, FPS);

// TODO: This should be done after body / DOM is loaded
snakeGameEngine.initialize();
