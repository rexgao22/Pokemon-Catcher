/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/image/background1.png":
/*!************************************!*\
  !*** ./dist/image/background1.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"13618308b6ca30014c42b7f0f0562d80.png\";\n\n//# sourceURL=webpack://JS_Project/./dist/image/background1.png?");

/***/ }),

/***/ "./dist/image/pkb.png":
/*!****************************!*\
  !*** ./dist/image/pkb.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"4de287f2d33a4d49e67463b91295e336.png\";\n\n//# sourceURL=webpack://JS_Project/./dist/image/pkb.png?");

/***/ }),

/***/ "./dist/image/pkm2.png":
/*!*****************************!*\
  !*** ./dist/image/pkm2.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"844bac533ac7c26658ad3540fe506d39.png\";\n\n//# sourceURL=webpack://JS_Project/./dist/image/pkm2.png?");

/***/ }),

/***/ "./dist/image/pkm3.png":
/*!*****************************!*\
  !*** ./dist/image/pkm3.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"b9a1a244bbb4e5f9757c3f863e6e5551.png\";\n\n//# sourceURL=webpack://JS_Project/./dist/image/pkm3.png?");

/***/ }),

/***/ "./dist/image/pkt.png":
/*!****************************!*\
  !*** ./dist/image/pkt.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"fa7349a15defb502221f3b6ab72ec263.png\";\n\n//# sourceURL=webpack://JS_Project/./dist/image/pkt.png?");

/***/ }),

/***/ "./src/Pokemon/board.js":
/*!******************************!*\
  !*** ./src/Pokemon/board.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const backgroundImg = __webpack_require__(/*! ../../dist/image/background1.png */ \"./dist/image/background1.png\");\nclass Board {\n  constructor(boardCanvas) {\n    this.bgStatus = false;\n    this.bgImg = new Image();\n    this.bgImg.src = backgroundImg;\n    this.boardCanvas = boardCanvas;\n    this.bgStatus = false;\n  }\n\n  checkImg() {\n    this.bgImg.onload = () => {\n      this.bgStatus = true; //Execute immediately after a page has been loaded:\n    };\n  }\n  \n  drawBoard(ctx) {\n    this.checkImg();\n    this.boardCanvas.width = 512;\n    this.boardCanvas.height = 480;\n    if (this.bgStatus) {\n      ctx.drawImage(this.bgImg, 0, 0);\n    }\n  }\n}\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack://JS_Project/./src/Pokemon/board.js?");

/***/ }),

