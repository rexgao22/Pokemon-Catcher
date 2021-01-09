const Game = require("./game");
class GameView {
  constructor(game) {
    this.game = game;
    this.pause = false;
  }

  start() {
    this.game.bindKeyListener();
    this.game.getBoard();
    this.game.gameCountDown();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.game.checkGameOver();
  }
}

module.exports = GameView;
