const backgroundImg = require("../../dist/image/background1.png");
class Board {
  constructor(boardCanvas) {
    this.bgStatus = false;
    this.bgImg = new Image();
    this.bgImg.src = backgroundImg;
    this.boardCanvas = boardCanvas;
    this.ctx = boardCanvas.getContext("2d");
  }

  checkImg() {
    this.bgImg.onload = () => {
      this.bgStatus = true; //Execute immediately after a page has been loaded:
    };
  }
  
  drawBoard() {
    this.checkImg();
    this.boardCanvas.width = 512;
    this.boardCanvas.height = 480;
    if (this.bgStatus) {
      this.ctx.drawImage(this.bgImg, 0, 0);
    }
  }
}

module.exports = Board;
