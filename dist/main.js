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

/***/ "./dist/image/pkt2.png":
/*!*****************************!*\
  !*** ./dist/image/pkt2.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"b720b51cb584ae73f970eb89ff3f15e9.png\";\n\n//# sourceURL=webpack://JS_Project/./dist/image/pkt2.png?");

/***/ }),

/***/ "./dist/image/pmLvl1.png":
/*!*******************************!*\
  !*** ./dist/image/pmLvl1.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"a4ffacdd154c9f650f053bdde12a9193.png\";\n\n//# sourceURL=webpack://JS_Project/./dist/image/pmLvl1.png?");

/***/ }),

/***/ "./src/Pokemon/game.js":
/*!*****************************!*\
  !*** ./src/Pokemon/game.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Level = __webpack_require__(/*! ./level */ \"./src/Pokemon/level.js\");\nconst backgroundImg = __webpack_require__(/*! ../../dist/image/background1.png */ \"./dist/image/background1.png\");\nconst pokemonTrainerImg = __webpack_require__(/*! ../../dist/image/pkt2.png */ \"./dist/image/pkt2.png\");\nconst pokemonImg = __webpack_require__(/*! ../../dist/image/pmLvl1.png */ \"./dist/image/pmLvl1.png\");\n\nclass Game {\n  constructor(boardCanvas) {\n    this.boardCanvas = boardCanvas;\n    this.ctx = boardCanvas.getContext(\"2d\");\n    this.bgStatus = false;\n    this.pktStatus = false;\n    this.pmStatus = false;\n    this.bgImg = new Image();\n    this.pktImg = new Image();\n    this.pmImg = new Image();\n    this.bgImg.src = backgroundImg;\n    this.pktImg.src = pokemonTrainerImg;\n    this.pmImg.src = pokemonImg;\n    this.count = 50;\n    this.finished = false;\n    this.trainer = {\n      speed: 250,\n      x: 200,\n      y: 200,\n    };\n    this.pokemon = {\n      speed: 100,\n      x: 0,\n      y: 0,\n    };\n    this.pokeCount = 0;\n    this.keysStore = [];\n    this.start = this.start.bind(this);\n    this.bindKeyListener = this.bindKeyListener.bind(this);\n    this.checkImg = this.checkImg.bind(this);\n    this.setCanvas = this.setCanvas.bind(this);\n    this.gameCountDown = this.gameCountDown.bind(this);\n    this.counter = this.counter.bind(this);\n  }\n\n  checkImg() {\n    // console.log('check')\n    this.bgImg.onload = () => {\n      this.bgStatus = true; //Execute immediately after a page has been loaded:\n    };\n    this.pktImg.onload = () => {\n      this.pktStatus = true;\n    };\n    this.pmImg.onload = () => {\n      this.pmStatus = true;\n    };\n  }\n\n  setCanvas() {\n    this.boardCanvas.width = 512;\n    this.boardCanvas.height = 480;\n  }\n\n  bindKeyListener() {\n    document.addEventListener(\n      \"keydown\",\n      (key) => {\n        this.keysStore[key.keyCode] = true;\n      },\n      false\n    );\n    document.addEventListener(\n      \"keyup\",\n      (key) => {\n        delete this.keysStore[key.keyCode];\n      },\n      false\n    );\n  }\n\n  resetPkPos() {\n    this.pokemon.x = 60 + Math.random() * (this.boardCanvas.width - 120);\n    this.pokemon.y = 60 + Math.random() * (this.boardCanvas.height - 120);\n  }\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  }\n\n  update(val) {\n    //38 code for up key\n    if (38 in this.keysStore) {\n      this.trainer.y -= this.trainer.speed * val;\n      this.trainer.y = this.wrap(this.trainer.y, this.boardCanvas.height);\n    }\n    //40 for down\n    if (40 in this.keysStore) {\n      this.trainer.y += this.trainer.speed * val;\n      this.trainer.y = this.wrap(this.trainer.y, this.boardCanvas.height);\n    }\n    //left\n    if (37 in this.keysStore) {\n      this.trainer.x -= this.trainer.speed * val;\n      this.trainer.x = this.wrap(this.trainer.x, this.boardCanvas.width);\n    }\n    //right\n    if (39 in this.keysStore) {\n      this.trainer.x += this.trainer.speed * val;\n      this.trainer.x = this.wrap(this.trainer.x, this.boardCanvas.width);\n    }\n    //check catching\n    if (\n      this.trainer.x <= this.pokemon.x + 30 &&\n      this.pokemon.x <= this.pokemon.x + 30 &&\n      this.trainer.y <= this.pokemon.y + 30 &&\n      this.pokemon.y <= this.trainer.y + 30\n    ) {\n      this.pokeCount += 1;\n      this.resetPkPos();\n    }\n  }\n\n  async render() {\n    await this.checkImg();\n    if (this.bgStatus) {\n      this.ctx.drawImage(this.bgImg, 0, 0);\n    }\n\n    if (this.pktStatus) {\n      this.ctx.drawImage(this.pktImg, this.trainer.x, this.trainer.y);\n    }\n\n    if (this.pmStatus) {\n      this.ctx.drawImage(this.pmImg, this.pokemon.x, this.pokemon.y);\n    }\n\n    this.ctx.fillStyle = \"rgb(250, 250, 250)\";\n    this.ctx.font = \"24px Helvetica\";\n    this.ctx.textAign = \"left\";\n    this.ctx.fillText(\"Pokemon caught: \" + this.pokeCount, 20, 20);\n    this.ctx.fillText(\"Time: \" + this.count, 20, 50);\n\n    if (this.finished == true) {\n      this.ctx.fillText(\"Game over!\", 200, 220);\n    }\n  }\n\n  counter() {\n    this.count -= 1;\n    if (this.count <= 0) {\n      clearInterval(this.counter);\n      this.finished = true;\n      this.count = 0;\n      this.pktStatus = false;\n      this.pmStatus = false;\n    }\n  }\n\n  gameCountDown() {\n    setInterval(this.counter, 1000);\n  }\n\n  start() {\n    this.update(0.02);\n    this.render();\n    requestAnimationFrame(this.start);\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack://JS_Project/./src/Pokemon/game.js?");

