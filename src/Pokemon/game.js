const Level = require("./level");
const backgroundImg = require("../../dist/image/background1.png");
const pokemonTrainerImg = require("../../dist/image/pkt2.png");
const pokemonImg = require("../../dist/image/pmLvl1.png");

class Game {
  constructor(boardCanvas) {
    this.boardCanvas = boardCanvas;
    this.ctx = boardCanvas.getContext("2d");
    this.bgStatus = false;
    this.pktStatus = false;
    this.pmStatus = false;
    this.bgImg = new Image();
    this.pktImg = new Image();
    this.pmImg = new Image();
    this.bgImg.src = backgroundImg;
    this.pktImg.src = pokemonTrainerImg;
    this.pmImg.src = pokemonImg;
    this.count = 50;
    this.finished = false;
    this.trainer = {
      speed: 250,
      x: 200,
      y: 200,
    };
    this.pokemon = {
      speed: 100,
      x: 0,
      y: 0,
    };
    this.pokeCount = 0;
    this.keysStore = [];
    this.start = this.start.bind(this);
    this.bindKeyListener = this.bindKeyListener.bind(this);
    this.checkImg = this.checkImg.bind(this);
    this.setCanvas = this.setCanvas.bind(this);
    this.gameCountDown = this.gameCountDown.bind(this);
    this.counter = this.counter.bind(this);
  }

  checkImg() {
    // console.log('check')
    this.bgImg.onload = () => {
      this.bgStatus = true; //Execute immediately after a page has been loaded:
    };
    this.pktImg.onload = () => {
      this.pktStatus = true;
    };
    this.pmImg.onload = () => {
      this.pmStatus = true;
    };
  }

  setCanvas() {
    this.boardCanvas.width = 512;
    this.boardCanvas.height = 480;
  }

  bindKeyListener() {
    document.addEventListener(
      "keydown",
      (key) => {
        this.keysStore[key.keyCode] = true;
      },
      false
    );
    document.addEventListener(
      "keyup",
      (key) => {
        delete this.keysStore[key.keyCode];
      },
      false
    );
  }

  resetPkPos() {
    this.pokemon.x = 60 + Math.random() * (this.boardCanvas.width - 120);
    this.pokemon.y = 60 + Math.random() * (this.boardCanvas.height - 120);
  }

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }

  update(val) {
    //38 code for up key
    if (38 in this.keysStore) {
      this.trainer.y -= this.trainer.speed * val;
      this.trainer.y = this.wrap(this.trainer.y, this.boardCanvas.height);
    }
    //40 for down
    if (40 in this.keysStore) {
      this.trainer.y += this.trainer.speed * val;
      this.trainer.y = this.wrap(this.trainer.y, this.boardCanvas.height);
    }
    //left
    if (37 in this.keysStore) {
      this.trainer.x -= this.trainer.speed * val;
      this.trainer.x = this.wrap(this.trainer.x, this.boardCanvas.width);
    }
    //right
    if (39 in this.keysStore) {
      this.trainer.x += this.trainer.speed * val;
      this.trainer.x = this.wrap(this.trainer.x, this.boardCanvas.width);
    }
    //check catching
    if (
      this.trainer.x <= this.pokemon.x + 30 &&
      this.pokemon.x <= this.pokemon.x + 30 &&
      this.trainer.y <= this.pokemon.y + 30 &&
      this.pokemon.y <= this.trainer.y + 30
    ) {
      this.pokeCount += 1;
      this.resetPkPos();
    }
  }

  async render() {
    await this.checkImg();
    if (this.bgStatus) {
      this.ctx.drawImage(this.bgImg, 0, 0);
    }

    if (this.pktStatus) {
      this.ctx.drawImage(this.pktImg, this.trainer.x, this.trainer.y);
    }

    if (this.pmStatus) {
      this.ctx.drawImage(this.pmImg, this.pokemon.x, this.pokemon.y);
    }

    this.ctx.fillStyle = "rgb(250, 250, 250)";
    this.ctx.font = "24px Helvetica";
    this.ctx.textAign = "left";
    this.ctx.fillText("Pokemon caught: " + this.pokeCount, 20, 20);
    this.ctx.fillText("Time: " + this.count, 20, 50);

    if (this.finished == true) {
      this.ctx.fillText("Game over!", 200, 220);
    }
  }

  counter() {
    this.count -= 1;
    if (this.count <= 0) {
      clearInterval(this.counter);
      this.finished = true;
      this.count = 0;
      this.pktStatus = false;
      this.pmStatus = false;
    }
  }

  gameCountDown() {
    setInterval(this.counter, 1000);
  }

  start() {
    this.update(0.02);
    this.render();
    requestAnimationFrame(this.start);
  }
}

module.exports = Game;
