
class Sprite {
  constructor(sheetWidth, sheetHeight) {
    this.sheetWidth = sheetWidth;
    this.sheetHeight = sheetHeight;
    this.srcY;
    this.cols = 4;
    this.srcX = 0;
    this.width = this.sheetWidth / this.cols;
    this.height = this.sheetWidth / this.cols;
  }

  updateFrame(currentFrame,moveDirection) {
    // ctx.clearRect(x,y,this.width,this.height);
    currentFrame = currentFrame % this.cols;
    this.srcX = currentFrame *this.width;
    this.srcY = moveDirection * this.height;
  }

  drawImg(ctx, img, x, y, currentFrame,moveDirection) {
    this.updateFrame(currentFrame, moveDirection);
    ctx.drawImage(
      img,
      this.srcX,
      this.srcY,
      this.width,
      this.height,
      x,
      y,
      this.width,
      this.height
    );
  }
}

module.exports = Sprite;