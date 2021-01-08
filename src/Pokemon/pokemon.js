const pokemonImg = require("../../dist/image/pkm3.png");
const Sprite = require("./sprite");
class Pokemon {
  constructor(height, width) {
    this.pkImg = new Image();
    this.pkImg.src = pokemonImg;
    this.speed = 100;
    this.height = height;
    this.width = width;
    this.x = 32 + Math.random() * (this.width - 64);
    this.y = 32 + Math.random() * (this.height - 64);
    this.followSpeed = 85;
    this.sprite = new Sprite(228, 228);
    this.currentFrame = 0;

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

  setMoveDirection(trainX, trainY) {
    const distX = trainX + 16 - this.x;
    const distY = trainY + 24 - this.y;
    const mag = Math.sqrt(distX * distX + distY * distY);
    const speedX = (distX / mag) * (0.02 * this.followSpeed);
    const speedY = (distY / mag) * (0.02 * this.followSpeed);
    this.x += speedX;
    this.y += speedY;
  }

  drawPoke(ctx, trainX, trainY, currentFrame, moveDirection) {
    this.currentFrame += 1;
    this.setMoveDirection(trainX, trainY);
    this.sprite.drawImg(
      ctx,
      this.pkImg,
      this.x,
      this.y,
      this.currentFrame,
      moveDirection
    );
  }

  resetPkPos() {
    this.x = 32 + Math.random() * (this.width - 64);
    this.y = 32 + Math.random() * (this.height - 64);
  }
}

module.exports = Pokemon;
