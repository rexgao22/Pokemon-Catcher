const Game = require("./Pokemon/game");
const LevelOne = require("./Pokemon/level");
document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("mycanvas");
  const playbtn = document.getElementById("play-btn");
  const introbtn = document.getElementById("game-intro");
  const backbtn = document.getElementById("back");
  const game = new Game(canvasEl);
  const musicbtn = document.getElementById("music-btn");
  const audio = document.getElementById("audio");
  const replaybtn = document.getElementById("replay-btn");
  const introBackbtn = document.getElementById("intro-back-btn");

  playbtn.onclick = function () {
    game.start();
    game.bindKeyListener();
    document.getElementById("menus").style.display = "none";
    document.getElementById("gameboy").style.display = "inline-block";
    document.getElementById("intro-back").style.display = "inline-block";
    canvasEl.style.display = "block";
    game.gameCountDown();
  };

  introbtn.onclick = function () {
    document.getElementById("menus").style.display = "none";
    document.getElementById("intro").style.display = "block";
  };

  backbtn.onclick = function () {
    document.getElementById("intro").style.display = "none";
    document.getElementById("menus").style.display = "block";
  };

  musicbtn.onclick = function () {
    if (audio.paused) {
      audio.play();
      document.getElementById("music-btn").style.backgroundImage =
        "url(./dist/image/musicStop.png)";
    } else if (audio.played) {
      audio.pause();
      document.getElementById("music-btn").style.backgroundImage =
        "url(./dist/image/musicPlay.png)";
    }
  };

  replaybtn.onclick = function () {
    document.getElementById("replay").style.display = "none";
    game.replay();
  };

  introBackbtn.onclick = function () {
    document.getElementById("menus").style.display = "block";
    document.getElementById("gameboy").style.display = "none";
    canvasEl.style.display = "none";
    document.getElementById("intro-back").style.display = "none";
    document.getElementById("replay").style.display = "none";
  };
});
