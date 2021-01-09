const poketrainertImg = require("../../dist/image/pkt.png");
const Sprite = require("./sprite");
class PokemonTrainer {
  constructor(height, width) {
    this.pktImg = new Image();
    this.pktImg.src = poketrainertImg;
    this.height = height;
    this.width = width;
    this.speed = 250;
    this.x = 300;
    this.y = 300;
    this.sprite = new Sprite(370, 383);
  }

  drawTrainer(ctx, x, y, currentFrame, moveDirection) {
    this.sprite.drawImg(
      ctx,
      this.pktImg,
      x,
      y,
      currentFrame,
      moveDirection
    );
  }
}

module.exports = PokemonTrainer;
