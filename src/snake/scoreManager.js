class ScoreManager {
  currentScore = 0;
  highestScore = 0;
}

ScoreManager.prototype.incrementCurrentScore = function () {
  this.currentScore += 1;

  this.updateHighestScore();
};

ScoreManager.prototype.resetCurrentScore = function () {
  this.currentScore = 0;
};

ScoreManager.prototype.updateHighestScore = function () {
  this.highestScore = Math.max(this.currentScore, this.highestScore);
};

export const scoreManager = new ScoreManager();
