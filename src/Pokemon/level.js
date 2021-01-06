class Level{
    drawLevel(canvas, levelNum){
      canvas.width = 500;
      canvas.height = 500;
      var ctx = canvasEl.getContext("2d");

      //craete game object
      var trainer = {
        speed: 250,
        x: 0,
        y: 0,
      };

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

      pktImg.src = "image/pkt2.png";
      
      switch(levelNum){
          case 1:
            var pmStatus = false;
            var pmImg = new Image();
            pmImg.onload = () => {
                pmStatus = true;
            };

            pmImg.src = "image/pmLvl1.png";
              var pokemon = {
                speed: 100,
                x: 0,
                y: 0,
              };
            break;
          case 2:
        }
    }
}