/***/ }),

/***/ "./src/Pokemon/level.js":
/*!******************************!*\
  !*** ./src/Pokemon/level.js ***!
  \******************************/
/***/ (() => {

eval("class Level{\n    drawLevel(canvas, levelNum){\n      canvas.width = 500;\n      canvas.height = 500;\n      var ctx = canvasEl.getContext(\"2d\");\n\n      //craete game object\n      var trainer = {\n        speed: 250,\n        x: 0,\n        y: 0,\n      };\n\n      //get background image\n      var bgStatus = false;\n      //make sure the image loaded before game start\n      var bgImg = new Image();\n      bgImg.onload = () => {\n        //Execute a JavaScript immediately after a page has been loaded:\n        bgStatus = true;\n      };\n\n      bgImg.src = \"image/background1.png\";\n\n      var pktStatus = false;\n      var pktImg = new Image();\n      pktImg.onload = () => {\n        pktStatus = true;\n      };\n\n      pktImg.src = \"image/pkt2.png\";\n      \n      switch(levelNum){\n          case 1:\n            var pmStatus = false;\n            var pmImg = new Image();\n            pmImg.onload = () => {\n                pmStatus = true;\n            };\n\n            pmImg.src = \"image/pmLvl1.png\";\n              var pokemon = {\n                speed: 100,\n                x: 0,\n                y: 0,\n              };\n            break;\n          case 2:\n        }\n    }\n}\n\n//# sourceURL=webpack://JS_Project/./src/Pokemon/level.js?");

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
eval("const Game = __webpack_require__(/*! ./Pokemon/game */ \"./src/Pokemon/game.js\");\nconst LevelOne = __webpack_require__(/*! ./Pokemon/level */ \"./src/Pokemon/level.js\");\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementById(\"mycanvas\");\n  const playbtn = document.getElementById(\"play-btn\");\n  const introbtn = document.getElementById(\"game-intro\");\n  const backbtn = document.getElementById(\"back\");\n  const game = new Game(canvasEl);\n  const musicbtn = document.getElementById(\"music-btn\");\n  const audio = document.getElementById(\"audio\");\n\n  game.setCanvas();\n  game.bindKeyListener();\n  //   game.gameCountDown();\n  game.start();\n  playbtn.onclick = function () {\n    document.getElementById(\"menus\").style.display = \"none\";\n    canvasEl.style.display = \"block\";\n    game.gameCountDown();\n  };\n\n  introbtn.onclick = function () {\n    document.getElementById(\"menus\").style.display = \"none\";\n    document.getElementById(\"intro\").style.display = \"block\";\n  };\n  \n  backbtn.onclick = function () {\n    document.getElementById(\"intro\").style.display = \"none\";\n    document.getElementById(\"menus\").style.display = \"block\";\n  };\n\n  musicbtn.onclick= function() {\n    if (audio.paused) {\n      audio.play();\n      document.getElementById(\"music-btn\").style.backgroundImage =\n      \"url(../../dist/image/musicStop.png)\";\n    } else if (audio.played) {\n        audio.pause();\n        document.getElementById(\"music-btn\").style.backgroundImage =\n        \"url(../../dist/image/musicPlay.png)\";\n    }\n  }\n});\n\n\n//# sourceURL=webpack://JS_Project/./src/index.js?");
})();

/******/ })()
;