/***/ "./src/Pokemon/game.js":
/*!*****************************!*\
  !*** ./src/Pokemon/game.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Level = __webpack_require__(/*! ./level */ \"./src/Pokemon/level.js\");\nconst Pokemon = __webpack_require__(/*! ./pokemon */ \"./src/Pokemon/pokemon.js\");\nconst PokemonTrainer = __webpack_require__(/*! ./pokemon_trainer */ \"./src/Pokemon/pokemon_trainer.js\");\nconst Pokeball = __webpack_require__(/*! ./pokeball */ \"./src/Pokemon/pokeball.js\");\nconst Board = __webpack_require__(/*! ./board */ \"./src/Pokemon/board.js\");\nconst pokemonImg = __webpack_require__(/*! ../../dist/image/pkm3.png */ \"./dist/image/pkm3.png\");\nconst pokemonImg2 = __webpack_require__(/*! ../../dist/image/pkm2.png */ \"./dist/image/pkm2.png\")\nconst backgroundImg = __webpack_require__(/*! ../../dist/image/background1.png */ \"./dist/image/background1.png\");\n\nclass Game {\n  constructor(boardCanvas, lvl) {\n    this.boardCanvas = boardCanvas;\n    this.ctx = boardCanvas.getContext(\"2d\");\n    this.bgStatus = false;\n    this.bgImg = new Image();\n    this.bgImg.src = backgroundImg;\n    this.count = 50;\n    this.pokemon = new Pokemon(pokemonImg, 228, 228);\n    this.trainer = new PokemonTrainer(\n      this.boardCanvas.height,\n      this.boardCanvas.width\n    );\n    this.finished = false;\n    this.pokeCount = 0;\n    this.keysStore = [];\n    this.start = this.start.bind(this);\n    this.bindKeyListener = this.bindKeyListener.bind(this);\n    this.gameCountDown = this.gameCountDown.bind(this);\n    this.counter = this.counter.bind(this);\n    this.replay = this.replay.bind(this);\n    this.currentFrame = 0;\n    this.moveDirection = 1;\n    this.boardCanvas.width = 512;\n    this.boardCanvas.height = 480;\n    this.pokeBalls = [];\n    this.ballPool = [];\n    this.pokemons = [this.pokemon];\n    this.cooldown = 5;\n    this.pcounter = 0;\n    this.date = new Date();\n    this.begin = 0\n  }\n\n  checkImg() {\n    // console.log('check')\n    this.bgImg.onload = () => {\n      this.bgStatus = true; //Execute immediately after a page has been loaded:\n    };\n  }\n\n  replay() {\n    this.pokemons.forEach((pokemon) => {\n    pokemon.resetPkPos();\n    });\n    this.finished = false;\n    this.count = 50;\n    this.pokeCount = 0;\n    // this.start();\n\n  }\n  bindKeyListener() {\n    document.addEventListener(\n      \"keydown\",\n      (key) => {\n        this.keysStore[key.keyCode] = true;\n      },\n      false\n    );\n    document.addEventListener(\n      \"keyup\",\n      (key) => {\n        delete this.keysStore[key.keyCode];\n      },\n      false\n    );\n  }\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  }\n\n  isOutOfBounds(x, y) {\n    return x < 0 || y < 0 || x > this.width || y > this.height;\n  }\n\n  difficulty() {\n    if (this.count === 40) {\n      this.pokemons.push(new Pokemon(pokemonImg2, 242, 259));\n    }\n  }\n\n  update(val) {\n    //38 code for up key\n    if (this.keysStore.length !== 0) {\n      this.pokemons.forEach((pokemon) => (pokemon.pokeStatus = \"active\"));\n    }\n    if (38 in this.keysStore) {\n      this.currentFrame += 1;\n      this.moveDirection = 3;\n      this.trainer.y -= this.trainer.speed * val;\n      this.trainer.y = this.wrap(this.trainer.y, this.boardCanvas.height);\n    }\n    //40 for down\n    if (40 in this.keysStore) {\n      this.currentFrame += 1;\n      this.moveDirection = 0;\n      this.trainer.y += this.trainer.speed * val;\n      this.trainer.y = this.wrap(this.trainer.y, this.boardCanvas.height);\n    }\n    //left\n    if (37 in this.keysStore) {\n      this.currentFrame += 1;\n      this.moveDirection = 1;\n      this.trainer.x -= this.trainer.speed * val;\n      this.trainer.x = this.wrap(this.trainer.x, this.boardCanvas.width);\n    }\n    //right\n    if (39 in this.keysStore) {\n      this.currentFrame += 1;\n      this.moveDirection = 2;\n      this.trainer.x += this.trainer.speed * val;\n      this.trainer.x = this.wrap(this.trainer.x, this.boardCanvas.width);\n    }\n    //check catching\n    if (32 in this.keysStore) {\n      this.pcounter += 1;\n      if (this.pcounter % this.cooldown === 0) {\n        this.create();\n        this.pcounter = 0;\n      }\n    }\n    // this.difficulty();\n    this.pokemons.forEach((pokemon) => {\n      if (\n        this.trainer.x <= pokemon.x + 30 &&\n        pokemon.x <= this.trainer.x + 30 &&\n        this.trainer.y <= pokemon.y + 30 &&\n        pokemon.y <= this.trainer.y + 30\n      ) {\n        this.finished = true;\n      }\n      this.pokeBalls.forEach((ball) => {\n        if (\n          ball.x <= pokemon.x + 30 &&\n          pokemon.x <= ball.x + 30 &&\n          ball.y <= pokemon.y + 30 &&\n          pokemon.y <= ball.y + 30\n        ) {\n          this.pokeCount += 1;\n          pokemon.resetPkPos();\n          this.remove(ball);\n        }\n      });\n    });\n  }\n\n  resetBallPos(ball) {\n    ball.x = this.trainer.x;\n    ball.y = this.trainer.y + 30;\n    ball.moveDirection = this.moveDirection;\n    return ball;\n  }\n\n  create() {\n    this.pokeBalls.push(\n      this.ballPool.length > 0\n        ? this.resetBallPos(this.ballPool.pop())\n        : new Pokeball(\n            this.trainer.x,\n            this.trainer.y,\n            this.ctx,\n            this.moveDirection\n          )\n    );\n  }\n\n  remove(pokeball) {\n    this.ballPool.push(pokeball);\n    this.pokeBalls.splice(this.pokeBalls.indexOf(pokeball), 1);\n  }\n\n  render() {\n    this.checkImg();\n    if (this.bgStatus) {\n      this.ctx.drawImage(this.bgImg, 0, 0);\n    }\n    if (this.finished === false) {\n      this.trainer.drawTrainer(\n        this.ctx,\n        this.trainer.x,\n        this.trainer.y,\n        this.currentFrame,\n        this.moveDirection\n      );\n      this.pokemons.forEach((pokemon) => {\n        pokemon.drawPoke(\n          this.ctx,\n          this.trainer.x,\n          this.trainer.y,\n          this.currentFrame,\n          this.moveDirection\n        );\n      });\n\n      this.pokeBalls.forEach((ball) => {\n        if (this.isOutOfBounds(ball.x, ball.y)) {\n          this.remove(ball);\n        }\n      });\n      this.pokeBalls.forEach((ball) => {\n        ball.drawBall();\n      });\n    }\n\n    this.ctx.fillStyle = \"rgb(250, 250, 250)\";\n    this.ctx.font = \"24px Helvetica\";\n    this.ctx.textAign = \"left\";\n    this.ctx.fillText(\"Pokemon caught: \" + this.pokeCount, 20, 20);\n    this.ctx.fillText(\"Time: \" + this.count, 20, 50);\n\n    if (this.finished == true) {\n      this.counter = 0;\n      this.ctx.fillText(\"Game over!\", 200, 220);\n      document.getElementById(\"replay\").style.display = \"block\";\n    }\n  }\n\n  counter() {\n    this.count -= 1;\n    if (this.count <= 0) {\n      clearInterval(this.counter);\n      this.finished = true;\n      this.count = 0;\n    }\n  }\n\n  gameCountDown() {\n    setInterval(this.counter, 1000);\n  }\n\n  start() {\n    this.update(0.02);\n    this.render();\n    requestAnimationFrame(this.start);\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack://JS_Project/./src/Pokemon/game.js?");

