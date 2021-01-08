const Level = require("./level");
const Pokemon = require("./pokemon");
const PokemonTrainer = require("./pokemon_trainer");
const backgroundImg = require("../../dist/image/background1.png");

class Game {
  constructor(boardCanvas) {
    this.boardCanvas = boardCanvas;
    this.ctx = boardCanvas.getContext("2d");
    this.bgStatus = false;
    this.bgImg = new Image();
    this.bgImg.src = backgroundImg;
    this.count = 50;
    this.pokemon = new Pokemon(
      this.boardCanvas.height,
      this.boardCanvas.width,
    );
    this.trainer = new PokemonTrainer(
      this.boardCanvas.height,
      this.boardCanvas.width,
    );
    this.finished = false;
    this.pokeCount = 0;
    this.keysStore = [];
    this.start = this.start.bind(this);
    this.bindKeyListener = this.bindKeyListener.bind(this);
    this.checkImg = this.checkImg.bind(this);
    this.gameCountDown = this.gameCountDown.bind(this);
    this.counter = this.counter.bind(this);
    this.currentFrame = 0;
    this.moveDirection = 1;
    this.boardCanvas.width = 512;
    this.boardCanvas.height = 480;
  }

  checkImg() {
    // console.log('check')
    this.bgImg.onload = () => {
      this.bgStatus = true; //Execute immediately after a page has been loaded:
    };
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
      this.currentFrame += 1;
      this.moveDirection = 3;
      this.trainer.y -= this.trainer.speed * val;
      this.trainer.y = this.wrap(this.trainer.y, this.boardCanvas.height);
    }
    //40 for down
    if (40 in this.keysStore) {
      this.currentFrame += 1;
      this.moveDirection = 0;
      this.trainer.y += this.trainer.speed * val;
      this.trainer.y = this.wrap(this.trainer.y, this.boardCanvas.height);
    }
    //left
    if (37 in this.keysStore) {
      this.currentFrame += 1;
      this.moveDirection = 1;
      this.trainer.x -= this.trainer.speed * val;
      this.trainer.x = this.wrap(this.trainer.x, this.boardCanvas.width);
    }
    //right
    if (39 in this.keysStore) {
      this.currentFrame += 1;
      this.moveDirection = 2;
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
      this.pokemon.resetPkPos();
    }
  }

  render() {
    this.checkImg();
    if (this.bgStatus) {
      this.ctx.drawImage(this.bgImg, 0, 0);
    }
    if (this.finished === false) {
      this.trainer.drawTrainer(
        this.ctx,
        this.trainer.x,
        this.trainer.y,
        this.currentFrame,
        this.moveDirection
      );
      this.pokemon.drawPoke(
        this.ctx,
        this.trainer.x,
        this.trainer.y,
        this.currentFrame,
        this.moveDirection,
      );
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
