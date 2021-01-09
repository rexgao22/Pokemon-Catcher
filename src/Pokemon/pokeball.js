const pokeballImg = require("../../dist/image/pkb.png");
class Pokeball {
  constructor(x, y, ctx, moveDirection) {
    this.offset = 30;
    this.x = x ;
    this.y = y + this.offset;
    this.speed = 10;
    this.pkbImg = new Image();
    this.pkbImg.src = pokeballImg;
    this.ctx = ctx
    this.moveDirection = moveDirection;
    this.cooldown = 3;
  
  }
 

  
  drawBall() {
    // clearRect(this.x, this.y, this.width, this.height);
    // console.log("ball")
    this.counter += 1;

    if(this.moveDirection === 3){
        this.y -= this.speed;
    }
    if (this.moveDirection === 0) {
      this.y += this.speed;
    }
    if (this.moveDirection === 1) {
      this.x -= this.speed;
    }
    if (this.moveDirection === 2) {
      this.x += this.speed;
    }
    
    this.ctx.drawImage(this.pkbImg, this.x, this.y);
  }
}

module.exports = Pokeball;