/***/ }),

/***/ "./src/Pokemon/level.js":
/*!******************************!*\
  !*** ./src/Pokemon/level.js ***!
  \******************************/
/***/ (() => {

eval("class Level{\n    drawLevel(canvas, levelNum){\n      canvas.width = 500;\n      canvas.height = 500;\n      var ctx = canvasEl.getContext(\"2d\");\n\n      //craete game object\n      var trainer = {\n        speed: 250,\n        x: 0,\n        y: 0,\n      };\n\n      //get background image\n      var bgStatus = false;\n      //make sure the image loaded before game start\n      var bgImg = new Image();\n      bgImg.onload = () => {\n        //Execute a JavaScript immediately after a page has been loaded:\n        bgStatus = true;\n      };\n\n      bgImg.src = \"image/background1.png\";\n\n      var pktStatus = false;\n      var pktImg = new Image();\n      pktImg.onload = () => {\n        pktStatus = true;\n      };\n\n      pktImg.src = \"image/pkt2.png\";\n      \n      switch(levelNum){\n          case 1:\n            var pmStatus = false;\n            var pmImg = new Image();\n            pmImg.onload = () => {\n                pmStatus = true;\n            };\n\n            pmImg.src = \"image/pmLvl1.png\";\n              var pokemon = {\n                speed: 100,\n                x: 0,\n                y: 0,\n              };\n            break;\n          case 2:\n        }\n    }\n}\n\n//# sourceURL=webpack://JS_Project/./src/Pokemon/level.js?");

/***/ }),

