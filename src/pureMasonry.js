let brickContainer;
let mason = {};

module.exports = {
  init: function(options){
    brickContainer = document.querySelector(options.container);
    mason = {
      options: {
        brickWidth: options.width,
        horizontalGutter: options.horizontal_gutter,
        verticalGutter: options.vertical_gutter,
        underConstruction: options.responsive
      },
      brickContainer: brickContainer
    };
    build(mason.options);
  }
};

let build = function(options) {

	//  get each brick
	let bricks = [];
	for (let brickIndex = 0; brickIndex < mason.brickContainer.children.length; brickIndex++) {
		let classNames = mason.brickContainer.children[brickIndex].className.split(' ');
		if (classNames.indexOf('brick') > -1) {
			mason.brickContainer.children[brickIndex].style.width = options.brickWidth + 'px';
			bricks.push(mason.brickContainer.children[brickIndex]);
		}
	}

	let grossWidth = options.brickWidth + options.horizontalGutter;

	//	calculate the number of bricks in each row
	let bricksPerRow = Math.floor(parseInt(mason.brickContainer.clientWidth) / grossWidth);

	//	initialise array to keep track of column height
	let columnHeight = Array(bricksPerRow).fill(0);

	//	populate first row starting with first (0th) brick
	let brickIndex = 0;
	for (let column = 0; column < bricksPerRow; column++) {
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
	let minColumnValue = Math.min.apply(Math, columnHeight);
	let minColumnKey;
	for (let column = 0; column < bricksPerRow; column++) {
		//	find the key for the minimum value
		if (columnHeight[column] === minColumnValue) {
			minColumnKey = column;
			//	use the leftmost in case several columns have the same height
			break;
		}
	}

  let tmpValues = [];
  console.log(bricks[1].style);
  console.log(bricks[bricks.length-1].getBoundingClientRect());
  for(let ind = 0; ind < bricks.length; ind++) {
    tmpValues.push(bricks[ind].getBoundingClientRect().top);
  }

  console.log(tmpValues);

  let computedHeight = 0;
  for (let item = 0; item < bricks.length; item++ ) {
    if(parseInt(bricks[item].style.top) > 0) {
       computedHeight += parseInt(bricks[item].style.top);
    }
    else {
      computedHeight = Math.max.apply(Math, tmpValues);
    }
  }
  console.log()
  brickContainer.style.height = computedHeight + 'px';
  console.log(computedHeight);
  computedHeight = 0;

	//	set coordinates for brick
	bricks[brickIndex].style.left = minColumnKey * grossWidth + 'px';
	bricks[brickIndex].style.top = columnHeight[minColumnKey] + options.verticalGutter + 'px';
	//	update the height of the column just appended
	columnHeight[minColumnKey] += bricks[brickIndex].offsetHeight + options.verticalGutter;
	brickIndex++;

	}
}

//	if browser is resized
window.onresize = function() {
	//	if masonry is not disabled
	if (mason.options.underConstruction) {

		let widthBefore = mason.brickContainer.clientWidth;			//	get width before resizing
		//	if already called within last second, reset timer
		if (waitingForResize) {
			clearTimeout(waitingForResize);
		}
		let waitingForResize = setTimeout(function() {
			//	if container width has changed in the last second
			if (widthBefore !== mason.brickContainer.clientWidth) {
				build(mason.options);
			}
		}, 200);
    }
};
