var PureMasonry =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = {
		build: function build(options) {
			var mason = {
				options: {},
	
				grabTrowel: function grabTrowel(brickWidth, horizontalGutter, verticalGutter) {
					this.options = {
						brickWidth: brickWidth,
						horizontalGutter: horizontalGutter,
						verticalGutter: verticalGutter,
						underConstruction: true
					};
	
					this.brickContainer = document.getElementById('masonry-wall');
	
					_build(this.options);
				}
			};
		}
	};
	
	var _build = function _build(options) {
	
		//	get each brick
		var bricks = [];
		for (var brickIndex = 0; brickIndex < mason.brickContainer.children.length; brickIndex++) {
			var classNames = mason.brickContainer.children[brickIndex].className.split(' ');
			if (classNames.indexOf('brick') > -1) {
				mason.brickContainer.children[brickIndex].style.width = options.brickWidth + 'px';
				bricks.push(mason.brickContainer.children[brickIndex]);
			}
		}
	
		var grossWidth = options.brickWidth + options.horizontalGutter;
	
		//	calculate the number of bricks in each row
		var bricksPerRow = Math.floor(parseInt(mason.brickContainer.clientWidth) / grossWidth);
	
		//	initialise array to keep track of column height
		var columnHeight = Array(bricksPerRow).fill(0);
	
		//	populate first row starting with first (0th) brick
		var brickIndex = 0;
		for (var column = 0; column < bricksPerRow; column++) {
			if (brickIndex < bricks.length) {
				//	set coordinates for brick
				bricks[brickIndex].style.left = column * grossWidth + 'px';
				bricks[brickIndex].style.top = '0px';
				//	update the height of the column just appended
				columnHeight[column] = bricks[brickIndex].offsetHeight;
				brickIndex++;
			}
		}
	
		//	place remaining bricks
		while (brickIndex < bricks.length) {
			//	get shortest column
			var minColumnValue = Math.min.apply(Math, columnHeight);
			var minColumnKey;
			for (var column = 0; column < bricksPerRow; column++) {
				//	find the key for the minimum value
				if (columnHeight[column] === minColumnValue) {
					minColumnKey = column;
					//	use the leftmost in case several columns have the same height
					break;
				}
			}
			//	set coordinates for brick
			bricks[brickIndex].style.left = minColumnKey * grossWidth + 'px';
			bricks[brickIndex].style.top = columnHeight[minColumnKey] + options.verticalGutter + 'px';
			//	update the height of the column just appended
			columnHeight[minColumnKey] += bricks[brickIndex].offsetHeight + options.verticalGutter;
			brickIndex++;
		}
	};
	
	//	if browser is resized
	window.onresize = function () {
		//	if masonry is not disabled
		if (mason.options.underConstruction) {
			var widthBefore = mason.brickContainer.clientWidth; //	get width before resizing
			//	if already called within last second, reset timer
			if (waitingForResize) {
				clearTimeout(waitingForResize);
			}
			var waitingForResize = setTimeout(function () {
				//	if container width has changed in the last second
				if (widthBefore !== mason.brickContainer.clientWidth) {
					_build(mason.options);
				}
			}, 1000);
		}
	};
	
	//	initialise main object
	var mason = {
		options: {},
	
		grabTrowel: function grabTrowel(brickWidth, horizontalGutter, verticalGutter) {
			this.options = {
				brickWidth: brickWidth,
				horizontalGutter: horizontalGutter,
				verticalGutter: verticalGutter,
				underConstruction: true
			};
	
			this.brickContainer = document.getElementById('masonry-wall');
	
			_build(this.options);
		}
	};

/***/ })
/******/ ]);
//# sourceMappingURL=pureMasonry.js.map