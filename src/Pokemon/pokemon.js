
const Sprite = require("./sprite");
class Pokemon {
  constructor(img, sheetWidth, sheetHeight) {
    this.pkImg = new Image();
    this.pkImg.src = img;
    this.speed = 100;
    this.height = 512;
    this.width = 408;
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;
    this.followSpeed = 50;
    this.sprite = new Sprite(sheetWidth, sheetHeight);
    this.currentFrame = 0;
    this.pokeStatus = "idle"
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
  checkStatus(pokeStatus){
    this.pokeStatus = pokeStatus;
  }
  setMoveDirection(trainX, trainY) {
    if(this.pokeStatus !== "idle"){
      const distX = trainX + 16 - this.x;
      const distY = trainY + 24 - this.y;
      const mag = Math.sqrt(distX * distX + distY * distY);
      const speedX = (distX / mag) * (0.02 * this.followSpeed);
      const speedY = (distY / mag) * (0.02 * this.followSpeed);
      this.x += speedX;
      this.y += speedY;
    }else{
      const distX = this.trainX - this.x;
      const distY = this.trainY - this.y;
      const normalX = 1 / distX;
      const normalY = 1 / distY;
      this.x += 0;
      this.y += 0;
    }
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
    this.x =  Math.random() * (this.width);
    this.y = Math.random() * (this.height);
  }
}

module.exports = Pokemon;
