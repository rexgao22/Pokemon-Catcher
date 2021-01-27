const Level = require("./level");
const Pokemon = require("./pokemon");
const PokemonTrainer = require("./pokemon_trainer");
const Pokeball = require("./pokeball");
const Board = require("./board");
const pokemonImg = require("../../dist/image/pkm3.png");
const pokemonImg2 = require("../../dist/image/pkm2.png")
const backgroundImg = require("../../dist/image/background1.png");

class Game {
  constructor(boardCanvas, lvl) {
    this.boardCanvas = boardCanvas;
    this.ctx = boardCanvas.getContext("2d");
    this.bgStatus = false;
    this.bgImg = new Image();
    this.bgImg.src = backgroundImg;
    this.count = 50;
    this.pokemon = new Pokemon(pokemonImg, 228, 228);
    this.trainer = new PokemonTrainer(
      this.boardCanvas.height,
      this.boardCanvas.width
    );
    this.finished = false;
    this.pokeCount = 0;
    this.keysStore = [];
    this.start = this.start.bind(this);
    this.bindKeyListener = this.bindKeyListener.bind(this);
    this.gameCountDown = this.gameCountDown.bind(this);
    this.counter = this.counter.bind(this);
    this.replay = this.replay.bind(this);
    this.currentFrame = 0;
    this.moveDirection = 1;
    this.boardCanvas.width = 512;
    this.boardCanvas.height = 480;
    this.pokeBalls = [];
    this.ballPool = [];
    this.pokemons = [this.pokemon];
    this.cooldown = 5;
    this.pcounter = 0;
    this.date = new Date();
    this.begin = 0
  }

  checkImg() {
    // console.log('check')
    this.bgImg.onload = () => {
      this.bgStatus = true; //Execute immediately after a page has been loaded:
    };
  }

  replay() {
    this.pokemons.forEach((pokemon) => {
    pokemon.resetPkPos();
    });
    this.finished = false;
    this.count = 50;
    this.pokeCount = 0;
    // this.start();

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

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this.width || y > this.height;
  }

  difficulty() {
    if (this.count === 40) {
      this.pokemons.push(new Pokemon(pokemonImg2, 242, 259));
    }
  }

  update(val) {
    //38 code for up key
    if (this.keysStore.length !== 0) {
      this.pokemons.forEach((pokemon) => (pokemon.pokeStatus = "active"));
    }
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
    if (32 in this.keysStore) {
      this.pcounter += 1;
      if (this.pcounter % this.cooldown === 0) {
        this.create();
        this.pcounter = 0;
      }
    }
    // this.difficulty();
    this.pokemons.forEach((pokemon) => {
      if (
        this.trainer.x <= pokemon.x + 30 &&
        pokemon.x <= this.trainer.x + 30 &&
        this.trainer.y <= pokemon.y + 30 &&
        pokemon.y <= this.trainer.y + 30
      ) {
        this.finished = true;
      }
      this.pokeBalls.forEach((ball) => {
        if (
          ball.x <= pokemon.x + 30 &&
          pokemon.x <= ball.x + 30 &&
          ball.y <= pokemon.y + 30 &&
          pokemon.y <= ball.y + 30
        ) {
          this.pokeCount += 1;
          pokemon.resetPkPos();
          this.remove(ball);
        }
      });
    });
  }

  resetBallPos(ball) {
    ball.x = this.trainer.x;
    ball.y = this.trainer.y + 30;
    ball.moveDirection = this.moveDirection;
    return ball;
  }

  create() {
    this.pokeBalls.push(
      this.ballPool.length > 0
        ? this.resetBallPos(this.ballPool.pop())
        : new Pokeball(
            this.trainer.x,
            this.trainer.y,
            this.ctx,
            this.moveDirection
          )
    );
  }

  remove(pokeball) {
    this.ballPool.push(pokeball);
    this.pokeBalls.splice(this.pokeBalls.indexOf(pokeball), 1);
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
      this.pokemons.forEach((pokemon) => {
        pokemon.drawPoke(
          this.ctx,
          this.trainer.x,
          this.trainer.y,
          this.currentFrame,
          this.moveDirection
        );
      });

      this.pokeBalls.forEach((ball) => {
        if (this.isOutOfBounds(ball.x, ball.y)) {
          this.remove(ball);
        }
      });
      this.pokeBalls.forEach((ball) => {
        ball.drawBall();
      });
    }

    this.ctx.fillStyle = "rgb(250, 250, 250)";
    this.ctx.font = "24px Helvetica";
    this.ctx.textAign = "left";
    this.ctx.fillText("Pokemon caught: " + this.pokeCount, 20, 20);
    this.ctx.fillText("Time: " + this.count, 20, 50);

    if (this.finished == true) {
      this.counter = 0;
      this.ctx.fillText("Game over!", 200, 220);
      document.getElementById("replay").style.display = "block";
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
