document.addEventListener("DOMContentLoaded", ()=> {
  var canvasEl = document.getElementById("mycanvas");
  canvasEl.width = 500;
  canvasEl.height = 500;

  var ctx = canvasEl.getContext("2d");


  //get background image
  var bgStatus = false;
  //make sure the image loaded before game start
  var bgImg = new Image();
  bgImg.onload = () => {
    //Execute a JavaScript immediately after a page has been loaded:
    bgStatus = true;
  };

  bgImg.src = "image/background1.png";

  var pktStatus = false;
  var pktImg = new Image();
  pktImg.onload = () => {
    pktStatus = true;
  };

  pktImg.src = "image/pkt2.png"

  var pmStatus = false;
  var pmImg = new Image();
  pmImg.onload = () => {
    pmStatus = true;
  };

  pmImg.src = "image/pmLvl1.png";

  //craete game object
  var trainer = {
    speed: 250,
    x : 0, 
    y : 0,
  };

  var pokemon = {
    speed: 100,
    x : 0, 
    y : 0,
  };

  //save the user Input
  var keysStore = {}
  addEventListener("keydown",(key)=> {
      keysStore[key.keyCode] = true;
    },
    false
  );
  addEventListener("keyup",(key)=> {
      delete keysStore[key.keyCode];
    },
    false
  );

  var resetGame = ()=>{
    //   trainer.x = canvasEl.width / 2;
    //   trainer.y = canvasEl.height / 2;
    //img size is 60 by 60 so..
      pokemon.x = 60 + Math.random() * (canvasEl.width - 120);
      pokemon.y = 60 + Math.random() * (canvasEl.height - 120);
  }

  var pokeCount = 0;
  var update =(val)=>{
      //38 code for up key
    if( 38 in keysStore){
        trainer.y -= trainer.speed * val;
    }
    //40 for down
    if( 40 in keysStore){
        trainer.y += trainer.speed * val;
    }
    //left
    if( 37 in keysStore){
        trainer.x -= trainer.speed * val;
    }
    //right
    if( 39 in keysStore){
        trainer.x += trainer.speed * val;
    }
    //check catching
    if( trainer.x <= pokemon.x + 30 && pokemon.x <= pokemon.x + 30 && trainer.y <= pokemon.y + 30 && pokemon.y <= trainer.y + 30){
        pokeCount += 1;
        resetGame();
    }
  }

  //render
  var render = () => {
      if(bgStatus){
          ctx.drawImage(bgImg, 0 , 0);
      }

      if(pktStatus){
          ctx.drawImage(pktImg, trainer.x , trainer.y);
      }

      if(pmStatus){
          ctx.drawImage(pmImg, pokemon.x, pokemon.y);
      }

       ctx.fillStyle = "rgb(250, 250, 250)";
       ctx.font = "24px Helvetica";
       ctx.textAign = "left";
       ctx.fillText("Pokemon caught: " + pokeCount, 20, 20);
       ctx.fillText("Time: " + count, 20, 50);

       if (finished == true) {
         ctx.fillText("Game over!", 200, 220);
       }
  }

 

  var count = 30;
  var finished = false;

  var counter =()=>{
      count -= 1;
      if(count <= 0){
          clearInterval(counter);
          finished = true;
          count = 0;
          pktStatus = false;
          pmStatus = false;
      }
  }
  
  setInterval(counter,1000);

  var game = () => {
      update(0.02);
      render();
      requestAnimationFrame(game);
  }

  var w = window;
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

  resetGame();
  game();
 
});