/***/ "./src/Pokemon/pokeball.js":
/*!*********************************!*\
  !*** ./src/Pokemon/pokeball.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const pokeballImg = __webpack_require__(/*! ../../dist/image/pkb.png */ \"./dist/image/pkb.png\");\nclass Pokeball {\n  constructor(x, y, ctx, moveDirection) {\n    this.offset = 30;\n    this.x = x ;\n    this.y = y + this.offset;\n    this.speed = 10;\n    this.pkbImg = new Image();\n    this.pkbImg.src = pokeballImg;\n    this.ctx = ctx\n    this.moveDirection = moveDirection;\n    this.cooldown = 3;\n  \n  }\n \n\n  \n  drawBall() {\n    // clearRect(this.x, this.y, this.width, this.height);\n    // console.log(\"ball\")\n    this.counter += 1;\n\n    if(this.moveDirection === 3){\n        this.y -= this.speed;\n    }\n    if (this.moveDirection === 0) {\n      this.y += this.speed;\n    }\n    if (this.moveDirection === 1) {\n      this.x -= this.speed;\n    }\n    if (this.moveDirection === 2) {\n      this.x += this.speed;\n    }\n    \n    this.ctx.drawImage(this.pkbImg, this.x, this.y);\n  }\n}\n\nmodule.exports = Pokeball;\n\n\n//# sourceURL=webpack://JS_Project/./src/Pokemon/pokeball.js?");

/***/ }),

/***/ "./src/Pokemon/pokemon.js":
/*!********************************!*\
  !*** ./src/Pokemon/pokemon.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Sprite = __webpack_require__(/*! ./sprite */ \"./src/Pokemon/sprite.js\");\nclass Pokemon {\n  constructor(img, sheetWidth, sheetHeight) {\n    this.pkImg = new Image();\n    this.pkImg.src = img;\n    this.speed = 100;\n    this.height = 512;\n    this.width = 408;\n    this.x = Math.random() * this.width;\n    this.y = Math.random() * this.height;\n    this.followSpeed = 50;\n    this.sprite = new Sprite(sheetWidth, sheetHeight);\n    this.currentFrame = 0;\n    this.pokeStatus = \"idle\"\n  }\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  }\n  checkStatus(pokeStatus){\n    this.pokeStatus = pokeStatus;\n  }\n  setMoveDirection(trainX, trainY) {\n    if(this.pokeStatus !== \"idle\"){\n      const distX = trainX + 16 - this.x;\n      const distY = trainY + 24 - this.y;\n      const mag = Math.sqrt(distX * distX + distY * distY);\n      const speedX = (distX / mag) * (0.02 * this.followSpeed);\n      const speedY = (distY / mag) * (0.02 * this.followSpeed);\n      this.x += speedX;\n      this.y += speedY;\n    }else{\n      const distX = this.trainX - this.x;\n      const distY = this.trainY - this.y;\n      const normalX = 1 / distX;\n      const normalY = 1 / distY;\n      this.x += 0;\n      this.y += 0;\n    }\n  }\n\n  drawPoke(ctx, trainX, trainY, currentFrame, moveDirection) {\n    this.currentFrame += 1;\n    this.setMoveDirection(trainX, trainY);\n    this.sprite.drawImg(\n      ctx,\n      this.pkImg,\n      this.x,\n      this.y,\n      this.currentFrame,\n      moveDirection\n    );\n  }\n\n  resetPkPos() {\n    this.x =  Math.random() * (this.width);\n    this.y = Math.random() * (this.height);\n  }\n}\n\nmodule.exports = Pokemon;\n\n\n//# sourceURL=webpack://JS_Project/./src/Pokemon/pokemon.js?");

/***/ }),

