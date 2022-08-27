import { Engine } from './core/Engine';
import { Color } from './framework/Color';
import { htmlManager } from './snake/htmlManager';
import { RootEntityController } from './snake/RootEntityController';

const FPS = 10;

const snakeGameEngine = new Engine(RootEntityController, 'game-root', FPS);

// Colors used inside games
Color.bgColor = '#2b0719';
Color.snakeColor = '#f7f7f9';
Color.powerUpColor = '#eacc81';
Color.fontColor = '#f7f7f9';

document.getElementsByTagName('body')[0].style.backgroundColor = Color.bgColor;

// TODO: This should be done after body / DOM is loaded
snakeGameEngine.initialize();

htmlManager.initialize();
