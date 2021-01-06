const Game = require("./Pokemon/game");
const LevelOne = require("./Pokemon/level");
document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("mycanvas");
  const playbtn = document.getElementById("play-btn");
  const game = new Game(canvasEl);

  game.setCanvas();
  game.bindKeyListener();
  game.gameCountDown();
  game.start();
  document.getElementById("play-btn").onclick = function () {
    document.getElementById("menus").style.display = "none";
    canvasEl.style.display = "block";
    // game.setCanvas();
    // game.bindKeyListener();
    // game.gameCountDown();
    // game.start();
  };
});