/***/ "./src/Pokemon/pokemon_trainer.js":
/*!****************************************!*\
  !*** ./src/Pokemon/pokemon_trainer.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const poketrainertImg = __webpack_require__(/*! ../../dist/image/pkt.png */ \"./dist/image/pkt.png\");\nconst Sprite = __webpack_require__(/*! ./sprite */ \"./src/Pokemon/sprite.js\");\nclass PokemonTrainer {\n  constructor(height, width) {\n    this.pktImg = new Image();\n    this.pktImg.src = poketrainertImg;\n    this.height = height;\n    this.width = width;\n    this.speed = 250;\n    this.x = 300;\n    this.y = 300;\n    this.sprite = new Sprite(370, 383);\n  }\n\n  drawTrainer(ctx, x, y, currentFrame, moveDirection) {\n    this.sprite.drawImg(\n      ctx,\n      this.pktImg,\n      x,\n      y,\n      currentFrame,\n      moveDirection\n    );\n  }\n}\n\nmodule.exports = PokemonTrainer;\n\n\n//# sourceURL=webpack://JS_Project/./src/Pokemon/pokemon_trainer.js?");

/***/ }),

/***/ "./src/Pokemon/sprite.js":
/*!*******************************!*\
  !*** ./src/Pokemon/sprite.js ***!
  \*******************************/
/***/ ((module) => {

eval("\nclass Sprite {\n  constructor(sheetWidth, sheetHeight) {\n    this.sheetWidth = sheetWidth;\n    this.sheetHeight = sheetHeight;\n    this.srcY;\n    this.cols = 4;\n    this.srcX = 0;\n    this.width = this.sheetWidth / this.cols;\n    this.height = this.sheetWidth / this.cols;\n  }\n\n  updateFrame(currentFrame,moveDirection) {\n    // ctx.clearRect(x,y,this.width,this.height);\n    currentFrame = currentFrame % this.cols;\n    this.srcX = currentFrame *this.width;\n    this.srcY = moveDirection * this.height;\n  }\n\n  drawImg(ctx, img, x, y, currentFrame,moveDirection) {\n    this.updateFrame(currentFrame, moveDirection);\n    ctx.drawImage(\n      img,\n      this.srcX,\n      this.srcY,\n      this.width,\n      this.height,\n      x,\n      y,\n      this.width,\n      this.height\n    );\n  }\n}\n\nmodule.exports = Sprite;\n\n//# sourceURL=webpack://JS_Project/./src/Pokemon/sprite.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("const Game = __webpack_require__(/*! ./Pokemon/game */ \"./src/Pokemon/game.js\");\nconst LevelOne = __webpack_require__(/*! ./Pokemon/level */ \"./src/Pokemon/level.js\");\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementById(\"mycanvas\");\n  const playbtn = document.getElementById(\"play-btn\");\n  const introbtn = document.getElementById(\"game-intro\");\n  const backbtn = document.getElementById(\"back\");\n  const game = new Game(canvasEl);\n  const musicbtn = document.getElementById(\"music-btn\");\n  const audio = document.getElementById(\"audio\");\n  const replaybtn = document.getElementById(\"replay-btn\");\n\n  game.bindKeyListener();\n  game.start();\n  playbtn.onclick = function () {\n    document.getElementById(\"menus\").style.display = \"none\";\n    document.getElementById(\"gameboy\").style.display = \"inline-block\";\n    canvasEl.style.display = \"block\";\n    game.gameCountDown();\n  };\n\n  introbtn.onclick = function () {\n    document.getElementById(\"menus\").style.display = \"none\";\n    document.getElementById(\"intro\").style.display = \"block\";\n  };\n\n  backbtn.onclick = function () {\n    document.getElementById(\"intro\").style.display = \"none\";\n    document.getElementById(\"menus\").style.display = \"block\";\n  };\n\n  musicbtn.onclick = function () {\n    if (audio.paused) {\n      audio.play();\n      document.getElementById(\"music-btn\").style.backgroundImage =\n        \"url(./dist/image/musicStop.png)\";\n    } else if (audio.played) {\n      audio.pause();\n      document.getElementById(\"music-btn\").style.backgroundImage =\n        \"url(./dist/image/musicPlay.png)\";\n    }\n  };\n\n  replaybtn.onclick = function () {\n    document.getElementById(\"replay\").style.display = \"none\";\n    game.replay();\n  };\n});\n\n\n//# sourceURL=webpack://JS_Project/./src/index.js?");
})();

/******/ })()
;