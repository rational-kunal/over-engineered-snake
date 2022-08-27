import { shared } from '../core/shared';
import { scoreManager } from './scoreManager';
import { Color } from '../framework/Color';

class HTMLManager {}

HTMLManager.prototype.initialize = function () {
  this.gameScoreEl = document.getElementById('game-dash-score');

  this.gameHighScoreEl = document.getElementById('game-dash-highscore');

  this.gameStatusEl = {
    paused: document.getElementById('game-dash-status-paused'),
    gameOver: document.getElementById('game-dash-status-game-over'),
  };

  this.gameInstructionsEl = {
    startGame: document.getElementById('game-dash-instructions-start-game'),
    playGame: document.getElementById('game-dash-instructions-play-game'),
  };

  // Color the html components in initializer
  document.getElementsByTagName('body')[0].style.backgroundColor =
    Color.bgColor;
  const addFontColor = (el) => {
    el.style.color = Color.fontColor;
  };
  Array.prototype.forEach.call(
    document.getElementsByClassName('font'),
    addFontColor
  );
};

HTMLManager.prototype.update = function () {
  this.gameScoreEl.innerHTML = scoreManager.currentScore;
  this.gameHighScoreEl.innerHTML = `hi ${scoreManager.highestScore}`;

  this.gameStatusEl.paused.hidden = true;
  this.gameStatusEl.gameOver.hidden = true;
  this.gameInstructionsEl.startGame.hidden = true;
  this.gameInstructionsEl.playGame.hidden = true;

  if (shared.engine.didGameOver) {
    this.gameStatusEl.gameOver.hidden = false;
    this.gameInstructionsEl.startGame.hidden = false;
  } else if (shared.engine.paused) {
    this.gameStatusEl.paused.hidden = false;
    this.gameInstructionsEl.startGame.hidden = false;
  } else {
    this.gameInstructionsEl.playGame.hidden = false;
  }
};

export const htmlManager = new HTMLManager();
